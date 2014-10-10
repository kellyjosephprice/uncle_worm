(function () {
  Array.prototype._uw_add = function (other) {
    return [
      this[0] + other[0],
      this[1] + other[1]
    ];
  };

  Array.prototype._uw_subtract = function (other) {
    return [
      this[0] - other[0],
      this[1] - other[1]
    ];
  };

  Array.prototype._uw_direction = function() {
    return Math.atan2(vector[1], vector[0]);
  };

  Array.prototype._uw_offset = function(theta) {
    return [
      this[0] + Math.cos(theta),
      this[1] + Math.sin(theta)
    ];
  };

  Array.prototype._uw_multiply = function(magnitude) {
    return [
      this[0] * magnitude,
      this[1] * magnitude
    ];
  };

  Array.prototype._uw_divide= function(magnitude) {
    return [
      this[0] / magnitude,
      this[1] / magnitude
    ];
  };

  Array.prototype._uw_floor = function () {
    return [
      Math.floor(this[0]),
      Math.floor(this[1])
    ];
  };
})();
