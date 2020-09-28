import { PlayerShip } from './PlayerShip';

export class PlayerControlls {
  private scene: Phaser.Scene;
  private cursorKeys;
  private playerShip: PlayerShip;
  private cKey: Phaser.Input.Keyboard.Key;
  private spaceBar: Phaser.Input.Keyboard.Key;
  private pressLeft: boolean = false;
  private pressRight: boolean = false;
  private pressUp: boolean = false;
  private pressDown: boolean = false;

  constructor(playerShip: PlayerShip, scene: Phaser.Scene) {
    this.playerShip = playerShip;
    this.scene = scene;
    this.cursorKeys = scene.input.keyboard.createCursorKeys();
  }

  public playerControlls(): void {
    this.spaceBar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.cKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    if (this.cursorKeys.left.isDown) {
      this.pressLeft = true;
      console.log('left');
    }
    if (this.cursorKeys.right.isDown) {
      this.pressRight = true;
    }
    if (this.cursorKeys.up.isDown) {
      this.pressUp = true;
    }
    if (this.cursorKeys.down.isDown) {
      this.pressDown = true;
    }
    if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
      this.playerShip.shootBullet();
    }

    if (Phaser.Input.Keyboard.JustDown(this.cKey)) {
      this.playerShip.shootRocket();
    }
    if (this.cursorKeys.left.isUp) {
      this.pressLeft = false;
      if (this.cursorKeys.right.isUp) {
        this.pressRight = false;
      }
      if (this.cursorKeys.up.isUp) {
        this.pressUp = false;
      }
      if (this.cursorKeys.down.isUp) {
        this.pressDown = false;
      }
    }
  }

  public playerMovment(): void {
    if (this.pressLeft) {
      this.playerShip.x -= this.playerShip.getPlayer().getSpeed();
    }
    if (this.pressRight) {
      this.playerShip.x += this.playerShip.getPlayer().getSpeed();
    }
    if (this.pressUp) {
      this.playerShip.y -= this.playerShip.getPlayer().getSpeed();
    }
    if (this.pressDown) {
      this.playerShip.y += this.playerShip.getPlayer().getSpeed();
    }
  }
}
