(function () {
  if (typeof UncleWorm === "undefined") {
    window.UncleWorm = {};
  }
  
  var Worm = UncleWorm.Worm = function (options) {
    this.length = 48;
    this.angle = 3 * Math.PI / 2;

    this.tail = [ new UncleWorm.Vector({ x: 0, y: 0 }) ];
  };

  Worm.prototype.move = function () {
    var next = this.tail[0].offset(this.angle);
    this.tail.unshift(next);

    if (this.length > this.tail.length) this.tail.pop();
  };
  
})();
