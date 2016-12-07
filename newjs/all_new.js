/* RULES */
/*

class 			ClassName
method			_methodName
prototype		_prototypeMethodName
var, let 		char_variableName, int_variableName
function 		f_functionName
object			o_objectName
array			a_arrayName
DOM 			$_domName
const			CONST_NAME_NAME

mix:
DOM array 		a_$_arrayName
const array 	A_ARRAY_NAME
DOM function 	f_$_functionName
DOM method 		_$_methodName

objects need method _comment

*/
/* /RULES */

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

	class Rockets{

		constructor(o_rocketParams, float_playerX, float_playerY){

			// console.log(o_params._comment);

			Object.assign(this, params);

			/* DELETED */
			// this.koef = o_rocketParams.koef;
			// this.x = o_rocketParams.x;
			// this.y = o_rocketParams.y;
			// this.s = o_rocketParams.speed;
			// this.typeW = o_rocketParams.typeW;
			// this.hit = o_rocketParams.hit;
			// Math.PI180 = Math.PI/180;
			// this.a = (this.typeW == 'H') ? -Math.atan2(this.y-y, this.x-x)*180/Math.PI+((this.koef == 1)?180:0) : o_rocketParams.a;
			/* /DELETED */

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
		draw(o_frameTime, canvas_context){

			if(this.x > 1000 || this.x < -300 || this.y > 1000 || this.y < -300) return 'coordLimit';
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

		}

	}

})