'use strict';

var utils = require('../utils');

var galleryContainer = document.querySelector('.overlay-gallery');
var controlLeft = galleryContainer.querySelector('.overlay-gallery-control-left');
var controlRight = galleryContainer.querySelector('.overlay-gallery-control-right');
var galleryPreview = galleryContainer.querySelector('.overlay-gallery-preview');
var close = galleryContainer.querySelector('.overlay-gallery-close');
var currentNumber = galleryContainer.querySelector('.preview-number-current');
var totalNumber = galleryContainer.querySelector('.preview-number-total');

var activePicture = 0;
var galleryPictures = [];
var preview;


function _onDocumentKeyDown(evt) {
  var keyCode = evt.keyCode;
  switch (keyCode) {
    case utils.KeyCode.ESC:
      hideGallery();
      break;
    case utils.KeyCode.LEFT:
      showPreviousPicture();
      break;
    case utils.KeyCode.RIGHT:
      showNextPicture();
      break;
  }
}

/**
 * Скрываем галерею.
 */
function hideGallery() {
  galleryContainer.classList.add('invisible');
  controlLeft.removeEventListener('click', showPreviousPicture);
  controlRight.removeEventListener('click', showNextPicture);
  close.removeEventListener('click', hideGallery);
  document.removeEventListener('keydown', _onDocumentKeyDown);
}

/**
 * Показываем нужное изображение.
 * @param  {number} number Номер изображения.
 */
function showPicture(number) {

  if (!galleryPreview.querySelector('img')) {
    preview = new Image();
    galleryPreview.appendChild(preview);
  }

  preview.src = galleryPictures[number];
  currentNumber.innerHTML = number + 1;

  activePicture = number;
}

/**
 * Показываем предыдущее изображение.
 */
function showPreviousPicture() {
  var previousNumber = activePicture === 0 ? galleryPictures.length - 1 : activePicture - 1;
  showPicture(previousNumber);
}

/**
 * Показываем следующее изображение.
 * @return {[type]} [description]
 */
function showNextPicture() {
  var nextNumber = activePicture === galleryPictures.length - 1 ? 0 : activePicture + 1;
  showPicture(nextNumber);
}


module.exports = {
  /**
   * Сохраняем массив URL изображений.
   * @param  {Array} pictures Массив URL изображений.
   */
  saveImages: function(pictures) {
    galleryPictures = pictures;
    totalNumber.innerHTML = galleryPictures.length;
  },

  /**
   * Показываем галерею
   * @param  {number} pictureNumber Нормер изображения с которого должен начаться показ.
   */
  showGallery: function(pictureNumber) {
    galleryContainer.classList.remove('invisible');

    document.addEventListener('keydown', _onDocumentKeyDown);
    controlLeft.addEventListener('click', showPreviousPicture);
    controlRight.addEventListener('click', showNextPicture);
    close.addEventListener('click', hideGallery);

    showPicture(pictureNumber);
  }
};
