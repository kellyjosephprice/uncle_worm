(function () {
  if (typeof UncleWorm === "undefined") {
    window.UncleWorm = {};
  }
  
  var Apple = UncleWorm.Apple = function (options) {
    UncleWorm.Sprite.call(this, options);

    this.size = Math.floor(Math.random() * 5 + 4);
    this.pos = options.randomPosition(this.size);
  };

  Apple.inherits(UncleWorm.Sprite);

  Apple.prototype.bitmap = function () {
    return Apple.BITMAPS[this.size];
  };

  Apple.BITMAPS = [
    // lame hack so size === offset
    [], [], [], [],
    [
      "0110",
      "1111",
      "1111",
      "0110"
    ],
    [
      "01110",
      "11111",
      "11111",
      "11111",
      "01110"
    ],
    [
      "011110",
      "111111",
      "111111",
      "111111",
      "111111",
      "011110"
    ],
    [
      "0011100",
      "0111110",
      "1111111",
      "1111111",
      "1111111",
      "0111110",
      "0011100"
    ],
    [
      "00111100",
      "01111110",
      "11111111",
      "11111111",
      "11111111",
      "11111111",
      "01111110",
      "00111100"
    ]
  ];
})();
