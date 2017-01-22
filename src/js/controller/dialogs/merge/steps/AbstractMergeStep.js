(function () {
  var ns = $.namespace('pskl.controller.dialogs.merge.steps');

  ns.AbstractMergeStep = function (piskelController, mergeController, container) {
    this.piskelController = piskelController;
    this.container = container;
    this.mergeController = mergeController;
    this.mergeData = this.mergeController.mergeData;
  };

  ns.AbstractMergeStep.prototype.init = function () {
    this.nextButton = this.container.querySelector('.merge-next-button');
    this.backButton = this.container.querySelector('.merge-back-button');
    this.cancelButton = this.container.querySelector('.merge-cancel-button');

    this.addEventListener(this.nextButton, 'click', this.onNextClick);
    this.addEventListener(this.cancelButton, 'click', this.onCancelClick);
    this.addEventListener(this.backButton, 'click', this.onBackClick);
  };

  ns.AbstractMergeStep.prototype.addEventListener = function (el, type, cb) {
    pskl.utils.Event.addEventListener(el, type, cb, this);
  };

  ns.AbstractMergeStep.prototype.destroy = function () {
    pskl.utils.Event.removeAllEventListeners(this);
  };

  ns.AbstractMergeStep.prototype.onCancelClick = function () {
    this.mergeController.closeDialog();
  };

  ns.AbstractMergeStep.prototype.onNextClick = function () {
    this.mergeController.next(this);
  };

  ns.AbstractMergeStep.prototype.onBackClick = function () {
    this.mergeController.back(this);
  };

  ns.AbstractMergeStep.prototype.onShow = Constants.EMPTY_FUNCTION;

})();
