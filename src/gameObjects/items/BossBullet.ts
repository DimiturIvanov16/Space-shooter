import { config } from '../../game';
import { Boss } from '../Enemies/Boss';

export class BulletBoss extends Phaser.Physics.Arcade.Sprite {
  private speed: number;
  private damage: number;
  private boss: Boss;

  constructor(scene: Phaser.Scene, x: number, boss: Boss, texture: string) {
    super(scene, x, boss.y + 200, texture);

    scene.physics.world.enable(this);
    this.setScale(0.05);
    this.tint = 0xcc0000;
    this.setTintFill();
    this.setScale(0.1);
    this.setVelocityY(600);

    if (this.y > config.height) {
      this.destroy();
      console.log('deadBullet');
    }

    scene.add.existing(this);
  }
}
