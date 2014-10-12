(function () {
  if (typeof UncleWorm === "undefined") {
    window.UncleWorm = {};
  }
  
  var Worm = UncleWorm.Worm = function (options) {
    UncleWorm.Sprite.call(this, options);

    this.length = 24;
    this.angle = 3 * Math.PI / 2;
    this.nextAngle = this.angle;

    this.tail = [{
      real: options.pos,
      pixel: UncleWorm.Game.nearestPixel(options.pos),
    }];
  };

  Worm.inherits(UncleWorm.Sprite);

  // 32 angles === 2 * Math.PI / 32
  Worm.MOVE_INC = Math.PI / 16;

  Worm.prototype.pixels = function () {
    var _pixels = {};

    _(this.tail).each(function (segment) {
      _pixels[segment.digest] = segment.pixel;
    });

    return _pixels;
  };

  Worm.prototype.head = function () {
    return this.tail[0].pixel;
  };

  Worm.prototype.grow = function (amount) {
    this.length += amount * 6;
  }

  Worm.prototype.left = function () {
    this.nextAngle = this.angle - Worm.MOVE_INC;
  };

  Worm.prototype.right = function () {
    this.nextAngle = this.angle + Worm.MOVE_INC;
  };

  Worm.prototype.move = function () {
    this.angle = this.nextAngle;

    var next = this.tail[0].real.offset(this.angle);
    var pixel = UncleWorm.Game.nearestPixel(next);
    if (this.ateSelf(next)) return false;

    this.tail.unshift({
      real: next,
      pixel: pixel,
      digest: pixel.toString()
    });

    if (this.length < this.tail.length) this.tail.pop();

    return this.head();
  };

  Worm.prototype.ateSelf = function (next) {
    var digest = UncleWorm.Game.nearestPixel(next).toString();

    if (digest ===  this.tail[0].digest) return false;
    if (this.pixels().hasOwnProperty(digest)) return true;

    return this.crossedSelf(next);
  };

  Worm.prototype.crossedSelf = function (next) {
    var head = this.head();

    var x_diff = head.x - next.x;
    var y_diff = head.y - next.y;
    
    if (Math.abs(x_diff) === 1 && Math.abs(x_diff) === 1) {
      var corner_1 = new Vector({ x: head.x, y: next.y });
      var corner_2 = new Vector({ x: next.x, y: head.y });

      if (this.pixels().hasOwnProperty(corner_1.toString()) && 
          this.pixels().hasOwnProperty(corner_2.toString())) {
        return true;
      }
    }

    return false;
  };
})();
