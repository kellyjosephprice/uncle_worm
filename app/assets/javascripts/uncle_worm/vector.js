(function () {
  if (window.UncleWorm === undefined) {
    window.UncleWorm = {};
  }

  var Vector = UncleWorm.Vector = function (pos) {
    this.x = pos.x;
    this.y = pos.y;
  };

  Vector.prototype.add = function (other) {
    return new Vector({
      x: this.x + other.x,
      y: this.y + other.y
    });
  };

  Vector.prototype.subtract = function (other) {
    return new Vector({
      x: this.x - other.x,
      y: this.y - other.y
    });
  };

  Vector.prototype.direction = function() {
    return Math.atan2(vector.y, vector.x);
  };

  Vector.prototype.offset = function(theta) {
    return new Vector({
      x: this.x + Math.cos(theta),
      y: this.y + Math.sin(theta)
    });
  };

  Vector.prototype.multiply = function(magnitude) {
    return new Vector({
      x: this.x * magnitude,
      y: this.y * magnitude
    });
  };

  Vector.prototype.divide= function(magnitude) {
    return new Vector({
      x: this.x / magnitude,
      y: this.y / magnitude
    });
  };

  Vector.prototype.floor = function () {
    return new Vector({
      x: Math.floor(this.x),
      y: Math.floor(this.y)
    });
  };

  Vector.prototype.toString = function () {
    return "{x:" + this.x + ",y:" + this.y + "}";
  };
})();
