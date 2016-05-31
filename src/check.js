'use strict';

function getMessage(a, b) {
  var typeOfA = typeof a;
  var isArrayA = Array.isArray(a);
  var isArrayB = Array.isArray(b);
  var sum = 0;
  var length = 0;

  if (typeOfA === 'boolean') {
    if (a) {
      return 'Я попал в ' + b;
    } else {
      return 'Я никуда не попал';
    }
  } else if (typeOfA === 'number') {
    return 'Я прыгнул на ' + (a * 100) + ' сантиметров';
  } else if (isArrayA && !isArrayB) {
    sum = a.reduce(function(previousValue, currentValue) {
      return previousValue + currentValue;
    });
    return 'Я прошёл ' + sum + ' шагов';
  } else if (isArrayA && isArrayB) {
    length = a.reduce(function(previousValue, currentValue, i) {
      return previousValue + currentValue * b[i];
    }, 0);
    return 'Я прошёл ' + length + ' метров';
  }
}
