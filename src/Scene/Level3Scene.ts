import { config } from "../game";
import { Boss } from "./Boss";
import { EnemySmallShip } from "./EnemyShip";
import { HealthSupplies } from "./HealthSupplies";
import { Levels } from "./Levels";
import { PlayerShip } from "./PlayerShip";

export class Level3Scene extends Phaser.Scene {
  private background: Phaser.GameObjects.TileSprite;
  private playerShip: PlayerShip;
  private boss: Boss;
  private level: Levels;
  private enemy1: EnemySmallShip;
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
    super("Level3Scene");
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

    this.boss = new Boss(this, "bullet");
    this.enemy1 = new EnemySmallShip(this, "enemy1");
    this.enemy1.setScale(0.15);
    this.enemies = this.physics.add.group();
    this.enemies.add(this.enemy1);
    this.playerShip = new PlayerShip(this, "playerShip", 2, this.enemies);

    this.enemies.add(this.boss);
    this.playerShip.setEnemies(this.enemies);
    this.boss.setPlayerShip(this.playerShip);
    this.boss.shoot();
    this.level = new Levels(this.playerShip.getPlayer(), [this.enemy1], null);

    this.level.defaultStats();

    this.helpTimer = setInterval(() => {
      this.trowLife();
    }, 10000);
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
    this.level.setLevels();
    this.enemy1.enemyMove();
  }
}
