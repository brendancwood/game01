const EE = require('./eventemitter')
const Game = require('./Game')

gameInstance = new Game(4)

EE.on('startTurn', () => {
  gameInstance.promptSelectActions()
})

EE.on('playerHasSelectedCards', (data) => {
  gameInstance.decrementWaitingOn()
})

EE.on('allPlayersReady', () => {
  // gameInstance.doTurn()
})

gameInstance.main()
