/* CLIENT CORE FILE */

$(document).on('load', function() {

	
	
	/* INITS GLOBAL */

	f_initExtraMethods();

	/* INIT GLOBAL FUNCTIONS */

	function f_initExtraMethods(){

		// returned all key:value this object
		Object.prototype._comment = function(){

			for(let key in this){

				if(key !== '_comment'){

					console.log(`key: ${key}, value: ${this[key]};\n`);

				} // /if

			} // /for

			return;

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

			switch(o_ev.keyCode){

				
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

					link_out.link_o_player._controlEvent('keyboardEvent', o_ev.keyCode);


			} // /switch

			return;

		} // /_keyboardEvent

	}

	//игроки
	class Player{

		constructor(o_params){

			// console.log(o_params._comment);

			Object.assign(this, o_params);



		}

		

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