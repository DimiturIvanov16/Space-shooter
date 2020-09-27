import "phaser";
import { Boss } from "./gameObjects/Enemies/Boss";
import { EnemySmallShip } from "./gameObjects/Enemies/EnemySmallShip";
import { Levels } from "./levelConfig/Levels";
import { PlayerShip } from "./gameObjects/Player/PlayerShip";
import { Level1Scene } from "./scenes/Level1Scene";
import { Level2Scene } from "./scenes/Level2Scene";
import { Level3Scene } from "./scenes/Level3Scene";
import { Level1Completed } from "./scenes/Level1Completed";
import { Level2Completed } from "./scenes/Level2Completed";
import { MenuScene } from "./scenes/MenuScene";
import { GameOverScene } from "./scenes/GameOverScene";

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
    this.playerShip = new PlayerShip(
      this,
      "playerShip",
      0,
      this.enemies,
      this.background
    );

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

export const config = {
  type: Phaser.AUTO,
  backgroundColor: "black",
  width: 1200,
  height: 900,
  scene: [
    MenuScene,
    Level1Scene,
    Level2Scene,
    Level3Scene,
    Level1Completed,
    Level2Completed,
    GameOverScene,
  ],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
