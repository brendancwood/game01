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


randomNum = (max) => Math.floor(Math.random() * max)

for (var i = 0; i < gameInstance.players.length; i++) {
  EE.on(`${gameInstance.players[i].name}:needActionInput`, ({player, action}) => {
    console.log('on received', player.name, action.name)
    let xy = {x: randomNum(4), y: randomNum(4)}
    EE.emit(`${action.owner.name}:actionInputDone`, xy)
  })
}

gameInstance.main()
