/* Файл с глобальной конфигурацией, работающий и на клиенте и на сервере */
/* НЕ имеет методов работы с интерфейсом. Для работы с интерфейсом существует отдельный класс */
/* Существующие методы работают только с самим объектом конфига для объединения повторяющихся данных */

"use strict";

var Config = function(){

this.a_medails = [	// все медали
	{ 	// пример одной медали

		char_nameText: 			'name',
		char_questText: 		'сыграть 10 раз | добить пулеметом',
		char_quest: 			'win | play | computer win ...',
		int_numInArray: 		0, // номер этого элемента в массиве всех
		int_progress: 			3,
		int_fullProgress: 		10,
		a_award: 				[
			{
				char_type: 			'metall',
				int_value: 			10
			},
			{
				char_type: 			'stars',
				int_value: 			20
			}
		],
		char_wallMessageText: 	'текст для стены',
		char_wallImageSrc: 		'/path/to/file',
		char_interfaceImageSrc: '/path/to/file'

	}
	// остальные медали
];
this.a_weapons = [	// все оружие
	{ 	// пример одной ракеты
		// там, где представлен массив значений, они разделяются на wl1, wl2 и wl3

		char_name: 			'Пулемет',
		char_class: 		'A',
		int_numInArray: 	0, // номер этого элемента в массиве всех
		a_fullName: 		['Пулемет WL-1', 'Пулемет WL-2', 'Пулемет WL-3'],
		a_damageStart: 		[0.3, 0.4, 0.5],
		a_damageEnd: 		[1, 1.1, 1.2],
		a_accuracy: 		[1, 2, 3],
		a_speed: 			[11, 12, 13],
		a_recharge: 		[0.1, 0.1, 0.1],
		int_rating: 		100, // рейтинг для покупки
		int_price: 			1, // стоимость в звездах
		int_purchase: 		300, // количество при покупке
		o_wlPrice: 			{ // стоимость каждого уровня оружия (всего 2, т.к. Wl1 уже куплено)
			a_metall: 			[10, 15],
			a_silicon: 			[10, 15],
			a_tnt: 				[10, 15],
			a_diamonds: 		[10, 15]
		},
		o_availableOnPlanes: { // доступно на самолетах
			bool_standard: 		true,
			bool_fast: 			true,
			bool_protected: 	true,
			bool_powerful: 		true,
			bool_maneuver: 		true,
			bool_secret: 		true
		}, 
		char_about: 		'Пулемёт&nbsp;&mdash; оружие &laquo;быстрого огня&raquo;. Скорость стрельбы очень высокая, пуля летит достаточно быстро, но&nbsp;точность и&nbsp;убойность оставляют желать лучшего. Больше всего подходит для &laquo;добивания&raquo; соперника. При попадании не&nbsp;оказывает никакого дополнительного воздействия на&nbsp;самолёт.'

	}
	// остальные ракеты
];
this.a_skills = [	// все скиллы
	{	// пример одного скилла
		// у скиллов нету Wl

		char_name: 			'Аптечка',
		float_value: 		10, // обобщенное увелчиение эффекта. У аптечки жизь, у защиты - защита и т.д.
		char_class: 		'I',
		int_numInArray: 	0, // номер этого элемента в массиве всех
		float_duration: 	0, // время действия
		int_rating: 		1500, // рейтинг для покупки
		int_price: 			1, // стоимость в звездах
		int_purchase: 		5, // количество при покупке
		o_availableOnPlanes: { // доступно на самолетах
			bool_standard: 		true,
			bool_fast: 			true,
			bool_protected: 	true,
			bool_powerful: 		true,
			bool_maneuver: 		true,
			bool_secret: 		true
		}, 
		char_about: 		'Аптечка восстанавливает 10&nbsp;жизней прямо во&nbsp;время боя. Рекомендуется использовать когда количество жизней уже меньше&nbsp;25.'

	}
	// остальные скиллы
];
this.a_planes = [	// все самолеты
	{	// пример одного самолета
		// там, где представлен массив значений, они разделяются на mk1, mk2 и mk3

		char_name: 				'Самолет курсанта',
		char_class: 			'standard',
		int_numInArray: 		0, // номер этого элемента в массиве всех
		float_speed: 			10,
		float_control: 			10,
		float_protection: 		10,
		float_damage: 			10,
		float_rate: 			10,
		o_multiplier: 			{ // множители параметров для каждого Mk
			a_speed: 				[1, 1.1, 1.2],
			a_control: 				[1, 1.1, 1.2],
			a_protection: 			[1, 1.1, 1.2],
			a_damage: 				[1, 1.1, 1.2],
			a_rate: 				[1, 1.1, 1.2]
		},
		o_price: 				{ // стоимость каждого Mk
			a_star: 				[100, 200, 300],
			a_metall: 				[5, 10, 15],
			a_silicon: 				[5, 10, 15],
			a_tnt: 					[5, 10, 15],
			a_diamonds: 			[5, 10, 15]
		},
		o_requirements: 		{ // требования для покупки каждого Mk
			a_rating: 				[10000, 15000, 20000],
			a_technology1: 			[1,2,3], // микропроцессоры
			a_technology2: 			[1,2,3], // турбины
			a_technology3: 			[1,2,3], // строительные материалы
			a_technology4: 			[1,2,3], // система наведения
			a_technology5: 			[1,2,3], // искусственный интеллект
		},
		o_availableWeapons: 	{ // доступное оружие на самолете инициализируется функцией _getAvailableWeaponsAndSkillsForPlanes
			/*

			@bool_A: 				true,
			@bool_B: 				true,
			@bool_C: 				true,
			@bool_D: 				true,
			@bool_E: 				false,
			@bool_F: 				false,
			@bool_G: 				false,
			@bool_H: 				false

			*/
		},
		o_availableSkills: 		{ // доступные скиллы на самолете инициализируется функцией _getAvailableWeaponsAndSkillsForPlanes
			/*

			@bool_I: 				true,
			@bool_J: 				true,
			@bool_K: 				true,
			@bool_L: 				true,
			@bool_M: 				false,
			@bool_N: 				false,
			@bool_O: 				false,
			@bool_P: 				false

			*/
		}	

	}
	// остальные самолеты
];
this.a_params = [	// все параметры самолета. Параметры распостраняются на все самолеты сразу
	{	// пример одного параметра

		char_nameText: 		'скорость',
		char_nameClass: 	'speed',
		float_default: 		10,
		float_maxValue: 	30,
		a_priceStars: 		[], // массив цен по каждому шагу, формируется функцией _getPricesParams
		a_priceRating: 		[], // массив необходимого рейтинга для покупки, формируется функцией _getPricesParams

	}
];

// функция преобразует o_availableOnPlanes из a_skills и a_weapons в o_availableWeapons и в o_availableSkills
this._getAvailableWeaponsAndSkillsForPlanes = function(){

	for (let p = 0; p < this.a_planes.length; p++) {

		// оружие
		for(let w = 0; w < this.a_weapons.length; w++){

			// имя класса оружия
			let char_className = 'bool_' + this.a_weapons[w].char_class;

			// доступно ли оружие на текущем самолете
			// оружие.доступностьНаСамолетах[имяСамолетаБеретсяТекущее];
			let bool_enabled = this.a_weapons[w].o_availableOnPlanes['bool_' + this.a_planes[p].char_class];

			// присваиваем текущему самолету доступность текущего оружия
			this.a_planes[p].o_availableWeapons[char_className] = bool_enabled;

		}

		// скиллы
		for(let s = 0; s < this.a_skills.length; s++){

			// имя класса скилла
			let char_className = 'bool_' + this.a_skills[s].char_class;

			// доступен ли скилл на текущем самолете
			// скилл.доступностьНаСамолетах[имяСамолетаБеретсяТекущее];
			let bool_enabled = this.a_skills[s].o_availableOnPlanes['bool_' + this.a_planes[p].char_class];

			// присваиваем текущему самолету доступность текущего скилла
			this.a_planes[p].o_availableSkills[char_className] = bool_enabled;

		}

	}

	return;

}; // /_getAvailableWeaponsAndSkillsForPlanes

// функция рассчитывает все цены и рейтинги для параметров самолета
this._getPricesParams = function(){

	for(let count_params = 0; count_params < this.a_params.length; count_params++){

		let link_currentParam =  this.a_params[count_params];

		for(let count_step = link_currentParam.float_default; count_step < link_currentParam.float_maxValue; count_step++){

			// инициализируем значения которые в конце добавятся в массив
			let int_stars = 0;
			let int_rating = 0;

			int_stars = f_getStars(count_step);
			int_rating = f_getRating(count_step);

			// добавляем рассчитанное значение в массив стоимости (звезды)
			link_currentParam.a_priceStars[count_step] = int_stars;
			// добавляем рассчитанное значение в массив требований к рейтингу
			link_currentParam.a_priceRating[count_step] = int_rating;

		}

	}

	// рассчитываем количество звезд для покупки исходя из текущего шага
	function f_getStars(count_step){

		// дефолная начальная стоимость - 10 звезд
		let int_stars;

		// рассчет по формуле
		int_stars = (count_step * count_step) / 10;

		// округляем в бОльшую сторону
		int_stars = Math.ceil(int_stars);	

		return int_stars;

	}

	// рассчитываем рейтинг необходимый для покупки исходя из текущего шага
	function f_getRating(count_step){

		// дефолная начальная стоимость - 10 звезд
		let int_rating;

		// рассчет по формуле
		int_rating = Math.pow(count_step, 4) / 10;

		// округляем в бОльшую сторону до 100
		int_rating = Math.ceil(int_rating);
		// округляем до 100
		int_rating = int_rating - int_rating%100;

		return int_rating;

	}

	return;

}; // /_getPricesParams

// проверяет соответствие имя_переменной - тип_переменной
this._TEST = function(){

	// принимает значение и имя переменной, возвращает тип и соответствие имени
	function f_getType(value, name){

		// возвращяемый объект
		let o_return = {
			char_type: '', // тип переменной
			bool_equivalent: '' // совпадает и именеи или нет
		}

		// массив соответствий
		let o_equivalents = {

			'array': 'a_',
			'undefined': 'undefined_',
			'boolean': 'bool_',
			'string': 'char_',
			'number': ['int_', 'float_'],
			'object': 'o_',
			'function': ['f_', '_']

		}

		// назначаем текущий тип
		o_return.char_type = typeof value;

		// массив проходит отдельно
		if(Array.isArray(value)){ 

			o_return.char_type = 'array'; 

		}

		// сюда записывается тип переменной из имени
		let char_nameType = name.split('_')[0] + '_';

		// проверяем соответствие
		if(o_equivalents[o_return.char_type].indexOf(char_nameType) + 1){

			o_return.bool_equivalent = true;

		}
		else{

			o_return.bool_equivalent = false;

		}

		return o_return;

	}

	// циклом проходим по свойствам объекта
	for(let char_prop in this){

		// проверка на собственное значение, а не прототип
		if(this.hasOwnProperty(char_prop)){

			// вызываем функцию, возвращающую реальный тип и соответствие
			let o_type = f_getType(this[char_prop], char_prop);

			// предупреждаем о несоответствии
			if(!o_type.bool_equivalent){

				console.log('!!!');

			}

			// выводим результат теста
			console.log(`${char_prop}: ${o_type.char_type}, ${o_type.bool_equivalent}`);

			// если проверяемое значение является объектом - заглядываем внутрь (рекурсивно)
			if(o_type.char_type == 'object'){

				CONFIG._TEST.call(this[char_prop]);

			}
			// если проверяемое значение является массивом - заглядываем внутрь (рекурсивно)
			else if(o_type.char_type == 'array'){

				// внутри циклом обходим массив
				for(let i = 0; i < this[char_prop].length; i++){

					// и проверяем. Если элемент массива - объект, то заглядываем туда еще раз
					if(typeof this[char_prop][i] == 'object'){

						CONFIG._TEST.call(this[char_prop][i]);

					}

				}

			}

		}

	}

	return;

}; // /_TEST

} // / Config

var CONFIG = new Config();

// инициализируем доступность оружия и бонусов на самолетах
CONFIG._getAvailableWeaponsAndSkillsForPlanes();
console.log(CONFIG.a_planes);

// инициализация цен и необходимого рейтинга для параметров
CONFIG._getPricesParams();
console.log(CONFIG.a_params);

// тестируем на соответствие имена переменных
// CONFIG._TEST();