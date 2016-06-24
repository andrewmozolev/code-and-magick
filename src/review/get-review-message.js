'use strict';

var utils = require('../utils');
var templateMessage = document.querySelector('#review-message-template');
var elementMessageToClone = utils.getElementToClone(templateMessage, '.review-message');

/**
 * Добавление сообщения
 * @param  {string} text           Текст который нужно добавить.
 * @param  {HTMLElement} container Контейнер, куда нужно добавить сообщение
 * @return {HTMLElement}           Исходное сообщение
 */
var getMessageElement = function(text, container) {
  var element = elementMessageToClone.cloneNode(true);

  element.innerHTML = text;
  container.appendChild(element);

  return element;
};

module.exports = getMessageElement;
