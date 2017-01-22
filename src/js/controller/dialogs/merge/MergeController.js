(function () {
  var ns = $.namespace('pskl.controller.dialogs.merge');

  var stepDefinitions = {
    'IMAGE_IMPORT' : {
      controller : ns.steps.ImageImport,
      template : 'merge-image-import'
    },
    'ADJUST_SIZE' : {
      controller : ns.steps.AdjustSize,
      template : 'merge-adjust-size'
    },
    'INSERT_LOCATION' : {
      controller : ns.steps.InsertLocation,
      template : 'merge-insert-location'
    },
    'INVALID_FILE' : {
      controller : ns.steps.InvalidFile,
      template : 'merge-invalid-file'
    },
    'SELECT_FILE' : {
      controller : ns.steps.SelectFile,
      template : 'merge-select-file'
    }
  };

  ns.MergeController = function (piskelController, args) {
    this.piskelController = piskelController;

    // Merge data object used by steps to communicate and share their
    // results.
    this.mergeData = {};
  };

  pskl.utils.inherit(ns.MergeController, pskl.controller.dialogs.AbstractDialogController);

  ns.MergeController.prototype.init = function (initArgs) {
    this.superclass.init.call(this);

    // Prepare mergeData  object and wizard steps.
    this.mergeData.rawFiles = initArgs.rawFiles;
    this.steps = this.createSteps_();

    // Start wizard widget.
    var wizardContainer = document.querySelector('.merge-wizard-container');
    this.wizard = new pskl.widgets.Wizard(this.steps, wizardContainer);
    this.wizard.init();
    this.wizard.goTo('IMAGE_IMPORT');
  };

  ns.MergeController.prototype.destroy = function (file) {
    Object.keys(this.steps).forEach(function (stepName) {
      var step = this.steps[stepName];
      step.instance.destroy();
      step.instance = null;
      step.el = null;
    }.bind(this));

    this.superclass.destroy.call(this);
  };

  ns.MergeController.prototype.createSteps_ = function () {
    // The IMAGE_IMPORT step is used only if there is a single image file
    // being imported.
    var hasSingleImage = this.hasSingleImage_();

    var steps = {};
    Object.keys(stepDefinitions).forEach(function (stepName) {
      if (stepName === 'IMAGE_IMPORT' && !hasSingleImage) {
        return;
      }

      var definition = stepDefinitions[stepName];
      var el = pskl.utils.Template.getAsHTML(definition.template);
      var instance = new definition.controller(this.piskelController, this, el);
      instance.init();
      steps[stepName] = {
        name: stepName,
        el: el,
        instance: instance
      };
    }.bind(this));

    if (hasSingleImage) {
      steps.IMAGE_IMPORT.el.classList.add('merge-first-step');
    } else {
      steps.SELECT_FILE.el.classList.add('merge-first-step');
    }

    return steps;
  };

  ns.MergeController.prototype.hasSingleImage_ = function () {
    if (this.mergeData.rawFiles.length === 1) {
      var file = this.mergeData.rawFiles[0];
      return file.type.indexOf('image') === 0;
    }
    return false;
  };

  ns.MergeController.prototype.back = function (stepInstance) {
    this.wizard.back();
    this.wizard.getCurrentStep().instance.onShow();
  };

  ns.MergeController.prototype.next = function (stepInstance) {
    var step = this.wizard.getCurrentStep();
    var nextStep = null;

    if (step.name === 'IMAGE_IMPORT') {
      this.wizard.goTo('SELECT_FILE');
    } else if (step.name === 'SELECT_FILE') {
      this.wizard.goTo('ADJUST_SIZE');
    } else if (step.name === 'ADJUST_SIZE') {
      this.wizard.goTo('INSERT_LOCATION');
    } else {
      // do nothing but eh
    }
    this.wizard.getCurrentStep().instance.onShow();
  };
})();
