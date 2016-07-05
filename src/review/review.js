'use strict';

var getReviewsElement = require('./get-review-element.js');
var BaseComponent = require('../base-component');
var utils = require('../utils');

/**
 * @param {Object} data
 * @param {HTMLElement} container
 * @constructor
 */
var Review = function(data, container) {
  BaseComponent.call(this, getReviewsElement(data), container);
  this.onReviewClick = this.onReviewClick.bind(this);
  this.onEvent(this.element, 'click', this.onReviewClick);
  this.add();
};

utils.inherit(Review, BaseComponent);

Review.prototype.onReviewClick = function(evt) {
  if (evt.target.classList.contains('review-quiz-answer')) {
    if (this.activeAnsver) {
      this.activeAnsver.classList.remove('review-quiz-answer-active');
    }
    evt.target.classList.add('review-quiz-answer-active');
    this.activeAnsver = evt.target;
  }
};

module.exports = Review;
