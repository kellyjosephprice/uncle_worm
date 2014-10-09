(function () {
  if (typeof UncleWorm === "undefined") {
    window.UncleWorm = {};
  }
  
  var GameView = UncleWorm.GameView = function (game, drawingContext) {
    this.game = game;
    this.context = drawingContext;
  };
  
  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    
    setInterval(function() {
      this.game.step();
      this.game.draw(this.context, this.background);
    }.bind(this), 1000 / UncleWorm.Game.FPS);
  };
  
  GameView.prototype.bindKeyHandlers = function () {
    key('a, left', function() {
    }.bind(this));
    key('d, right', function() {
    }.bind(this));
  };
})();
