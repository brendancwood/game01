const prompt = require('prompt')
const EE = require('./eventemitter')

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

  setCardOwner() {
    for (var i = 0; i < this.drawPile.length; i++) {
      this.drawPile[i].owner = this
    }
  }

  promptSelectCards() {
    // use sockets to listen for selections
    this.chooseCard(Math.floor(Math.random() * this.drawPile.length - 1), 0)
    this.chooseCard(Math.floor(Math.random() * this.drawPile.length - 1), 1)
    EE.emit('playerHasSelectedCards', {name: this.name})
  }

  chooseCard(cardIndex, turnNumber) {
    const card = this.drawPile.splice(cardIndex, 1)[0]
    this.currentActions[turnNumber] = card
  }
}

module.exports = Player
