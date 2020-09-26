import { Game } from "phaser";
import { Enemy } from "./Scene/Enemy";
import { EnemySmallShip } from "./Scene/EnemyShip";

export class Bullet extends Phaser.Physics.Arcade.Sprite {
  private speed: number;
  private damage: number = 5;
  private EnemySmallShip: EnemySmallShip;

  constructor(scene: Phaser.Scene, x, y, texture: string) {
    super(scene, x, y, texture);
    scene.physics.world.enable(this);
    this.setScale(0.05);
    this.setAngle(180);
    this.setScale(0.1);
    this.setVelocityY(-600);
    scene.add.existing(this);
  }

  public getDamage(): number {
    return this.damage;
  }

  public setDamage(damage: number) {
    this.damage = damage;
  }

  public resetEnemy() {
    this.setAlpha(0.5);
  }
}
