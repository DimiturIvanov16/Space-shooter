import "phaser";
import { Boss } from "./Scene/Boss";
import { EnemySmallShip } from "./Scene/EnemyShip";
import { Levels } from "./Scene/Levels";
import { PlayerShip } from "./Scene/PlayerShip";
import { Level1Scene } from "./Scene/Level1Scene";
import { Level2Scene } from "./Scene/Level2Scene";
import { LevelCompleted } from "./Scene/LevelCompleted";

class Scene1 extends Phaser.Scene {
  private explosion;
  private logo: Phaser.GameObjects.Image;
  private background: Phaser.GameObjects.TileSprite;
  private playBtn: Phaser.GameObjects.Text;
  constructor() {
    super("bootGame");
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

class Scene2 extends Phaser.Scene {
  private background: Phaser.GameObjects.TileSprite;
  private playerShip: PlayerShip;

  private bullet: Phaser.Physics.Arcade.Sprite;
  private enemy1: EnemySmallShip;
  private enemy2: EnemySmallShip;
  private enemy3: EnemySmallShip;
  private level: Levels;
  private playerCollision: Phaser.Physics.Arcade.Collider;
  private enemies: Phaser.Physics.Arcade.Group;
  private boss: Boss;
  private scoreText;
  private cursorKeys;
  private speed: number;
  private playerLifesText;
  private minEnemySpeed: number = 2;
  private maxEnemySpeed: number = 10;
  private gameOver: Phaser.GameObjects.Image;
  private life: Phaser.Physics.Arcade.Sprite;
  private playerRestarAnimation: Phaser.Tweens.Tween;

  private pressLeft: boolean = false;
  private pressRight: boolean = false;
  private pressUp: boolean = false;
  private pressDown: boolean = false;
  private spaceBar: Phaser.Input.Keyboard.Key;
  private enter: Phaser.Input.Keyboard.Key;
  private music;
  private pew;
  private backgroundMusicConfig;
  private pewConfig;
  private helpTimer;
  constructor() {
    super("playGame");
  }

  create() {
    this.music = this.sound.add("backgroundMusic");
    this.backgroundMusicConfig = {
      mute: false,
      volume: 0.5,
      loop: true,
    };
    // this.music.play(this.backgroundMusicConfig);

    // 4.1 make the background a tile sprite
    //this.background = this.add.image(0, 0, "background");
    this;
    this.background = this.add.tileSprite(
      0,
      0,
      config.width,
      config.height,
      "background"
    );
    this.background.setOrigin(0, 0);

    // this.playerShip = this.physics.add.sprite(
    //   config.width / 2,
    //   config.height - 150,
    //   "playerShip"
    // );

    this.speed = 10;

    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.enemy1 = new EnemySmallShip(this, "enemy1");
    this.enemy2 = new EnemySmallShip(this, "enemy2");
    this.enemy3 = new EnemySmallShip(this, "enemy3");
    this.enemy1.setScale(0.15);
    this.enemy2.setScale(0.1);
    this.enemy3.setScale(0.2);
    this.enemies = this.physics.add.group();
    this.enemies.add(this.enemy1);
    this.enemies.add(this.enemy2);
    this.enemies.add(this.enemy3);
    this.enemies.add(this.boss);
    this.playerShip = new PlayerShip(this, "playerShip", this.enemies);

    this.level = new Levels(
      this.playerShip.getPlayer(),
      [this.enemy1, this.enemy2, this.enemy3],
      this.boss
    );

    this.level.defaultStats();
    this.scoreText = this.add.text(
      20,
      20,
      "Points: " + this.playerShip.getPlayer().getScore()
    );
    this.playerLifesText = this.add.text(
      20,
      60,
      "Lifes: " + this.playerShip.getPlayer().getLives()
    );
    // this.enter = this.input.keyboard.addKey(
    //   Phaser.Input.Keyboard.KeyCodes.ENTER
    // );
    // this.helpTimer = setInterval(() => {
    //   this.trowLife();
    // }, 10000);
  }

  update() {
    this.background.tilePositionY -= 2;
    this.playerShip.playerControlls();
    this.playerShip.playerMovment();

    this.enemy1.enemyMove();
    this.enemy2.enemyMove();
    this.enemy3.enemyMove();
    this.level.setLevels();
  }

  // trowLife() {
  //   this.life = this.physics.add.sprite(
  //     Phaser.Math.Between(0, config.width),
  //     0,
  //     "life"
  //   );
  //   this.life.setScale(0.03);
  //   this.tweens.add({
  //     targets: this.life,
  //     duration: 2000,
  //     angle: 360,
  //     repeat: 1,
  //   });
  //   this.life.setVelocityY(600);
  //   this.physics.add.overlap(
  //     this.life,
  //     this.playerShip,
  //     this.healPlayer,
  //     null,
  //     this
  //   );
  //   if (this.life.y > config.height) {
  //     this.life.destroy();
  //   }
  // }

  // healPlayer(life) {
  //   life.destroy();
  //   this.playerShip
  //     .getPlayer()
  //     .setLives(this.playerShip.getPlayer().getLives() + 1);
  // }

  // 1.2 create the function to move the ship
}

class GameOver extends Phaser.Scene {
  private gameOverImage: Phaser.GameObjects.Image;
  private gameOverSound: Phaser.Sound.BaseSound;
  private gameOverSoundConfig;
  private restartBtn;
  private quitBtn;
  constructor() {
    super("gameOver");
  }
  create() {
    this.gameOverImage = this.add.image(0, 0, "gameover");
    this.gameOverImage.setScale(2.5);
    this.gameOverImage.setOrigin(0);
    this.gameOverSound = this.sound.add("gameOver");
    this.gameOverSoundConfig = {
      mute: false,
      volume: 0.1,
      loop: false,
    };
    this.gameOverSound.play(this.gameOverSoundConfig);

    this.restartBtn = this.add.text(config.width / 2, 600, "PLAY");
    this.restartBtn.setInteractive();
    this.restartBtn.setFontSize(200);
    this.restartBtn.on("pointerdown", () => {
      this.scene.start("Level1Scene");
    });
    this.restartBtn.on("pointerover", () => {
      this.restartBtn.setColor("yellow");
    });
    this.restartBtn.on("pointerout", () => {
      this.restartBtn.setColor("white");
    });
    this.restartBtn.setOrigin(0.5);

    this.quitBtn = this.add.text(config.width / 2, 800, "QUIT");
    this.quitBtn.setInteractive();
    this.quitBtn.setFontSize(200);
    this.quitBtn.on("pointerdown", () => {
      this.scene.start("bootGame");
    });
    this.quitBtn.on("pointerover", () => {
      this.quitBtn.setColor("yellow");
    });
    this.quitBtn.on("pointerout", () => {
      this.quitBtn.setColor("white");
    });
    this.quitBtn.setOrigin(0.5);
  }
}

export const config = {
  type: Phaser.AUTO,
  backgroundColor: "black",
  width: 1200,
  height: 900,
  scene: [Scene1, Level1Scene, Level2Scene, LevelCompleted, GameOver],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
