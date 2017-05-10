// class Eventer {
//   constructor() {
//     this.listeners = {}
//   }

//   on(type, listener) {
//     if (Array.isArray(this.listeners[type])) {
//       this.listeners[type].push(listener)
//     }

//     else {
//       this.listeners[type] = [listener]
//     }
//   }

//   broadcast(type, payload) {
//     if (Array.isArray(this.listeners[type])) {
//       for (var i = 0; i < this.listeners[type].length; i++) {
//         this.listeners[type][i](payload)
//       }
//     } else {
//       console.log(`No listeners for ${type}!`)
//     }
//   }
// }

// let event = new Eventer()

// event.on('click', (data) => {
//   console.log(data.message)
//   data.execute()
// })

// event.broadcast('click', {message: 'GEORGE OF THE JUNGLE', execute: () => console.log('executing!')})

// event.broadcast('mouseright', {bar: 'baz'})

const EventEmitter = require('events')

module.exports = new EventEmitter()
