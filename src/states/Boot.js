import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#333333'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {

    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    })

    this.game.customStyle = {
      boundsAlignH: 'center',
      fontSize: '50px',
      align: 'center'
    }

    var tileSize = 500

    this.game.load.image('background', 'assets/sprites/background1.png')
    this.game.load.image('textPoints', 'assets/sprites/textPoints.png')
    this.game.load.image('restartIcon', 'assets/sprites/restartLight.png')
    this.game.load.image('startIcon', 'assets/sprites/startLight.png')
    this.game.load.image('title', 'assets/sprites/MemoryLight.png')
    this.game.load.image('textPoints', 'assets/sprites/textPoints.png')

    this.game.load.spritesheet('tiles', 'assets/sprites/tiles.png', tileSize, tileSize)
    this.game.load.spritesheet('soundIcons', 'assets/sprites/soundiconsLight.png', 200, 192)
    this.game.load.spritesheet('screenIcon', 'assets/sprites/screenLight.png', 200, 192)
    this.game.load.spritesheet('typeGameIcon', 'assets/sprites/typeGameButton.png', 200, 192)

    this.game.load.audio('select', ['assets/sounds/chipsCollide1.mp3', 'assets/sounds/chipsCollide2.ogg']) // CLICK
    this.game.load.audio('right', ['assets/sounds/chipsCollide2.mp3', 'assets/sounds/chipsCollide2.ogg']) // BIEN
    this.game.load.audio('wrong', ['assets/sounds/chipsCollide3.mp3', 'assets/sounds/chipsCollide3.ogg']) // MAL

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)
  /*
      this.load.image('loaderBg', './assets/images/loader-bg.png')
      this.load.image('loaderBar', './assets/images/loader-bar.png')*/
  }

  create () {
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT
    this.game.scale.pageAlignHorizontally = true
    this.game.scale.pageAlignVertically = true
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

    this.game.scale.forceOrientation(true, false)
    this.game.scale.enterIncorrectOrientation.add(this.handleIncorrect)
    this.game.scale.leaveIncorrectOrientation.add(this.handleCorrect)
  }

  render () {
    if (this.fontsReady) {
      this.state.start('Start')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }

  handleIncorrect () {
    document.getElementById('turn').style.display = 'block'
  }

  handleCorrect () {
    document.getElementById('turn').style.display = 'none'
  }
}
