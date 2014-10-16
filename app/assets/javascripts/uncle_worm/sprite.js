(function () {
  if (typeof UncleWorm === "undefined") {
    window.UncleWorm = {};
  }
  
  var Sprite = UncleWorm.Sprite = function () {
  };

  Sprite.prototype.bitmap = function () { };

  Sprite.prototype.pixels = function () { 
    if (this._pixels) return this._pixels;
    this._pixels = {};
    var sprite = this;

    _(this.bitmap()).each(function (row, y) {
      var bits = row.split('');
      _(bits).each(function (bit, x) {
        if (bit !== "1") return;

        var pixel = UncleWorm.Game.nearestPixel(
          sprite.pos.add({ x: x, y: y})
        );
        sprite._pixels[pixel.toString()] = pixel;
      });
    });

    return this._pixels;
  };

  Sprite.prototype.collidedWith = function (other) {
    var other_pixels = other.pixels();
    var collided = false;

    _(this.pixels()).each(function (pixel, digest) {
      if (other_pixels.hasOwnProperty(digest)) collided = true;
    });
    
    return collided;
  };
})();
