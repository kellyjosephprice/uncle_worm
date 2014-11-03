(function () {
  if (typeof UncleWorm === "undefined") {
    window.UncleWorm = {};
  }
  
  var GameView = UncleWorm.GameView = function (game, element) {
    this.game = game;
    this.worm = game.worm;
    this.pixel_ratio = 1;

    this.$el = $(element);
    this.canvas = this.createHiDPICanvas(480, 320, this.pixel_ratio);
    this.$el.append(this.canvas);

    this.context = this.canvas.getContext("2d");
    this.context.setTransform(this.pixel_ratio, 0, 0, this.pixel_ratio, 0, 0);
    this.context.imageSmoothingEnabled = false;

    console.log(this.canvas, this.context);
    
    this.bindKeyHandlers();
  };

  GameView.prototype.menu = function () {
  };
  
  GameView.prototype.start = function () {
    this.runningGame = setInterval(function() {
      this.game.step(this.handleKeys.bind(this));
      this.game.draw(this.context);

      if (this.game.completed) this.newLevel();
      if (this.game.lost) this.gameOver();
    }.bind(this), 1000 / UncleWorm.Game.FPS);
  };

  GameView.prototype.newLevel = function () {
    clearInterval(this.runningGame);

    var text = new UncleWorm.InvertedBigText({
      pos: new UncleWorm.Vector({ x: 0, y: 50 }),
      text: "Your Score: " + this.game.score
    });

    this.$el.append(text.$el);
    
    var gameView = this;
    $(document).one("keypress", function (event) {
      text.$el.remove();
      
      gameView.game.newLevel();
      gameView.start();
    });
  };

  GameView.prototype.gameOver = function () {
    clearInterval(this.runningGame);
  };
  
  GameView.prototype.bindKeyHandlers = function () {
    window.addEventListener('keyup', function (event) { 
      UncleWorm.Key.onKeyup(event); 
    }, false);
    window.addEventListener('keydown', function (event) { 
      UncleWorm.Key.onKeydown(event); 
    }, false);
  };

  GameView.prototype.handleKeys = function (callbacks) {
    if (UncleWorm.Key.isDown(UncleWorm.Key.UP)) callbacks.up();
    if (UncleWorm.Key.isDown(UncleWorm.Key.LEFT)) callbacks.left();
    if (UncleWorm.Key.isDown(UncleWorm.Key.DOWN)) callbacks.down();
    if (UncleWorm.Key.isDown(UncleWorm.Key.RIGHT)) callbacks.right();
  };

  // FIXME: fonts are still blurred
  // http://stackoverflow.com/a/15666143
  var PIXEL_RATIO = (function () {
    var ctx = document.createElement('canvas').getContext("2d");
    var dpr = window.devicePixelRatio || 1;
    var bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
  })();

  GameView.prototype.createHiDPICanvas = function(w, h, ratio) {
      var can = document.createElement("canvas");
      can.width = w * ratio;
      can.height = h * ratio;
      can.style.width = w + "px";
      can.style.height = h + "px";
      return can;
  };
})();
