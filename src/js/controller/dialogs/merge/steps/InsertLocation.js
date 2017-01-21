(function () {
  var ns = $.namespace('pskl.controller.dialogs.merge.steps');

  ns.InsertLocation = function () {
    this.superclass.constructor.apply(this, arguments);
  };

  pskl.utils.inherit(ns.InsertLocation, ns.AbstractMergeStep);

  ns.InsertLocation.prototype.init = function () {
    this.superclass.init.call(this);
  };

  ns.InsertLocation.prototype.onShow = function () {
    var origin = this.mergeData.origin;
    this.container.querySelector('.merge-anchor-origin').textContent = origin;
  };
})();
