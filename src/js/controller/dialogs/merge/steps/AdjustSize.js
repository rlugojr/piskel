(function () {
  var ns = $.namespace('pskl.controller.dialogs.merge.steps');

  ns.AdjustSize = function (piskelController, mergeController, container) {
    this.superclass.constructor.apply(this, arguments);
  };

  pskl.utils.inherit(ns.AdjustSize, ns.AbstractMergeStep);

  ns.AdjustSize.prototype.init = function () {
    this.superclass.init.call(this);
    var anchorContainer = this.container.querySelector('.merge-anchor-container');
    this.anchorWidget = new pskl.widgets.AnchorWidget(anchorContainer, this.onAnchorChange_.bind(this));
    this.anchorWidget.setOrigin('TOPLEFT');
  };

  ns.AdjustSize.prototype.destroy = function () {
    this.anchorWidget.destroy();
    this.superclass.destroy.call(this);
  };

  ns.AdjustSize.prototype.onShow = function () {
    var name = this.mergeData.mergeFile.name;
    this.container.querySelector('.mergefile-name').textContent = name;

    // TODO : Not really useful since the Step is not being removed/destroyed when
    // transitioning out...
    if (this.mergeData.origin) {
      this.anchorWidget.setOrigin(this.mergeData.origin);
    }
  };

  ns.AdjustSize.prototype.onAnchorChange_ = function (origin) {
    this.mergeData.origin = origin;
  };
})();
