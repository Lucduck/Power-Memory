import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import Background from '../sprites/Background.js'

export default class extends Phaser.State {
  init () {
    this.startGame = this.startGame.bind(this)
    this.playSound = true
    this.typeGame = 2
  }

  create () {
    this.game.background = new Background({
      game: this.game,
      x: -65,
      y: -30,
      asset: 'background'
    })
    let titleGame = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 200, 'title')
    titleGame.width = 1000
    titleGame.height = 167

    let start = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 20, 'startIcon', this.startGame)
    start.width = 400
    start.height = 160

    this.soundButton = this.game.add.button(this.game.world.centerX - 180, this.game.world.centerY + 250, 'soundIcons', this.soundGame, this)
    this.soundButton.width = 120
    this.soundButton.height = 120

    this.screenButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 250, 'screenIcon', this.screenGame, this)
    this.screenButton.width = 120
    this.screenButton.height = 120
    // X2 or X3
    this.typeGameButton = this.game.add.button(this.game.world.centerX + 180, this.game.world.centerY + 250, 'typeGameIcon', this.styleGame, this)
    this.typeGameButton.width = 120
    this.typeGameButton.height = 120
    centerGameObjects([titleGame, start, this.soundButton, this.screenButton, this.typeGameButton])
  }

  soundGame (target) {
    if (target.frame === 1) {
      this.playSound = true
      this.soundButton.frame = 0
    } else {
      this.playSound = false
      this.soundButton.frame = 1
    }
  }

  screenGame () {
    if (this.game.scale.isFullScreen) {
      this.game.scale.stopFullScreen()
      this.screenButton.frame = 0
    } else {
      this.game.scale.startFullScreen(false)
      this.screenButton.frame = 1
    }
  }

  styleGame (target) { // X2 or X3
    if (target.frame === 1) {
      this.typeGameButton.frame = 0
      this.typeGame = 2
    } else {
      this.typeGameButton.frame = 1
      this.typeGame = 3
    }
  }

  startGame () {
    this.game.state.start('Game', true, false, this.playSound, this.typeGame)
  }
}
