(function () {
  var ns = $.namespace('pskl.controller.dialogs.merge.steps');

  ns.InsertLocation = function () {
    this.superclass.constructor.apply(this, arguments);
  };

  pskl.utils.inherit(ns.InsertLocation, ns.AbstractMergeStep);

  ns.InsertLocation.prototype.init = function () {
    this.superclass.init.call(this);
    this.framePreview = this.container.querySelector('.insert-frame-preview');
    this.framePickerWidget = new pskl.widgets.FramePicker(
      this.piskelController.getPiskel(), this.framePreview);
    this.framePickerWidget.init();

    var currentFrameIndex = this.piskelController.getCurrentFrameIndex();
    this.framePickerWidget.setFrameIndex(currentFrameIndex + 1);
  };

  ns.InsertLocation.prototype.onShow = function () {
  };

  ns.InsertLocation.prototype.destroy = function () {
    this.framePickerWidget.destroy();
    this.superclass.destroy.call(this);
  };
})();
