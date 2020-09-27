import { Boss } from "../gameObjects/Enemies/Boss";
import { EnemyBigShip } from "../gameObjects/Enemies/EnemyBigShip";
import { EnemySmallShip } from "../gameObjects/Enemies/EnemySmallShip";
import { Player } from "../gameObjects/Player/Player";

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

  public level2(): void {
    this.player.setSpeed(15);
    for (let i = 0; i < this.enemySmallShips.length; i++) {
      this.enemySmallShips[i].setMinSpeed(4);
      this.enemySmallShips[i].setMaxSpeed(7);
    }
  }

  public level3(): void {
    this.player.setSpeed(25);
  }
  public setLevels(): void {
    if (this.player.getScore() > 1000) {
      this.level2();
    }
    if (this.player.getScore() > 2000) {
      this.level3();
    }
    if (this.player.getScore() > 2000) {
      this.level3();
    }
  }
}
