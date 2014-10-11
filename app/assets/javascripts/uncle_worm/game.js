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

  Game.FG_COLOR      = "#2e3b1f";

  Game.FPS           = 30;

  Game.INITIAL_POS   = new UncleWorm.Vector({ x: 48, y: 62 });

  Game.nearestPixel = function (pos) {
    return pos.floor().multiply(Game.PIXEL_SIZE);
  };

  Game.prototype.init = function () {
    this.worm = new UncleWorm.Worm({ 
      pos: Game.INITIAL_POS,
    });
    this.newApple();
  };
  
  Game.prototype.newApple = function () {
    this.apple = new UncleWorm.Apple({
      randomPosition: this.randomApplePos.bind(this),
    });
    console.log("new apple: " + this.apple.pos);
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
  };

  Game.prototype.handleCollisions = function () {
    var head = this.worm.head();

    if (head.x <= Game.PIXEL_SIZE || head.x >= Game.USABLE_X || 
        head.y <= Game.PIXEL_SIZE || head.y >= Game.USABLE_Y) {
      this.gameOver();
    }
    
    if (this.apple.pixels().hasOwnProperty(head.toString())) {
      this.worm.grow(this.apple.size);
      this.newApple();
    }
  };

  Game.prototype.gameOver = function () {
    var step = this.step;
    var game = this;
    this.step = function () {};

    debugger;
    console.log("Game Over");

    setTimeout(function () {
      game.init();
      game.step = step;
    }, 500);
  };

  Game.prototype.randomApplePos = function (size) {
    var x_diff = Game.DIM_X - 6 - size;
    var y_diff = Game.DIM_Y - 6 - size;

    return new UncleWorm.Vector({
      x: Math.floor(Math.random() * x_diff + 3),
      y: Math.floor(Math.random() * y_diff + 3)
    });
  };
})();
