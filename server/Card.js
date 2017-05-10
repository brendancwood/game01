module.exports.CARDS = [
  {
    name: 'dash',
    user: null,
    priority: 1,
    reactive: false,
    perform: function(x, y) {
      console.log('performing action:', `${this.name} dash`)
    }
  },
  {
    name: 'hookshot',
    user: null,
    priority: 2,
    reactive: false,
    perform: function(x, y) {
      console.log('performing action:', `${this.name} hookshot`)
    }
  },
  {
    name: 'bomb',
    user: null,
    priority: 3,
    reactive: false,
    perform: function(x, y) {
      console.log('performing action:', `${this.name} bomb`)
    }
  },
  {
    name: 'sword',
    user: null,
    priority: 3,
    reactive: true,
    perform: function(x, y) {
      console.log('performing action:', `${this.name} sword`)
    }
  },
  {
    name: 'throwingstars',
    user: null,
    priority: 3,
    reactive: false,
    perform: function(x, y) {
      console.log('performing action:', `${this.name} throwingstars`)
    }
  },
  {
    name: 'vanish',
    user: null,
    priority: 4,
    reactive: true,
    perform: function(x, y) {
      console.log('performing action:', `${this.name} vanish`)
    }
  },
  {
    name: 'ninjaedit',
    user: null,
    priority: 4,
    reactive: true,
    perform: function(x, y) {
      console.log('performing action:', `${this.name} ninjaedit`)
    }
  },
  {
    name: 'reflect',
    user: null,
    priority: 4,
    reactive: true,
    perform: function(x, y) {
      console.log('performing action:', `${this.name} reflect`)
    }
  },
  {
    name: 'knightmove',
    user: null,
    priority: 5,
    reactive: false,
    perform: function(x, y) {
      console.log('performing action:', `${this.name} knightmove`)
    }
  },
  {
    name: 'move',
    user: null,
    priority: 5,
    reactive: false,
    perform: function(x, y) {
      console.log('performing action:', `${this.name} move`)
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

