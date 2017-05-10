const EE = require('./eventemitter')

module.exports.CARDS = [
  {
    name: 'dash',
    owner: null,
    priority: 1,
    reactive: false,
    perform: function(data) {
      console.log('performing action:', `${data.x} ${data.y} dash`)
      EE.emit('nextActionSequence')
    }
  },
  {
    name: 'hookshot',
    owner: null,
    priority: 2,
    reactive: false,
    perform: function(data) {
      console.log('performing action:', `${data.x}-${data.y} hookshot`)
      EE.emit('nextActionSequence')
    }
  },
  {
    name: 'bomb',
    owner: null,
    priority: 3,
    reactive: false,
    perform: function(data) {
      console.log('performing action:', `${data.x}-${data.y} bomb`)
      EE.emit('nextActionSequence')
    }
  },
  {
    name: 'sword',
    owner: null,
    priority: 3,
    reactive: true,
    perform: function(data) {
      console.log('performing action:', `${data.x}-${data.y} sword`)
      EE.emit('nextActionSequence')
    }
  },
  {
    name: 'throwingstars',
    owner: null,
    priority: 3,
    reactive: false,
    perform: function(data) {
      console.log('performing action:', `${data.x}-${data.y} throwingstars`)
      EE.emit('nextActionSequence')
    }
  },
  {
    name: 'vanish',
    owner: null,
    priority: 4,
    reactive: true,
    perform: function(data) {
      console.log('performing action:', `${data.x}-${data.y} vanish`)
      EE.emit('nextActionSequence')
    }
  },
  {
    name: 'ninjaedit',
    owner: null,
    priority: 4,
    reactive: true,
    perform: function(data) {
      console.log('performing action:', `${data.x}-${data.y} ninjaedit`)
      EE.emit('nextActionSequence')
    }
  },
  {
    name: 'reflect',
    owner: null,
    priority: 4,
    reactive: true,
    perform: function(data) {
      console.log('performing action:', `${data.x}-${data.y} reflect`)
      EE.emit('nextActionSequence')
    }
  },
  {
    name: 'knightmove',
    owner: null,
    priority: 5,
    reactive: false,
    perform: function(data) {
      console.log('performing action:', `${data.x}-${data.y} knightmove`)
      EE.emit('nextActionSequence')
    }
  },
  {
    name: 'move',
    owner: null,
    priority: 5,
    reactive: false,
    perform: function(data) {
      console.log('performing action:', `${data.x}-${data.y} move`)
      EE.emit('nextActionSequence')
    }
  }
]

module.exports.Card = class {
  constructor(name) {
    const card = CARDS[name]
    this.name = card.name
    this.priority = card.priority
    this.reactive = card.reactive
  }
}

