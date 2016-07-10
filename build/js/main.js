/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(5);
	__webpack_require__(14);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var cookies = __webpack_require__(2);

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


	formOpenButton.addEventListener('click', function(evt) {
	  evt.preventDefault();
	  formContainer.classList.remove('invisible');
	});

	formCloseButton.addEventListener('click', function(evt) {
	  evt.preventDefault();
	  formContainer.classList.add('invisible');
	});

	// При отправки формы, сохраняем куки.
	form.addEventListener('submit', function() {
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
	  var cookiesOptions = { expires: new Date(Date.now() + daysAfterLastBirthday) };
	  // Записываем куку name.
	  cookies.set('name', name.value, cookiesOptions);
	  // Записываем куку rating.
	  cookies.set('rating', marks.value, cookiesOptions);
	});

	name.required = true;
	// Если есть кука для name, добавляем в поле name.
	name.value = cookies.get('name') || '';
	// Если есть кука для rating, то добавляем checked для оценки.
	marks.value = cookies.get('rating') || marks.value;
	name.addEventListener('input', checkInputs);
	text.addEventListener('input', checkInputs);
	createAlert(name);
	createAlert(text);

	marks.forEach(function(mark) {
	  if (mark.checked) {
	    isRatingCorrect = mark.checked && mark.value > MAX_RATING;
	    checkInputs();
	  }
	  mark.addEventListener('change', function() {
	    isRatingCorrect = this.value > MAX_RATING;
	    checkInputs();
	  });
	});

	/**
	 * Создание сообщение под полем ввода.
	 * @param  {Object}  input  Инпут для которого создаем сообщение.
	 */
	function createAlert(input) {
	  var elemAlert = document.createElement('div');
	  elemAlert.classList.add(input.name + '-alert');
	  input.insertAdjacentElement('afterEnd', elemAlert);
	}

	/**
	 * Изменение сообщения под полем ввода.
	 * @param  {Object}  input  Инпут под которым нужно изменить сообщение.
	 */
	function inputAlertChange(input) {
	  var alert = document.querySelector('.' + input.name + '-alert');
	  alert.innerHTML = input.validationMessage;
	  alert.classList.toggle('invisible', input.validity.valid);
	}


	/**
	 * Проверка поля ввода
	 * @param  {Object}  input  Инпут который нужно проверить.
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	exports.defaults = {};

	exports.set = function(name, value, options) {
	  // Retrieve options and defaults
	  var opts = options || {};
	  var defaults = exports.defaults;

	  // Apply default value for unspecified options
	  var expires  = opts.expires || defaults.expires;
	  var domain   = opts.domain  || defaults.domain;
	  var path     = opts.path     != undefined ? opts.path     : (defaults.path != undefined ? defaults.path : '/');
	  var secure   = opts.secure   != undefined ? opts.secure   : defaults.secure;
	  var httponly = opts.httponly != undefined ? opts.httponly : defaults.httponly;

	  // Determine cookie expiration date
	  // If succesful the result will be a valid Date, otherwise it will be an invalid Date or false(ish)
	  var expDate = expires ? new Date(
	      // in case expires is an integer, it should specify the number of days till the cookie expires
	      typeof expires == 'number' ? new Date().getTime() + (expires * 864e5) :
	      // else expires should be either a Date object or in a format recognized by Date.parse()
	      expires
	  ) : '';

	  // Set cookie
	  document.cookie = name.replace(/[^+#$&^`|]/g, encodeURIComponent)                // Encode cookie name
	  .replace('(', '%28')
	  .replace(')', '%29') +
	  '=' + value.replace(/[^+#$&/:<-\[\]-}]/g, encodeURIComponent) +                  // Encode cookie value (RFC6265)
	  (expDate && expDate.getTime() >= 0 ? ';expires=' + expDate.toUTCString() : '') + // Add expiration date
	  (domain   ? ';domain=' + domain : '') +                                          // Add domain
	  (path     ? ';path='   + path   : '') +                                          // Add path
	  (secure   ? ';secure'           : '') +                                          // Add secure option
	  (httponly ? ';httponly'         : '');                                           // Add httponly option
	};

	exports.get = function(name) {
	  var cookies = document.cookie.split(';');

	  // Iterate all cookies
	  for(var i = 0; i < cookies.length; i++) {
	    var cookie = cookies[i];
	    var cookieLength = cookie.length;

	    // Determine separator index ("name=value")
	    var separatorIndex = cookie.indexOf('=');

	    // IE<11 emits the equal sign when the cookie value is empty
	    separatorIndex = separatorIndex < 0 ? cookieLength : separatorIndex;

	    // Decode the cookie name and remove any leading/trailing spaces, then compare to the requested cookie name
	    if (decodeURIComponent(cookie.substring(0, separatorIndex).replace(/^\s+|\s+$/g, '')) == name) {
	      return decodeURIComponent(cookie.substring(separatorIndex + 1, cookieLength));
	    }
	  }

	  return null;
	};

	exports.erase = function(name, options) {
	  exports.set(name, '', {
	    expires:  -1,
	    domain:   options && options.domain,
	    path:     options && options.path,
	    secure:   0,
	    httponly: 0}
	  );
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(4);

	(function() {
	  /**
	   * @const
	   * @type {number}
	   */
	  var HEIGHT = 300;

	  /**
	   * @const
	   * @type {number}
	   */
	  var WIDTH = 700;

	  /**
	   * ID уровней.
	   * @enum {number}
	   */
	  var Level = {
	    'INTRO': 0,
	    'MOVE_LEFT': 1,
	    'MOVE_RIGHT': 2,
	    'LEVITATE': 3,
	    'HIT_THE_MARK': 4
	  };

	  /**
	   * Порядок прохождения уровней.
	   * @type {Array.<Level>}
	   */
	  var LevelSequence = [
	    Level.INTRO
	  ];

	  /**
	   * Начальный уровень.
	   * @type {Level}
	   */
	  var INITIAL_LEVEL = LevelSequence[0];

	  /**
	   * Допустимые виды объектов на карте.
	   * @enum {number}
	   */
	  var ObjectType = {
	    'ME': 0,
	    'FIREBALL': 1
	  };

	  /**
	   * Допустимые состояния объектов.
	   * @enum {number}
	   */
	  var ObjectState = {
	    'OK': 0,
	    'DISPOSED': 1
	  };

	  /**
	   * Коды направлений.
	   * @enum {number}
	   */
	  var Direction = {
	    NULL: 0,
	    LEFT: 1,
	    RIGHT: 2,
	    UP: 4,
	    DOWN: 8
	  };

	  /**
	   * Правила перерисовки объектов в зависимости от состояния игры.
	   * @type {Object.<ObjectType, function(Object, Object, number): Object>}
	   */
	  var ObjectsBehaviour = {};

	  /**
	   * Обновление движения мага. Движение мага зависит от нажатых в данный момент
	   * стрелок. Маг может двигаться одновременно по горизонтали и по вертикали.
	   * На движение мага влияет его пересечение с препятствиями.
	   * @param {Object} object
	   * @param {Object} state
	   * @param {number} timeframe
	   */
	  ObjectsBehaviour[ObjectType.ME] = function(object, state, timeframe) {
	    // Пока зажата стрелка вверх, маг сначала поднимается, а потом левитирует
	    // в воздухе на определенной высоте.
	    // NB! Сложность заключается в том, что поведение описано в координатах
	    // канваса, а не координатах, относительно нижней границы игры.
	    if (state.keysPressed.UP && object.y > 0) {
	      object.direction = object.direction & ~Direction.DOWN;
	      object.direction = object.direction | Direction.UP;
	      object.y -= object.speed * timeframe * 2;
	      if (object.y < 0) {
	        object.y = 0;
	      }
	    }

	    // Если стрелка вверх не зажата, а маг находится в воздухе, он плавно
	    // опускается на землю.
	    if (!state.keysPressed.UP) {
	      if (object.y < HEIGHT - object.height) {
	        object.direction = object.direction & ~Direction.UP;
	        object.direction = object.direction | Direction.DOWN;
	        object.y += object.speed * timeframe / 3;
	      } else {
	        object.Direction = object.direction & ~Direction.DOWN;
	      }
	    }

	    // Если зажата стрелка влево, маг перемещается влево.
	    if (state.keysPressed.LEFT) {
	      object.direction = object.direction & ~Direction.RIGHT;
	      object.direction = object.direction | Direction.LEFT;
	      object.x -= object.speed * timeframe;
	    }

	    // Если зажата стрелка вправо, маг перемещается вправо.
	    if (state.keysPressed.RIGHT) {
	      object.direction = object.direction & ~Direction.LEFT;
	      object.direction = object.direction | Direction.RIGHT;
	      object.x += object.speed * timeframe;
	    }

	    // Ограничения по перемещению по полю. Маг не может выйти за пределы поля.
	    if (object.y < 0) {
	      object.y = 0;
	      object.Direction = object.direction & ~Direction.DOWN;
	      object.Direction = object.direction & ~Direction.UP;
	    }

	    if (object.y > HEIGHT - object.height) {
	      object.y = HEIGHT - object.height;
	      object.Direction = object.direction & ~Direction.DOWN;
	      object.Direction = object.direction & ~Direction.UP;
	    }

	    if (object.x < 0) {
	      object.x = 0;
	    }

	    if (object.x > WIDTH - object.width) {
	      object.x = WIDTH - object.width;
	    }
	  };

	  /**
	   * Обновление движения файрбола. Файрбол выпускается в определенном направлении
	   * и после этого неуправляемо движется по прямой в заданном направлении. Если
	   * он пролетает весь экран насквозь, он исчезает.
	   * @param {Object} object
	   * @param {Object} state
	   * @param {number} timeframe
	   */
	  ObjectsBehaviour[ObjectType.FIREBALL] = function(object, state, timeframe) {
	    if (object.direction & Direction.LEFT) {
	      object.x -= object.speed * timeframe;
	    }

	    if (object.direction & Direction.RIGHT) {
	      object.x += object.speed * timeframe;
	    }

	    if (object.x < 0 || object.x > WIDTH) {
	      object.state = ObjectState.DISPOSED;
	    }
	  };

	  /**
	   * ID возможных ответов функций, проверяющих успех прохождения уровня.
	   * CONTINUE говорит о том, что раунд не закончен и игру нужно продолжать,
	   * WIN о том, что раунд выигран, FAIL — о поражении. PAUSE о том, что игру
	   * нужно прервать.
	   * @enum {number}
	   */
	  var Verdict = {
	    'CONTINUE': 0,
	    'WIN': 1,
	    'FAIL': 2,
	    'PAUSE': 3,
	    'INTRO': 4
	  };

	  /**
	   * Правила завершения уровня. Ключами служат ID уровней, значениями функции
	   * принимающие на вход состояние уровня и возвращающие true, если раунд
	   * можно завершать или false если нет.
	   * @type {Object.<Level, function(Object):boolean>}
	   */
	  var LevelsRules = {};

	  /**
	   * Уровень считается пройденным, если был выпущен файлболл и он улетел
	   * за экран.
	   * @param {Object} state
	   * @return {Verdict}
	   */
	  LevelsRules[Level.INTRO] = function(state) {
	    var fireballs = state.garbage.filter(function(object) {
	      return object.type === ObjectType.FIREBALL;
	    });

	    return fireballs.length ? Verdict.WIN : Verdict.CONTINUE;
	  };

	  /**
	   * Начальные условия для уровней.
	   * @enum {Object.<Level, function>}
	   */
	  var LevelsInitialize = {};

	  /**
	   * Первый уровень.
	   * @param {Object} state
	   * @return {Object}
	   */
	  LevelsInitialize[Level.INTRO] = function(state) {
	    state.objects.push(
	      // Установка персонажа в начальное положение. Он стоит в крайнем левом
	      // углу экрана, глядя вправо. Скорость перемещения персонажа на этом
	      // уровне равна 2px за кадр.
	      {
	        direction: Direction.RIGHT,
	        height: 84,
	        speed: 2,
	        sprite: 'img/wizard.gif',
	        spriteReversed: 'img/wizard-reversed.gif',
	        state: ObjectState.OK,
	        type: ObjectType.ME,
	        width: 61,
	        x: WIDTH / 3,
	        y: HEIGHT - 100
	      }
	    );

	    return state;
	  };

	  /**
	   * Конструктор объекта Game. Создает canvas, добавляет обработчики событий
	   * и показывает приветственный экран.
	   * @param {Element} container
	   * @constructor
	   */
	  var Game = function(container) {
	    this.container = container;
	    this.canvas = document.createElement('canvas');
	    this.canvas.width = container.clientWidth;
	    this.canvas.height = container.clientHeight;
	    this.container.appendChild(this.canvas);

	    this.ctx = this.canvas.getContext('2d');

	    this._onKeyDown = this._onKeyDown.bind(this);
	    this._onKeyUp = this._onKeyUp.bind(this);
	    this._pauseListener = this._pauseListener.bind(this);
	  };

	  Game.prototype = {
	    /**
	     * Текущий уровень игры.
	     * @type {Level}
	     */
	    level: INITIAL_LEVEL,

	    /**
	     * Состояние игры. Описывает местоположение всех объектов на игровой карте
	     * и время проведенное на уровне и в игре.
	     * @return {Object}
	     */
	    getInitialState: function() {
	      return {
	        // Статус игры. Если CONTINUE, то игра продолжается.
	        currentStatus: Verdict.CONTINUE,

	        // Объекты, удаленные на последнем кадре.
	        garbage: [],

	        // Время с момента отрисовки предыдущего кадра.
	        lastUpdated: null,

	        // Состояние нажатых клавиш.
	        keysPressed: {
	          ESC: false,
	          LEFT: false,
	          RIGHT: false,
	          SPACE: false,
	          UP: false
	        },

	        // Время начала прохождения уровня.
	        levelStartTime: null,

	        // Все объекты на карте.
	        objects: [],

	        // Время начала прохождения игры.
	        startTime: null
	      };
	    },

	    /**
	     * Начальные проверки и запуск текущего уровня.
	     * @param {Level=} level
	     * @param {boolean=} restart
	     */
	    initializeLevelAndStart: function(level, restart) {
	      level = typeof level === 'undefined' ? this.level : level;
	      restart = typeof restart === 'undefined' ? true : restart;

	      if (restart || !this.state) {
	        // При перезапуске уровня, происходит полная перезапись состояния
	        // игры из изначального состояния.
	        this.state = this.getInitialState();
	        this.state = LevelsInitialize[this.level](this.state);
	      } else {
	        // При продолжении уровня состояние сохраняется, кроме записи о том,
	        // что состояние уровня изменилось с паузы на продолжение игры.
	        this.state.currentStatus = Verdict.CONTINUE;
	      }

	      // Запись времени начала игры и времени начала уровня.
	      this.state.levelStartTime = Date.now();
	      if (!this.state.startTime) {
	        this.state.startTime = this.state.levelStartTime;
	      }

	      this._preloadImagesForLevel(function() {
	        // Предварительная отрисовка игрового экрана.
	        this.render();

	        // Установка обработчиков событий.
	        this._initializeGameListeners();

	        // Запуск игрового цикла.
	        this.update();
	      }.bind(this));
	    },

	    /**
	     * Временная остановка игры.
	     * @param {Verdict=} verdict
	     */
	    pauseLevel: function(verdict) {
	      if (verdict) {
	        this.state.currentStatus = verdict;
	      }

	      this.state.keysPressed.ESC = false;
	      this.state.lastUpdated = null;

	      this._removeGameListeners();
	      window.addEventListener('keydown', this._pauseListener);

	      this._drawPauseScreen();
	    },

	    /**
	     * Обработчик событий клавиатуры во время паузы.
	     * @param {KeyboardsEvent} evt
	     * @private
	     * @private
	     */
	    _pauseListener: function(evt) {
	      if (evt.keyCode === 32) {
	        evt.preventDefault();
	        var needToRestartTheGame = this.state.currentStatus === Verdict.WIN ||
	          this.state.currentStatus === Verdict.FAIL;
	        this.initializeLevelAndStart(this.level, needToRestartTheGame);

	        window.removeEventListener('keydown', this._pauseListener);
	      }
	    },

	    /**
	     * Разбивание текста на массив с заданным количеством символов.
	     * @param  {string} text Принимаемый текст.
	     * @param  {number} N    Максимальное количество символов.
	     * @return {array}       Массив из строк нужной длины.
	     */
	    _splitTextToLines: function(text, N) {
	      var words = text.split(' ');
	      var line = words.shift();
	      var arrayLine = [];

	      words.forEach(function(word) {
	        var textLine = line + ' ' + word;
	        if (textLine.length > N) {
	          arrayLine.push(line);
	          line = word;
	        } else {
	          line = textLine;
	        }
	      });
	      arrayLine.push(line);

	      return arrayLine;
	    },

	    /**
	     * Рисуем окно для вывода сообщений.
	     * @param  {number} x            Координата X.
	     * @param  {number} y            Координата Y.
	     * @param  {number} width        Ширина окна.
	     * @param  {number} height       Высота окна.
	     * @param  {string} color        Цвет окна.
	     */
	    _drawWindow: function(x, y, width, height, color) {
	      this.ctx.fillStyle = color;
	      this.ctx.fillRect(x, y - height, width, height);
	      // Нижний уголок.
	      this.ctx.beginPath();
	      this.ctx.moveTo(x + 20, y);
	      this.ctx.lineTo(x, y + 45);
	      this.ctx.lineTo(x + 50, y);
	      this.ctx.lineTo(x + 10, y);
	      this.ctx.closePath();
	      this.ctx.fill();
	    },

	    /**
	     * Отрисовка окна сообщений и текста.
	     * @param  {string} text Принимаемый текст.
	     */
	    _drawMessage: function(text) {
	      var character = this.state.objects[this.level];

	      // Окно сообщения
	      var messageX = character.x + character.width;
	      var messageY = character.y;
	      var messageWidth = 240;
	      var messageHeight = 0;
	      var windowColor = '#FFFFFF';

	      // Тень окна
	      var shadowX = messageX + 10;
	      var shadowY = messageY + 10;
	      var shadowColor = 'rgba(0, 0, 0, 0.7)';

	      // Текст
	      var fontSize = 16;
	      this.ctx.font = fontSize + 'px PT Mono';
	      var letterWidth = this.ctx.measureText(' ').width;
	      var N = (messageWidth - 20) / letterWidth;
	      var lines = this._splitTextToLines(text, N);
	      var lineHeight = fontSize * 1.3;
	      messageHeight = lines.length * lineHeight;
	      var textColor = '#000000';
	      var textX = messageX + 10;
	      var textY = messageY - messageHeight + (lineHeight - fontSize);

	      // Рисуем тень.
	      this._drawWindow(shadowX, shadowY, messageWidth, messageHeight, shadowColor);

	      // Рисуем окно сообщений.
	      this._drawWindow(messageX, messageY, messageWidth, messageHeight, windowColor);

	      // Рисуем текст.
	      this.ctx.textBaseline = 'hanging';
	      this.ctx.fillStyle = textColor;
	      lines.forEach(function(line) {
	        this.ctx.fillText(line, textX, textY);
	        textY += lineHeight;
	      }, this);
	    },

	    /**
	     * Отрисовка экрана паузы.
	     */
	    _drawPauseScreen: function() {
	      var messageText;

	      switch (this.state.currentStatus) {
	        case Verdict.WIN:
	          messageText = 'You have won!';
	          break;
	        case Verdict.FAIL:
	          messageText = 'You have failed!';
	          break;
	        case Verdict.PAUSE:
	          messageText = 'Game is on pause!';
	          break;
	        case Verdict.INTRO:
	          messageText = 'Welcome to the game! Press Space to start';
	          break;
	      }
	      this._drawMessage(messageText);
	    },

	    /**
	     * Предзагрузка необходимых изображений для уровня.
	     * @param {function} callback
	     * @private
	     */
	    _preloadImagesForLevel: function(callback) {
	      if (typeof this._imagesArePreloaded === 'undefined') {
	        this._imagesArePreloaded = [];
	      }

	      if (this._imagesArePreloaded[this.level]) {
	        callback();
	        return;
	      }

	      var levelImages = [];
	      this.state.objects.forEach(function(object) {
	        levelImages.push(object.sprite);

	        if (object.spriteReversed) {
	          levelImages.push(object.spriteReversed);
	        }
	      });

	      var i = levelImages.length;
	      var imagesToGo = levelImages.length;

	      while (i-- > 0) {
	        var image = new Image();
	        image.src = levelImages[i];
	        image.onload = function() {
	          if (--imagesToGo === 0) {
	            this._imagesArePreloaded[this.level] = true;
	            callback();
	          }
	        }.bind(this);
	      }
	    },

	    /**
	     * Обновление статуса объектов на экране. Добавляет объекты, которые должны
	     * появиться, выполняет проверку поведения всех объектов и удаляет те, которые
	     * должны исчезнуть.
	     * @param {number} delta Время, прошеднее с отрисовки прошлого кадра.
	     */
	    updateObjects: function(delta) {
	      // Персонаж.
	      var me = this.state.objects.filter(function(object) {
	        return object.type === ObjectType.ME;
	      })[0];

	      // Добавляет на карту файрбол по нажатию на Shift.
	      if (this.state.keysPressed.SHIFT) {
	        this.state.objects.push({
	          direction: me.direction,
	          height: 24,
	          speed: 5,
	          sprite: 'img/fireball.gif',
	          type: ObjectType.FIREBALL,
	          width: 24,
	          x: me.direction & Direction.RIGHT ? me.x + me.width : me.x - 24,
	          y: me.y + me.height / 2
	        });

	        this.state.keysPressed.SHIFT = false;
	      }

	      this.state.garbage = [];

	      // Убирает в garbage не используемые на карте объекты.
	      var remainingObjects = this.state.objects.filter(function(object) {
	        ObjectsBehaviour[object.type](object, this.state, delta);

	        if (object.state === ObjectState.DISPOSED) {
	          this.state.garbage.push(object);
	          return false;
	        }

	        return true;
	      }, this);

	      this.state.objects = remainingObjects;
	    },

	    /**
	     * Проверка статуса текущего уровня.
	     */
	    checkStatus: function() {
	      // Нет нужны запускать проверку, нужно ли останавливать уровень, если
	      // заранее известно, что да.
	      if (this.state.currentStatus !== Verdict.CONTINUE) {
	        return;
	      }

	      if (!this.commonRules) {
	        /**
	         * Проверки, не зависящие от уровня, но влияющие на его состояние.
	         * @type {Array.<functions(Object):Verdict>}
	         */
	        this.commonRules = [
	          /**
	           * Если персонаж мертв, игра прекращается.
	           * @param {Object} state
	           * @return {Verdict}
	           */
	          function checkDeath(state) {
	            var me = state.objects.filter(function(object) {
	              return object.type === ObjectType.ME;
	            })[0];

	            return me.state === ObjectState.DISPOSED ?
	              Verdict.FAIL :
	              Verdict.CONTINUE;
	          },

	          /**
	           * Если нажата клавиша Esc игра ставится на паузу.
	           * @param {Object} state
	           * @return {Verdict}
	           */
	          function checkKeys(state) {
	            return state.keysPressed.ESC ? Verdict.PAUSE : Verdict.CONTINUE;
	          },

	          /**
	           * Игра прекращается если игрок продолжает играть в нее два часа подряд.
	           * @param {Object} state
	           * @return {Verdict}
	           */
	          function checkTime(state) {
	            return Date.now() - state.startTime > 3 * 60 * 1000 ?
	              Verdict.FAIL :
	              Verdict.CONTINUE;
	          }
	        ];
	      }

	      // Проверка всех правил влияющих на уровень. Запускаем цикл проверок
	      // по всем универсальным проверкам и проверкам конкретного уровня.
	      // Цикл продолжается до тех пор, пока какая-либо из проверок не вернет
	      // любое другое состояние кроме CONTINUE или пока не пройдут все
	      // проверки. После этого состояние сохраняется.
	      var allChecks = this.commonRules.concat(LevelsRules[this.level]);
	      var currentCheck = Verdict.CONTINUE;
	      var currentRule;

	      while (currentCheck === Verdict.CONTINUE && allChecks.length) {
	        currentRule = allChecks.shift();
	        currentCheck = currentRule(this.state);
	      }

	      this.state.currentStatus = currentCheck;
	    },

	    /**
	     * Принудительная установка состояния игры. Используется для изменения
	     * состояния игры от внешних условий, например, когда необходимо остановить
	     * игру, если она находится вне области видимости и установить вводный
	     * экран.
	     * @param {Verdict} status
	     */
	    setGameStatus: function(status) {
	      if (this.state.currentStatus !== status) {
	        this.state.currentStatus = status;
	      }
	    },

	    /**
	     * Отрисовка всех объектов на экране.
	     */
	    render: function() {
	      // Удаление всех отрисованных на странице элементов.
	      this.ctx.clearRect(0, 0, WIDTH, HEIGHT);

	      // Выставление всех элементов, оставшихся в this.state.objects согласно
	      // их координатам и направлению.
	      this.state.objects.forEach(function(object) {
	        if (object.sprite) {
	          var image = new Image(object.width, object.height);
	          image.src = (object.spriteReversed && object.direction & Direction.LEFT) ?
	            object.spriteReversed :
	            object.sprite;
	          this.ctx.drawImage(image, object.x, object.y, object.width, object.height);
	        }
	      }, this);
	    },

	    /**
	     * Основной игровой цикл. Сначала проверяет состояние всех объектов игры
	     * и обновляет их согласно правилам их поведения, а затем запускает
	     * проверку текущего раунда. Рекурсивно продолжается до тех пор, пока
	     * проверка не вернет состояние FAIL, WIN или PAUSE.
	     */
	    update: function() {
	      if (!this.state.lastUpdated) {
	        this.state.lastUpdated = Date.now();
	      }

	      var delta = (Date.now() - this.state.lastUpdated) / 10;
	      this.updateObjects(delta);
	      this.checkStatus();

	      switch (this.state.currentStatus) {
	        case Verdict.CONTINUE:
	          this.state.lastUpdated = Date.now();
	          this.render();
	          requestAnimationFrame(function() {
	            this.update();
	          }.bind(this));
	          break;

	        case Verdict.WIN:
	        case Verdict.FAIL:
	        case Verdict.PAUSE:
	        case Verdict.INTRO:
	        default:
	          this.pauseLevel();
	          break;
	      }
	    },

	    /**
	     * @param {KeyboardEvent} evt [description]
	     * @private
	     */
	    _onKeyDown: function(evt) {
	      switch (evt.keyCode) {
	        case 37:
	          this.state.keysPressed.LEFT = true;
	          break;
	        case 39:
	          this.state.keysPressed.RIGHT = true;
	          break;
	        case 38:
	          this.state.keysPressed.UP = true;
	          break;
	        case 27:
	          this.state.keysPressed.ESC = true;
	          break;
	      }

	      if (evt.shiftKey) {
	        this.state.keysPressed.SHIFT = true;
	      }
	    },

	    /**
	     * @param {KeyboardEvent} evt [description]
	     * @private
	     */
	    _onKeyUp: function(evt) {
	      switch (evt.keyCode) {
	        case 37:
	          this.state.keysPressed.LEFT = false;
	          break;
	        case 39:
	          this.state.keysPressed.RIGHT = false;
	          break;
	        case 38:
	          this.state.keysPressed.UP = false;
	          break;
	        case 27:
	          this.state.keysPressed.ESC = false;
	          break;
	      }

	      if (evt.shiftKey) {
	        this.state.keysPressed.SHIFT = false;
	      }
	    },

	    /** @private */
	    _initializeGameListeners: function() {
	      window.addEventListener('keydown', this._onKeyDown);
	      window.addEventListener('keyup', this._onKeyUp);
	    },

	    /** @private */
	    _removeGameListeners: function() {
	      window.removeEventListener('keydown', this._onKeyDown);
	      window.removeEventListener('keyup', this._onKeyUp);
	    }
	  };

	  window.Game = Game;
	  window.Game.Verdict = Verdict;

	  /**
	   * Добавляем анимацию облакам
	   */
	  function moveClouds() {
	    var cloudsElement = document.querySelector('.header-clouds');
	    var headerElement = document.querySelector('header');
	    var headerPosition = headerElement.getBoundingClientRect();
	    cloudsElement.style.backgroundPosition = 50 + headerPosition.top / 10 + '%';
	  }

	  var setScrollGame = utils.throttle(function() {
	    var gameBlock = document.querySelector('.demo');
	    if (utils.isVisible(gameBlock)) {
	      window.addEventListener('scroll', moveClouds);
	    } else {
	      game.setGameStatus(window.Game.Verdict.PAUSE);
	      window.removeEventListener('scroll', moveClouds);
	    }
	  }, 100);

	  window.addEventListener('scroll', setScrollGame);


	  var game = new Game(document.querySelector('.demo'));
	  game.initializeLevelAndStart();
	  game.setGameStatus(window.Game.Verdict.INTRO);
	})();


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var load = __webpack_require__(6);

	var Review = __webpack_require__(7);
	var getMessageElement = __webpack_require__(10);

	var getFilteredReviews = __webpack_require__(11);
	var getQuantityReviews = __webpack_require__(12);

	var Data = __webpack_require__(13);

	var filtersContainer = document.querySelector('.reviews-filter');
	var reviewsContainter = document.querySelector('.reviews-list');
	var reviewsBlock = document.querySelector('.reviews');
	var buttonMoreReviews = document.querySelector('.reviews-controls-more');
	var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

	var pageNumber = 0;
	var filteredReviews = [];
	var renderedReviews = [];
	var reviews;

	filtersContainer.classList.add('invisible');


	/**
	 * Настройка для отрисовки следующей страницы
	 * @param {Array} reviewsArray Массив отзывов
	 */
	var loadNextPage = function(reviewsArray) {
	  var pageSize = 3;
	  var from = pageNumber * pageSize;
	  var to = from + pageSize;
	  var replace = from === 0;
	  var nextPageReviews = reviewsArray.slice(from, to);
	  // Показываем или скрываем кнопку "Еще отзывы"
	  buttonMoreReviews.classList.toggle('invisible', to >= reviewsArray.length);
	  if (nextPageReviews.length > 0) {
	    renderReviews(nextPageReviews, replace);
	    pageNumber++;
	  }
	};

	/**
	 * Добавление события клика для кнопки "Еще отзывы"
	 */
	var setButtonEnabled = function() {
	  buttonMoreReviews.addEventListener('click', function() {
	    loadNextPage(filteredReviews);
	  });
	};

	/**
	 * Отрисовываем отзывы
	 * @param  {Array} reviewsArray Массив отзывов
	 * @param {Boolean} replace
	 */
	var renderReviews = function(reviewsArray, replace) {
	  // Очищаем контейнер отзывов
	  if (replace) {
	    renderedReviews.forEach(function(review) {
	      review.remove();
	    });
	    renderedReviews = [];
	  }

	  if (reviewsArray.length === 0) {
	    getMessageElement('Нет подходящих сообщений. <br> Попробуйте изменить фильтрацию.', reviewsContainter);
	  }

	  // Отрисовываем каждый отзыв
	  reviewsArray.forEach(function(review) {
	    var dataReview = new Data(review);
	    renderedReviews.push(new Review(dataReview, reviewsContainter));
	  });
	};

	/**
	 * Активируем input для нужного фильтра.
	 * @param {string} filter Активный фильтр.
	 */
	var setInputEnabled = function(filter) {
	  var activeFilter = document.querySelector('#' + filter);
	  activeFilter.checked = !activeFilter.disabled;
	};

	/**
	 * Передает заданный фильтр, на основе которого отрисовываем список заново
	 * @param {string} filter Название фильтра
	 */
	var setFilterEnabled = function(filter) {
	  filteredReviews = getFilteredReviews(reviews, filter);
	  pageNumber = 0;
	  localStorage.setItem('filter', filter);
	  setInputEnabled(filter);
	  loadNextPage(filteredReviews);
	};

	// Добаляет каждому фильтру обработчик клика
	var setFiltersEnabled = function() {
	  filtersContainer.addEventListener('click', function(evt) {
	    if (evt.target.classList.contains('reviews-filter-item')) {
	      setFilterEnabled(evt.target.getAttribute('for'));
	    }
	  });
	};

	reviewsBlock.classList.add('reviews-list-loading');

	load(REVIEWS_LOAD_URL, function(error, loadedReviews) {
	  reviewsBlock.classList.remove('reviews-list-loading');
	  if (error) {
	    reviewsBlock.classList.add('reviews-load-failure');
	  } else {
	    reviews = loadedReviews;
	    getQuantityReviews(reviews, filteredReviews, filtersContainer);
	    var localFilter = localStorage.getItem('filter');
	    var currentFilter = localFilter ? localFilter : 'reviews-all';
	    // Включаем и отрисовываем начальный фильтр
	    setFilterEnabled(currentFilter);
	    setFiltersEnabled();
	    setButtonEnabled();
	  }
	});


	filtersContainer.classList.remove('invisible');


