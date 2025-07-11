import { GameAnims } from "../anims/anims.js";
import { getCenterX, getCenterY, levels, option } from "../const/const.js";


export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {

    this.isGameOver = false;

    this.TILE_SIZE = 32;

    GameAnims(this.anims);
  
    this.carrying = null;
    this.createWorld();
    this.createControls();

    this.physics.add.collider(this.player, this.mapLayer);
    this.physics.add.collider(this.blocks, this.mapLayer);
    this.physics.add.collider(this.blocks, this.blocks);
    this.physics.add.collider(this.player, this.blocks);
    this.physics.add.overlap(this.player, this.exit, () => {


    if (this.isGameOver) return;

    this.isGameOver = true;

        this.player.setVelocity(0);
        this.player.play("IdleAnim", true);
        this.tweens.add({
          targets: this.player,
          alpha: 0,
          duration: 500
        })

      console.log("Player reached the exit!");
      this.add.text(getCenterX(this), getCenterY(this) - 100, "You Win!", { fontSize: "52px", color: "#0f0" }).setScrollFactor(0).setOrigin(0.5).setDepth(10);
      
      if(option.level > levels.length){
        this.add.text(getCenterX(this), getCenterY(this) , "Game Completed!", { fontSize: "32px", color: "#0f0" }).setScrollFactor(0).setOrigin(0.5).setDepth(10);
      }else{
        this.add.text(getCenterX(this), getCenterY(this) , "Next Level", { fontSize: "32px", color: "#0f0" }).setDepth(10).setScrollFactor(0).setOrigin(0.5).setInteractive({cursor: "pointer"}).on("pointerup", () => {
            option.level++;
            this.scene.start("GameScene");
            this.isGameOver = false;
        } );
      }


    });


  }

  createWorld() {

    let bg_1 = this.add.image(0, getCenterY(this), "bg").setOrigin(0, 0.5).setScale(1.6);
    let bg_2 = this.add.image(bg_1.x + bg_1.displayWidth, getCenterY(this), "bg").setOrigin(0, 0.5).setScale(1.6);

    this.mapLayer = this.add.group();
    this.blocks = this.physics.add.group();

    levels[option.level - 1].forEach((row, y) => {
      [...row].forEach((char, x) => {
        const px = x * this.TILE_SIZE;
        const py = y * this.TILE_SIZE;

        if (char === "#") {
          const ground = this.physics.add.staticSprite(px + 16, py + 16, "ground_0", 0);
          this.mapLayer.add(ground);
        }else if(char === "*"){
            const ground = this.physics.add.staticSprite(px + 16, py + 16, "ground_1", 0);
            this.mapLayer.add(ground);
        } else if (char === "B") {
          const block = this.physics.add.sprite(px + 16, py + 16, "block", 0).setDepth(2).setScale(2);
          block.setBounce(0.1);
          block.setCollideWorldBounds(true);
          // Make blocks heavier and more resistant to being pushed
          block.body.setMass(10); // Increase mass significantly
          block.setDrag(500); // Add drag to slow down movement
          this.blocks.add(block);
        } else if (char === "P") {
          this.player = this.physics.add.sprite(px + 16, py - 16, "Idle", 0).setScale(1.3, 1.4);
          this.player.body.setSize(this.player.width * 0.5, 20);
          this.player.body.setOffset(8, 10);
          this.player.setCollideWorldBounds(true);
          this.player.play("IdleAnim", true);
          // Make player lighter
          this.player.body.setMass(1);
        } else if (char === "E") {
          const exit = this.physics.add.staticSprite(px + 16, py + 16, "door", 0).setScale(1);
          exit.setSize(5, 32);
          this.exit = exit;
        }
      });
    });

    this.cameras.main.setBounds(0, 0, levels[option.level - 1][0].length * this.TILE_SIZE, levels[option.level - 1].length * this.TILE_SIZE);
    this.physics.world.setBounds(0, 0, levels[option.level - 1][0].length * this.TILE_SIZE, levels[option.level - 1].length * this.TILE_SIZE);
    this.cameras.main.startFollow(this.player);


    this.levelText = this.add.text(getCenterX(this), 15, `Level ${option.level}`, {
      fontSize: "24px",
      fontFamily: "Arial",
    }).setScrollFactor(0).setOrigin(0.5);

  }

  createControls() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on("keydown-SPACE", () => {
      if (this.carrying) {
        // Drop block
        this.carrying.body.enable = true;
        this.carrying.body.allowGravity = true;
        this.carrying.setImmovable(false);
        // Reset mass and drag when dropping
        this.carrying.body.setMass(10);
        this.carrying.setDrag(500);
        this.carrying = null;
      } else {
        this.blocks.getChildren().forEach(block => {
          const dx = Math.abs(this.player.x - block.x);
          const dy = this.player.y - block.y;

          const closeEnough = dx < 34 && dy > -10 && dy < 20;
          const notOnTop = !(this.player.y < block.y - 20);

          if (
            closeEnough &&
            notOnTop &&
            this.player.body.touching.down &&
            block.body.blocked.down
          ) {
            this.carrying = block;
            this.carrying.y = this.player.y;
            block.body.allowGravity = false;
            block.setImmovable(true);
            block.setVelocity(0, 0);
          }
        });
      }
    });
  }

  update() {

    if (this.isGameOver) return;

    this.player.setVelocityX(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-150);
      this.player.flipX = true; // Flip the player sprite to face left
      this.player.play("RunAnim", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(150);
      this.player.flipX = false; // Flip the player sprite to face left
      this.player.play("RunAnim", true);
    }else{
        this.player.play("IdleAnim", true);
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-250);
      console.log("Jumping");
    }

    // if (this.cursors.up.isDown) {
    //     this.player.setVelocityY(-250);
    //     console.log("Jumping");
    // }

    if (this.carrying) {
      this.carrying.x = this.player.x;
      this.carrying.y = this.player.y - 27;
      this.carrying.body.enable = false;
    //  this.carrying.setVelocity(0);
    }

    // Stop blocks from moving when they're not being carried
    this.blocks.getChildren().forEach(block => {
      if (block !== this.carrying && block.body.blocked.down) {
        // If block is on ground and not being carried, stop horizontal movement
        block.setVelocityX(0);
      }
    });

  }
}