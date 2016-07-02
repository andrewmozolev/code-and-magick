'use strict';

var load = require('./xhr');

var Review = require('./review/review');
var getMessageElement = require('./review/get-review-message');

var getFilteredReviews = require('./filter/filter');
var getQuantityReviews = require('./review/get-review-quantity');


var filtersContainer = document.querySelector('.reviews-filter');
var reviewsContainter = document.querySelector('.reviews-list');
var reviewsBlock = document.querySelector('.reviews');
var buttonMoreReviews = document.querySelector('.reviews-controls-more');
var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

var pageNumber = 0;
var filteredReviews = [];
var renderedReviews = [];
var reviews;

filtersContainer.classList.add('invisible');


/**
 * Настройка для отрисовки следующей страницы
 * @param {Array} reviewsArray Массив отзывов
 */
var loadNextPage = function(reviewsArray) {
  var pageSize = 3;
  var from = pageNumber * pageSize;
  var to = from + pageSize;
  var replace = from === 0;
  var nextPageReviews = reviewsArray.slice(from, to);
  // Показываем или скрываем кнопку "Еще отзывы"
  buttonMoreReviews.classList.toggle('invisible', to >= reviewsArray.length);
  if (nextPageReviews.length > 0) {
    renderReviews(nextPageReviews, replace);
    pageNumber++;
  }
};

/**
 * Добавление события клика для кнопки "Еще отзывы"
 */
var setButtonEnabled = function() {
  buttonMoreReviews.addEventListener('click', function() {
    loadNextPage(filteredReviews);
  });
};

/**
 * Отрисовываем отзывы
 * @param  {Array} reviewsArray Массив отзывов
 * @param {Boolean} replace
 */
var renderReviews = function(reviewsArray, replace) {
  // Очищаем контейнер отзывов
  if (replace) {
    renderedReviews.forEach(function(review) {
      review.remove();
    });
    renderedReviews = [];
  }

  if (reviewsArray.length === 0) {
    getMessageElement('Нет подходящих сообщений. <br> Попробуйте изменить фильтрацию.', reviewsContainter);
  }

  // Отрисовываем каждый отзыв
  reviewsArray.forEach(function(review) {
    renderedReviews.push(new Review(review, reviewsContainter));
  });
};

/**
 * Активируем input для нужного фильтра.
 * @param {string} filter Активный фильтр.
 */
var setInputEnabled = function(filter) {
  var activeFilter = document.querySelector('#' + filter);
  activeFilter.checked = true;
};

/**
 * Передает заданный фильтр, на основе которого отрисовываем список заново
 * @param {string} filter Название фильтра
 */
var setFilterEnabled = function(filter) {
  filteredReviews = getFilteredReviews(reviews, filter);
  pageNumber = 0;
  localStorage.setItem('filter', filter);
  setInputEnabled(filter);
  loadNextPage(filteredReviews);
};

// Добаляет каждому фильтру обработчик клика
var setFiltersEnabled = function() {
  filtersContainer.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('reviews-filter-item')) {
      setFilterEnabled(evt.target.getAttribute('for'));
    }
  });
};

reviewsBlock.classList.add('reviews-list-loading');

load(REVIEWS_LOAD_URL, function(error, loadedReviews) {
  reviewsBlock.classList.remove('reviews-list-loading');
  if (error) {
    reviewsBlock.classList.add('reviews-load-failure');
  } else {
    reviews = loadedReviews;
    getQuantityReviews(reviews, filteredReviews, filtersContainer);
    var localFilter = localStorage.getItem('filter');
    var currentFilter = localFilter ? localFilter : 'reviews-all';
    // Включаем и отрисовываем начальный фильтр
    setFilterEnabled(currentFilter);
    setFiltersEnabled();
    setButtonEnabled();
  }
});


filtersContainer.classList.remove('invisible');
