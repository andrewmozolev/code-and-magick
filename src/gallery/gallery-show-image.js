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

  this.showPicture = function(picture) {
    if (!self.preview) {
      self.preview = new Image();
      self.galleryPreview.appendChild(self.preview);
    }
    self.preview.src = self.pictures[picture];
    self.currentNumber.innerHTML = picture + 1;
    self.activePicture = picture;
  };

  this.showPreviousPicture = function() {
    var previousNumber = self.activePicture === 0 ? self.pictures.length - 1 : self.activePicture - 1;
    self.updateHash(previousNumber);
  };

  this.showNextPicture = function() {
    var nextNumber = self.activePicture === self.pictures.length - 1 ? 0 : self.activePicture + 1;
    self.updateHash(nextNumber);
  };

  this.onLeftControlClick = function() {
    this.controlLeft.addEventListener('click', self.showPreviousPicture);
  };

  this.onRightControlClick = function() {
    this.controlRight.addEventListener('click', self.showNextPicture);
  };


  this.show = function(picture) {
    self.activePicture = picture;
    self.totalNumber.innerHTML = self.pictures.length;
    self.container.classList.remove('invisible');

    document.addEventListener('keydown', self._onDocumentKeyDown);
    self.onLeftControlClick();
    self.onRightControlClick();
    self.close.addEventListener('click', self.hide);

    self.showPicture(self.activePicture);
  };


  this.hide = function() {
    self.container.classList.add('invisible');
    self.controlLeft.removeEventListener('click', self.showNextPicture);
    self.controlRight.removeEventListener('click', self.showPreviousPicture);

    self.close.removeEventListener('click', self.hide);
    document.removeEventListener('keydown', self._onDocumentKeyDown);
    history.pushState('', '', window.location.pathname);
  };

  this.updateHash = function(number) {
    location.hash = 'photo/' + self.pictures[number];
  };

  this.hashchange = function() {
    var hash = location.hash.match(/#photo\/(\S+)/);
    if (hash) {
      var numberPicture = self.pictures.indexOf(hash[1]);
      if (numberPicture !== -1) {
        self.show(numberPicture);
      }
    }
  };

  window.addEventListener('hashchange', this.hashchange);
};

module.exports = Gallery;
