import { config } from "../../game";
import { Boss } from "../Enemies/Boss";
import { Bullet } from "../items/Bullet";
import { Rocket } from "../items/Rocket";
import { Player } from "./Player";

export class PlayerShip extends Phaser.Physics.Arcade.Sprite {
  private player: Player;
  private cursorKeys;
  private level: number;
  private background;
  private bullets: Phaser.Physics.Arcade.Group;
  private bullet1: Bullet;
  private bullet2: Bullet;
  private rocket: Rocket;
  private rockets: Phaser.Physics.Arcade.Group;
  private explosion: Phaser.Physics.Arcade.Sprite;
  private cKey: Phaser.Input.Keyboard.Key;
  private spaceBar: Phaser.Input.Keyboard.Key;
  private enter: Phaser.Input.Keyboard.Key;
  private pressLeft: boolean = false;
  private pressRight: boolean = false;
  private pressUp: boolean = false;
  private pressDown: boolean = false;
  private enemies;
  private resetPlayer: Phaser.Tweens.Tween;
  private playerCollision: Phaser.Physics.Arcade.Collider;
  private bossCollision: Phaser.Physics.Arcade.Collider;
  private playerLifesText: Phaser.GameObjects.Text;
  private scoreText: Phaser.GameObjects.Text;
  private rocketReady: Phaser.GameObjects.Text;
  private levelCompleted: Phaser.GameObjects.Text;
  private pewSound: Phaser.Sound.BaseSound;
  private pewSoundConfig: {};
  private explosionSound: Phaser.Sound.BaseSound;
  private explosionSoundConfig: {};
  private rocketSound: Phaser.Sound.BaseSound;
  private rocketSoundConfig: {};
  private shootRockTimer: boolean = true;
  private shakeBackgroundTween: Phaser.Tweens.Tween;

  constructor(
    scene: Phaser.Scene,
    texture: string,
    level: number,
    enemies,
    background: Phaser.GameObjects.TileSprite
  ) {
    super(scene, config.width / 2, config.height - 150, texture);
    this.background = background;
    scene.physics.world.enable(this);
    this.setCollideWorldBounds(true);
    this.setScale(0.05);
    this.cursorKeys = scene.input.keyboard.createCursorKeys();
    this.level = level;
    this.player = new Player(this.level);
    this.scene.physics.add.overlap(this, enemies, this.hitPlayer, null, this);
    this.scoreText = this.scene.add.text(
      20,
      20,
      "Points: " + this.player.getScore()
    );
    this.playerLifesText = this.scene.add.text(
      20,
      60,
      "Lifes: " + this.player.getLives()
    );
    this.rocketReady = this.scene.add.text(
      20,
      100,
      "Rocket: " + this.getRocketStatus()
    );
    scene.add.existing(this);
    scene.add.existing(this.scoreText);
    scene.add.existing(this.rocketReady);
  }

  public getPlayer(): Player {
    return this.player;
  }

  public setEnemies(enemies: Phaser.Physics.Arcade.Group) {
    this.enemies = enemies;
  }

  public getPlayerLifesText() {
    return this.playerLifesText;
  }

  public getRocketStatus() {
    if (this.shootRockTimer == true) {
      return "Ready";
    } else {
      return "Reloading";
    }
  }

