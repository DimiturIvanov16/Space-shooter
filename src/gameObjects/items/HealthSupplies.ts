import { config } from '../../game';
import { EnemySmallShip } from '../Enemies/EnemySmallShip';
import { Player } from '../Player/Player';
import { PlayerShip } from '../Player/PlayerShip';

export class HealthSupplies extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene) {
    super(scene, Phaser.Math.Between(0, config.width), 0, 'healthSupply');
    scene.physics.world.enable(this);
    this.setScale(0.03);
    this.setVelocityY(600);
    this.scene.tweens.add({
      targets: this,
      duration: 2000,
      angle: 360,
      repeat: 1,
    });
    if (this.y > config.height) {
      this.destroy();
    }
    scene.add.existing(this);
  }

  public healPlayer(healthSupply: HealthSupplies, playerShip: PlayerShip): void {
    healthSupply.destroy();
    playerShip.getPlayer().setLives(playerShip.getPlayer().getLives() + 1);
    playerShip.getPlayerLifesText().text = `Points: ${playerShip.getPlayer().getLives().toString()}`;
  }
}
