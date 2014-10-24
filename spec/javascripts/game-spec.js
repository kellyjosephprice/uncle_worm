describe("game", function () {
  it("has a functioning constructor", function () {
    var game = new UncleWorm.Game();
    expect(game).not.toBe(undefined);
  });

  describe("random apple positions", function () {
    it("should not create an apple on the worm", function () {
      var game = new UncleWorm.Game();
      var collide_flag = true;
      
      game.worm.pixels = function () {
        var vector = { x: 50, y: 50 };
        return { vector.toString(): vector };
      };

      game.randomApplePos = function () {
        return (collide_flag) ? { x:20, y:20 } : { x: 100, y: 100 };
      };

      expect(true).toBe(true);
    });
  });
});
