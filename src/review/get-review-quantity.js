'use strict';

var getFilteredReviews = require('../filter');

/**
 * Добавляем каждому фильтру количество отзывов.
 * @param  {number} quantity Количество отзывов
 * @param  {Object} filter      Фильтр к которому добавляем количество отзывов
 */
var renderQuantityReviews = function(quantity, filter) {
  filter.innerHTML += '<sup>' + quantity + '</sup>';
};

/**
 * Получаем количество отзывов в каждом фильтре
 * @param  {Array} reviews                Отзывы
 * @param  {Array} filteredReviews        Отфильтровынные отзывы
 * @param  {HTMLElement} filtersContainer Блок фильтров
 */
var getQuantityReviews = function(reviews, filteredReviews, filtersContainer) {
  var filtersLabel = filtersContainer.querySelectorAll('label');
  Array.prototype.forEach.call(filtersLabel, function(filterLabel) {
    var filterName = filterLabel.getAttribute('for');
    filteredReviews = getFilteredReviews(reviews, filterName);
    var isEmptyReviews = filteredReviews.length === 0;
    // Если отзывов 0 при данном фильтре, добавляем фильтру класс .filter-disabled
    filterLabel.classList.toggle('filter-disabled', isEmptyReviews);

    var filterInput = filtersContainer.querySelector('#' + filterName);
    filterInput.disabled = isEmptyReviews;

    renderQuantityReviews(filteredReviews.length, filterLabel);
  });
};

module.exports = getQuantityReviews;
