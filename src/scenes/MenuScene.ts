import { config } from '../game';

export class MenuScene extends Phaser.Scene {
  private explosion;
  private logo: Phaser.GameObjects.Image;
  private background: Phaser.GameObjects.TileSprite;
  private playBtn: Phaser.GameObjects.Text;
  constructor() {
    super('MenuScene');
  }

  preload() {
    this.load.spritesheet('explosion', 'assets/explosion.png', {
      frameWidth: 192,
      frameHeight: 192,
    });
    this.load.image('logo', 'assets/Sprites/logo.png');
    this.load.image('background', 'assets/Sprites/space.png');
    this.load.image('playerShip', 'assets/Sprites/playerShip.png');
    this.load.image('bullet', 'assets/Sprites/laserBullet.png');
    this.load.image('rocket', 'assets/Sprites/rocket.png');
    this.load.image('enemy1', 'assets/Sprites/enemy1.png');
    this.load.image('enemy2', 'assets/Sprites/enemy2.png');
    this.load.image('enemy3', 'assets/Sprites/enemy3.png');
    this.load.image('enemy4', 'assets/Sprites/enemy4.png');
    this.load.image('boss', 'assets/Sprites/boss.png');
    this.load.image('gameover', 'assets/Sprites/gameover.jpg');
    this.load.image('healthSupply', 'assets/Sprites/life.png');

    this.load.audio('backgroundMusic', ['assets/Audio/backgroundMusic.mp3', 'assets/Audio/backgroundMusic.ogg']);
    this.load.audio('rocketSound', ['assets/Audio/Rocket Sound.mp3', 'assets/Audio/Rocket Sound.ogg']);
    this.load.audio('explosionSound', ['assets/Audio/Explosion Sound.mp3', 'assets/Audio/Explosion Sound.ogg']);
    this.load.audio('pew', ['assets/Audio/pew.mp3', 'assets/Audio/pew.ogg']);
    this.load.audio('gameOver', ['assets/Audio/gameover.mp3', 'assets/Audio/gameover.ogg']);
  }

  create() {
    this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background');
    this.background.setOrigin(0, 0);

    this.logo = this.add.image(config.width / 2, 200, 'logo');
    this.playBtn = this.add.text(config.width / 2, 600, 'PLAY');
    this.playBtn.setInteractive();
    this.playBtn.setFontSize(200);
    this.playBtn.on('pointerdown', () => {
      this.scene.start('Level1Scene');
    });
    this.playBtn.on('pointerover', () => {
      this.playBtn.setColor('yellow');
    });
    this.playBtn.on('pointerout', () => {
      this.playBtn.setColor('white');
    });
    this.playBtn.setOrigin(0.5);

    this.explosion = this.add.sprite(0, 0, 'explosion');

    this.anims.create({
      key: 'explode',
      frameRate: 20,
      frames: this.anims.generateFrameNames('explosion', { start: 1, end: 7 }),
      repeat: 0,
    });

    this.explosion.play('explode');
  }

  update() {
    this.background.tilePositionY -= 2;
    this.startGame();
  }

  startGame() {
    if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER))) {
      this.scene.start('Level1Scene');
    }
  }
}
