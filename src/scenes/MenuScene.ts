import { config } from "../game";

export class MenuScene extends Phaser.Scene {
  private explosion;
  private logo: Phaser.GameObjects.Image;
  private background: Phaser.GameObjects.TileSprite;
  private playBtn: Phaser.GameObjects.Text;
  constructor() {
    super("MenuScene");
  }

  preload() {
    this.load.spritesheet("explosion", "assets/explosion.png", {
      frameWidth: 192,
      frameHeight: 192,
    });
    this.load.image("logo", "assets/logo.png");
    this.load.image("background", "assets/space.png");
    this.load.image("playerShip", "assets/playerShip.png");
    this.load.image("bullet", "assets/laserBullet.png");
    this.load.image("rocket", "assets/rocket.png");
    this.load.image("enemy1", "assets/enemy1.png");
    this.load.image("enemy2", "assets/enemy2.png");
    this.load.image("enemy3", "assets/enemy3.png");
    this.load.image("enemy4", "assets/enemy4.png");
    this.load.image("boss", "assets/boss.png");
    this.load.image("gameover", "assets/gameover.jpg");
    this.load.image("healthSupply", "assets/life.png");
    this.load.audio("backgroundMusic", [
      "assets/backgroundMusic.mp3",
      "assets/backgroundMusic.ogg",
    ]);
    this.load.audio("pew", ["assets/pew.mp3", "assets/pew.ogg"]);
    this.load.audio("gameOver", ["assets/gameover.mp3", "assets/gameover.ogg"]);
  }

  create() {
    this.background = this.add.tileSprite(
      0,
      0,
      config.width,
      config.height,
      "background"
    );
    this.background.setOrigin(0, 0);

    this.logo = this.add.image(config.width / 2, 200, "logo");
    this.playBtn = this.add.text(config.width / 2, 600, "PLAY");
    this.playBtn.setInteractive();
    this.playBtn.setFontSize(200);
    this.playBtn.on("pointerdown", () => {
      this.scene.start("Level1Scene");
    });
    this.playBtn.on("pointerover", () => {
      this.playBtn.setColor("yellow");
    });
    this.playBtn.on("pointerout", () => {
      this.playBtn.setColor("white");
    });
    this.playBtn.setOrigin(0.5);

    this.explosion = this.add.sprite(0, 0, "explosion");

    this.anims.create({
      key: "explode",
      frameRate: 20,
      frames: this.anims.generateFrameNames("explosion", { start: 1, end: 7 }),
      repeat: 0,
    });

    this.explosion.play("explode");
  }

  update() {
    this.background.tilePositionY -= 2;
    this.startGame();
  }

  startGame() {
    if (
      Phaser.Input.Keyboard.JustDown(
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
      )
    ) {
      this.scene.start("Level1Scene");
    }
  }
}
