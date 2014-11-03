(function () {
  if (typeof UncleWorm === "undefined") {
    window.UncleWorm = {};
  }
  
  var InvertedBigText = UncleWorm.InvertedBigText = function (options) {
    this.text = options.text;
    this.pos = options.pos;

    this.bg = options.bg || "#2e3b1f";
    this.color = options.color || "rgba(0, 0, 0, 1)";
    this.font = options.font || "40px TI-83 Plus Regular";
    this.height = options.height || "40px";
    this.width = options.width || "480px";

    this.$el = $('<div>')
      .addClass('ti83-font')
      .text(this.text)
      .css("font", this.font)/
      .css("color", this.color)
      .css("background", this.bg)
      .css("height", this.height)
      .css("width", this.width)
      .css("position", "absolute")
      .css("top", this.pos.y + 198)
      .css("left", this.pos.x + 150);
  };
})();
