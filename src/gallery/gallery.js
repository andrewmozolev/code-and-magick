'use strict';

var Gallery = require('./gallery-show-image');

var photogalleryImages = document.querySelectorAll('.photogallery-image img');
var photogallery = document.querySelector('.photogallery');

var arraySrc = Array.prototype.map.call(photogalleryImages, function(image) {
  return image.src;
});

var gallery = new Gallery(arraySrc);

photogallery.addEventListener('click', function(evt) {
  var imageNumber = arraySrc.indexOf(evt.target.src);
  if (imageNumber >= 0) {
    evt.preventDefault();
    gallery.show(imageNumber);
  }
});
