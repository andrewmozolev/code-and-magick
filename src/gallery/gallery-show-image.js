'use strict';

var utils = require('../utils');

var Gallery = function(pictures) {
  var self = this;
  this.container = document.querySelector('.overlay-gallery');
  this.controlLeft = this.container.querySelector('.overlay-gallery-control-left');
  this.controlRight = this.container.querySelector('.overlay-gallery-control-right');
  this.currentNumber = this.container.querySelector('.preview-number-current');
  this.totalNumber = this.container.querySelector('.preview-number-total');
  this.close = this.container.querySelector('.overlay-gallery-close');
  this.galleryPreview = this.container.querySelector('.overlay-gallery-preview');

  this.activePicture = 0;
  this.pictures = pictures;

  this._onDocumentKeyDown = function(evt) {
    var keyCode = evt.keyCode;
    switch (keyCode) {
      case utils.KeyCode.ESC:
        self.hide();
        break;
      case utils.KeyCode.LEFT:
        self.showPreviousPicture();
        break;
      case utils.KeyCode.RIGHT:
        self.showNextPicture();
        break;
    }
  };

  this.showPicture = function(number) {
    if (!self.preview) {
      self.preview = new Image();
      self.galleryPreview.appendChild(self.preview);
    }

    self.preview.src = self.pictures[number];
    self.currentNumber.innerHTML = number + 1;
    self.activePicture = number;
  };

  this.showPreviousPicture = function() {
    var previousNumber = self.activePicture === 0 ? self.pictures.length - 1 : self.activePicture - 1;
    self.showPicture(previousNumber);
  };

  this.showNextPicture = function() {
    var nextNumber = self.activePicture === self.pictures.length - 1 ? 0 : self.activePicture + 1;
    self.showPicture(nextNumber);
  };

  this.onLeftControlClick = function() {
    this.controlLeft.addEventListener('click', self.showPreviousPicture);
  };

  this.onRightControlClick = function() {
    this.controlRight.addEventListener('click', self.showNextPicture);
  };


  this.show = function(pictureNumber) {
    self.activePicture = pictureNumber;
    self.totalNumber.innerHTML = self.pictures.length;
    self.container.classList.remove('invisible');

    document.addEventListener('keydown', self._onDocumentKeyDown);
    self.onLeftControlClick();
    self.onRightControlClick();
    self.close.addEventListener('click', self.hide);

    self.showPicture(pictureNumber);
  };


  this.hide = function() {
    self.container.classList.add('invisible');
    self.controlLeft.removeEventListener('click', self.showNextPicture);
    self.controlRight.removeEventListener('click', self.showPreviousPicture);

    self.close.removeEventListener('click', self.hide);
    document.removeEventListener('keydown', self._onDocumentKeyDown);
  };
};

module.exports = Gallery;
