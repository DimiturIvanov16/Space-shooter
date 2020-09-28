import { IEventTimestamped } from 'matter';
import { Time } from 'phaser';
import { config } from '../../game';
import { BulletBoss } from '../items/BossBullet';
import { PlayerShip } from '../Player/PlayerShip';
import { Enemy } from './Enemy';

export class Boss extends Phaser.Physics.Arcade.Sprite implements Enemy {
  private bullet1: BulletBoss;
  private bullet2: BulletBoss;
  private bullets: Phaser.Physics.Arcade.Group;
  private bulletTexture: string;
  private movement: Phaser.Tweens.Tween;
  private alive: boolean = true;
  private health: number = 1000;
  private playerShip: PlayerShip;
  private shootCollision: Phaser.Physics.Arcade.Collider;

  constructor(scene: Phaser.Scene, bulletTexture: string) {
    super(scene, 200, 200, 'boss');
    this.bulletTexture = bulletTexture;
    scene.physics.world.enable(this);
    this.setAngle(180);
    this.setScale(0.5);
    this.enableBody(true, 200, 200, false, false);
    this.shoot();
    this.scene.time.addEvent({
      delay: 42000,
      loop: true,
      callback: this.shoot,
      callbackScope: this,
    });

    this.movement = this.scene.tweens.add({
      targets: this,
      x: config.width - this.width / 4,
      duration: 3000,
      ease: 'Power0',
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

  public setPlayerShip(playerShip: PlayerShip): void {
    this.playerShip = playerShip;
  }

  public shoot(): void {
    this.attack1Timer();
    this.scene.time.delayedCall(6000, this.attack2Timer, [], this);
    this.scene.time.delayedCall(12000, this.attack3Timer, [], this);
    this.scene.time.delayedCall(15000, this.attack4Timer, [], this);
    this.scene.time.delayedCall(18000, this.attack2Timer, [], this);
    this.scene.time.delayedCall(24000, this.attack5Timer, [], this);
    this.scene.time.delayedCall(30000, this.attack2Timer, [], this);
    this.scene.time.delayedCall(36000, this.attack5Timer, [], this);
  }
  public attack1Timer() {
    this.scene.time.addEvent({
      delay: 1000,
      callback: this.attackV1,
      callbackScope: this,
      repeat: 6,
    });
  }
  public attack2Timer() {
    this.scene.time.addEvent({
      delay: 250,
      callback: this.attackV1,
      callbackScope: this,
      repeat: 24,
    });
  }

  public attack3Timer() {
    this.scene.time.addEvent({
      delay: 100,
      callback: this.attackV2,
      callbackScope: this,
      repeat: 30,
    });
  }

  public attack4Timer() {
    this.scene.time.addEvent({
      delay: 100,
      callback: this.attackV1,
      callbackScope: this,
      repeat: 30,
    });
  }

  public attack5Timer() {
    this.scene.time.addEvent({
      delay: 50,
      callback: this.attackV1,
      callbackScope: this,
      repeat: 120,
    });
  }

  public attackV1() {
    this.bullet1 = new BulletBoss(this.scene, this.x + 200, this, this.bulletTexture);
    this.bullet2 = new BulletBoss(this.scene, this.x - 200, this, this.bulletTexture);
    this.bullets = this.scene.physics.add.group();
    this.bullets.add(this.bullet1);
    this.bullets.add(this.bullet2);
    this.bullets.setVelocityY(600);

    this.scene.physics.add.overlap(this.playerShip, this.bullets, this.playerShip.hitPlayer, null, this.playerShip);
  }
  public attackV2() {
    this.bullet1 = new BulletBoss(this.scene, this.x, this, this.bulletTexture);
    this.bullets.setVelocityY(600);

    this.scene.physics.add.overlap(this.playerShip, this.bullet1, this.playerShip.hitPlayer, null, this.playerShip);
  }

  public setDefaultHeath(): number {
    return 1;
  }

  public resetEnemy(): void {
    this.setAlpha(0.5);
    this.movement.stop();
    this.alive = false;
    clearInterval();
  }
}
