import * as Phaser from "phaser";

export class MyGameScene extends Phaser.Scene {
  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private bombs: Phaser.Physics.Arcade.Group;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  private score: number;
  private scoreText: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "MyGame" });
  }

  /**
   * Anything that happens before the game is created
   */
  preload() {
    this.load.image("sky", "asset/sky.png");
    this.load.image("ground", "asset/platform.png");
    this.load.image("star", "asset/star.png");
    this.load.image("bomb", "asset/bomb.png");
    this.load.spritesheet("dude", "asset/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  /**
   * When game is created, what happens on screen
   */
  create() {
    // paint the sky
    this.add.image(400, 300, "sky");

    // setup the platforms to jump on
    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, "ground").setScale(2).refreshBody();
    platforms.create(600, 400, "ground");
    platforms.create(50, 250, "ground");
    platforms.create(750, 220, "ground");

    // setup player
    this.player = this.physics.add.sprite(100, 450, "dude");
    // when the player lands, it'll bounce a tiny bit
    this.player.setBounce(0.2);
    // make sure our player can interact with other things in this world
    this.player.setCollideWorldBounds(true);
    this.player.body.setGravityY(300);

    this.physics.add.collider(this.player, platforms);

    // define the left running animation
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    // define the right running animation
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    // setup controls
    this.cursors = this.input.keyboard.createCursorKeys();

    // add stars to collect
    const stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    stars.children.iterate((child: Phaser.Physics.Arcade.Sprite) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      return true;
    });
    // make sure stars can collide with platorms
    this.physics.add.collider(stars, platforms);

    // check when player and stars collide, run the anonymous fn
    this.physics.add.overlap(
      this.player,
      stars,
      (
        player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
        star: Phaser.Physics.Arcade.Sprite
      ) => {
        // basically hide the star when the playe touches it
        star.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText("Score: " + this.score);

        if (stars.countActive(true) === 0) {
          stars.children.iterate((child: Phaser.Physics.Arcade.Sprite) => {
            child.enableBody(true, child.x, 0, true, true);
            return true;
          });
          const x =
            player.x < 400
              ? Phaser.Math.Between(400, 800)
              : Phaser.Math.Between(0, 400);
          const bomb = this.bombs.create(x, 16, "bomb");
          bomb.setBounce(1);
          bomb.setCollideWorldBounds(true);
          bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
      },
      null,
      this
    );

    // create a score
    this.score = 0;
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      color: "#000",
    });

    // spawn bombs
    this.bombs = this.physics.add.group();
    this.physics.add.collider(this.bombs, platforms);
    this.physics.add.collider(
      this.player,
      this.bombs,
      (player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, bomb) => {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play("turn");
        this.scene.restart();
      },
      null,
      this
    );
  }

  /**
   * Happens on every tick on the game
   */
  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}
