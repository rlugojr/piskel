(function () {
  var ns = $.namespace('pskl.controller.dialogs.merge.steps');

  ns.SelectFile = function (piskelController, mergeController, container) {
    this.superclass.constructor.apply(this, arguments);
  };

  pskl.utils.inherit(ns.SelectFile, ns.AbstractMergeStep);

  ns.SelectFile.prototype.init = function () {
    this.superclass.init.call(this);

    this.selectFileButton = this.container.querySelector('.select-mergefile-button');
    this.selectFileInput = this.container.querySelector('.select-mergefile-input');
    this.nextButton = this.container.querySelector('.merge-next-button');
    this.cancelButton = this.container.querySelector('.merge-cancel-button');

    this.addEventListener(this.selectFileButton, 'click', this.onSelectFileClick_);
    this.addEventListener(this.selectFileInput, 'change', this.onSelectFileChange_);

    this.refresh_();
  };

  ns.SelectFile.prototype.getMergeFile = function () {
    return this.mergeFile;
  };

  ns.SelectFile.prototype.onSelectFileClick_ = function () {
    this.selectFileInput.click();
  };

  ns.SelectFile.prototype.onSelectFileChange_ = function (e) {
    var files = this.selectFileInput.files;
    if (files.length == 1) {
      this.mergeData.mergeFile = files[0];
    }
    this.refresh_();
  };

  ns.SelectFile.prototype.refresh_ = function () {
    if (!!this.mergeData.mergeFile) {
      this.nextButton.removeAttribute('disabled');
      this.cancelButton.removeAttribute('disabled');
    } else {
      this.nextButton.setAttribute('disabled', true);
      this.cancelButton.setAttribute('disabled', true);
    }
  };
})();
