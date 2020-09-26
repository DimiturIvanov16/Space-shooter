import { IEventTimestamped } from "matter";
import { Time } from "phaser";
import { config } from "../game";
import { BulletBoss } from "./BossBullet";
import { PlayerShip } from "./PlayerShip";

export class Boss extends Phaser.Physics.Arcade.Sprite {
  private bullet1: BulletBoss;
  private bullet2: BulletBoss;
  private bullets: Phaser.Physics.Arcade.Group;
  private bulletTexture: string;
  private movement: Phaser.Tweens.Tween;
  private alive: boolean = false;
  private health: number = 50;
  private playerShip: PlayerShip;
  private attack1;
  private attack2;
  private shootCollision: Phaser.Physics.Arcade.Collider;

  constructor(scene, bulletTexture: string) {
    super(scene, 200, 200, "boss");
    this.bulletTexture = bulletTexture;
    scene.physics.world.enable(this);
    this.setAngle(180);
    this.setScale(0.5);
    this.enableBody(true, 200, 200, false, false);
    this.movement = scene.tweens.add({
      targets: this,
      x: config.width - this.width / 4,
      duration: 3000,
      ease: "Power0",
      yoyo: true,
      repeat: -1,
    });
    scene.add.existing(this);
  }

  public getHealth(): number {
    return this.health;
  }

  public getAliveStatus(): boolean {
    return this.alive;
  }

  public setHealth(health: number): void {
    this.health = health;
  }

  public setAliveStatus(alive: boolean): void {
    this.alive = alive;
  }

  public setPlayerShip(playerShip: PlayerShip) {
    this.playerShip = playerShip;
  }

  public shoot() {
    if ((this.alive = true)) {
      this.attack1 = setInterval(() => {
        this.bullet1 = new BulletBoss(
          this.scene,
          this.x + 200,
          this,
          this.bulletTexture
        );
        this.bullet2 = new BulletBoss(
          this.scene,
          this.x - 200,
          this,
          this.bulletTexture
        );
        this.bullets = this.scene.physics.add.group();
        this.bullets.add(this.bullet1);
        this.bullets.add(this.bullet2);
        this.bullets.setVelocityY(600);

        this.collision();
      }, 500);
      setTimeout(() => {
        clearInterval(this.attack1);
        this.attack2 = setInterval(() => {
          setTimeout(() => {
            this.bullet1 = new BulletBoss(
              this.scene,
              this.x + 200,
              this,
              this.bulletTexture
            );
            this.bullet2 = new BulletBoss(
              this.scene,
              this.x - 200,
              this,
              this.bulletTexture
            );
            this.bullets = this.scene.physics.add.group();
            this.bullets.add(this.bullet1);
            this.bullets.add(this.bullet2);
            this.bullets = this.scene.physics.add.group();
            this.bullets.add(this.bullet1);
            this.bullets.add(this.bullet2);
            this.bullets.setVelocityY(600);
            this.collision();
          }, 1000);
        }, 300);
      }, 6000);
    } else {
      clearInterval(this.attack2);
    }
  }

  //   public attacked() {
  //     this.scene.physics.add.overlap(this.p, this.);
  //   }

  public hurt() {
    this.health -= this.playerShip.getBulletDamage();
    if (this.health <= 0) {
      this.destroy();
    }
  }

  public resetEnemy() {
    this.setAlpha(0.5);
    this.movement.stop();
    this.alive = false;
    clearInterval();
  }
  public collision() {
    this.shootCollision = this.scene.physics.add.overlap(
      this.playerShip,
      this.bullets,
      null,
      this.playerShip.hitPlayer,
      this.playerShip
    );
  }
}
