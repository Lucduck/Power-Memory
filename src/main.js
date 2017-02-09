import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import StartState from './states/Start'
import GameState from './states/Game'
import GameOverState from './states/GameOver'

class Game extends Phaser.Game {
  /*init () {
    fetch('http://localhost:3000/api/edgar/score/3')
  }*/
  //772 x 634
  constructor () {
    /*let gameRatio = window.innerWidth / window.innerHeight*/
    let width = 1280 // 2980
    let height = 720 // 2080
    /*let width = Math.ceil(1080 * gameRatio)
    let height = 1080*/

    super(width, height, Phaser.CANVAS, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Start', StartState, false)
    this.state.add('Game', GameState, false)
    this.state.add('GameOver', GameOverState, false)

    this.state.start('Boot')
  }
}

window.game = new Game()
