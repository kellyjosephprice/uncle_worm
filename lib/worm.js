(function () {
  if (typeof UncleWorm === "undefined") {
    window.UncleWorm = {};
  }
  
  var Worm = UncleWorm.Worm = function (options) {
    this.length = 48;
    this.angle = 3 * Math.PI / 2;
    this.nextAngle = 3 * Math.PI / 2;

    this.tail = [ new UncleWorm.Vector({ x: 0, y: 0 }) ];
  };

  Worm.MOVE_INC = 3 * Math.PI / 64;

  Worm.prototype.head = function () {
    return this.tail[0];
  };

  Worm.prototype.left = function () {
    this.nextAngle = this.angle - Worm.MOVE_INC;
  };

  Worm.prototype.right = function () {
    this.nextAngle = this.angle + Worm.MOVE_INC;
  };

  Worm.prototype.move = function () {
    this.angle = this.nextAngle;

    var next = this.tail[0].offset(this.angle);
    this.tail.unshift(next);

    if (this.length < this.tail.length) this.tail.pop();
  };
  
})();
