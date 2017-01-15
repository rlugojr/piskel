(function () {
  var ns = $.namespace('pskl.controller.dialogs.merge.steps');

  ns.AbstractMergeStep = function (piskelController, mergeController, container) {
    this.piskelController = piskelController;
    this.container = container;
    this.mergeController = mergeController;
  };

  ns.AbstractMergeStep.prototype.init = function () {
    var backButton = this.container.querySelector('.merge-back-button');
    if (backButton) {
      pskl.utils.Event.addEventListener(backButton, 'click', this.onBackClicked, this);
    }
    var nextButton = this.container.querySelector('.merge-next-button');
    pskl.utils.Event.addEventListener(nextButton, 'click', this.onNextClicked, this);
    var cancelButton = this.container.querySelector('.merge-cancel-button');
    pskl.utils.Event.addEventListener(cancelButton, 'click', this.onCancelClicked, this);
  };

  ns.AbstractMergeStep.prototype.destroy = function () {
    pskl.utils.Event.removeAllEventListeners(this);
  };

  ns.AbstractMergeStep.prototype.onCancelClicked = Constants.ABSTRACT_FUNCTION;

  ns.AbstractMergeStep.prototype.onNextClicked = function () {
    this.mergeController.next(this);
  };

  ns.AbstractMergeStep.prototype.onBackClicked = function () {
    this.mergeController.back(this);
  };
})();
