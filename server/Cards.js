module.exports = [
  {
    name: 'dash',
    owner: null,
    priority: 1,
    reactive: false,
    needsInput: true,
    actionFn: function({x, y}) {
      console.log('performing actionFn', this.name)
      console.log(x, y)
      this.owner.x = x
      this.owner.y = y
    }
  },
  {
    name: 'hookshot',
    owner: null,
    priority: 2,
    reactive: false,
    needsInput: true,
    actionFn: function({x, y}) {
      console.log('performing actionFn', this.name)
      console.log(x, y)
      this.owner.x = x
      this.owner.y = y
    }
  },
  {
    name: 'bomb',
    owner: null,
    priority: 3,
    reactive: false,
    needsInput: true,
    actionFn: function({x, y}) {
      console.log('performing actionFn', this.name)
      console.log(x, y)
      this.owner.x = x
      this.owner.y = y
    }
  },
  {
    name: 'sword',
    owner: null,
    priority: 3,
    reactive: true,
    needsInput: false,
    actionFn: function({x, y}) {
      console.log('performing actionFn', this.name)
      console.log(x, y)
      this.owner.x = x
      this.owner.y = y
    }
  },
  {
    name: 'throwingstars',
    owner: null,
    priority: 3,
    reactive: false,
    needsInput: true,
    actionFn: function({x, y}) {
      console.log('performing actionFn', this.name)
      console.log(x, y)
      this.owner.x = x
      this.owner.y = y
    }
  },
  {
    name: 'vanish',
    owner: null,
    priority: 4,
    reactive: true,
    needsInput: false,
    actionFn: function() {
      console.log('performing actionFn', this.name)
    }
  },
  {
    name: 'ninjaedit',
    owner: null,
    priority: 4,
    reactive: true,
    needsInput: true,
    actionFn: function() {
      console.log('performing actionFn', this.name)
    }
  },
  {
    name: 'reflect',
    owner: null,
    priority: 4,
    reactive: true,
    needsInput: false,
    actionFn: function() {
      console.log('performing actionFn', this.name)
    }
  },
  {
    name: 'knightmove',
    owner: null,
    priority: 5,
    reactive: false,
    needsInput: true,
    actionFn: function({x, y}) {
      console.log('performing actionFn', this.name)
      console.log(x, y)
      this.owner.x = x
      this.owner.y = y
    }
  },
  {
    name: 'move',
    owner: null,
    priority: 5,
    reactive: false,
    needsInput: true,
    actionFn: function({x, y}) {
      console.log('performing actionFn', this.name)
      console.log(x, y)
      this.owner.x = x
      this.owner.y = y
    }
  }
]
