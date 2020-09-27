export interface Enemy {
  resetEnemy(): void;
  getHealth(): number;
  setHealth(health: number): void;
}
