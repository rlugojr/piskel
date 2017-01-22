(function () {
  var ns = $.namespace('pskl.widgets');

  var WIDGET_MARKUP =
    '<div class="frame-viewer"></div>' +
    '<div class="frame-nav">' +
      '<button class="button frame-nav-first">&lt;&lt;</button>' +
      '<button class="button frame-nav-previous">&lt;</button>' +
      '<input class="textfield frame-nav-input" type="text">' +
      '<button class="button frame-nav-next">&gt;</button>' +
      '<button class="button frame-nav-last">&gt;&gt;</button>' +
    '</div>';

  ns.FramePicker = function (piskelController, container) {
    this.piskelController = piskelController;
    this.container = container;

    // Create internal wrapper that will contain the wizard steps.
    this.wrapper = document.createElement('div');
    this.wrapper.innerHTML = WIDGET_MARKUP;
    this.wrapper.classList.add('frame-picker-wrapper');

    this.frameViewer = this.wrapper.querySelector('.frame-viewer');
    this.firstButton = this.wrapper.querySelector('.frame-nav-first');
    this.previousButton = this.wrapper.querySelector('.frame-nav-previous');
    this.nextButton = this.wrapper.querySelector('.frame-nav-next');
    this.lastButton = this.wrapper.querySelector('.frame-nav-last');
    this.input = this.wrapper.querySelector('.frame-nav-input');

    this.addEventListener(this.firstButton, 'click', this.onFirstClicked_);
    this.addEventListener(this.previousButton, 'click', this.onPreviousClicked_);
    this.addEventListener(this.nextButton, 'click', this.onNextClicked_);
    this.addEventListener(this.lastButton, 'click', this.onLastClicked_);
    this.addEventListener(this.input, 'change', this.onInputChange_);
  };

  ns.FramePicker.prototype.onFirstClicked_ = function () {
    this.setFrameIndex(0);
  };

  ns.FramePicker.prototype.onPreviousClicked_ = function () {
    this.setFrameIndex(this.currentFrameIndex - 1);
  };

  ns.FramePicker.prototype.onNextClicked_ = function () {
    this.setFrameIndex(this.currentFrameIndex + 1);
  };

  ns.FramePicker.prototype.onLastClicked_ = function () {
    this.setFrameIndex(this.piskelController.getFrameCount());
  };

  ns.FramePicker.prototype.onInputChange_ = function () {
    var index = parseInt(this.input.value, 10);
    if (isNaN(index)) {
      this.input.value = this.piskelController.getCurrentFrameIndex();
      return;
    }

    index = Math.max(0, index);
    index = Math.min(this.piskelController.getFrameCount(), index);

    if (index !== this.currentFrameIndex) {
      this.setFrameIndex(index);
    }
  };

  ns.FramePicker.prototype.addEventListener = function (el, type, callback) {
    pskl.utils.Event.addEventListener(el, type, callback, this);
  };

  ns.FramePicker.prototype.init = function () {
    this.setFrameIndex(this.piskelController.getCurrentFrameIndex() + 1);
    this.container.appendChild(this.wrapper);
  };

  ns.FramePicker.prototype.setFrameIndex = function (frameIndex) {
    this.currentFrameIndex = frameIndex;
    this.input.value = frameIndex;

    var image = this.getFrameAsImage_(frameIndex);
    image.classList.add('canvas-background');
    this.frameViewer.innerHTML = '';
    this.frameViewer.appendChild(image);

    var frameCount = this.piskelController.getFrameCount();
    this.setEnabled_(this.firstButton, frameIndex !== 0);
    this.setEnabled_(this.previousButton, frameIndex !== 0);
    this.setEnabled_(this.nextButton, frameIndex !== frameCount);
    this.setEnabled_(this.lastButton, frameIndex !== frameCount);

    if (frameIndex === 0) {
      this.previousButton.setAttribute("disabled", true);
      this.firstButton.setAttribute("disabled", true);
    }
  };

  ns.FramePicker.prototype.getFrameAsImage_ = function (frameIndex) {
    if (frameIndex === 0) {
      // TODO : Needs a special custom yolo image.
      return new Image();
    }

    var piskel = this.piskelController.getPiskel();
    var frame = pskl.utils.LayerUtils.mergeFrameAt(piskel.getLayers(), frameIndex - 1);
    return pskl.utils.FrameUtils.toImage(frame);
  };

  ns.FramePicker.prototype.setEnabled_ = function (el, enabled) {
    if (enabled) {
      el.removeAttribute("disabled");
    } else  {
      el.setAttribute("disabled", true);
    }
  };

  ns.FramePicker.prototype.destroy = function () {
    this.container.removeChild(this.wrapper);
    pskl.utils.Event.removeAllEventListeners(this);
  };
})();