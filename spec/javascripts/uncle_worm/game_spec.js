describe("game", function () {
  var game;

  beforeEach(function() {
    game = new UncleWorm.Game();
  });

  it("has a functioning constructor", function () {
    expect(game).not.toBe(undefined);
  });

  describe("apple generation", function () {
    it("should not create an apple on the worm", function () {
      var collided = false;

      game.worm.pixels = function () {
        if(this._pixels !== undefined) return this._pixels;

        this._pixels = {};
        for (var i = 20; i < 300; i += 10) {
          var vector = new UncleWorm.Vector({ x: i, y: i});
          this._pixels[vector.toString()] = vector;
        }

        return this._pixels;
      };

      for (var i = 0; i < 100; i++) {
        game.newApple();
        console.log(game.apple.pixels());
        if (game.apple.collidedWith(game.worm)) collided = true;
      };

      expect(collided).toBe(false);
    });

    it("should stop generating apples when the levels over", function () {
    });
  });

  describe("walls", function () {
    describe("shrinking", function () {
      it("should detect worm collisions", function () {
      });
    });
  });
});
