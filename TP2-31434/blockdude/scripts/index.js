import { BootScene } from './scene/boot-scene.js';
import GameScene from './scene/game-scene.js';
import MenuScene from './scene/menu-scene.js';

const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 320,
    backgroundColor: '#4fbbff',
    transparent: false,
    parent: 'game',
    physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 600 },
          debug: false
        }
    },
    dom: {
        createContainer: true
    },
    scale: {
		mode : Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
    scene: [BootScene, MenuScene, GameScene]
};

const game = new Phaser.Game(config);

