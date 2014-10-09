(function () {
  if (typeof UncleWorm === "undefined") {
    window.UncleWorm = {};
  }
  
  var Game = UncleWorm.Game = function () { 
    this.worm = new UncleWorm.Worm();
  };
  
  Game.DIM_X         = 960;
  Game.DIM_Y         = 640;
  Game.USABLE_X      = 950;
  Game.USABLE_Y      = 630;
  Game.PIXEL_SIZE    = 10;

  Game.BG_COLOR      = "#8b9976";
  Game.FG_COLOR      = "#3e4b2f";

  Game.FPS           = 60;

  Game.INITIAL_POS   = [47, 63];
  
  Game.prototype.draw = function (context, background) {
    context.fillStyle = Game.BG_COLOR;
    context.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.drawBorder(context);
  };

  Game.prototype.drawBorder = function (context) {
    context.beginPath();
    context.rect(
      Game.PIXEL_SIZE / 2, 
      Game.PIXEL_SIZE / 2, 
      Game.USABLE_X - Game.PIXEL_SIZE, 
      Game.USABLE_Y - Game.PIXEL_SIZE
    );
    context.lineWidth = Game.PIXEL_SIZE;
    context.strokeStyle = Game.FG_COLOR;
    context.stroke();
  }; 

  Game.prototype.step = function () {

  };
})();
