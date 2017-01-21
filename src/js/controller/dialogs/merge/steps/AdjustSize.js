(function () {
  var ns = $.namespace('pskl.controller.dialogs.merge.steps');

  ns.AdjustSize = function (piskelController, mergeController, container) {
    this.superclass.constructor.apply(this, arguments);
  };

  pskl.utils.inherit(ns.AdjustSize, ns.AbstractMergeStep);

  ns.AdjustSize.prototype.init = function () {
    this.superclass.init.call(this);
    var anchorContainer = this.container.querySelector('.merge-anchor-container');
    this.anchorWidget = new pskl.widgets.AnchorWidget(anchorContainer);
  };

  ns.AdjustSize.prototype.onShow = function () {
    this.container.querySelector('.mergefile-name').textContent =
      this.mergeData.mergeFile.name;
  };
})();
