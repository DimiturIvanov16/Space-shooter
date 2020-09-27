import { Bullet } from "../Bullet";
import { config } from "../game";
import { GameObject } from "./GameObject";
import { PlayerShip } from "./PlayerShip";

export class EnemyBigShip extends Phaser.Physics.Arcade.Sprite {
  private speed: number;
  private health: number = 30;
  private bullet: Bullet;
  private playerShip: PlayerShip;
  constructor(scene, texture: string) {
    super(scene, 100, 0, texture);
    this.speed = 0;
    scene.physics.world.enable(this);
    this.setAngle(180);
    this.scene.time.addEvent({
      delay: 1000,
      loop: true,
      callback: this.shoot,
      callbackScope: this,
    });
    scene.tweens.add({
      targets: this,
      x: config.width - this.width / 4,
      duration: 3000,
      ease: "Power0",
      yoyo: true,
      repeat: -1,
    });
    scene.time.addEvent({
      delay: 1000,
      loop: true,
      callback: this.shoot,
      callbackScope: this,
    });
    scene.add.existing(this);
  }

  public getHealth(): number {
    return this.health;
  }

  public setHealth(health): void {
    this.health = health;
  }
  public setSpeed(speed: number): void {
    this.speed = speed;
  }

  public setPlayer(playerShip: PlayerShip): void {
    this.playerShip = playerShip;
  }

  public setDefaultHeath(): void {
    this.health = 30;
  }
  enemyMove() {
    if (this.y > config.height) {
      this.resetEnemy();
    }
  }

  public shoot() {
    this.bullet = new Bullet(this.scene, this.x, this.y + 100, "bullet");
    this.bullet.setVelocityY(400);
    this.scene.physics.add.overlap(
      this.playerShip,
      this.bullet,
      this.playerShip.hitPlayer,
      null,
      this.playerShip
    );
    if (this.bullet.y > config.height) {
      this.bullet.destroy();
    }
  }

  resetEnemy() {
    this.y = 100;
  }
}
