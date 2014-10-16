(function () {
  if (typeof UncleWorm === "undefined") {
    window.UncleWorm = {};
  }

  var Game = UncleWorm.Game = function () { 
    this.score = 0;
    this.level = 0;

    this.init();
  };
  
  Game.PIXEL_SIZE    = 5;
  Game.DIM_X         = 96;
  Game.DIM_Y         = 64;

  Game.FULL_X        = Game.DIM_X * Game.PIXEL_SIZE;
  Game.FULL_Y        = Game.DIM_Y * Game.PIXEL_SIZE;
  Game.USABLE_X      = Game.FULL_X - Game.PIXEL_SIZE;
  Game.USABLE_Y      = Game.FULL_Y - Game.PIXEL_SIZE;

  Game.FG_COLOR      = "#2e3b1f";

  Game.FPS           = 30;

  Game.INITIAL_POS   = new UncleWorm.Vector({ x: 48, y: 62 });
  Game.APPLES        = 10;

  Game.nearestPixel = function (pos) {
    return pos.floor().multiply(Game.PIXEL_SIZE);
  };

  Game.prototype.init = function (options) {
    this.level_offset = this.level * 8 * Game.PIXEL_SIZE;

    this.wall_x  = Game.PIXEL_SIZE / 2 + this.level_offset;
    this.wall_y  = Game.PIXEL_SIZE / 2;
    this.wall_x2 = Game.USABLE_X - 2 * this.level_offset;
    this.wall_y2 = Game.USABLE_Y;

    this.apple_count = Game.APPLES;
    this.door        = false;

    this.worm = new UncleWorm.Worm({ 
      pos: Game.INITIAL_POS,
    });

    this.newApple();
  };
  
  Game.prototype.newApple = function () {
    this.apple = new UncleWorm.Apple({
      randomPosition: this.randomApplePos.bind(this),
    });

    while (this.apple.collidedWith(this.worm)) {
      this.apple = new UncleWorm.Apple({
        randomPosition: this.randomApplePos.bind(this),
      });
    }

    this.apple_count -= 1;
  };

  Game.prototype.draw = function (ctx, background) {
    ctx.globalAlpha = 0;
    ctx.clearRect(0, 0, Game.FULL_X, Game.FULL_Y);
    ctx.globalAlpha = 1;

    this.drawBorder(ctx);
    this.drawSprites(ctx, this.worm, this.apple);
  };

  Game.prototype.drawBorder = function (ctx) {
    ctx.beginPath();
    ctx.rect(this.wall_x, this.wall_y, this.wall_x2, this.wall_y2);
    ctx.lineWidth = Game.PIXEL_SIZE;
    ctx.strokeStyle = Game.FG_COLOR;
    ctx.stroke();

    if (this.door) {
      ctx.globalAlpha = 0;
      ctx.clearRect(44 * Game.PIXEL_SIZE, 0, 8 * Game.PIXEL_SIZE, Game.PIXEL_SIZE);
      ctx.globalAlpha = 1;
    }
  }; 

  Game.prototype.drawSprites = function (ctx) {
    var sprites = Array.prototype.slice.call(arguments, 1);
    var game = this;

    _(sprites).each(function (sprite) {
      _(sprite.pixels()).each(game.drawPixel.bind(game, ctx));
    });
  };

  Game.prototype.drawPixel = function (ctx, pixel) {
    ctx.fillStyle = Game.FG_COLOR;
    ctx.fillRect(
      pixel.x, 
      pixel.y, 
      Game.PIXEL_SIZE,
      Game.PIXEL_SIZE
    );
  };

  Game.prototype.step = function (handleKeys) {
    handleKeys({
      up: function () {},
      right: this.worm.right.bind(this.worm),
      down: function () {},
      left:  this.worm.left.bind(this.worm)
    });
    if (!this.worm.move()) this.gameOver();
    
    this.handleCollisions();
    this.handleApple();

    if (this.apple_count === 0) this.openDoor();
  };

  Game.prototype.handleCollisions = function () {
    var head = this.worm.head();

    if (this.door && head.y <= Game.PIXEL_SIZE && 
        head.x >= 44 * Game.PIXEL_SIZE && head.x <= 51 * Game.PIXEL_SIZE) {
      this.newLevel();
      return;
    };

    if (head.x <= Game.PIXEL_SIZE + this.level_offset || 
        head.x >= Game.USABLE_X + this.level_offset || 
        head.y <= Game.PIXEL_SIZE || head.y >= Game.USABLE_Y) {
      this.gameOver();
    }
  };

  Game.prototype.handleApple = function () {
    var head = this.worm.head();

    if (this.apple.pixels().hasOwnProperty(head.toString())) {
      this.worm.grow(this.apple.size);
      this.newApple();
    }
  };

  Game.prototype.openDoor = function () {
    this.door = true;
  };

  Game.prototype.newLevel = function () {
    var step = this.step;
    var game = this;
    this.step = function () {};

    console.log("New Level");

    setTimeout(function () {
      game.level += 1;
      game.init();
      game.step = step;
    }, 500);
  };

  Game.prototype.gameOver = function () {
    var step = this.step;
    var game = this;
    this.step = function () {};

    console.log("Game Over");

    setTimeout(function () {
      game.level = 0;
      game.init();
      game.step = step;
    }, 500);
  };

  Game.prototype.randomApplePos = function (size) {
    var x_diff = this.wall_x2 / Game.PIXEL_SIZE - 6 - size;
    var y_diff = Game.DIM_Y - 6 - size;

    return new UncleWorm.Vector({
      x: Math.floor(Math.random() * x_diff + 3 + this.wall_x / Game.PIXEL_SIZE),
      y: Math.floor(Math.random() * y_diff + 3)
    });
  };
})();
