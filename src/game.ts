import "phaser";
import { GameOverScene } from "./scenes/GameOverScene";
import { Level1Completed } from "./scenes/Level1Completed";
import { Level1Scene } from "./scenes/Level1Scene";
import { Level2Completed } from "./scenes/Level2Completed";
import { Level3Completed } from "./scenes/Level3Completed";
import { Level2Scene } from "./scenes/Level2Scene";
import { Level3Scene } from "./scenes/Level3Scene";
import { MenuScene } from "./scenes/MenuScene";

export const config = {
  type: Phaser.AUTO,
  backgroundColor: "black",
  width: 1200,
  height: 900,
  scene: [
    MenuScene,
    Level1Scene,
    Level2Scene,
    Level3Scene,
    Level1Completed,
    Level2Completed,
    Level3Completed,
    GameOverScene,
  ],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
