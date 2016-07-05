'use strict';

var IMAGE_LOAD_TIMEOUT = 10000;

module.exports = {
  KeyCode: {
    ESC: 27,
    LEFT: 37,
    RIGHT: 39
  },

  /**
   * Проверка видимости элемента
   * @param  {HTMLElement} element  Элемент который проверяем
   * @return {Boolean}
   */
  isVisible: function(element) {
    var elementPosition = element.getBoundingClientRect();
    return elementPosition.bottom > 0;
  },

  /**
   * Throttle
   * @param  {function} callback  Функция которую нужно оптимизировать
   * @param  {number} timeDelay   Кол-во миллисекунд вызова функции
   * @return {function}           Оптимизированная функция
   */
  throttle: function(callback, timeDelay) {
    var lastCall = Date.now();
    return function() {
      if (Date.now() - lastCall >= timeDelay) {
        callback();
        lastCall = Date.now();
      }
    };
  },

  /**
   * Поиск элемента в шаблоне
   * @param  {Object} template  Шаблон в котором надо найти элемент
   * @param  {string} selector  Селектор элемента, который надо найти
   * @return {Object}           Найденный элемент
   */
  getElementToClone: function(template, selector) {
    if ('content' in template) {
      return template.content.querySelector(selector);
    } else {
      return template.querySelector(selector);
    }
  },

  /**
   * Загрузка изображения
   * @param  {string}   imageUrl URL изображения
   * @param  {function} callback
   */
  loadImage: function(imageUrl, callback) {
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
  },

  inherit: function(ChildComponent, BaseComponent) {
    function EmptyCtor() {}
    EmptyCtor.prototype = BaseComponent.prototype;
    ChildComponent.prototype = new EmptyCtor();
  }
};
