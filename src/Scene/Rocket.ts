import { EnemySmallShip } from "./EnemyShip";

export class Rocket extends Phaser.Physics.Arcade.Sprite {
  private speed: number;
  private damage: number = 10;
  private EnemySmallShip: EnemySmallShip;

  constructor(scene: Phaser.Scene, x, y, texture: string) {
    super(scene, x, y, texture);
    scene.physics.world.enable(this);
    this.setScale(0.07);
    this.setVelocityY(-600);
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
