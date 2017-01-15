(function () {
  var ns = $.namespace('pskl.controller.dialogs.merge.steps');

  ns.InsertLocation = function () {
    this.superclass.constructor.apply(this, arguments);
  };

  pskl.utils.inherit(ns.InsertLocation, ns.AbstractMergeStep);

  ns.InsertLocation.prototype.init = function () {
    this.superclass.init.call(this);
  };
})();
