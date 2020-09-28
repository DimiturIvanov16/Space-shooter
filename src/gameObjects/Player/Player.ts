import { GameObject } from '../GameObject';

export class Player extends GameObject {
  private lives: number;
  private score: number = 0;
  private level: number;
  constructor(level: number) {
    super(0, 0);
    this.lives = 0;
    this.level = level;
  }

  public getLives(): number {
    return this.lives;
  }

  public getScore(): number {
    return this.score;
  }

  public getLevel(): number {
    return this.level;
  }

  public setLives(lives: number): void {
    this.lives = lives;
  }

  public setScore(score: number): void {
    this.score = score;
  }

  public setLevel(level: number): void {
    this.level = level;
  }
}
