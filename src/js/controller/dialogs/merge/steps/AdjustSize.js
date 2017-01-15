(function () {
  var ns = $.namespace('pskl.controller.dialogs.merge.steps');

  ns.AdjustSize = function () {
    this.superclass.constructor.apply(this, arguments);
  };

  pskl.utils.inherit(ns.AdjustSize, ns.AbstractMergeStep);

  ns.AdjustSize.prototype.init = function () {
    this.superclass.init.call(this);
  };
})();
