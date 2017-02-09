import Phaser from 'phaser'
import Background from '../sprites/Background.js'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init (score, typeGame) {
    this.score = score
    this.typeGame = typeGame
    this.localStorageName_type = 'LuduckMemory' + this.game.typeGame
    this.highScore = window.localStorage.getItem(this.localStorageName_type) == null ? 0 : window.localStorage.getItem(this.localStorageName_type)
    this.highScore = Math.max(this.score, this.highScore)
    window.localStorage.setItem(this.localStorageName_type, this.highScore)

    this.restartGame = this.restartGame.bind(this)
  }

  create () {
    this.game.background = new Background({
      game: this.game,
      x: -65,
      y: -30,
      asset: 'background'
    })

    var style = {
      fontSize: '35px',
      align: 'center'
    }
    var styleTitle = {
      fontSize: '150px',
      fill: '#333333',
      align: 'center'
    }

    let textScore = this.game.add.sprite(this.game.width / 2 - 250, this.game.height / 2, 'textPoints')
    textScore.width = 200
    textScore.height = 150

    let textHighScore = this.game.add.sprite(this.game.width / 2 + 250, this.game.height / 2, 'textPoints')
    textHighScore.width = 200
    textHighScore.height = 150
    // X2 or X3
    let typeGameButton = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'typeGameIcon')
    typeGameButton.width = 120
    typeGameButton.height = 120
    typeGameButton.frame = (this.typeGame - 2)


    var text = this.game.add.text(this.game.width / 2, 150, 'Game Over', styleTitle)
    text.anchor.set(0.5)
    text = this.game.add.text(this.game.width / 2 - 250, this.game.height / 2 + 17, 'Your score\n' + this.score, style)
    text.anchor.set(0.5)
    text.lineSpacing = 20
    text = this.game.add.text(this.game.width / 2 + 250, this.game.height / 2 + 17, 'Best score\n' + this.highScore, style)
    text.anchor.set(0.5)
    text.lineSpacing = 20
    this.game.time.events.add(Phaser.Timer.SECOND, this.buttonRestart, this)

    // let text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, `GAME OVER\n\nSCORE: ${this.score}\nBEST: ${this.highScore}\n\nTap to restart`, this.game.customStyle)
    centerGameObjects([textScore, textHighScore, typeGameButton])
  }
  buttonRestart () {
    var restart = this.game.add.button(this.game.width / 2, this.game.height / 2 + 200, 'restartIcon', this.restartGame)
    restart.anchor.set(0.5)
    restart.width = 200
    restart.height = 80
  }
  restartGame () {
    this.game.state.start('Start')
  }
}
