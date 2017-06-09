/*
  Requirements:
  1. 2-8 players
  2. 2d tileset from 4x4 to 6x6 depending on amount of players
  3. Play to certain amount of points or deaths
  4. Initiate player of game
  5. All players choose 2 actions
  6. For each priority, each player resolves their action, if there are reactive Cards, they are resolved as well before moving on to the next player
  7. Continue on until points, deaths.  Each round is composed of 5 turns.
  8. Start new round.



  Each match consists of #rounds.
    Rounds have 5 turns
      Each turn has 2 phases
        Each phase has #player actions
*/

const EE = require('./eventemitter')

const Player = require('./Player')
const Tile = require('./Tile')
const Cards = require('./Cards')

class Game {
  constructor(numOfPlayers, type='HARDCORE', numberOfPointsToWin=1000, numberOfLives=1000) {
    this.state = {
      numOfPlayers: numOfPlayers,
      type: type,
      grid: null,
      players: [],
      currentActions: [[], []],
      roundNumber: 0,
      phaseNumber: 0,
      turnInRound: 0,
      counter: 0,
      priorityNumber: 0,
      priorityLimit: 5,
      numberOfLives: null,
      numberOfPointsToWin: null,
      drawPile: [],
      waitingOnNumberOfPlayers: numOfPlayers,
      CURRENT_STATE: 'SETUP'
    }

    this.setWinningConditions(type, numberOfPointsToWin, numberOfLives)
    this.setupGrid(4) // default game is 4x4
    this.createPlayers(numOfPlayers)
  }

  setWinningConditions(type, points, lives) {
    // if (this.state.METASTATE === this.METASTATES.INPROGRESS) {
    //   return
    // }

    this.state.numberOfPointsToWin = points
    this.state.numberOfLives = lives
  }

  setupGrid(amountOfSquares) {
    if (this.state.numOfPlayers > 4) {
      amountOfSquares++

      if (this.state.numOfPlayers > 6) {
        amountOfSquares++
      }
    }

    for (var i = 0; i < amountOfSquares; i++) {
      if (this.state.grid === null) {
        this.state.grid = [[]]
      } else {
        this.state.grid.push([])
      }

      for (var j = 0; j < amountOfSquares; j++) {
        this.state.grid[i].push(new Tile(i, j))
      }
    }
  }

  createPlayers(num) {
    const defaultNames = ['Abe', 'Beau', 'Chris', 'Doug', 'Eliz', 'Frank', 'GEORGE', 'Helga']
    for (var i = 0; i < num; i++) {
      let name = defaultNames.pop()
      this.state.players.push(new Player(name, this.state.numberOfLives))
    }
  }

  createDrawPile() {
    this.state.drawPile = []
    for (var i = 0; i < Cards.length; i++) {
      this.state.drawPile.push(Cards[i])
    }
  }

  getState() {
    console.log(this.state)
  }

  logPlayerProp(string, prop) {
    for (var i = 0; i < this.state.players.length; i++) {
     console.log(string, this.state.players[i][prop])
    }
  }

  sortPlayersInTurnOrder() {
    // make first player last, then reassign turnOrder
    const firstPlayer = this.state.players.shift()
    this.state.players.push(firstPlayer)
    for (var i = 0; i < this.state.players.length; i++) {
      this.state.players[i].turnOrder = i
    }
  }

  promptSelectActions() {
    for (let i = 0; i < this.state.players.length; i++) {
      this.state.players[i].promptSelectCards()
    }
  }

  decrementWaitingOn(selectedCards) {
    if (this.state.waitingOnNumberOfPlayers > 0) {
      this.state.waitingOnNumberOfPlayers--
      this.state.currentActions[0].push(selectedCards[0])
      this.state.currentActions[1].push(selectedCards[1])
    }
    if (this.state.waitingOnNumberOfPlayers === 0) {
      EE.emit('allPlayersReady')
      this.state.priorityNumber = 0
      this.startPhase()
    }
  }

  sortPhaseActions(phaseNumber) {
    let currentActions = this.state.currentActions[phaseNumber]
    currentActions.sort((a,b) => {
      if (a.priority < b.priority) return -1
      if (a.priority > b.priority) return 1
      return 0
    })

    currentActions.sort((a,b) => {
      if (a.owner.turnOrder < b.owner.turnOrder) return -1
      if (a.owner.turnOrder > b.owner.turnOrder) return 1
      return 0
    })
  }

  performActionAfterInput(data) {
    this.state.currentAction.performActionFn(data)
  }

  processPriority() {
    // the actions are sorted
    // while (thereAreActionsInList)
    //   get current action, does it need player input?
    //     ask player for input, wait for player input, receive input
    //   execute player input action, see affect
    //     build list of players affected
    //     loop through players and check if they have counter
    //       2 players do:
    //         for player in players
    //           ask for player input
    let firstAction = this.state.currentActions[this.state.phaseNumber][this.state.counter].action
    this.state.currentAction = firstAction
    firstAction.tryToPerform()
  }

  endPriority() {
    if (this.state.priorityNumber < this.state.priorityLimit) {
      this.state.priorityNumber++
      this.processPriority()
    } else {
      this.endPhase()
    }
  }

  endPhase() {
    if (this.state.phaseNumber < 1) {
      this.state.phaseNumber++
      this.startPhase()
    } else {
      this.sortPlayersInTurnOrder()
      this.startTurn()
    }
  }

  startPhase() {
    this.sortPhaseActions(this.state.phaseNumber)
    this.state.CURRENT_STATE = `PROCESS_PHASE${this.state.phaseNumber}`
    this.processPriority()
  }

  startTurn() {
    this.state.turnInRound++
    this.waitingOnNumberOfPlayers = this.state.numOfPlayers
    this.state.CURRENT_STATE = 'CARD_SELECTION'
    this.state.phaseNumber = 0

    if (this.state.turnInRound <= 5) {
      console.log('------------------TurnInRound', this.state.turnInRound)

      this.broadcastState()
      // this.promptSelectActions()
    } else {
      // Round Over, start new round, check if its only a 1 round game, etc
      // this.startRound()
    }
  }

  startRound() {
    this.state.roundNumber++
    this.state.turnInRound = 0
    this.createDrawPile()

    for (let i=0; i < this.state.players.length; i++) {
      let player = this.state.players[i]
      player.turnOrder = i
      player.drawPile = this.state.drawPile.map(a => Object.assign({}, a)) // deep copy drawpile
      player.setupRound()
    }

    this.startTurn()
  }

  playGame() {
    // EE.on('PLAYERINPUT', (data) {
    //   switch (data.)
    // })
    this.startRound()
  }

  main() {
    this.playGame()
  }

  broadcastState() {
    EE.emit('GAMESTATE', this.state)
  }

}

module.exports = Game

