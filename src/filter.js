'use strict';

var REVIEWS_LAST_DAYS = 4;

var reviewsFilters = {
  'reviews-all': function(reviews) {
    return reviews;
  },

  'reviews-recent': function(reviews) {
    // Создаем текущую дату
    var nowDate = new Date();
    // Находим отзывы за последние REVIEWS_LAST_DAYS
    return reviews
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
  },

  'reviews-good': function(reviews) {
    // Находим отзывы с рейтингом не ниже 3
    return reviews
      .filter(function(review) {
        return (review.rating >= 3);
      })
      // Сортируем отзывы по убывынию рейтинга
      .sort(function(a, b) {
        return b.rating - a.rating;
      });
  },

  'reviews-bad': function(reviews) {
    // Находим отзывы с рейтингом ниже 3
    return reviews
      .filter(function(review) {
        return (review.rating < 3);
      })
      // Сортируем отзывы по возрастанию рейтинга
      .sort(function(a, b) {
        return a.rating - b.rating;
      });
  },

  'reviews-popular': function(reviews) {
    // Сортируем отзывы по убыванию отенки отзыва
    return reviews.sort(function(a, b) {
      return b.review_usefulness - a.review_usefulness;
    });
  }
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
  return reviewsFilters[filter](reviewsToFilter);
};

module.exports = getFilteredReviews;
