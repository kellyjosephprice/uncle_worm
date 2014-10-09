(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Vector = Asteroids.Vector = {};
  
  Vector.ZERO_VECTOR = { x: 0, y: 0 };
  
  Vector.addVectors = function () {
    return Array.prototype.reduce.call(arguments, function(prev, next) {
      return {
        x : prev.x + next.x,
        y : prev.y + next.y
      };
    });
  };

  Vector.direction = function(vector) {
    return Math.atan2(vector.y, vector.x);
  };

  Vector.roundToPixel = function(theta) {
    x = Math.cos(theta);
    y = Math.sin(theta);
  };
})();
