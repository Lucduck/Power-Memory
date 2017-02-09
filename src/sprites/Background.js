import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.game = game

    this.width = game.width + 115
    this.height = game.height + 50
    this.game.add.existing(this)
  }
}
