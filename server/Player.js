const EE = require('./eventemitter')
const Action = require('./Action')

class Player {
  constructor(name, lives) {
    this.name = name
    this.x = null
    this.y = null
    this.turnOrder = null
    this.drawPile = []
    this.discardPile = []
    this.points = 0
    this.lives = lives
    this.currentActions = [null, null]
  }

  placeCharacter(x, y) {
    this.x = x
    this.y = y
  }

  setPlayerName(){

  }

  getPlayerCoordinates() {
    return {x: this.x, y: this.y}
  }

  action() {

  }

  move(x, y) {
    this.x = x
    this.y = y
  }

  attack() {

  }

  reactive() {

  }

  setupRound() {
    for (var i = 0; i < this.drawPile.length; i++) {
      let card = this.drawPile[i]
      card.owner = this
      card.action = new Action(card)
    }
    this.discardPile = []
  }

  promptSelectCards() {
    // use sockets to listen for selections
    this.chooseCard(Math.floor(Math.random() * this.drawPile.length - 1), 0)
    this.chooseCard(Math.floor(Math.random() * this.drawPile.length - 1), 1)
    EE.emit('playerHasSelectedCards', {selectedCards: this.currentActions})
  }

  chooseCard(cardIndex, turnNumber) {
    const card = this.drawPile.splice(cardIndex, 1)[0]
    this.currentActions[turnNumber] = card
  }
}

module.exports = Player
