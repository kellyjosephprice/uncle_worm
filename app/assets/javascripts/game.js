(function () {
  if (typeof UncleWorm === "undefined") {
    window.UncleWorm = {};
  }

  var Game = UncleWorm.Game = function () { 
    this.worm = new UncleWorm.Worm({ 
      pos: Game.INITIAL_POS,
      pixelSize: Game.PIXEL_SIZE
    });
  };
  
  Game.DIM_X         = 960;
  Game.DIM_Y         = 640;
  Game.USABLE_X      = 950;
  Game.USABLE_Y      = 630;
  Game.PIXEL_SIZE    = 10;

  Game.BG_COLOR      = "#8b9976";
  Game.FG_COLOR      = "#3e4b2f";

  Game.FPS           = 20;

  Game.INITIAL_POS   = [24, 31];
  
  Game.prototype.draw = function (ctx, background) {
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.drawBorder(ctx);
    this.drawWorm(ctx);
  };

  Game.prototype.drawBorder = function (ctx) {
    ctx.beginPath();
    ctx.rect(
      Game.PIXEL_SIZE / 2, 
      Game.PIXEL_SIZE / 2, 
      Game.USABLE_X - Game.PIXEL_SIZE, 
      Game.USABLE_Y - Game.PIXEL_SIZE
    );
    ctx.lineWidth = Game.PIXEL_SIZE;
    ctx.strokeStyle = Game.FG_COLOR;
    ctx.stroke();
  }; 

  Game.prototype.drawWorm = function (ctx) {
    var game = this;

    this.worm.tail.forEach(function (pos) {
      var pixel = game.nearestPixel(pos);
      game.drawPixel(ctx, pixel);
    });
  };

  Game.prototype.nearestPixel = function (pos) {
    console.log(pos);
    return pos
      ._uw_add(Game.INITIAL_POS)
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
    var head = this.nearestPixel(this.worm.head());
    console.log(head);
  };
})();
