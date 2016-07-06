'use strict';

var BaseComponent = function(element, container) {
  this.element = element;
  this.container = container;
};

/**
 * Добавлениe DOM элемента.
 */
BaseComponent.prototype.add = function() {
  this.container.appendChild(this.element);
};

/**
 * Добавление обработчика событий и сохранение его в массив.
 * @param  {HTMLElement}   element  Елемент на котором нужно отследить событие.
 * @param  {string}   event    Событие, которое нужно отследить.
 * @param  {Function} callback
 */
BaseComponent.prototype.onEvent = function(element, event, callback) {
  element.addEventListener(event, callback);
  if (!this.events) {
    this.events = [];
  }
  this.events.push({
    element: element,
    event: event,
    callback: callback
  });
};

/**
 * Удаление всех событий.
 */
BaseComponent.prototype.offEvent = function() {
  this.events.forEach(function(item) {
    item.element.removeEventListener(item.event, item.callback);
  });
};

/**
 * Удаление DOM элемента.
 */
BaseComponent.prototype.remove = function() {
  this.offEvent();
  this.element.parentNode.removeChild(this.element);
};

module.exports = BaseComponent;
