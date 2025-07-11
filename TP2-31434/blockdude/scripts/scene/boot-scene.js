export class BootScene extends Phaser.Scene {
  constructor() {
      super({ key: "BootScene" });
  }

  preload() {

    this.load.image("bg", "./assets/images/bg.png");
    this.load.image("ground_0", "./assets/images/ground_0.png");
    this.load.image("ground_1", "./assets/images/ground_1.png");
    this.load.image("block", "./assets/images/block.png");
    this.load.image("door", "./assets/images/door.png");
    this.load.image("help", "./assets/images/help.png");
    this.load.image("menu-bg", "./assets/images/menu-bg.png");



    this.load.spritesheet("Idle", "./assets/images/Idle.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("Run", "./assets/images/Run.png", {
      frameWidth: 32,
      frameHeight: 32
    });



    const loadingText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Loading...', {
      font: '50px Arial',
      fill: '#ffffff'
    }).setOrigin(0.5);

    this.load.on('progress', (value) => {
      loadingText.setText(`Loading... ${Math.round(value * 100)}%`);
    });

    this.load.on('complete', () => {
      loadingText.destroy();
    });

  }

  update() {
      this.scene.start("MenuScene");

    //  this.scene.start("GameScene");
  }
}
