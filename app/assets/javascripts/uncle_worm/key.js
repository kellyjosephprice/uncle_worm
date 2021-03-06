(function () {
  if (window.UncleWorm === undefined) {
    window.UncleWorm = {};
  }

  // http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/
  UncleWorm.Key = {
    _pressed: {},

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    
    isDown: function(keyCode) {
      return this._pressed[keyCode];
    },
    
    onKeydown: function(event) {
      this._pressed[event.keyCode] = true;
    },
    
    onKeyup: function(event) {
      delete this._pressed[event.keyCode];
    }
  };
})();
