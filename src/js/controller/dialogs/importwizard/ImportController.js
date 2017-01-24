(function () {
  var ns = $.namespace('pskl.controller.dialogs.importwizard');

  var stepDefinitions = {
    'IMAGE_IMPORT' : {
      controller : ns.steps.ImageImport,
      template : 'import-image-import'
    },
    'ADJUST_SIZE' : {
      controller : ns.steps.AdjustSize,
      template : 'import-adjust-size'
    },
    'INSERT_LOCATION' : {
      controller : ns.steps.InsertLocation,
      template : 'import-insert-location'
    },
    'INVALID_FILE' : {
      controller : ns.steps.InvalidFile,
      template : 'import-invalid-file'
    },
    'SELECT_MODE' : {
      controller : ns.steps.SelectMode,
      template : 'import-select-mode'
    }
  };

  ns.ImportController = function (piskelController, args) {
    this.piskelController = piskelController;

    // Merge data object used by steps to communicate and share their
    // results.
    this.mergeData = {};
  };

  pskl.utils.inherit(ns.ImportController, pskl.controller.dialogs.AbstractDialogController);

  ns.ImportController.prototype.init = function (initArgs) {
    this.superclass.init.call(this);

    // Prepare mergeData  object and wizard steps.
    this.mergeData.rawFiles = initArgs.rawFiles;
    this.steps = this.createSteps_();

    // Start wizard widget.
    var wizardContainer = document.querySelector('.import-wizard-container');
    this.wizard = new pskl.widgets.Wizard(this.steps, wizardContainer);
    this.wizard.init();
    this.wizard.goTo('IMAGE_IMPORT');
  };

  ns.ImportController.prototype.destroy = function (file) {
    Object.keys(this.steps).forEach(function (stepName) {
      var step = this.steps[stepName];
      step.instance.destroy();
      step.instance = null;
      step.el = null;
    }.bind(this));

    this.superclass.destroy.call(this);
  };

  ns.ImportController.prototype.createSteps_ = function () {
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
      steps.IMAGE_IMPORT.el.classList.add('import-first-step');
    } else {
      steps.SELECT_MODE.el.classList.add('import-first-step');
    }

    return steps;
  };

  ns.ImportController.prototype.hasSingleImage_ = function () {
    if (this.mergeData.rawFiles.length === 1) {
      var file = this.mergeData.rawFiles[0];
      return file.type.indexOf('image') === 0;
    }
    return false;
  };

  ns.ImportController.prototype.back = function (stepInstance) {
    this.wizard.back();
    this.wizard.getCurrentStep().instance.onShow();
  };

  ns.ImportController.prototype.next = function (stepInstance) {
    var step = this.wizard.getCurrentStep();
    var nextStep = null;

    if (step.name === 'IMAGE_IMPORT') {
      // The image import step has an async processing to perform before switching to the next step.
      step.instance.createPiskelFromImage().then(function (piskel) {
        console.log(piskel);
        this.mergeData.mergePiskel = piskel;
        this.wizard.goTo('SELECT_MODE');
        this.wizard.getCurrentStep().instance.onShow();
      }.bind(this));
    } else if (step.name === 'SELECT_MODE') {
      this.wizard.goTo('ADJUST_SIZE');
      this.wizard.getCurrentStep().instance.onShow();
    } else if (step.name === 'ADJUST_SIZE') {
      this.wizard.goTo('INSERT_LOCATION');
      this.wizard.getCurrentStep().instance.onShow();
    } else {
      // do nothing but eh
    }
  };
})();
