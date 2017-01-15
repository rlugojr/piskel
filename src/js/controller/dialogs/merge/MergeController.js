(function () {
  var ns = $.namespace('pskl.controller.dialogs.merge');

  var stepDefinitions = {
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

  ns.MergeController = function (piskelController) {
    this.piskelController = piskelController;
  };

  pskl.utils.inherit(ns.MergeController, pskl.controller.dialogs.AbstractDialogController);

  ns.MergeController.prototype.init = function (file) {
    this.superclass.init.call(this);
    this.steps = this.createSteps_();

    var wizardContainer = document.querySelector('.merge-wizard-container');
    this.wizard = new pskl.widgets.Wizard(this.steps, wizardContainer);
    this.wizard.init();
    this.wizard.goTo('SELECT_FILE');
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
    var steps = {};
    Object.keys(stepDefinitions).forEach(function (stepName) {
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

    return steps;
  };

  ns.MergeController.prototype.back = function (stepInstance) {
    this.wizard.back();
  };

  ns.MergeController.prototype.next = function (stepInstance) {
    var step = this.getStep_(stepInstance);
    var nextStep = null;
    if (step.name === 'SELECT_FILE') {
      this.wizard.goTo('ADJUST_SIZE');
    } else if (step.name === 'ADJUST_SIZE') {
      this.wizard.goTo('INSERT_LOCATION');
    } else {
      // do nothing but
    }
  };

  ns.MergeController.prototype.getStep_ = function (stepInstance) {
    var match = null;
    Object.keys(this.steps).forEach(function (stepName) {
      var step = this.steps[stepName];
      if (step.instance === stepInstance) {
        match = step;
      }
    }.bind(this));
    return match;
  };
})();
