/* CLIENT CORE FILE */

$(document).on('load', function() {

	
	
	/* INITS GLOBAL */

	f_initExtraMethods();

	/* INIT GLOBAL FUNCTIONS */

	function f_initExtraMethods(){

		// returned all key:value this object
		Object.prototype._comment = function(){

			let char_str = ``;

			for(let key in this){

				if(key !== '_comment'){

					char_str += `key: ${key}, value: ${this[key]};\n`;

				} // /if

			} // /for

			return char_str;

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
		Math.float_PI180 = Math.PI/180;

	}

	/* INITS GAME CLASSES */



	/* GAME CLASSES */

	// ракеты
	class Rocket{

		constructor(o_rocketParams, float_playerX, float_playerY){

			// console.log(o_params._comment);

			Object.assign(this, params);

			// если ракета самонаводящаяся, то угол остается дефолтный, если нет то считается по формуле
			if(this.case_typeW == 'H'){

				// игрок справа или слева, в зависимости от этого добавляется угол 0 или 180
				let case_side = this.case_koef == 1 ? 180 : 0;

				// рассчет угла
				this.float_a = -Math.atan2(this.float_y-float_playerY, this.float_x-float_playerY)*180/Math.PI+case_side;

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
			if(this.float_x > 1000 || this.float_x < -300 || this.float_y > 1000 || this.float_y < -300){

				return 'coordLimit';

			}

			// TODO: переписать эту магию
			let timeK = t.tr/40;
			this.nach = timeK*this.koef*this.s;
			this.y -= this.nach*Math.sin(this.a*Math.float_PI180);
			this.x += this.nach*Math.sin((90-this.a)*Math.float_PI180);
			canvas_context.globalAlpha = 1;
			canvas_context.save();
			canvas_context.translate(this.x, this.y);
			canvas_context.rotate(-this.a*Math.float_PI180);
			canvas_context.drawImage(this.image, -this.w/2, -this.h/2, this.w, this.h);
			canvas_context.restore();

			return;

		}

	}

	class War{

		constructor(link_o_player, link_o_global){

			this.link_o_player = link_o_player;
			this.link_o_global = link_o_global;

		}

		// навешиваем обработчик события клавиатуры
		_initKeyboardEvents(){

			var link_out = this;

			$(document).on('keyup keydown keypress', this._keyboardEvent);

			return;

		}

		// обработчик события клавиатуры
		_keyboardEvent(o_ev){

			let int_keyCode = o_ev.keyCode;

			switch(int_keyCode){

				
				case link_out.link_o_player.o_controlUp:
				// клавиша вверх

					link_out.link_o_player._controlEvent('up');

				break;
				
				case link_out.link_o_player.o_controlDown:
				// клавиша вниз

					link_out.link_o_player._controlEvent('down');

				break;

				default:
				// остальные клавиши (оружие, супер-скорость и т.д.)

					// ссылка на массив в котором содержится: код клавиши = действие
					let link_a_keyCodeActions = link_out.link_o_player.a_keyCodeActions;

					link_out.link_o_player._controlEvent(link_a_keyCodeActions[int_keyCode]);


			} // /switch

			return;

		} // /_keyboardEvent

	}

	//управление
	class KeySet{

		constructor(int_keyCode, case_action){
		// код клавиши и действие для этой клавиши.
		// если действие не задано, встанет по-умолчанию

			// keyCode - номер элемента. Элемент - имя клавиши.
			let a_keys = ["none",,,,,,,,"backspace","Tab",,,,"Enter",,,"Shift","Ctrl","Alt","Pause","CapsLock",,,,,,,"Esc",,,,,"Пробел","PageUp","PageDown","End","Home","&#8592;","&#8593;","&#8594;","&#8595;",,,,,"Insert","Delete",,"0","1","2","3","4","5","6","7","8","9",,,,,,,,"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Left Win","Right Win","App",,,"Num 0","Num 1","Num 2","Num 3","Num 4","Num 5","Num 6","Num 7","Num 8","Num 9","Num *","Num +",,"Num -","Num .","Num /","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12",,,,,,,,,,,,,,,,,,,,,"NumLock","ScrollLock",,,,,,,,,"PrintScreen",,,"Meta",,,,,,,,,,,,,,,,,,,,,,,,,,,,,";","=",",","-",".","/","~",,,,,,,,,,,,,,,,,,,,,,,,,,,"[","\\","]","\'"];

			// ракеты
			let a_rockets = ['A','B','C','D','E','F','G','H'];

			// скиллы
			let a_skills = ['I','J','K','L','M','N','O','P','superSpeed'];

			// управление
			let a_control = ['up','down'];

			// проверка существования действия (ищем действие в каждом массиве действий)
			this._hasAction = function(case_action){

				if(!case_action) return false;

				return !!((a_rockets.indexOf(case_action) + 1) || (a_skills.indexOf(case_action) + 1) || (a_control.indexOf(case_action) + 1));

			} // /this._hasAction

			// дефолтные назначения
			this._setDefaultAction = function(char_keyName){

				let case_action;

				switch(this.char_keyName){

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

				if(a_rockets.indexOf(case_action) + 1){

					return 'rocket';

				}
				else if(a_skills.indexOf(case_action) + 1){

					return 'skill';

				}
				else if(a_control.indexOf(case_action) + 1){

					return 'control';

				}
				else{

					return false;

				}

			} // /this._getType

			// назначаем код клавиши на this
			this.int_keyCode = int_keyCode;

			// имя клавиши достаем из массива по keyCode
			this.char_keyName = a_keys[int_keyCode];

			// если действие есть и существует, записываем в this. Если нет, определяем дефолтное.
			this.case_action = this._hasAction(case_action) ? case_action : this._setDefaultAction(case_action);

			// тип события
			this.case_type = this._getType(this.case_action);

		} // /constructor

		_comment(){

			return `Класс keySet\n
					Создает объект со следующими параметрами:\n
					int_keyCode: код клавиши, пришедший от JQuery\n
					char_keyName: имя клавиши, задано в массиве a_keys\n
					case_action: действие для нажатия клавиши. Может принимать значения любых действий в битве. Например A - выстрел из пулемета, up - самолет летит вверх\n
					case_type: тип действия. ракета, скилл, управление\n`;

		}

	}

	//игроки
	class Player{

		constructor(o_params){

			// console.log(o_params._comment);

			Object.assign(this, o_params);

			// код клавиши = объект

		}

		_controlEvent()

	}

	class Interface{

		constructor(link_o_player, link_o_global){

			this.link_o_player = link_o_player;
			this.link_o_global = link_o_global;

		}

		// прописывает ресурсы в интерфейс
		_$_setResources(){

			$('#metall span').html(this.link_o_player.a_int_resources[0]);
			$('#silicon span').html(this.link_o_player.a_int_resources[1]);
			$('#trotill span').html(this.link_o_player.a_int_resources[2]);
			$('#diamonds span').html(this.link_o_player.a_int_resources[3]);

			return;

		}

		// во время битвы пишет текущее здоровье
		_$_setWarLife(){
			
			$('#lifeW').css({width:this.link_o_player.float_life*1.8});
			$('#life .img').css({left:-20+this.link_o_player.float_life*1.8});

			return;

		}

		// во время битвы устанавливает прогресс накопления суперскорости
		_$_setWarSpeed(){
			
			$('#superSpeedW').css({width:this.link_o_player.float_superSpeedW});
			$('#superSpeed .img').css({left:-25+this.link_o_player.float_superSpeedW});

			return;

		}

		// во время битвы устанавливает прогресс накопления перегрева
		_$_setWarHot(){
			
			$('#hotW').css({width:this.link_o_player.float_hot*1.8});
			$('#hot .img').css({left:-14+this.link_o_player.float_hot*1.8});

			return;

		}

		// скрывает игровой интерфейс
		_$_hiddenGame(){

			$('.game-interface').addClass('.game-interface_off');

			return;

		}
		// показывает игровой интерфейс
		_$_hiddenGame(){

			$('.game-interface').removeClass('.game-interface_off');

			return;

		}

		// скрывает интерфейс битвы
		_$_showWar(){

			$('.war-interface').addClass('.war-interface_off');

			return;

		}
		// показывает интерфейс битвы
		_$_showWar(){

			$('.war-interface').removeClass('.war-interface_off');

			return;

		}

		// заполняет интерфейс битвы данными
		_$_fillWar(){

			let $_warInterfaceData = $(`.war-interface__data`);

			for(let i = 0; i < $_warInterfaceData.length; i++){

				let $_el = $_warInterfaceData[i];
				let char_dataName = $_el.data('data-name');
				let var_dataValue = this.link_o_player[char_dataName];

				$_el.html(var_dataValue);

			} // /for

			return;

		}


	} // /Interface

})