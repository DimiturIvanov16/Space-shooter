import { config } from "../../game";
import { GameObject } from "../GameObject";
import { Enemy } from "./Enemy";

export class EnemySmallShip
  extends Phaser.Physics.Arcade.Sprite
  implements Enemy {
  private minSpeed: number;
  private maxSpeed: number;
  private health: number = 15;

  constructor(scene, texture: string) {
    super(scene, Phaser.Math.Between(0, config.width), 0, texture);

    this.minSpeed = 0;
    this.maxSpeed = 0;
    scene.physics.world.enable(this);
    this.setAngle(180);
    scene.add.existing(this);
  }

  public getHealth(): number {
    return this.health;
  }

  public setHealth(health): void {
    this.health = health;
  }

  public setDefaultHeath(): void {
    this.health = 15;
  }

  public setMinSpeed(minSpeed: number): void {
    this.minSpeed = minSpeed;
  }

  public setMaxSpeed(maxSpeed: number): void {
    this.maxSpeed = maxSpeed;
  }

  public enemyMove(): void {
    this.y += Phaser.Math.Between(this.minSpeed, this.maxSpeed);
    if (this.y > config.height) {
      this.resetEnemy();
    }
  }

  public resetEnemy(): void {
    this.y = 0;
    let randomX = Phaser.Math.Between(0, config.width);
    this.x = randomX;
  }
}
