import { config } from "../game";
import { Boss } from "../gameObjects/Enemies/Boss";
import { EnemyBigShip } from "../gameObjects/Enemies/EnemyBigShip";
import { EnemySmallShip } from "../gameObjects/Enemies/EnemySmallShip";
import { HealthSupplies } from "../gameObjects/items/HealthSupplies";
import { Levels } from "../levelConfig/Levels";
import { PlayerShip } from "../gameObjects/Player/PlayerShip";

export class Level2Scene extends Phaser.Scene {
  private background: Phaser.GameObjects.TileSprite;
  private playerShip: PlayerShip;
  private enemy1: EnemySmallShip;
  private enemy2: EnemySmallShip;
  private enemy3: EnemySmallShip;
  private enemy4: EnemyBigShip;
  private level: Levels;
  private playerCollision: Phaser.Physics.Arcade.Collider;
  private enemies: Phaser.Physics.Arcade.Group;
  private scoreText;
  private cursorKeys;
  private speed: number;
  private playerLifesText: Phaser.GameObjects.Text;
  private healthSupply: HealthSupplies;
  private music;
  private pew;
  private backgroundMusicConfig;
  private pewConfig;
  private helpTimer;
  constructor() {
    super("Level2Scene");
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

    this.playerShip = new PlayerShip(
      this,
      "playerShip",
      1,
      this.enemies,
      this.background
    );
    this.enemy1 = new EnemySmallShip(this, "enemy1");
    this.enemy2 = new EnemySmallShip(this, "enemy2");
    this.enemy3 = new EnemySmallShip(this, "enemy3");
    this.enemy4 = new EnemyBigShip(this, "enemy4");
    this.enemy4.setPlayer(this.playerShip);
    this.enemy1.setScale(0.15);
    this.enemy2.setScale(0.1);
    this.enemy3.setScale(0.2);
    this.enemy4.setScale(0.2);

    this.enemies = this.physics.add.group();
    this.enemies.add(this.enemy1);
    this.enemies.add(this.enemy2);
    this.enemies.add(this.enemy3);
    this.enemies.add(this.enemy4);
    this.playerShip.setEnemies(this.enemies);
    this.level = new Levels(this.playerShip.getPlayer(), [
      this.enemy1,
      this.enemy2,
      this.enemy3,
    ]);

    this.level.defaultStats();

    this.helpTimer = this.time.addEvent({
      delay: 10000,
      loop: true,
      callback: this.trowLife,
      callbackScope: this,
    });
  }

  playerStats() {
    this.playerLifesText.text = this.playerShip
      .getPlayer()
      .getLives()
      .toString();
  }

  trowLife() {
    this.healthSupply = new HealthSupplies(this);
    this.physics.add.overlap(
      this.healthSupply,
      this.playerShip,
      this.healthSupply.healPlayer,
      null,
      this
    );
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
}
