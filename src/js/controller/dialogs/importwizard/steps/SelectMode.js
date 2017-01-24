(function () {
  var ns = $.namespace('pskl.controller.dialogs.importwizard.steps');

  ns.SelectMode = function (piskelController, importController, container) {
    this.superclass.constructor.apply(this, arguments);
  };

  pskl.utils.inherit(ns.SelectMode, ns.AbstractImportStep);

  ns.SelectMode.prototype.init = function () {
    this.superclass.init.call(this);
  };

  ns.SelectMode.prototype.onShow = function () {
    this.refresh_();
  };

  ns.SelectMode.prototype.destroy = function () {
    if (this.framePickerWidget) {
      this.framePickerWidget.destroy();
    }
    this.superclass.destroy.call(this);
  };

  ns.SelectMode.prototype.refresh_ = function () {
    var mergePiskel = this.mergeData.mergePiskel;
    if (mergePiskel) {
      this.updateMergeFilePreview_();
      this.nextButton.removeAttribute('disabled');
    } else {
      this.nextButton.setAttribute('disabled', true);
    }
  };

  ns.SelectMode.prototype.updateMergeFilePreview_ = function () {
    var mergePiskel = this.mergeData.mergePiskel;

    var previewFrame = pskl.utils.LayerUtils.mergeFrameAt(mergePiskel.getLayers(), 0);
    var image = pskl.utils.FrameUtils.toImage(previewFrame);

    // TODO : Shittiest lazy init of 2017 o/
    if (!this.framePickerWidget) {
      var framePickerContainer = this.container.querySelector('.import-preview');
      this.framePickerWidget = new pskl.widgets.FramePicker(mergePiskel, framePickerContainer);
      this.framePickerWidget.init();
    } else {
      this.framePickerWidget.piskel = mergePiskel;
      this.framePickerWidget.setFrameIndex(1);
    }

    var metaHtml = pskl.utils.Template.getAndReplace('import-meta-content', {
      name : mergePiskel.getDescriptor().name,
      dimensions : mergePiskel.getWidth() + ' x ' + mergePiskel.getHeight(),
      frames : mergePiskel.getFrameCount(),
      layers : mergePiskel.getLayers().length
    });
    this.container.querySelector('.import-meta').innerHTML = metaHtml;
  };
})();
