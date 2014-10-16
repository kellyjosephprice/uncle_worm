describe("worm", function () {
  it("has a functioning constructor", function () {
    var worm = new UncleWorm.Worm({
      pos: new UncleWorm.Vector({ x: 40, y: 40 })
    });
    expect(worm).not.toBe(undefined);
  });

  describe("movement", function () {
    describe("eating it self", function() {
      it("should not be able to eat its tail", function () {
      });

      it("should not be able to cross diagonally", function () {
      });
    });
  });
});
