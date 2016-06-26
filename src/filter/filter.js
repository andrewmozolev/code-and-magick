'use strict';

var filtersType = require('./filters-type');

var REVIEWS_LAST_DAYS = 4;

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
    case filtersType.RECENT:
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

    case filtersType.GOOD:
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

    case filtersType.BAD:
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

    case filtersType.POPULAR:
      // Сортируем отзывы по убыванию отенки отзыва
      reviewsToFilter.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
  }
  return reviewsToFilter;
};

module.exports = getFilteredReviews;
