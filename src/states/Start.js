import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import Background from '../sprites/Background.js'

export default class extends Phaser.State {
  init () {
    this.startGame = this.startGame.bind(this)
    this.game.clicked = false
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
    ;(this.game.soundActivated) ? this.soundButton.frame = 0 : this.soundButton.frame = 1

    this.screenButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 250, 'screenIcon', this.screenGame, this)
    this.screenButton.width = 120
    this.screenButton.height = 120
    ;(this.game.scale.isFullScreen) ? this.screenButton.frame = 1 : this.screenButton.frame = 0

    // X2 or X3
    this.typeGameButton = this.game.add.button(this.game.world.centerX + 180, this.game.world.centerY + 250, 'typeGameIcon', this.styleGame, this)
    this.typeGameButton.width = 120
    this.typeGameButton.height = 120
    this.typeGameButton.frame = this.game.typeGame - 2
    centerGameObjects([titleGame, start, this.soundButton, this.screenButton, this.typeGameButton])
  }

  soundGame (target) {
    if (this.clicar()) {
      if (target.frame === 1) {
        this.game.soundActivated = true
        this.soundButton.frame = 0
      } else {
        this.game.soundActivated = false
        this.soundButton.frame = 1
      }
    }
  }

  screenGame () {
    if (this.clicar()) {
      if (this.game.scale.isFullScreen) {
        this.game.scale.stopFullScreen()
        this.screenButton.frame = 0
      } else {
        this.game.scale.startFullScreen(false)
        this.screenButton.frame = 1
      }
    }
  }

  styleGame (target) { // X2 or X3
    if (this.clicar()) {
      if (target.frame === 1) {
        this.typeGameButton.frame = 0
        this.game.typeGame = 2
      } else {
        this.typeGameButton.frame = 1
        this.game.typeGame = 3
      }
    }
  }

  startGame () {
    if (this.clicar) {
      this.game.state.start('Game', true, false)
    }
  }

  clicar () {
    if (!this.clicked) {
      this.clicked = true
      this.game.time.events.add(1, this.desclicar, this)
      return true
    }
    return false
  }
  desclicar () {
    this.clicked = false
  }
}
