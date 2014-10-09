(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Worm = Asteroids.Worm = function (head) {
    this.head = head;
    this.length = 48;
    this.angle = 3 * Math.PI / 2;
  };

  Worm.prototype.move = function () {

  };
  
})();
