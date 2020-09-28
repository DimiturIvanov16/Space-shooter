import { Boss } from '../gameObjects/Enemies/Boss';
import { EnemyBigShip } from '../gameObjects/Enemies/EnemyBigShip';
import { EnemySmallShip } from '../gameObjects/Enemies/EnemySmallShip';
import { Player } from '../gameObjects/Player/Player';

export class Levels {
  private player: Player;
  private enemySmallShips: EnemySmallShip[];
  private enemyBigShip: EnemyBigShip;
  private boss?: Boss;

  constructor(player: Player, enemySmallShips?: EnemySmallShip[], boss?: Boss) {
    this.player = player;
    this.enemySmallShips = enemySmallShips;
    this.boss = boss;
  }

  public defaultStats(): void {
    this.player.setLives(5);
    this.player.setScore(0);
    this.player.setSpeed(15);
  }

  public level1(): void {
    this.player.setSpeed(15);
    for (let i = 0; i < this.enemySmallShips.length; i++) {
      this.enemySmallShips[i].setMinSpeed(2);
      this.enemySmallShips[i].setMaxSpeed(5);
    }
    if (this.player.getScore() > 1000) {
      for (let i = 0; i < this.enemySmallShips.length; i++) {
        this.enemySmallShips[i].setMinSpeed(5);
        this.enemySmallShips[i].setMaxSpeed(7);
      }
    }
    if (this.player.getScore() > 2000) {
      for (let i = 0; i < this.enemySmallShips.length; i++) {
        this.enemySmallShips[i].setMinSpeed(7);
        this.enemySmallShips[i].setMaxSpeed(9);
      }
    }
  }

  public level2(): void {
    for (let i = 0; i < this.enemySmallShips.length; i++) {
      this.enemySmallShips[i].setMinSpeed(7);
      this.enemySmallShips[i].setMaxSpeed(9);
    }
    if (this.player.getScore() > 1000) {
      for (let i = 0; i < this.enemySmallShips.length; i++) {
        this.enemySmallShips[i].setMinSpeed(8);
        this.enemySmallShips[i].setMaxSpeed(10);
      }
    }
    if (this.player.getScore() > 2000) {
      for (let i = 0; i < this.enemySmallShips.length; i++) {
        this.enemySmallShips[i].setMinSpeed(10);
        this.enemySmallShips[i].setMaxSpeed(12);
      }
    }
  }
}
