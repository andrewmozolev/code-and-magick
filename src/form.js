'use strict';

(function() {
  var MAX_RATING = 3;
  var cookies = require('browser-cookies');
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var form = document.querySelector('.review-form');
  var marks = form.elements['review-mark'];
  var name = form.elements['review-name'];
  var text = form.elements['review-text'];
  var button = form.querySelector('.review-submit');
  var fields = form.querySelector('.review-fields');
  var fieldsName = form.querySelector('.review-fields-name');
  var fieldsText = form.querySelector('.review-fields-text');
  var isRatingCorrect;


  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  // При отправки формы, сохраняем куки.
  form.onsubmit = function() {
    // Текущая дата.
    var nowDate = new Date();
    // Дата дня рождения в этом году.
    var myLastBirthdayDate = new Date(nowDate.getFullYear() + '-05-23');
    // Если текущая дата меньше даты дня рождения, то берем день рождения годом ранее.
    if (nowDate < myLastBirthdayDate) {
      myLastBirthdayDate.setFullYear(myLastBirthdayDate.getFullYear() - 1);
    }
    // Количество дней с прошлого дня рождения.
    var daysAfterLastBirthday = nowDate - myLastBirthdayDate;
    // Дата окончания куки.
    var cookiesOptions = {expires: new Date(Date.now() + daysAfterLastBirthday)};
    // Записываем куку name.
    cookies.set('name', name.value, cookiesOptions);
    // Записываем куку rating.
    cookies.set('rating', marks.value, cookiesOptions);
  };

  name.required = true;
  // Если есть кука для name, добавляем в поле name.
  name.value = cookies.get('name') || '';
  // Если есть кука для rating, то добавляем checked для оценки.
  marks.value = cookies.get('rating') || marks.value;
  name.addEventListener('input', checkInputs);
  text.addEventListener('input', checkInputs);
  createAlert(name);
  createAlert(text);

  for (var i = 0; i < marks.length; i++) {
    if (marks[i].checked) {
      isRatingCorrect = marks[i].checked && marks[i].value > MAX_RATING;
      checkInputs();
    }
    marks[i].addEventListener('change', function() {
      isRatingCorrect = this.value > MAX_RATING;
      checkInputs();
    });
  }

  /**
   * Создание сообщение под полем ввода.
   * @param  {object}  input  Инпут для которого создаем сообщение.
   */
  function createAlert(input) {
    var elemAlert = document.createElement('div');
    elemAlert.classList.add(input.name + '-alert');
    input.insertAdjacentElement('afterEnd', elemAlert);
  }

  /**
   * Изменение сообщения под полем ввода.
   * @param  {object}  input  Инпут под которым нужно изменить сообщение.
   */
  function inputAlertChange(input) {
    var alert = document.querySelector('.' + input.name + '-alert');
    alert.innerHTML = input.validationMessage;
    alert.classList.toggle('invisible', input.validity.valid);
  }


  /**
   * Проверка поля ввода
   * @param  {object}  input  Инпут который нужно проверить.
   */
  function isInputCorrect(input) {
    inputAlertChange(input);
    return input.required ? Boolean(input.value) : true;
  }

  /**
   * Проверка полей ввода и активация кнопки отправки.
   */
  function checkInputs() {
    // Если оценка отрицательная, то добавляем полю "Отзыв" обязательное заполнение.
    text.required = !isRatingCorrect;

    // Правильность заполненя поля "Имя" на кол-во символов.
    var isNameCorrect = isInputCorrect(name);

    // Правильность заполненя поля "Отзыв" на кол-во символов.
    var isTextCorrect = isInputCorrect(text);

    // Если поле "Имя" заполнено верно, то убираем ссылку на имя.
    fieldsName.classList.toggle('invisible', isNameCorrect);

    // Если поле "Отзыв" заполнено верно, то убираем ссылку на отзыв.
    fieldsText.classList.toggle('invisible', isTextCorrect);

    // Если поля "Имя" и "Отзыв" заполнены верно, то убираем блок ссылок.
    fields.classList.toggle('invisible', isNameCorrect && isTextCorrect);

    // Если поля "Имя" и "Отзыв" заполнены верно, то активируем кнопку отправки.
    button.disabled = !(isNameCorrect && isTextCorrect);
  }
})();
