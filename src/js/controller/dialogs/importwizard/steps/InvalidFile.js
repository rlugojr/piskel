(function () {
  var ns = $.namespace('pskl.controller.dialogs.importwizard.steps');

  ns.InvalidFile = function (piskelController, importController, container) {
    this.superclass.constructor.apply(this, arguments);
  };

  pskl.utils.inherit(ns.InvalidFile, ns.AbstractImportStep);

  ns.InvalidFile.prototype.init = function () {
    this.superclass.init.call(this);
  };
})();
