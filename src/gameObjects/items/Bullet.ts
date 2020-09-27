export class Bullet extends Phaser.Physics.Arcade.Sprite {
  private speed: number = 600;
  private damage: number = 5;

  constructor(scene: Phaser.Scene, x, y, texture: string) {
    super(scene, x, y, texture);
    scene.physics.world.enable(this);
    this.setScale(0.05);
    this.setScale(0.1);
    this.setVelocityY(-this.speed);
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
