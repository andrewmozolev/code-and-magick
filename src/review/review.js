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
  this.onReviewClick = this.onReviewClick.bind(this);
  this.remove = this.remove.bind(this);
  this.element.addEventListener('click', this.onReviewClick);
  container.appendChild(this.element);
};

Review.prototype.onReviewClick = function(evt) {
  if (evt.target.classList.contains('review-quiz-answer')) {
    if (this.activeAnsver) {
      this.activeAnsver.classList.remove('review-quiz-answer-active');
    }
    evt.target.classList.add('review-quiz-answer-active');
    this.activeAnsver = evt.target;
  }
};

Review.prototype.remove = function() {
  this.element.removeEventListener('click', this.onReviewClick);
  this.element.parentNode.removeChild(this.element);
};

module.exports = Review;
