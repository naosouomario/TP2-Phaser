import { getCenterX, getCenterY } from "../const/const.js";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {

    this.add.image(getCenterX(this), getCenterY(this), "menu-bg");

    this.add.rectangle(getCenterX(this) - 25, 110, 270, 50, 0x000000, 0.01).setInteractive({cursor: "pointer"})
    .on("pointerup", ()=>{
        this.scene.start("GameScene");
    });

    this.add.rectangle(getCenterX(this) - 25, 170, 270, 50, 0x000000, 0.01).setInteractive({cursor: "pointer"})
    .on("pointerup", ()=>{
        this.help.visible = true;
    });


    this.addHelp();

  }

  addHelp(){
    this.help = this.add.container(getCenterX(this) - 10, getCenterY(this)).setVisible(false);

    let bg = this.add.image(0, 0, "help")

    let close = this.add.circle(145, -65, 15, 0x000000, 0.01).setInteractive({cursor: "pointer"})
    .on("pointerup", ()=>{
        this.help.visible = false;
    })

    this.help.add([bg, close])

  }

}