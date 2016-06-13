'use strict';

(function() {
  var filtersContainer = document.querySelector('.reviews-filter');
  var reviewsContainter = document.querySelector('.reviews-list');
  var templateElement = document.querySelector('#review-template');
  var templateMessage = document.querySelector('#review-message-template');
  var reviewsBlock = document.querySelector('.reviews');
  var elementToClone;
  var elementMessageToClone;
  var IMAGE_LOAD_TIMEOUT = 10000;
  var IMAGE_WIDTH = 124;
  var IMAGE_HEIGTH = 124;
  var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';
  var SERVER_LOAD_TIMEOUT = 10000;
  var REVIEWS_LAST_DAYS = 4;
  var reviews;

  filtersContainer.classList.add('invisible');

  /**
   * Поиск элемента в шаблоне
   * @param  {obj} template Шаблон в котором надо найти элемент
   * @param  {string} selector Селектор элемента, который надо найти
   * @return {obj} Найденный элемент
   */
  var getElementToClone = function(template, selector) {
    if ('content' in template) {
      return template.content.querySelector(selector);
    } else {
      return template.querySelector(selector);
    }
  };

  elementToClone = getElementToClone(templateElement, '.review');
  elementMessageToClone = getElementToClone(templateMessage, '.review-message');

  /**
   * Добавление сообщения
   * @param  {string} text      Текст который нужно добавить
   * @param  {HTMLElement} container Контейнер, куда нужно добавить сообщение
   * @return {HTMLElement}           Исходное сообщение
   */
  var getMessageElement = function(text, container) {
    var element = elementMessageToClone.cloneNode(true);

    element.innerHTML = text;
    container.appendChild(element);

    return element;
  };


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


  /**
   * Выполняем XMLHttpRequest запрос
   * @param  {string}   source      Адрес запроса
   * @param  {Function} callback
   */
  var callRequest = function(source, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onload = function(evt) {
      if (evt.target.status !== 200) {
        callback(true);
      } else {
        var loadedData = JSON.parse(evt.target.response);
        callback(false, loadedData);
      }
    };
    xhr.timeout = SERVER_LOAD_TIMEOUT;
    xhr.ontimeout = function() {
      callback(true);
    };

    xhr.open('GET', source);
    xhr.send();
  };


  /**
   * Добавляем каждому фильтру количество отзывов
   * @param  {Number} quantity Количество отзывов
   * @param  {obj} filter Фильтр к которому добавляем количество отзывов
   */
  var renderQuantityReviews = function(quantity, filter) {
    filter.innerHTML += '<sup>' + quantity + '</sup>';
  };


  // Получаем количество отзывов в каждом фильтре
  var getQuantityReviews = function() {
    var filtersLabel = filtersContainer.querySelectorAll('label');
    Array.prototype.forEach.call(filtersLabel, function(filterLabel) {
      var filterName = filterLabel.getAttribute('for');
      var filteredReviews = getFilteredReviews(reviews, filterName);
      // Если отзывов 0 при данном фильтре, добавляем фильтру класс .filter-disabled
      filterLabel.classList.toggle('filter-disabled', filteredReviews.length === 0);
      renderQuantityReviews(filteredReviews.length, filterLabel);
    });
  };


  /**
   * Отрисовываем отзывы
   * @param  {Array} reviewsArray Массив отзывов
   */
  var renderReviews = function(reviewsArray) {
    // Очищаем контейнер отзывов
    reviewsContainter.innerHTML = '';
    if (reviewsArray.length === 0) {
      getMessageElement('Нет подходящих сообщений. <br> Попробуйте изменить фильтрацию.', reviewsContainter);
    }
    // Отрисовываем каждый отзыв
    reviewsArray.forEach(function(review) {
      getReviewsElement(review, reviewsContainter);
    });
  };


  /**
   * Создаем новый список отзывов согласно фильтру
   * @param  {Array} reviews  Массив отзывов, который надо сортировать
   * @param  {string} filter  Фильтр который нужно применить к списку
   * @return {Array}  Новый отфильтрованный массив отзывов
   */
  var getFilteredReviews = function(reviewsArray, filter) {
    // Создаем копию исходного массива
    var reviewsToFilter = reviewsArray.slice(0);

    switch (filter) {
      case 'reviews-recent':
        // Создаем текущую дату
        var nowDate = new Date();
        // Находим отзывы за последние REVIEWS_LAST_DAYS
        reviewsToFilter = reviewsToFilter
          .filter(function(review) {
            // Создаем дату отзыва
            var reviewDate = new Date(review.date);
            // Количетво дней между текущей датой и последним отзывом.
            // Вычитаем из текущей даты дату отзыва и переводим в мс в дни
            var daysAgo = (nowDate - reviewDate) / 1000 / 60 / 60 / 24;
            // Если количетво дней между текущей датой и последним отзывом меньше
            // или равно REVIEWS_LAST_DAYS
            var isDate = daysAgo <= REVIEWS_LAST_DAYS;
            // Если true, добавляем отзыв в массив
            return isDate;
          })
          // Сортируем отзывы от новых к старым
          .sort(function(a, b) {
            var aDate = new Date(a.date);
            var bDate = new Date(b.date);
            return bDate - aDate;
          });
        break;

      case 'reviews-good':
        // Находим отзывы с рейтингом не ниже 3
        reviewsToFilter = reviewsToFilter
          .filter(function(review) {
            return (review.rating >= 3);
          })
          // Сортируем отзывы по убывынию рейтинга
          .sort(function(a, b) {
            return b.rating - a.rating;
          });
        break;

      case 'reviews-bad':
        // Находим отзывы с рейтингом ниже 3
        reviewsToFilter = reviewsToFilter
          .filter(function(review) {
            return (review.rating < 3);
          })
          // Сортируем отзывы по возрастанию рейтинга
          .sort(function(a, b) {
            return a.rating - b.rating;
          });
        break;

      case 'reviews-popular':
        // Сортируем отзывы по убыванию отенки отзыва
        reviewsToFilter.sort(function(a, b) {
          return b.review_usefulness - a.review_usefulness;
        });
        break;
    }
    return reviewsToFilter;
  };

  /**
   * Передает заданный фильтр, на основе которого отрисовываем список заново
   * @param {string} filter Название фильтра
   */
  var setFilterEnabled = function(filter) {
    var filteredReviews = getFilteredReviews(reviews, filter);
    renderReviews(filteredReviews);
  };

  // Добаляет каждому фильтру обработчик клика
  var setFiltersEnabled = function() {
    var filters = filtersContainer.querySelectorAll('input');
    Array.prototype.forEach.call(filters, function(filter) {
      filter.onclick = function() {
        setFilterEnabled(this.id);
      };
    });
  };

  reviewsBlock.classList.add('reviews-list-loading');

  callRequest(REVIEWS_LOAD_URL, function(error, loadedReviews) {
    reviewsBlock.classList.remove('reviews-list-loading');
    if (error) {
      reviewsBlock.classList.add('reviews-load-failure');
    } else {
      reviews = loadedReviews;
      getQuantityReviews();
      // Включаем и отрисовываем начальный фильтр
      setFilterEnabled('reviews-all');
      setFiltersEnabled();
    }
  });


  filtersContainer.classList.remove('invisible');
})();
