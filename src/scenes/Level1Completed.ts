import { config } from "../game";

export class Level1Completed extends Phaser.Scene {
  private gameOverImage: Phaser.GameObjects.Image;
  private gameOverSound: Phaser.Sound.BaseSound;
  private gameOverSoundConfig;
  private LevelCompleted;
  private playBtn;
  private quitBtn;
  constructor() {
    super("Level1Completed");
  }
  create() {
    // this.gameOverSoundConfig = {
    //   mute: false,
    //   volume: 0.1,
    //   loop: false,
    // };
    // this.gameOverSound.play(this.gameOverSoundConfig);
    this.LevelCompleted = this.add.text(
      config.width / 2,
      200,
      "Level 1 Completed"
    );
    this.LevelCompleted.setFontSize(100);
    this.LevelCompleted.setOrigin(0.5);
    this.playBtn = this.add.text(config.width / 2, 600, "PLAY");
    this.playBtn.setInteractive();
    this.playBtn.setFontSize(200);
    this.playBtn.on("pointerdown", () => {
      this.scene.stop();
      this.scene.start("Level2Scene");
    });
    this.playBtn.on("pointerover", () => {
      this.playBtn.setColor("yellow");
    });
    this.playBtn.on("pointerout", () => {
      this.playBtn.setColor("white");
    });
    this.playBtn.setOrigin(0.5);

    this.quitBtn = this.add.text(config.width / 2, 800, "QUIT");
    this.quitBtn.setInteractive();
    this.quitBtn.setFontSize(200);
    this.quitBtn.on("pointerdown", () => {
      this.scene.start("MenuScene");
    });
    this.quitBtn.on("pointerover", () => {
      this.quitBtn.setColor("yellow");
    });
    this.quitBtn.on("pointerout", () => {
      this.quitBtn.setColor("white");
    });
    this.quitBtn.setOrigin(0.5);
  }
}
