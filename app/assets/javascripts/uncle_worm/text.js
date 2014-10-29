(function () {
  if (typeof UncleWorm === "undefined") {
    window.UncleWorm = {};
  }
  
  var Text = UncleWorm.Text = function (options) {
    this.text = options.text;
    this.pos = options.pos;

    this.$el = this.initDiv();
  };

  Text.prototype.initDiv = function () {
    var $el = $('<div>').addClass('ti83')
      .text(this.text)
      .css("position", "absolute")
      .css("top", options.y)
      .css("left", options.x);

    return $el;
  };
})();
