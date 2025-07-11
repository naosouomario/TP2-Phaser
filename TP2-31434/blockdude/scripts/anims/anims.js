export let GameAnims = (anims) =>{

    anims.create({
        key: 'IdleAnim',
        frames: anims.generateFrameNumbers('Idle', { start: 0, end: 10 }),
        frameRate: 15,
        repeat: -1
      });

      anims.create({
        key: 'RunAnim',
        frames: anims.generateFrameNumbers('Run', { start: 0, end: 11 }),
        frameRate: 25,
        repeat: -1
      });


}