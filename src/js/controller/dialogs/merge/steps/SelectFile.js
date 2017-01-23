(function () {
  var ns = $.namespace('pskl.controller.dialogs.merge.steps');

  ns.SelectFile = function (piskelController, mergeController, container) {
    this.superclass.constructor.apply(this, arguments);
  };

  pskl.utils.inherit(ns.SelectFile, ns.AbstractMergeStep);

  ns.SelectFile.prototype.init = function () {
    this.superclass.init.call(this);
  };

  ns.SelectFile.prototype.onShow = function () {
    this.refresh_();
  };

  ns.SelectFile.prototype.destroy = function () {
    if (this.framePickerWidget) {
      this.framePickerWidget.destroy();
    }
    this.superclass.destroy.call(this);
  };

  ns.SelectFile.prototype.refresh_ = function () {
    var mergePiskel = this.mergeData.mergePiskel;
    if (mergePiskel) {
      this.updateMergeFilePreview_();
      this.nextButton.removeAttribute('disabled');
    } else {
      this.nextButton.setAttribute('disabled', true);
    }
  };

  ns.SelectFile.prototype.updateMergeFilePreview_ = function () {
    var mergePiskel = this.mergeData.mergePiskel;

    var previewFrame = pskl.utils.LayerUtils.mergeFrameAt(mergePiskel.getLayers(), 0);
    var image = pskl.utils.FrameUtils.toImage(previewFrame);

    // TODO : Shittiest lazy init of 2017 o/
    if (!this.framePickerWidget) {
      var framePickerContainer = this.container.querySelector('.mergefile-preview');
      this.framePickerWidget = new pskl.widgets.FramePicker(mergePiskel, framePickerContainer);
      this.framePickerWidget.init();
    } else {
      this.framePickerWidget.piskel = mergePiskel;
      this.framePickerWidget.setFrameIndex(1);
    }

    var metaHtml = pskl.utils.Template.getAndReplace('mergefile-meta-content', {
      name : mergePiskel.getDescriptor().name,
      dimensions : mergePiskel.getWidth() + ' x ' + mergePiskel.getHeight(),
      frames : mergePiskel.getFrameCount(),
      layers : mergePiskel.getLayers().length
    });
    this.container.querySelector('.mergefile-meta').innerHTML = metaHtml;
    this.container.querySelector('.mergefile-container').classList.add('has-merge-piskel');
  };
})();
