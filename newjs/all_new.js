"use strict";

/* CLIENT CORE FILE */

$(document).on('load', function() {

	/* INITS GLOBAL */

	f_initExtraMethods();

	/* INIT GLOBAL FUNCTIONS */

	function f_initExtraMethods(){

		// returned all key:value this object
		Object.prototype._comment = function(){

			let str_str = ``;

			for(let key in this){

				if(key !== '_comment'){

					str_str += `key: ${key}, value: ${this[key]};\n`;

				} // /if

			} // /for

			return str_str;

		} // /Object.prototype._comment


		// returned random value between min and max values
		Math._randomMinMax = function(min,max){

			return Math.random()*(max - min) + min;

		} // Math._randomMinMax


		// returned round random value between min and max values
		Math._randomMinMaxRound = function(min,max){

			return Math.round(Math.random()*(max - min) + min);
			
		} // Math._randomMinMaxRound

		// grad to rad
		Math.num_PI180 = Math.PI/180;

	}

	/* INITS GAME CLASSES */



	/* GAME CLASSES */

	// ракеты
	class Rocket{

		constructor(o_rocketParams, num_playerX, num_playerY){

			Object.assign(this, params);

			// если ракета самонаводящаяся, то угол остается дефолтный, если нет то считается по формуле
			if(this.case_typeW == 'H'){

				// игрок справа или слева, в зависимости от этого добавляется угол 0 или 180
				let case_side = this.case_koef == 1 ? 180 : 0;

				// рассчет угла
				this.num_a = -Math.atan2(this.num_y-num_playerY, this.num_x-num_playerY)*180/Math.PI+case_side;

			}
			
			// TODO: переписать на координаты оптимизирующего канваса
			this.image = new Image();
			this.image.src = (this.koef == 1) ? 'images/rockets/'+this.typeW+'.png' : 'images/rockets/r'+this.typeW+'.png';

			// TODO: переписать эти цифры в глобальные настройки
			this.w = (this.typeW == 'A') ? 13 : 28;
			this.h = (this.typeW == 'A') ? 6 : 10;

		}

		// отрисовка ракеты
		// TODO: разобраться что такое o_frameTime и переписать фуекцию с учетом типов данных
		_draw(o_frameTime, canvas_context){

			// если ракета за пределами экрана, возвращаем лимит координат
			// TODO: переписать крайние координаты в глобальные настройки
			if(this.num_x > 1000 || this.num_x < -300 || this.num_y > 1000 || this.num_y < -300){

				return 'coordLimit';

			}

			// TODO: переписать эту магию
			let timeK = t.tr/40;
			this.nach = timeK*this.koef*this.s;
			this.y -= this.nach*Math.sin(this.a*Math.num_PI180);
			this.x += this.nach*Math.sin((90-this.a)*Math.num_PI180);
			canvas_context.globalAlpha = 1;
			canvas_context.save();
			canvas_context.translate(this.x, this.y);
			canvas_context.rotate(-this.a*Math.num_PI180);
			canvas_context.drawImage(this.image, -this.w/2, -this.h/2, this.w, this.h);
			canvas_context.restore();

			return;

		}

	}

	class War{

		constructor(){

			this._init = function(o_params){
				
				Object.assign(this, o_params);

			}

			// навешиваем обработчик события клавиатуры
			this._initKeyboardEvents = function(){

				$(document).on('keyup keydown', o_player._keyboardEvent);

				return;

			}

			this._start = function(){

				/* немного инициализации */
				this.num_summTimeFramesElapsed = 0;
				this.num_countFrames = 0;
				this.num_timeFrameStart = window.performance.now();

				// старт отрисовки
				this.num_requestAnimationFrame = requestAnimationFrame(this._linkDraw());

			}

			// игра на паузу
			this._pause = function(){

				/* TODO: проверка: на паузу можно поставить только если идет игра с компьютером */

				// выключаем requestAnimationFrame
				cancelAnimationFrame(this.num_requestAnimationFrame);

				return;

			}

			// продолжение игры после паузы
			// отличается от _start отсутствием инициализации
			this._continue = function(){

				// ID таймера лежит тут
				this.num_requestAnimationFrame = requestAnimationFrame(this._linkDraw());

			}

			// для передачи this в _draw при вызове из requestAnimationFrame
			this._linkDraw = function(){

				let f_thisDraw = function(){

					o_war._draw();

					return;

				}

				return f_thisDraw;

			}

			// функция которая срабатывает каждый кадр
			// ведет статистику, вызывает отрисовку всех объектов
			this._draw = function(){

				// время от начала предыдущего кадра
				this.num_prevTimeFrameElapsed = window.performance.now() - this.num_timeFrameStart;

				// timestamp начала кадра
				this.num_timeFrameStart = window.performance.now();

				// передача всех объектов для отрисовки в обработчик
				this._drawObjects(this.arr_players);
				this._drawObjects(this.arr_rockets);
				this._drawObjects(this.arr_mapItems);
				this._drawObjects(this.arr_mapEvents);
				this._drawObjects(this.arr_effects);

				// ЭКСПЕРЕМЕНТАЛЬНО:
				// все отрисовки не рисуют, а записывают функции с стек отрисовки, чтобы ТУТ выполнить именно отрисовку за один раз
				// # this._drawStack();

				// timestamp окончания кадра
				this.num_timeFrameEnd = window.performance.now();

				// считаем время затраченное на отрисовку всего кадра
				this.num_timeFrameElapsed = this.num_timeFrameEnd - this.num_timeFrameStart;

				// среднее время кадра за X кадров
				{
					this.num_summTimeFramesElapsed += this.num_timeFrameElapsed;
					this.num_countFrames += 1;

					if(this.num_countFrames >= CONFIG.o_other.num_countFramesAveraging){

						this.num_timeFramesElapsedAveraging = this.num_summTimeFramesElapsed / this.num_countFrames;

						this.num_summTimeFramesElapsed = 0;
						this.num_countFrames = 0;	

					}
				}

				// ID таймера лежит тут
				this.num_requestAnimationFrame = requestAnimationFrame(this._linkDraw());

			}

			// рисует из стэка отрисовок
			// можно будет сделать распараллеливание по фреймам
			this._drawStack = function(){

				for(let i = 0; i < this.arr_drawStack.length; i++){

					this.arr_drawStack[i]();

				}

				return;

			}

			// универсальная функция, пробегает по переданому массиву и вызывает функцию отрисоки каждого объекта в нем
			this._drawObjects = function(arr_objects = []){

				// если пришедший массив пустой, выходим
				if(!arr_objects.length) return;

				for(let i = 0; i < arr_objects.length; i++){

					// если флаг паузы отрисовки есть, сразу идем к следующему элементу
					// например невидимость, или кружок полностью перезаряженного оружия
					if(arr_objects[i].bool_drawPause) continue;

					// отрисовка возвращает true если действие продолжается и false если рисовать текущий объект уже не надо
					let bool_active = arr_objects[i]._draw();

					// если объект рисовать уже не надо, удаляем его из массива
					if(!bool_active){

						arr_objects.splice(i, 1);
						i--;

					}

				}

				return;

			}

		}

	}

	//управление
	class KeySet{

		constructor(num_keyCode, case_action){
		// код клавиши и действие для этой клавиши.
		// если действие не задано, встанет по-умолчанию

			// keyCode - номер элемента. Элемент - имя клавиши.
			let arr_keys = ["none",,,,,,,,"backspace","Tab",,,,"Enter",,,"Shift","Ctrl","Alt","Pause","CapsLock",,,,,,,"Esc",,,,,"Пробел","PageUp","PageDown","End","Home","&#8592;","&#8593;","&#8594;","&#8595;",,,,,"Insert","Delete",,"0","1","2","3","4","5","6","7","8","9",,,,,,,,"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Left Win","Right Win","App",,,"Num 0","Num 1","Num 2","Num 3","Num 4","Num 5","Num 6","Num 7","Num 8","Num 9","Num *","Num +",,"Num -","Num .","Num /","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12",,,,,,,,,,,,,,,,,,,,,"NumLock","ScrollLock",,,,,,,,,"PrintScreen",,,"Meta",,,,,,,,,,,,,,,,,,,,,,,,,,,,,";","=",",","-",".","/","~",,,,,,,,,,,,,,,,,,,,,,,,,,,"[","\\","]","\'"];

			// ракеты
			let arr_rockets = ['A','B','C','D','E','F','G','H'];

			// скиллы
			let arr_skills = ['I','J','K','L','M','N','O','P','superSpeed'];

			// управление
			let arr_control = ['up','down'];

			// проверка существования действия (ищем действие в каждом массиве действий)
			this._hasAction = function(case_action){

				if(!case_action) return false;

				return !!((arr_rockets.indexOf(case_action) + 1) || (arr_skills.indexOf(case_action) + 1) || (arr_control.indexOf(case_action) + 1));

			} // /this._hasAction

			// дефолтные назначения
			this._setDefaultAction = function(str_keyName){

				let case_action;

				switch(this.str_keyName){

					// ракеты
					case '1': case_action = 'A'; break;
					case '2': case_action = 'B'; break;
					case '3': case_action = 'C'; break;
					case '4': case_action = 'D'; break;
					case '5': case_action = 'E'; break;
					case '6': case_action = 'F'; break;
					case '7': case_action = 'G'; break;
					case '8': case_action = 'H'; break;

					// скиллы
					case 'Q': case_action = 'I'; break;
					case 'W': case_action = 'J'; break;
					case 'E': case_action = 'K'; break;
					case 'R': case_action = 'L'; break;
					case 'T': case_action = 'M'; break;
					case 'Y': case_action = 'N'; break;
					case 'U': case_action = 'O'; break;
					case 'I': case_action = 'P'; break;

					// вверх
					case '&#8593;': case_action = 'up'; break;
					// вних
					case '&#8595;': case_action = 'down'; break;
					// ускорение
					case 'Shift': case_action = 'superSpeed'; break;

				}

				return case_action;

			} // /this._setDefaultAction

			// определение типа события
			this._getType = function(case_action){

				if(arr_rockets.indexOf(case_action) + 1){

					return 'rocket';

				}
				else if(arr_skills.indexOf(case_action) + 1){

					return 'skill';

				}
				else if(arr_control.indexOf(case_action) + 1){

					return 'control';

				}
				else{

					return false;

				}

			} // /this._getType

			// назначаем код клавиши на this
			this.num_keyCode = num_keyCode;

			// имя клавиши достаем из массива по keyCode
			this.str_keyName = arr_keys[num_keyCode];

			// если действие есть и существует, записываем в this. Если нет, определяем дефолтное.
			this.case_action = this._hasAction(case_action) ? case_action : this._setDefaultAction(case_action);

			// тип события
			this.case_type = this._getType(this.case_action);

		} // /constructor

		_comment(){

			return `Класс keySet\n
					Создает объект со следующими параметрами:\n
					num_keyCode: код клавиши, пришедший от JQuery\n
					str_keyName: имя клавиши, задано в массиве arr_keys\n
					case_action: действие для нажатия клавиши. Может принимать значения любых действий в битве. Например A - выстрел из пулемета, up - самолет летит вверх\n
					case_type: тип действия. ракета, скилл, управление\n`;

		}

	}

	//игроки
	class Player{

		constructor(o_params){

			Object.assign(this, o_params);

		} // /constructor

		// обработчик событий клавиатуры
		// принимает код клавиши и тип - нажал или отпустил
		_keyboardEvent(o_ev){

			let num_keyCode = o_ev.keyCode;
			let str_type = o_ev.type;

			// если keyup (отпустили клавишу) то false, иначе true
			let bool_typeToValue = !(str_type == 'keyup');

			switch(num_keyCode){

				// клавиши у которых работает удержание	
				case o_player.o_controls.num_up:
				// клавиша вверх

					// проверяем, не установлено ли уже такое-же значение
					if(o_player.bool_controlUp != bool_typeToValue){

						o_player._controlUp(bool_typeToValue);
						
					}

				break;
				
				case o_player.o_controls.num_down:
				// клавиша вниз

					// проверяем, не установлено ли уже такое-же значение
					if(o_player.bool_controlDown != bool_typeToValue){

						o_player._controlDown(bool_typeToValue);
						
					}

				break;

				case o_player.o_controls.num_superSpeed:
				// ускорение

					// проверяем, не установлено ли уже такое-же значение
					if(o_player.bool_controlSuperSpeed != bool_typeToValue){

						o_player._controlSuperSpeed(bool_typeToValue);
						
					}

				break;

				// остальные клавиши (оружие, скиллы и т.д.)
				default:

					o_player._controlEvent(o_player.o_keyCodeActions[num_keyCode]);


			} // /switch

			return;

		} // /_keyboardEvent

		// обработчик исходящих выстрелов и скиллов
		// принимает код оружия/скилла
		_controlEvent(str_class){

			// TODO: везде добавить вывод сообщения об ошибке

			/* если хоть одна проверка не проходит, завершаем функцию */

			// определяем оружие это или скилл
			let str_type = 'o_' + CONFIG.o_weaponsAndSkills[str_class];

			// если время окончания перезарядки/(длительности эффекта для скилла) наступило (меньше текущего) 
			let bool_recharge = this.o_recharges[str_class] < window.performance.now();
			if(!bool_recharge) return;

			// проверка на количество
			let bool_count = this[str_type][str_class].num_count > 0;
			if(!bool_count) return;

			// проверка на перегрев (только оружие)
			if(str_type == 'o_weapons'){

				// если текущий перегрев + перегрев оружия меньше максимального перегрева, то ОК
				let bool_overheat = this.num_overheat + this[str_type][str_class].num_overheat <= CONFIG.o_other.num_maxOverheat;
				if(!bool_overheat) return;

			}

			// проверка на блокировку управления
			if(this.o_negativeEffects.bool_blockControl) return;

			// проверка доступности на самолете
			if(!this[str_type][str_class].bool_availableOnCurrentPlane) return;

			// включено ли в набор оружия в текущей войне
			if(!this[str_type][str_class].bool_enabledInWar) return;

			// нету ли блокировки после предыдущей отправки
			if(this.bool_blockEvent) return;

			/* все проверки прошли */

			// блокировка пока не будет получен ответ
			this.bool_blockEvent = true;

			// отправка данных на сервер (тип события и класс оружия/скилла)
			o_socket._jsonSend({str_type: 'controlEvent', str_class: str_class});

			return;

		} // /_controlEvent

		// обработчик установки полета вверх
		_controlUp(bool_val){

			// проверка на блокировку управления
			if(this.o_negativeEffects.bool_blockControl) return;

			// включаем 
			this.bool_controlUp = bool_val;

			// отправка данных на сервер (тип события)
			o_socket._jsonSend({str_type: 'controlUp', bool_val: bool_val});

			return;

		} // /_controlUp

		// обработчик установки полета вниз
		_controlDown(bool_val){

			// проверка на блокировку управления
			if(this.o_negativeEffects.bool_blockControl) return;

			// включаем 
			this.bool_controlDown = bool_val;

			// отправка данных на сервер (тип события)
			o_socket._jsonSend({str_type: 'controlDown', bool_val: bool_val});

			return;

		} // /_controlDown

		// обработчик установки суперскорости
		_controlSuperSpeed(bool_val){

			// проверка на блокировку управления
			if(this.o_negativeEffects.bool_blockControl) return;

			// проверка на минимальное наличие суперскорости
			let bool_superSpeed = this.num_superSpeed >= CONFIG.o_other.num_minSuperSpeed;
			if(!bool_superSpeed) return;

			// включаем 
			o_player.bool_controlSuperSpeed = bool_val;

			o_socket._jsonSend({str_type: 'controlSuperSpeed', bool_val: bool_val});

			return;

		} // /_controlSuperSpeed

	}

	class Interface{

		constructor(){


		}

		// скрывает игровой интерфейс
		_$_hiddenGame(){

			$('.game-interface').addClass('.game-interface_off');

			return;

		}
		// показывает игровой интерфейс
		_$_showGame(){

			$('.game-interface').removeClass('.game-interface_off');

			return;

		}

		// скрывает интерфейс битвы
		_$_hiddenWar(){

			$('.war-interface').addClass('.war-interface_off');

			return;

		}
		// показывает интерфейс битвы
		_$_showWar(){

			$('.war-interface').removeClass('.war-interface_off');

			return;

		}


	} // /Interface

	class WebSockets{

		constructor(){

	

		}

		// инициализация
		_init(f_callback){

			this.o_ws = new WebSocket('wss://78.155.197.229:80');

			this.o_ws.onopen = f_callback;

		}

		// обработчик входящих сообщений, пока навешиваются псевдо-все, но потом буду наввешиваться на каждый открытый сокет отдельно
		_initEvents(){

			// навешиваем метод роутера на входящие сообщения сокета
			this.o_ws.onmessage = o_router._allRouter;

		}

		// преобразует объект в json строку
		_jsonSend(ob_params){

			let str_params = JSON.stringify(ob_params);

			this.o_ws.send(str_params);

		}

	}

	let o_api = {

		_init: function(f_callback){

			setTimeout(f_callback, 1000);

		}

	}

	let o_socket = new WebSockets;

	let o_promiseChain = new Promise((f_resolve, f_reject) => {

		o_api._init(() => {

			f_resolve('init api');

		});

	}).then(o_result => {

		console.log(o_result);

		return new Promise((f_resolve, f_reject) => {

			o_socket._init(() => {

				f_resolve('init socket');

			});

		})

	}).then(o_result => {

		console.log(o_result);

		o_socket._initEvents();

	}) // /o_promiseChain

}) // /document.load