(function () {
  var ns = $.namespace('pskl.controller.dialogs.merge.steps');

  ns.SelectFile = function (piskelController, mergeController, container) {
    this.superclass.constructor.apply(this, arguments);

    // Bind callbacks.
    this.onImageFileLoaded_ = this.onImageFileLoaded_.bind(this);
    this.onPiskelFileLoaded_ = this.onPiskelFileLoaded_.bind(this);
    this.onPiskelFileError_ = this.onPiskelFileError_.bind(this);
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
      var file = files[0];
      // Store the file in mergeData for future reference.
      this.mergeData.mergeFile = file;

      var isImage = file.type.indexOf('image') === 0;
      var isPiskel = /\.piskel$/i.test(file.name);
      if (isImage) {
        pskl.utils.FileUtils.readImageFile(file, this.onImageFileLoaded_);
      } else if (isPiskel) {
        pskl.utils.PiskelFileUtils.loadFromFile(file,
          this.onPiskelFileLoaded_,
          this.onPiskelFileError_
        );
      }
    }
  };

  ns.SelectFile.prototype.refresh_ = function () {
    var mergePiskel = this.mergeData.mergePiskel;
    if (mergePiskel) {
      this.updateMergeFilePreview_();

      this.nextButton.removeAttribute('disabled');
      this.cancelButton.removeAttribute('disabled');
    } else {
      this.nextButton.setAttribute('disabled', true);
      this.cancelButton.setAttribute('disabled', true);
    }
  };

  ns.SelectFile.prototype.updateMergeFilePreview_ = function () {
    var mergePiskel = this.mergeData.mergePiskel;

    var previewFrame = pskl.utils.LayerUtils.mergeFrameAt(mergePiskel.getLayers(), 0);
    var image = pskl.utils.FrameUtils.toImage(previewFrame);

    // TODO : set background image as base64 instead.
    this.container.querySelector('.mergefile-preview').innerHTML = '';
    this.container.querySelector('.mergefile-preview').appendChild(image);

    var metaHtml = pskl.utils.Template.getAndReplace('mergefile-meta-content', {
      name : mergePiskel.getDescriptor().name,
      dimensions : mergePiskel.getWidth() + ' x ' + mergePiskel.getHeight(),
      frames : mergePiskel.getFrameCount(),
      layers : mergePiskel.getLayers().length
    });
    this.container.querySelector('.mergefile-meta').innerHTML = metaHtml;
    this.container.querySelector('.mergefile-container').classList.add('has-merge-piskel');
  };

  ns.SelectFile.prototype.onImageFileLoaded_ = function (image) {
    var frame = pskl.utils.FrameUtils.createFromImage(image);
    var layers = [pskl.model.Layer.fromFrames('imported', [frame])];
    var piskel = pskl.model.Piskel.fromLayers(layers, Constants.DEFAULT.FPS, {
      name : this.mergeData.mergeFile.name,
      description : 'temporary piskel for merge import'
    });
    this.setPiskel(piskel);
  };

  ns.SelectFile.prototype.onPiskelFileLoaded_ = function (piskel) {
    this.setPiskel(piskel);
  };

  ns.SelectFile.prototype.setPiskel = function (piskel) {
    console.log(piskel);
    this.mergeData.mergePiskel = piskel;
    this.refresh_();
  };

  ns.SelectFile.prototype.onPiskelFileError_ = function () {
    console.error("Could not load the animation");
  };
})();
