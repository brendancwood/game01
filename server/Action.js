const EE = require('./eventemitter')

class Action {
  constructor(card) {
    this.name = card.name
    this.priority = card.priority
    this.reactive = card.reactive
    this.owner = card.owner
    this.needsInput = card.needsInput
    this.receivedInput = false
    this.hasBeenActivated = false
    this.performActionFn = card.actionFn
  }

  tryToPerform() {
    if (this.needsInput && !this.hasBeenActivated) {
      console.log('needsInput, waiting on player', this.owner.name)
      EE.emit(`${this.owner.name}:request`, {action: this.name})
    } else {
      this.performActionFn()
    }
  }

  perform() {

  }
}

 module.exports = Action
