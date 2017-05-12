const EE = require('./eventemitter')
const Game = require('./Game')

const gameInstance = new Game(4)

EE.on('startTurn', () => {
  gameInstance.promptSelectActions()
})

EE.on('playerHasSelectedCards', ({selectedCards}) => {
  gameInstance.decrementWaitingOn(selectedCards)
})

EE.on('allPlayersReady', () => {
  // gameInstance.doTurn()
})

EE.on('GAMESTATE', (state) => {
  switch (state.CURRENT_STATE) {
    case 'CARD_SELECTION':
      for (let player of gameInstance.state.players) {
        player.promptSelectCards()
      }
      break;

    default:
      return
  }
})


const randomNum = (max) => Math.floor(Math.random() * max)

for (let player of gameInstance.state.players) {
  EE.on(`${player.name}:request`, ({action}) => {
    console.log('on request', action)
    let xy = {x: randomNum(4), y: randomNum(4)}
    EE.emit(`${player.name}:response`, xy)
  })

  EE.on(`${player.name}:response`, (data) => {
    console.log('on response', data)
    gameInstance.performActionAfterInput(data)
  })

}

gameInstance.main()
