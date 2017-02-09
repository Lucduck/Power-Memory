import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import Background from '../sprites/Background.js'
import Tiles from '../sprites/Tiles.js'

export default class extends Phaser.State {
  init (soundActivated, typeGame) {
    this.soundActivated = soundActivated
    this.typeGame = typeGame
    this.decreaseTime = this.decreaseTime.bind(this)
    this.scored = this.scored.bind(this)
    this.plusTime = this.plusTime.bind(this)
  }

  create () {
    this.game.score = 0
    this.game.timeLeft = 1

    this.game.background = new Background({
      game: this.game,
      x: -65,
      y: -30,
      asset: 'background'
    })

    this.game.tiles = new Tiles({
      game: this.game,
      x: 0,
      y: 0,
      asset: 'tiles',
      scored: this.scored,
      plusTime: this.plusTime,
      soundActivated: this.soundActivated,
      typeGame: this.typeGame
    })

    this.game.scoreText = this.game.add.text(110, 92, `SCORE\n ${this.game.score}`, this.game.customStyle)
    this.game.scoreText.lineSpacing = 7

    this.game.timeText = this.game.add.text(this.game.width - 110, 92, `TIME\n ${this.game.timeLeft}`, this.game.customStyle)
    this.game.timeText.lineSpacing = 7

    centerGameObjects([this.game.scoreText, this.game.timeText])

    this.game.time.events.loop(Phaser.Timer.SECOND, this.decreaseTime)
  }

  scored () {
    this.game.score++
    this.game.scoreText.text = `SCORE\n ${this.game.score}`
  }

  plusTime () {
    this.game.timeLeft += 2
    this.game.timeText.text = `TIME\n ${this.game.timeLeft}`
  }

  decreaseTime () {
    this.game.timeLeft--
    this.game.timeText.text = `TIME\n ${this.game.timeLeft}`
    if (this.game.timeLeft === 0) {
      this.game.state.start('GameOver', true, false, this.game.score, this.typeGame)
    }
  }
}
