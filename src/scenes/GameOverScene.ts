import { config } from "../game";

export class GameOverScene extends Phaser.Scene {
  private gameOverImage: Phaser.GameObjects.Image;
  private gameOverSound: Phaser.Sound.BaseSound;
  private gameOverSoundConfig;
  private restartBtn;
  private quitBtn;
  constructor() {
    super("GameOverScene");
  }
  create() {
    this.gameOverImage = this.add.image(0, 0, "gameover");
    this.gameOverImage.setScale(2.5);
    this.gameOverImage.setOrigin(0);
    this.gameOverSound = this.sound.add("gameOver");
    this.gameOverSoundConfig = {
      mute: false,
      volume: 0.1,
      loop: false,
    };
    this.gameOverSound.play(this.gameOverSoundConfig);

    this.restartBtn = this.add.text(config.width / 2, 600, "PLAY");
    this.restartBtn.setInteractive();
    this.restartBtn.setFontSize(200);
    this.restartBtn.on("pointerdown", () => {
      this.scene.start("Level1Scene");
    });
    this.restartBtn.on("pointerover", () => {
      this.restartBtn.setColor("yellow");
    });
    this.restartBtn.on("pointerout", () => {
      this.restartBtn.setColor("white");
    });
    this.restartBtn.setOrigin(0.5);

    this.quitBtn = this.add.text(config.width / 2, 800, "QUIT");
    this.quitBtn.setInteractive();
    this.quitBtn.setFontSize(200);
    this.quitBtn.on("pointerdown", () => {
      this.scene.start("bootGame");
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
