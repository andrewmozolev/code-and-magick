'use strict';

var SERVER_LOAD_TIMEOUT = 10000;

/**
 * Выполняем XMLHttpRequest запрос
 * @param  {string}   source      Адрес запроса
 * @param  {Function} callback
 */
module.exports = function(source, callback) {
  var xhr = new XMLHttpRequest();

  xhr.onload = function(evt) {
    if (evt.target.status !== 200) {
      callback(true);
    } else {
      var loadedData = JSON.parse(evt.target.response);
      callback(false, loadedData);
    }
  };
  xhr.timeout = SERVER_LOAD_TIMEOUT;
  xhr.ontimeout = function() {
    callback(true);
  };

  xhr.open('GET', source);
  xhr.send();
};
