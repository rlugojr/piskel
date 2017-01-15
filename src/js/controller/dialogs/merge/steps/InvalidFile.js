(function () {
  var ns = $.namespace('pskl.controller.dialogs.merge.steps');

  ns.InvalidFile = function () {
    this.superclass.constructor.apply(this, arguments);
  };

  pskl.utils.inherit(ns.InvalidFile, ns.AbstractMergeStep);

  ns.InvalidFile.prototype.init = function () {
    this.superclass.init.call(this);
  };
})();
