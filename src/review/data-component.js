'use strict';

var DataComponent = function(data) {
  this.data = data;
};

DataComponent.prototype.getAuthorName = function() {
  return this.data.author.name;
};

DataComponent.prototype.getPictureUrl = function() {
  return this.data.author.picture;
};

DataComponent.prototype.getReviewDate = function() {
  return this.data.date;
};

DataComponent.prototype.getDescription = function() {
  return this.data.description;
};

DataComponent.prototype.getRating = function() {
  return this.data.rating;
};

DataComponent.prototype.getReviewUsefulness = function() {
  return this.data.review_usefulness;
};

DataComponent.prototype.changeReviewUsefulness = function(reviewAnswer) {
  if (reviewAnswer) {
    this.data.review_usefulness++;
  } else {
    this.data.review_usefulness--;
  }
};

module.exports = DataComponent;
