/*
  Requirements:
  1. 2-8 players
  2. 2d tileset from 4x4 to 6x6 depending on amount of players
  3. Play to certain amount of points or deaths
  4. Initiate player of game
  5. All players choose 2 actions
  6. For each priority, each player resolves their action, if there are reactive cards, they are resolved as well before moving on to the next player
  7. Continue on until points, deaths.  Each round is composed of 5 turns.
  8. Start new round.
*/
const EE = require('./eventemitter')

const Player = require('./Player')
const Tile = require('./Tile')
const { CARDS, Card } = require('./Card')

class Game {
  constructor(numOfPlayers, type='HARDCORE', numberOfPointsToWin=1000, numberOfLives=1000) {
    this.gameStates = {
      SETUP     : 'SETUP',
      INPROGRESS: 'INPROGRESS',
      GAMEOVER  : 'GAMEOVER'
    }

    this.numOfPlayers = numOfPlayers
    this.type = type
    this.grid = null
    this.players = []
    this.roundNumber = 0
    this.phaseNumber = 0
    this.turnInRound = 0
    this.priorityNumber = 0
    this.priorityLimit = 5
    this.numberOfLives = null
    this.numberOfPointsToWin = null
    this.gameState = this.gameStates.SETUP
    this.drawPile = []
    this.waitingOnNumberOfPlayers = this.numOfPlayers

    this.setWinningConditions(type, numberOfPointsToWin, numberOfLives)
    this.setupGrid(4) // default game is 4x4
    this.createPlayers(numOfPlayers)
  }

  setWinningConditions(type, points, lives) {
    if (this.gameState === this.gameStates.INPROGRESS) {
      return
    }

    this.numberOfPointsToWin = points
    this.numberOfLives = lives
  }

  setupGrid(amountOfSquares) {
    if (this.numOfPlayers > 4) {
      amountOfSquares++

      if (this.numOfPlayers > 6) {
        amountOfSquares++
      }
    }

    for (var i = 0; i < amountOfSquares; i++) {
      if (this.grid === null) {
        this.grid = [[]]
      } else {
        this.grid.push([])
      }

      for (var j = 0; j < amountOfSquares; j++) {
        this.grid[i].push(new Tile(i, j))
      }
    }
  }

  createPlayers(num) {
    const defaultNames = ['Abe', 'Beau', 'Chris', 'Doug', 'Eliz', 'Frank', 'GEORGE', 'Helga']
    for (var i = 0; i < num; i++) {
      let name = defaultNames.pop()
      this.players.push(new Player(name, this.numberOfLives))
    }
  }

  createDrawPile() {
    this.drawPile = []
    for (var i = 0; i < CARDS.length; i++) {
      this.drawPile.push(CARDS[i])
    }
  }

  getState() {
    console.log(this)
  }

  logPlayerProp(string, prop) {
    for (var i = 0; i < this.players.length; i++) {
     console.log(string, this.players[i][prop])
    }
  }

  sortPlayersInTurnOrder() {
    // make first player last, then reassign turnOrder
    const firstPlayer = this.players.shift()
    this.players.push(firstPlayer)
    for (var i = 0; i < this.players.length; i++) {
      this.players[i].turnOrder = i
    }
  }

  promptSelectActions() {
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].promptSelectCards()
    }
  }

  decrementWaitingOn() {
    if (this.waitingOnNumberOfPlayers > 0) {
      this.waitingOnNumberOfPlayers--
    }
    if (this.waitingOnNumberOfPlayers === 0) {
      EE.emit('allPlayersReady')
      this.doTurn()
    }
  }

  resolveActionsOnPriority(actionList, priorityNum) {
    for (var i = 0; i < actionList.length; i++) {
      let action = actionList[i]
      action.perform.apply(action.user)
    }
  }

  doTurn() {
    console.log('TURN:', this.phaseNumber)
    for (var i = 1; i <= this.priorityLimit; i++) {
      let actionsOnThisPriority = []
      for (var k = 0; k < this.players.length; k++) {
        const player = this.players[k]

        if (player.currentActions[this.phaseNumber] === null) {
          continue
        }

        let currentPlayerAction = player.currentActions[this.phaseNumber]
        if (currentPlayerAction.priority === i) {
          actionsOnThisPriority.push(currentPlayerAction)
          player.discardPile.push(currentPlayerAction)
          player.currentActions[this.phaseNumber] = null
        }
      }
      // all actions on this priority are queued up, resolve them
      this.resolveActionsOnPriority(actionsOnThisPriority, i)
    }

    if (this.phaseNumber < 1) {
      // do second phase of this turn
      this.phaseNumber++
      this.doTurn()
    }
    else {
      this.sortPlayersInTurnOrder()
      this.startTurn()
    }
  }

  startRound() {
    this.turnInRound = 0
    this.roundNumber++
    this.createDrawPile()

    for (let i=0; i<this.players.length; i++) {
      let player = this.players[i]
      player.turnOrder = i
      console.log('player', player.name)
      player.drawPile = this.drawPile.slice()
      player.setCardOwner.apply(player)
      player.discardPile = []
    }

    this.startTurn()
  }

  startTurn() {
    this.waitingOnNumberOfPlayers = this.numOfPlayers
    this.phaseNumber = 0
    this.turnInRound++

    if (this.turnInRound <= 5) {
      // EE.emit('startTurn')
      console.log('')
      console.log('------------------', this.turnInRound)

      this.promptSelectActions()
    } else {
      // Round Over, start new round
    }
  }

  playGame() {
    this.startRound()
  }

  main() {
    this.playGame()
  }
}

module.exports = Game
