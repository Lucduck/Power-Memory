import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({game, x, y, asset, scored, plusTime}) {
    super(game, x, y, asset)

    this.placeTiles = this.placeTiles.bind(this)
    this.calculateSpace = this.calculateSpace.bind(this)
    this.showTile = this.showTile.bind(this)
    this.checkTiles = this.checkTiles.bind(this)
    this.playSound = this.playSound.bind(this)

    this.game = game
    this.scored = scored
    this.plusTime = plusTime

    this.tileSize = 160
    if (this.game.typeGame === 2) { // X3
      this.numRows = 4
      this.numCols = 5
    } else {
      this.numRows = 3
      this.numCols = 7
    }
    this.checked = true
    this.tileSpacing = 10
    this.tilesArray = []
    this.selectedArray = []

    this.sounds = {
      select: this.game.add.audio('select'),
      right: this.game.add.audio('right'),
      wrong: this.game.add.audio('wrong')
    }

    this.placeTiles()
  }

  placeTiles () {
    let leftSpace = this.calculateSpace(this.game.width, this.numCols)
    let topSpace = this.calculateSpace(this.game.height, this.numRows)
    let tileSpace = this.tileSize + this.tileSpacing
    this.tilesLeft = this.numRows * this.numCols

    if (this.game.typeGame === 3) { // X3
      topSpace += 80
    }

    for (let i = 0; i < this.numRows * this.numCols; i++) {
      this.tilesArray.push(Math.floor(i / this.game.typeGame)) // X3
    }

    for (let i = 0; i < this.numRows * this.numCols; i++) {
      let from = this.game.rnd.between(0, this.tilesArray.length - 1)
      let to = this.game.rnd.between(0, this.tilesArray.length - 1)
      let temp = this.tilesArray[from]

      this.tilesArray[from] = this.tilesArray[to]
      this.tilesArray[to] = temp
    }

    for (let i = 0; i < this.numCols; i++) {
      for (let j = 0; j < this.numRows; j++) {
        let tile = this.game.add.button(leftSpace + i * tileSpace, topSpace + j * tileSpace, 'tiles', this.showTile)
        tile.value = this.tilesArray[j * this.numCols + i]
        tile.frame = 10
        tile.width = this.tileSize
        tile.height = this.tileSize
      }
    }
  }

  calculateSpace (allowedSpace, numberTiles) {
    return (allowedSpace - (numberTiles * this.tileSize) - ((numberTiles - 1) * this.tileSpacing)) / 2
  }

  showTile (target) {
    if (this.selectedArray.length < this.game.typeGame && this.selectedArray.indexOf(target) === -1) { // X3
      this.playSound(this.sounds.select)
      target.frame = target.value
      this.selectedArray.push(target)
      if (this.selectedArray.length === this.game.typeGame && this.checked === true) { // X3
        this.checked = false
        this.game.time.events.add(500, this.checkTiles, this)
      }
    }
  }

  checkTiles () {
    var conditionCheck
    if (this.game.typeGame === 2) { // X3
      conditionCheck = this.selectedArray[0].value === this.selectedArray[1].value
    } else {
      conditionCheck = this.selectedArray[0].value === this.selectedArray[1].value && this.selectedArray[1].value === this.selectedArray[2].value
    }
    if (conditionCheck) {
      if (this.selectedArray[0].value === this.selectedArray[1].value) {
        this.playSound(this.sounds.right)
        this.scored()
        this.plusTime()
        for (var i = 0; i < this.game.typeGame; i++) { // X3
          this.selectedArray[i].destroy()
        }
        this.tilesLeft -= this.game.typeGame // X3
        if (this.tilesLeft === 0) {
          this.tilesArray.length = 0
          this.selectedArray.length = 0
          this.placeTiles()
        }
      }
    } else {
      this.playSound(this.sounds.wrong)
      for (i = 0; i < this.game.typeGame; i++) { // X3
        this.selectedArray[i].frame = 10
      }
    }
    this.selectedArray.length = 0
    this.checked = true
  }

  playSound (sound) {
    if (this.game.soundActivated) {
      sound.play()
    }
  }
}
