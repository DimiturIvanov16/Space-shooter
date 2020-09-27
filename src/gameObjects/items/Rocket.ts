import { EnemySmallShip } from "../Enemies/EnemySmallShip";

export class Rocket extends Phaser.Physics.Arcade.Sprite {
  private speed: number = 600;
  private damage: number = 10;

  constructor(scene: Phaser.Scene, x, y, texture: string) {
    super(scene, x, y, texture);
    scene.physics.world.enable(this);
    this.setScale(0.07);
    this.setVelocityY(-this.speed);
    scene.add.existing(this);
  }

  public getDamage(): number {
    return this.damage;
  }

  public setDamage(damage: number) {
    this.damage = damage;
  }

  public hitEnemy(rocket, enemy: EnemySmallShip): void {
    rocket.destroy();
    enemy.resetEnemy();

    console.log("hitEnemy");
  }
}
