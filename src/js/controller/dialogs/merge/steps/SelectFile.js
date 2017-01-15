(function () {
  var ns = $.namespace('pskl.controller.dialogs.merge.steps');

  ns.SelectFile = function () {
    this.superclass.constructor.apply(this, arguments);
  };

  pskl.utils.inherit(ns.SelectFile, ns.AbstractMergeStep);

  ns.SelectFile.prototype.init = function () {
    this.superclass.init.call(this);
  };
})();
