import Phaser from 'phaser'


const GROUND_KEY = 'ground'
const DUDE_KEY = 'dude'


export default class GameScene extends Phaser.Scene
{
  constructor()
  {
    super('game-scene')
    this.player = undefined;
  }

  preload()
  {
    // Preload images into later usable keys
    this.load.image('sky', 'assets/sky.png')
    this.load.image(GROUND_KEY, 'assets/platform.png')
    this.load.image('star', 'assets/star.png')
    this.load.image('bomb', 'assets/bomb.png')

    this.load.spritesheet(DUDE_KEY,
      'assets/dude.png',
      { frameWidth: 32, frameHeight: 48 }
    )
  }

  create()
  {
    // add an image to the bckgorund
    this.add.image(400, 300, 'sky')
    this.createPlatforms();
    this.createPlayer()
  }

  createPlatforms(){
    // you can group objects into groups with the same phisics
    const platforms = this.physics.add.staticGroup()

    // after creating it you set the scale to 2 thattts why you need to refresh the body
    platforms.create(400, 568, GROUND_KEY).setScale(2).refreshBody()

    platforms.create(600, 400, GROUND_KEY)
    platforms.create(50, 250, GROUND_KEY)
    platforms.create(750, 220, GROUND_KEY)
  }

  createPlayer(){
    // the physics add is a factory for sprite wih dinamic phsics
    this.player = this.physics.add.sprite(100, 450, DUDE_KEY)
    // bounce against the floor
    this.player.setBounce(0.2)
    // trapt it inside the scren
    this.player.setCollideWorldBounds(true)

    // animations that the player can use
    this.anims.create({
      key: 'left',
      // Frames goes from 0 to 3 in order 10 frames per second
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [ { key: DUDE_KEY, frame: 4 } ],
      frameRate: 20
    });
  // Frames goes from 5 to 8 in order 10 frames per second
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

  }
}
