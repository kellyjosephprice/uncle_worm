(function () {
  if (typeof UncleWorm === "undefined") {
    window.UncleWorm = {};
  }
  
  var Sprite = UncleWorm.Sprite = function (options) {
    this.pos = options.pos;
  };

  Sprite.prototype.bitmap = function () { };
  Sprite.prototype.pixels = function () { };
})();
