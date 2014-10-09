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
      this.game.draw(this.context);
    }.bind(this), 1000 / UncleWorm.Game.FPS);
  };
  
  GameView.prototype.bindKeyHandlers = function () {
    key('w, up', function() {
    }.bind(this));
    key('s, down', function() {
    }.bind(this));
    key('a, left', function() {
    }.bind(this));
    key('d, right', function() {
    }.bind(this));
  };
})();
