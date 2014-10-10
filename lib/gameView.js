(function () {
  if (typeof UncleWorm === "undefined") {
    window.UncleWorm = {};
  }
  
  var GameView = UncleWorm.GameView = function (game, drawingContext) {
    this.game = game;
    this.worm = game.worm;
    this.context = drawingContext;
  };
  
  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    
    setInterval(function() {
      this.game.step(this.handleKeys.bind(this));
      this.game.draw(this.context);
    }.bind(this), 1000 / UncleWorm.Game.FPS);
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
})();
