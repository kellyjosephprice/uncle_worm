(function () {
  if (typeof UncleWorm === "undefined") {
    window.UncleWorm = {};
  }
  
  var Vector = UncleWorm.Vector = function (pos) {
    this.x = pos.x;
    this.y = pos.y;
  };
  
  Vector.prototype.add = function (other) {
    return new Vector({
      x : this.x + other.x,
      y : this.y + other.y
    });
  };

  Vector.prototype.subtract = function (other) {
    return new Vector({
      x : this.x - other.x,
      y : this.y - other.y
    });
  };

  Vector.prototype.direction = function() {
    return Math.atan2(vector.y, vector.x);
  };

  Vector.prototype.offset = function(theta) {
    return new Vector({
      x: Math.floor(this.x + Math.cos(theta)),
      y: Math.floor(this.y + Math.sin(theta))
    });
  };

  Vector.prototype.multiply = function(magnitude) {
    return new Vector({
      x: this.x * magnitude,
      y: this.y * magnitude
    });
  };

  Vector.prototype.floor = function () {
    return new Vector({
      x: Math.floor(this.x),
      y: Math.floor(this.y)
    });
  };
})();
