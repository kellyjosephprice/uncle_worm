(function () {
  if (typeof Function.prototype.inherits === "undefined") {
    Function.prototype.inherits = function (superClass) {
      var Surrogate = function () {};

      Surrogate.prototype = superClass.prototype;
      this.prototype = new Surrogate();

      return this;
    };
  }
})();
