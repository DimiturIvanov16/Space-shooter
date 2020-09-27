import { config } from "../game";

export class Level3Completed extends Phaser.Scene {
  private gameOverImage: Phaser.GameObjects.Image;
  private gameOverSound: Phaser.Sound.BaseSound;
  private gameOverSoundConfig;
  private LevelCompleted;
  private playBtn;
  private goToMenu: Phaser.GameObjects.Text;
  constructor() {
    super("Level3Completed");
  }
  create() {
    // this.gameOverSoundConfig = {
    //   mute: false,
    //   volume: 0.1,
    //   loop: false,
    // };
    // this.gameOverSound.play(this.gameOverSoundConfig);
    this.LevelCompleted = this.add.text(config.width / 2, 200, "You won");
    this.LevelCompleted.setFontSize(100);
    this.LevelCompleted.setOrigin(0.5);

    this.goToMenu = this.add.text(config.width / 2, 800, "Go to menu");
    this.goToMenu.setInteractive();
    this.goToMenu.setFontSize(60);
    this.goToMenu.on("pointerdown", () => {
      this.scene.start("MenuScene");
    });
    this.goToMenu.on("pointerover", () => {
      this.goToMenu.setColor("yellow");
    });
    this.goToMenu.on("pointerout", () => {
      this.goToMenu.setColor("white");
    });
    this.goToMenu.setOrigin(0.5);
  }
}