/***/ },
/* 6 */
/***/ function(module, exports) {

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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getReviewsElement = __webpack_require__(8);
	var BaseComponent = __webpack_require__(9);
	var utils = __webpack_require__(4);

	/**
	 * @param {Object} data
	 * @param {HTMLElement} container
	 * @constructor
	 */
	var Review = function(data, container) {
	  BaseComponent.call(this, getReviewsElement(data), container);
	  this.data = data;
	  this.onReviewClick = this.onReviewClick.bind(this);
	  this.onEvent(this.element, 'click', this.onReviewClick);
	  this.add();
	};

	utils.inherit(Review, BaseComponent);

	Review.prototype.onReviewClick = function(evt) {
	  if (evt.target.classList.contains('review-quiz-answer')) {
	    var reviewAnswer = evt.target.classList.contains('review-quiz-answer-yes');
	    this.data.changeReviewUsefulness(reviewAnswer);
	    if (this.activeAnswer) {
	      this.activeAnswer.classList.remove('review-quiz-answer-active');
	    }
	    evt.target.classList.add('review-quiz-answer-active');
	    this.activeAnswer = evt.target;
	  }
	};

	module.exports = Review;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(4);

	var IMAGE_WIDTH = 124;
	var IMAGE_HEIGTH = 124;

	var templateElement = document.querySelector('#review-template');
	var elementToClone = utils.getElementToClone(templateElement, '.review');


	/**
	 * Сборка и добавление отзыва.
	 * @param  {obj} data Объект который нужно добавить.
	 */
	var getReviewsElement = function(data) {
	  var element = elementToClone.cloneNode(true);
	  var authorImage = element.querySelector('.review-author');
	  element.querySelector('.review-text').textContent = data.getDescription();


	  var rating = element.querySelector('.review-rating');
	  var ratingArray = ['', '', 'two', 'three', 'four', 'five'];
	  if (data.getRating() > 1) {
	    rating.classList.add('review-rating-' + ratingArray[data.getRating()]);
	  }


	  utils.loadImage(data.getPictureUrl(), function(isOk) {
	    if (isOk) {
	      authorImage.src = data.getPictureUrl();
	      authorImage.width = IMAGE_WIDTH;
	      authorImage.height = IMAGE_HEIGTH;
	    } else {
	      authorImage.src = '';
	      element.classList.add('review-load-failure');
	    }
	  });

	  return element;
	};

	module.exports = getReviewsElement;


/***/ },
/* 9 */
/***/ function(module, exports) {

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


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(4);
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


/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	var REVIEWS_LAST_DAYS = 4;

	var reviewsFilters = {
	  'reviews-all': function(reviews) {
	    return reviews;
	  },

	  'reviews-recent': function(reviews) {
	    // Создаем текущую дату
	    var nowDate = new Date();
	    // Находим отзывы за последние REVIEWS_LAST_DAYS
	    return reviews
	      .filter(function(review) {
	        // Создаем дату отзыва
	        var reviewDate = new Date(review.date);
	        // Количетво дней между текущей датой и последним отзывом.
	        // Вычитаем из текущей даты дату отзыва и переводим в мс в дни
	        var daysAgo = (nowDate - reviewDate) / 1000 / 60 / 60 / 24;
	        // Если количетво дней между текущей датой и последним отзывом меньше
	        // или равно REVIEWS_LAST_DAYS
	        var isDate = daysAgo <= REVIEWS_LAST_DAYS;
	        // Если true, добавляем отзыв в массив
	        return isDate;
	      })
	      // Сортируем отзывы от новых к старым
	      .sort(function(a, b) {
	        var aDate = new Date(a.date);
	        var bDate = new Date(b.date);
	        return bDate - aDate;
	      });
	  },

	  'reviews-good': function(reviews) {
	    // Находим отзывы с рейтингом не ниже 3
	    return reviews
	      .filter(function(review) {
	        return (review.rating >= 3);
	      })
	      // Сортируем отзывы по убывынию рейтинга
	      .sort(function(a, b) {
	        return b.rating - a.rating;
	      });
	  },

	  'reviews-bad': function(reviews) {
	    // Находим отзывы с рейтингом ниже 3
	    return reviews
	      .filter(function(review) {
	        return (review.rating < 3);
	      })
	      // Сортируем отзывы по возрастанию рейтинга
	      .sort(function(a, b) {
	        return a.rating - b.rating;
	      });
	  },

	  'reviews-popular': function(reviews) {
	    // Сортируем отзывы по убыванию отенки отзыва
	    return reviews.sort(function(a, b) {
	      return b.review_usefulness - a.review_usefulness;
	    });
	  }
	};

	/**
	 * Создаем новый список отзывов согласно фильтру
	 * @param  {Array} reviews  Массив отзывов, который надо сортировать
	 * @param  {string} filter  Фильтр который нужно применить к списку
	 * @return {Array}  Новый отфильтрованный массив отзывов
	 */
	var getFilteredReviews = function(reviewsArray, filter) {
	  // Создаем копию исходного массива
	  var reviewsToFilter = reviewsArray.slice(0);
	  return reviewsFilters[filter](reviewsToFilter);
	};

	module.exports = getFilteredReviews;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getFilteredReviews = __webpack_require__(11);

	/**
	 * Добавляем каждому фильтру количество отзывов.
	 * @param  {number} quantity Количество отзывов
	 * @param  {Object} filter      Фильтр к которому добавляем количество отзывов
	 */
	var renderQuantityReviews = function(quantity, filter) {
	  filter.innerHTML += '<sup>' + quantity + '</sup>';
	};

	/**
	 * Получаем количество отзывов в каждом фильтре
	 * @param  {Array} reviews                Отзывы
	 * @param  {Array} filteredReviews        Отфильтровынные отзывы
	 * @param  {HTMLElement} filtersContainer Блок фильтров
	 */
	var getQuantityReviews = function(reviews, filteredReviews, filtersContainer) {
	  var filtersLabel = filtersContainer.querySelectorAll('label');
	  Array.prototype.forEach.call(filtersLabel, function(filterLabel) {
	    var filterName = filterLabel.getAttribute('for');
	    filteredReviews = getFilteredReviews(reviews, filterName);
	    var isEmptyReviews = filteredReviews.length === 0;
	    // Если отзывов 0 при данном фильтре, добавляем фильтру класс .filter-disabled
	    filterLabel.classList.toggle('filter-disabled', isEmptyReviews);

	    var filterInput = filtersContainer.querySelector('#' + filterName);
	    filterInput.disabled = isEmptyReviews;

	    renderQuantityReviews(filteredReviews.length, filterLabel);
	  });
	};

	module.exports = getQuantityReviews;


/***/ },
/* 13 */
/***/ function(module, exports) {

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


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Gallery = __webpack_require__(15);

	var photogalleryImages = document.querySelectorAll('.photogallery-image img');
	var photogallery = document.querySelector('.photogallery');

	var arrayPathPictures = Array.prototype.map.call(photogalleryImages, function(image) {
	  return image.getAttribute('src');
	});

	var gallery = new Gallery(arrayPathPictures);

	photogallery.addEventListener('click', function(evt) {
	  var imageNumber = arrayPathPictures.indexOf(evt.target.getAttribute('src'));
	  if (imageNumber >= 0) {
	    evt.preventDefault();
	    gallery.updateHash(imageNumber);
	  }
	});

	window.addEventListener('load', gallery.hashchange);


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(4);

	var Gallery = function(pictures) {
	  this.container = document.querySelector('.overlay-gallery');
	  this.controlLeft = this.container.querySelector('.overlay-gallery-control-left');
	  this.controlRight = this.container.querySelector('.overlay-gallery-control-right');
	  this.currentNumber = this.container.querySelector('.preview-number-current');
	  this.totalNumber = this.container.querySelector('.preview-number-total');
	  this.close = this.container.querySelector('.overlay-gallery-close');
	  this.galleryPreview = this.container.querySelector('.overlay-gallery-preview');

	  this.activePicture = 0;
	  this.pictures = pictures;

	  this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
	  this.hashchange = this.hashchange.bind(this);
	  this.hide = this.hide.bind(this);
	  this.showPreviousPicture = this.showPreviousPicture.bind(this);
	  this.showNextPicture = this.showNextPicture.bind(this);

	  window.addEventListener('hashchange', this.hashchange);
	};

	Gallery.prototype._onDocumentKeyDown = function(evt) {
	  var keyCode = evt.keyCode;
	  switch (keyCode) {
	    case utils.KeyCode.ESC:
	      this.hide();
	      break;
	    case utils.KeyCode.LEFT:
	      this.showPreviousPicture();
	      break;
	    case utils.KeyCode.RIGHT:
	      this.showNextPicture();
	      break;
	  }
	};

	Gallery.prototype.showPicture = function(picture) {
	  if (!this.preview) {
	    this.preview = new Image();
	    this.galleryPreview.appendChild(this.preview);
	  }
	  this.preview.src = this.pictures[picture];
	  this.currentNumber.innerHTML = picture + 1;
	  this.activePicture = picture;
	};

	Gallery.prototype.showPreviousPicture = function() {
	  var previousNumber = this.activePicture === 0 ? this.pictures.length - 1 : this.activePicture - 1;
	  this.updateHash(previousNumber);
	};

	Gallery.prototype.showNextPicture = function() {
	  var nextNumber = this.activePicture === this.pictures.length - 1 ? 0 : this.activePicture + 1;
	  this.updateHash(nextNumber);
	};

	Gallery.prototype.show = function(picture) {
	  this.activePicture = picture;
	  this.totalNumber.innerHTML = this.pictures.length;
	  this.container.classList.remove('invisible');

	  document.addEventListener('keydown', this._onDocumentKeyDown);
	  this.controlLeft.addEventListener('click', this.showPreviousPicture);
	  this.controlRight.addEventListener('click', this.showNextPicture);
	  this.close.addEventListener('click', this.hide);

	  this.showPicture(this.activePicture);
	};


	Gallery.prototype.hide = function() {
	  this.container.classList.add('invisible');
	  this.controlLeft.removeEventListener('click', this.showNextPicture);
	  this.controlRight.removeEventListener('click', this.showPreviousPicture);

	  this.close.removeEventListener('click', this.hide);
	  document.removeEventListener('keydown', this._onDocumentKeyDown);
	  history.pushState('', '', window.location.pathname);
	};

	Gallery.prototype.updateHash = function(number) {
	  location.hash = 'photo/' + this.pictures[number];
	};

	Gallery.prototype.hashchange = function() {
	  var hash = location.hash.match(/#photo\/(\S+)/);
	  if (hash) {
	    var numberPicture = this.pictures.indexOf(hash[1]);
	    if (numberPicture !== -1) {
	      this.show(numberPicture);
	    }
	  }
	};

	module.exports = Gallery;


/***/ }
/******/ ]);
