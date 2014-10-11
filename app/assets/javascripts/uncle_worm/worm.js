(function () {
  if (typeof UncleWorm === "undefined") {
    window.UncleWorm = {};
  }
  
  var Worm = UncleWorm.Worm = function (options) {
    this.length = 24;
    this.angle = 3 * Math.PI / 2;
    this.nextAngle = 3 * Math.PI / 2;

    this.tail = [ options.pos ];
    this.pixels = {};
  };

  // 32 angles === 2 * Math.PI / 32
  Worm.MOVE_INC = Math.PI / 16;

  Worm.prototype.head = function () {
    return this.tail[0];
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

    var next = this.tail[0]._uw_offset(this.angle);
    this.tail.unshift(next);

    if (this.length < this.tail.length) this.tail.pop();
  };
  
})();
