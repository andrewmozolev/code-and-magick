'use strict';

(function() {
  var MAX_RATING = 3;
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


  name.required = true;
  name.addEventListener('input', checkInputs);
  text.addEventListener('input', checkInputs);


  for (var i = 0; i < marks.length; i++) {
    if (marks[i].checked) {
      isRatingCorrect = marks[i].checked && marks[i].value > MAX_RATING;
    }
    marks[i].addEventListener('change', function() {
      isRatingCorrect = this.value > MAX_RATING;
      checkInputs();
    });
    checkInputs();
  }

  /**
   * Проверка поля ввода
   * @param  {object}  input  Инпут который нужно проверить.
   */
  function isInputCorrect(input) {
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