  public playerControlls(): void {
    this.spaceBar = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.cKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.C
    );
    this.enter = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
    if (this.cursorKeys.left.isDown) {
      this.pressLeft = true;
    }
    if (this.cursorKeys.right.isDown) {
      this.pressRight = true;
    }
    if (this.cursorKeys.up.isDown) {
      this.pressUp = true;
    }
    if (this.cursorKeys.down.isDown) {
      this.pressDown = true;
    }
    if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
      this.shootBullet();
    }

    if (Phaser.Input.Keyboard.JustDown(this.cKey)) {
      this.shootRocket();
    }
    if (this.cursorKeys.left.isUp) {
      this.pressLeft = false;
      if (this.cursorKeys.right.isUp) {
        this.pressRight = false;
      }
      if (this.cursorKeys.up.isUp) {
        this.pressUp = false;
      }
      if (this.cursorKeys.down.isUp) {
        this.pressDown = false;
      }
    }
  }

  public playerMovment(): void {
    this.spaceBar = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    if (this.pressLeft) {
      this.x -= this.player.getSpeed();
    }
    if (this.pressRight) {
      this.x += this.player.getSpeed();
    }
    if (this.pressUp) {
      this.y -= this.player.getSpeed();
    }
    if (this.pressDown) {
      this.y += this.player.getSpeed();
    }
  }
  shootRocket() {
    if (this.shootRockTimer) {
      this.rocket = new Rocket(this.scene, this.x, this.y - 50, "rocket");
      this.rocketSound = this.scene.sound.add("rocketSound");
      this.rocketSoundConfig = {
        mute: false,
        volume: 0.1,
        loop: false,
      };
      this.rocketSound.play(this.rocketSoundConfig);
      this.scene.physics.add.overlap(
        this.rocket,
        this.enemies,
        this.hitEnemy,
        null,
        this
      );

      this.scene.time.delayedCall(3000, this.canShoot, null, this);
    }
    this.shootRockTimer = false;
    this.rocketReady.text = "Rocket: " + this.getRocketStatus();
  }

  public canShoot() {
    this.shootRockTimer = true;
    this.rocketReady.text = "Rocket: " + this.getRocketStatus();
  }

  public shootBullet() {
    this.bullet1 = new Bullet(this.scene, this.x - 30, this.y - 50, "bullet");
    this.bullet2 = new Bullet(this.scene, this.x + 30, this.y - 50, "bullet");
    this.pewSound = this.scene.sound.add("pew");
    this.pewSoundConfig = {
      mute: false,
      volume: 0.1,
      loop: false,
    };

    this.pewSound.play(this.pewSoundConfig);
    this.bullets = this.scene.physics.add.group();
    this.bullets.add(this.bullet1);
    this.bullets.add(this.bullet2);
    this.bullets.setVelocityY(-600);
    this.scene.physics.add.overlap(
      this.bullets.getChildren(),
      this.enemies,
      this.hitEnemy,
      null,
      this
    );
  }
  public getBulletDamage(): number {
    return this.bullet1.getDamage();
  }

  public hitEnemy(bullet: Bullet, enemy) {
    this.shakeBackground();
    this.shakeBackgroundTween.paused = false;
    bullet.setVelocityY(0);
    bullet.y -= 60;
    bullet.setScale(0.5);
    bullet.play("explode");
    this.explosion = this.scene.physics.add.sprite(
      bullet.x,
      bullet.y,
      "explosion"
    );
    this.explosionSound = this.scene.sound.add("explosionSound");
    this.explosionSoundConfig = {
      mute: false,
      volume: 0.1,
      loop: false,
    };
    this.explosionSound.play(this.explosionSoundConfig);
    this.explosion.play("explode");
    bullet.disableBody(true, false);
    setTimeout(() => {
      bullet.destroy();
    }, 150);
    if (bullet.getDamage() < enemy.getHealth()) {
      enemy.setHealth(enemy.getHealth() - bullet.getDamage());
    }
    if (bullet.getDamage() >= enemy.getHealth()) {
      if (enemy instanceof Boss) {
        this.scene.scene.scene.scene.start("Level3Completed");
      } else {
        enemy.resetEnemy();
        enemy.setDefaultHeath();
        this.player.setScore(this.player.getScore() + 100);
        this.scoreText.text = `Points: ${this.player.getScore().toString()}`;
      }

      if (this.player.getScore() >= 1000) {
        this.levelCompleted = this.scene.add.text(
          config.width / 2,
          20,
          "LEVEL " + this.player.getLevel() + " COMPLETED"
        );
        this.scene.scene.stop();
        this.player.setLevel(this.player.getLevel() + 1);
        this.scene.scene.scene.scene.start(
          "Level" + this.player.getLevel() + "Completed"
        );
        this.player.setScore(0);
        console.log(this.player.getLevel());
        this.scene.add.existing(this);
      }
    }
  }

  public hitBoss(bullet: Bullet, boss: Boss) {
    this.shakeBackground();
    this.shakeBackgroundTween.paused = false;
    bullet.setVelocityY(0);
    bullet.y -= 60;
    bullet.setScale(0.5);
    bullet.play("explode");
    this.explosion = this.scene.physics.add.sprite(
      bullet.x,
      bullet.y,
      "explosion"
    );
    this.explosionSound = this.scene.sound.add("explosionSound");
    this.explosionSoundConfig = {
      mute: false,
      volume: 0.1,
      loop: false,
    };
    this.explosionSound.play(this.explosionSoundConfig);
    this.explosion.play("explode");
    bullet.disableBody(true, false);
    setTimeout(() => {
      bullet.destroy();
    }, 150);
    if (bullet.getDamage() < boss.getHealth()) {
      boss.setHealth(boss.getHealth() - bullet.getDamage());
    }
    if (bullet.getDamage() >= boss.getHealth()) {
      this.scene.scene.stop();
      this.player.setLevel(this.player.getLevel() + 1);
      this.scene.scene.scene.scene.start(
        "Level" + this.player.getLevel() + "Completed"
      );
      this.player.setScore(0);
      console.log(this.player.getLevel());
      this.scene.add.existing(this);
    }
  }

  public hitPlayer(player: PlayerShip) {
    player.getPlayer().setLives(player.getPlayer().getLives() - 1);
    this.playerLifesText.text = `Lives: ${this.player.getLives().toString()}`;

    this.resetPlayer = this.scene.add.tween({
      targets: this,
      alpha: { from: 0, to: 1 },
      duration: 500,
      ease: "Power0",
      yoyo: true,
      repeat: 4,
      paused: true,
    });
    this.resetPlayer.play();
    this.disableBody(true, false);
    this.spaceBar.enabled = false;
    this.cKey.enabled = false;
    setTimeout(() => {
      this.resetPlayer.stop();
      this.spaceBar.enabled = true;
      this.cKey.enabled = true;
      this.enableBody(true, this.x, this.y, false, true);
      this.setAlpha(1);
    }, 2000);

    // this.playerLifesText.setText(
    //   "Lifes: " + this..getPlayer().getLives()
    // );

    if (this.getPlayer().getLives() <= 0) {
      // clearInterval(this.helpTimer);
      // this.music.stop();
      this.active = false;
      this.scene.scene.restart();
      this.scene.scene.stop();
      this.scene.scene.scene.scene.start("GameOverScene");
    }
  }

  public shakeBackground() {
    this.shakeBackgroundTween = this.scene.tweens.add({
      targets: this.background,
      x: 10,
      duration: 100,
      repeat: 2,
      yoyo: true,
      paused: true,
    });
  }
}
