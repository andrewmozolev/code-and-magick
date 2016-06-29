'use strict';

var getReviewsElement = require('./get-review-element.js');

/**
 * @param {Object} data
 * @param {HTMLElement} container
 * @constructor
 */
var Review = function(data, container) {
  this.data = data;
  this.element = getReviewsElement(this.data);
  this.onReviewClick = function() {
    this.classList.add('review-quiz-answer-active');
  };
  this.remove = function() {
    this.element.removeEventListener('click', this.onReviewClick);
    this.element.parentNode.removeChild(this.element);
  };
  this.element.addEventListener('click', this.onReviewClick);
  container.appendChild(this.element);
};

module.exports = Review;
