(function () {
  var ns = $.namespace('pskl.controller.dialogs.merge.steps');

  ns.InsertLocation = function () {
    this.superclass.constructor.apply(this, arguments);
  };

  pskl.utils.inherit(ns.InsertLocation, ns.AbstractMergeStep);

  ns.InsertLocation.prototype.init = function () {
    this.superclass.init.call(this);
    this.framePreview = this.container.querySelector('.insert-frame-preview');
    this.framePickerWidget = new pskl.widgets.FramePicker(this.piskelController, this.framePreview);
    this.framePickerWidget.init();
  };

  ns.InsertLocation.prototype.onShow = function () {
  };

  ns.InsertLocation.prototype.destroy = function () {
    this.framePickerWidget.destroy();
    this.superclass.destroy.call(this);
  };
})();
