'use strict';

var utils = require('../utils');

var Gallery = function(pictures) {
  this.container = document.querySelector('.overlay-gallery');
  this.controlLeft = this.container.querySelector('.overlay-gallery-control-left');
  this.controlRight = this.container.querySelector('.overlay-gallery-control-right');
  this.currentNumber = this.container.querySelector('.preview-number-current');
  this.totalNumber = this.container.querySelector('.preview-number-total');
  this.close = this.container.querySelector('.overlay-gallery-close');
  this.galleryPreview = this.container.querySelector('.overlay-gallery-preview');

  this.activePicture = 0;
  this.pictures = pictures;

  this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
  this.hashchange = this.hashchange.bind(this);
  this.hide = this.hide.bind(this);
  this.showPreviousPicture = this.showPreviousPicture.bind(this);
  this.showNextPicture = this.showNextPicture.bind(this);

  window.addEventListener('hashchange', this.hashchange);
};

Gallery.prototype._onDocumentKeyDown = function(evt) {
  var keyCode = evt.keyCode;
  switch (keyCode) {
    case utils.KeyCode.ESC:
      this.hide();
      break;
    case utils.KeyCode.LEFT:
      this.showPreviousPicture();
      break;
    case utils.KeyCode.RIGHT:
      this.showNextPicture();
      break;
  }
};

Gallery.prototype.showPicture = function(picture) {
  if (!this.preview) {
    this.preview = new Image();
    this.galleryPreview.appendChild(this.preview);
  }
  this.preview.src = this.pictures[picture];
  this.currentNumber.innerHTML = picture + 1;
  this.activePicture = picture;
};

Gallery.prototype.showPreviousPicture = function() {
  var previousNumber = this.activePicture === 0 ? this.pictures.length - 1 : this.activePicture - 1;
  this.updateHash(previousNumber);
};

Gallery.prototype.showNextPicture = function() {
  var nextNumber = this.activePicture === this.pictures.length - 1 ? 0 : this.activePicture + 1;
  this.updateHash(nextNumber);
};

Gallery.prototype.show = function(picture) {
  this.activePicture = picture;
  this.totalNumber.innerHTML = this.pictures.length;
  this.container.classList.remove('invisible');

  document.addEventListener('keydown', this._onDocumentKeyDown);
  this.controlLeft.addEventListener('click', this.showPreviousPicture);
  this.controlRight.addEventListener('click', this.showNextPicture);
  this.close.addEventListener('click', this.hide);

  this.showPicture(this.activePicture);
};


Gallery.prototype.hide = function() {
  this.container.classList.add('invisible');
  this.controlLeft.removeEventListener('click', this.showNextPicture);
  this.controlRight.removeEventListener('click', this.showPreviousPicture);

  this.close.removeEventListener('click', this.hide);
  document.removeEventListener('keydown', this._onDocumentKeyDown);
  history.pushState('', '', window.location.pathname);
};

Gallery.prototype.updateHash = function(number) {
  location.hash = 'photo/' + this.pictures[number];
};

Gallery.prototype.hashchange = function() {
  var hash = location.hash.match(/#photo\/(\S+)/);
  if (hash) {
    var numberPicture = this.pictures.indexOf(hash[1]);
    if (numberPicture !== -1) {
      this.show(numberPicture);
    }
  }
};

module.exports = Gallery;
