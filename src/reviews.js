'use strict';

(function() {
  var filter = document.querySelector('.reviews-filter');
  var reviewsContainter = document.querySelector('.reviews-list');
  var templateElement = document.querySelector('#review-template');
  var elementToClone;
  var IMAGE_LOAD_TIMEOUT = 10000;
  var IMAGE_WIDTH = 124;
  var IMAGE_HEIGTH = 124;

  filter.classList.add('invisible');

  if ('content' in templateElement) {
    elementToClone = templateElement.content.querySelector('.review');
  } else {
    elementToClone = templateElement.querySelector('.review');
  }

  /**
   * Добавление нового изображения.
   * @param  {string}   imageUrl Путь изображения.
   * @param  {Function} callback
   */
  function loadImage(imageUrl, callback) {
    var image = new Image();

    image.onload = function() {
      clearTimeout(imageLoadTimeout);
      callback(true);
    };

    image.onerror = function() {
      callback(false);
    };

    image.src = imageUrl;

    var imageLoadTimeout = setTimeout(function() {
      callback(false);
    }, IMAGE_LOAD_TIMEOUT);
  }


  /**
   * Сборка и добавление отзыва.
   * @param  {obj} data Объект который нужно добавить.
   * @param  {obj} container Контейнер, в который нужно добавить отзыв.
   */
  var getReviewsElement = function(data, container) {
    var element = elementToClone.cloneNode(true);
    var authorImage = element.querySelector('.review-author');
    element.querySelector('.review-text').textContent = data.description;
    container.appendChild(element);


    var rating = element.querySelector('.review-rating');
    var ratingArray = ['', '', 'two', 'three', 'four', 'five'];
    if (data.rating > 1) {
      rating.classList.add('review-rating-' + ratingArray[data.rating]);
    }


    loadImage(data.author.picture, function(isOk) {
      if (isOk) {
        authorImage.src = data.author.picture;
        authorImage.width = IMAGE_WIDTH;
        authorImage.height = IMAGE_HEIGTH;
      } else {
        authorImage.src = '';
        element.classList.add('review-load-failure');
      }
    });

    return element;
  };


  window.reviews.forEach(function(reviews) {
    getReviewsElement(reviews, reviewsContainter);
  });

  filter.classList.remove('invisible');
})();
