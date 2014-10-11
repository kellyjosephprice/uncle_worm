(function () {
  if (typeof UncleWorm === "undefined") {
    window.UncleWorm = {};
  }

  var Game = UncleWorm.Game = function () { 
    this.init();
  };
  
  Game.PIXEL_SIZE    = 5;
  Game.DIM_X         = 96;
  Game.DIM_Y         = 64;

  Game.FULL_X        = Game.DIM_X * Game.PIXEL_SIZE;
  Game.FULL_Y        = Game.DIM_Y * Game.PIXEL_SIZE;
  Game.USABLE_X      = Game.FULL_X - Game.PIXEL_SIZE;
  Game.USABLE_Y      = Game.FULL_Y - Game.PIXEL_SIZE;

  Game.BG_COLOR      = "#8b9976";
  Game.FG_COLOR      = "#2e3b1f";

  Game.FPS           = 30;

  Game.INITIAL_POS   = [48, 62];

  Game.prototype.init = function () {
    this.worm = new UncleWorm.Worm({ 
      pos: Game.INITIAL_POS,
      pixelSize: Game.PIXEL_SIZE
    });
    this.newApple();
  };
  
  Game.prototype.newApple = function () {
    this.apple = new UncleWorm.Apple();
    this.apple.pos = this.randomApplePos(this.apple.size);
  };

  Game.prototype.draw = function (ctx, background) {
    ctx.globalAlpha = 0;
    ctx.clearRect(0, 0, Game.FULL_X, Game.FULL_Y);
    ctx.globalAlpha = 1;

    this.drawBorder(ctx);
    this.worm.pixels = this.drawWorm(ctx);
    this.apple.pixels = this.drawApple(ctx);
  };

  Game.prototype.drawBorder = function (ctx) {
    ctx.beginPath();
    ctx.rect(
      Game.PIXEL_SIZE / 2, 
      Game.PIXEL_SIZE / 2, 
      Game.USABLE_X,
      Game.USABLE_Y
    );
    ctx.lineWidth = Game.PIXEL_SIZE;
    ctx.strokeStyle = Game.FG_COLOR;
    ctx.stroke();
  }; 

  Game.prototype.drawWorm = function (ctx) {
    var game = this;
    var pixels = {};

    this.worm.tail.forEach(function (pos) {
      var pixel = game.nearestPixel(pos);
      game.drawPixel(ctx, pixel);
      pixels[pixel._uw_stringify()] += 1;
    });

    return pixels;
  };

  Game.prototype.drawApple = function (ctx) {
    return this.drawBitmap(
      ctx, 
      UncleWorm.Apple.BITMAPS[this.apple.size], 
      this.apple.pos
    );
  };

  Game.prototype.drawBitmap = function (ctx, bitmap, pos) {
    var game = this;
    var pixels = {};

    _(bitmap).each(function (row, y) {
      var bits = row.split('');
      _(bits).each(function (bit, x) {
        if (bit !== "1") return;

        var pixel = pos._uw_add([x, y])._uw_multiply(Game.PIXEL_SIZE)
        game.drawPixel(ctx, pixel);
        pixels[pixel._uw_stringify()] = 1;
      });
    });

    return pixels;
  };

  Game.prototype.nearestPixel = function (pos) {
    return pos
      ._uw_floor()
      ._uw_multiply(Game.PIXEL_SIZE);
  };

  Game.prototype.drawPixel = function (ctx, pixel) {
    ctx.fillStyle = Game.FG_COLOR;
    ctx.fillRect(
      pixel[0], 
      pixel[1], 
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
    this.worm.move();
    
    this.handleCollisions();
  };

  Game.prototype.handleCollisions = function () {
    var head = this.nearestPixel(this.worm.head());
    var digest = head._uw_stringify();
    var game = this;

    if (head[0] <= Game.PIXEL_SIZE || head[0] >= Game.USABLE_X || 
        head[1] <= Game.PIXEL_SIZE || head[1] >= Game.USABLE_Y) {
      this.gameOver();
    }

    if (this.worm.pixels.hasOwnProperty(digest) && 
        this.worm.pixels[digest] > 1) {
      debugger;
      this.gameOver();
    }

    if (this.apple.pixels.hasOwnProperty(digest)) {
      this.worm.grow(this.apple.size);
      this.apple = new UncleWorm.Apple();
      this.apple.pos = this.randomApplePos(this.apple.size);
    }
  };

  Game.prototype.gameOver = function () {
    var step = this.step;
    var game = this;
    this.step = function () {};

    console.log("Game Over");

    setTimeout(function () {
      game.init();
      game.step = step;
    }, 3000);
  };

  Game.prototype.randomApplePos = function (size) {
    var x_diff = Game.DIM_X - 6 - size;
    var y_diff = Game.DIM_Y - 6 - size;

    return [
      Math.floor(Math.random() * x_diff + 3),
      Math.floor(Math.random() * y_diff + 3)
    ];
  };
})();
