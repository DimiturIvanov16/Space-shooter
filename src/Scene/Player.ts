import { GameObject } from "./GameObject";

export class Player extends GameObject {
  private lives: number;
  private score: number = 0;
  constructor() {
    super(0, 0);
    this.lives = 0;
  }

  public getLives(): number {
    return this.lives;
  }

  public getScore(): number {
    return this.score;
  }

  public setLives(lives: number): void {
    this.lives = lives;
  }

  public setScore(score: number): void {
    this.score = score;
  }

  public scoreUp(): void {
    this.setScore(this.getScore() + 100);
    console.log(this.getScore());
  }
}
