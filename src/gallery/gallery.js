'use strict';

var Gallery = require('./gallery-show-image');

var photogalleryImages = document.querySelectorAll('.photogallery-image img');
var photogallery = document.querySelector('.photogallery');

var arrayPathPictures = Array.prototype.map.call(photogalleryImages, function(image) {
  return image.getAttribute('src');
});

var gallery = new Gallery(arrayPathPictures);

photogallery.addEventListener('click', function(evt) {
  var imageNumber = arrayPathPictures.indexOf(evt.target.getAttribute('src'));
  if (imageNumber >= 0) {
    evt.preventDefault();
    gallery.updateHash(imageNumber);
  }
});

window.addEventListener('load', gallery.hashchange);
