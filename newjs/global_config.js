/* Файл с глобальной конфигурацией, работающий и на клиенте и на сервере */
/* НЕ имеет методов работы с интерфейсом. Для работы с интерфейсом существует отдельный класс */
/* Существующие методы работают ТОЛЬКО с самим объектом конфига для объединения повторяющихся данных и генерации существующих */

"use strict";

var Config = function(){
this.o_other = { 	// то что не группируется

	char_gameName: 'Авиамясо: Битва за территории'

};
this.o_generalization = { 	// обобщаяющий объект содержит обобщающие данные

	a_technologiesTimes: 		[], // формируется из функции _getTechnologiesTimes
	a_technologiesTimesText: 	[], // формируется из функции _getTechnologiesTimes, для отображения на кнопке
	o_technologiesPrices: 		{
		a_stars: 					[10,30,50,100,200], // массив цен в звездах для каждого уровня технологии
		a_diamonds: 				[3,5,10,20,50] // массив цен в алмазах для каждого уровня технологии
	}

}
this.a_medails = [	// все медали
	{ 	// пример одной медали

		char_nameText: 			'Медаль Преданного IV Ранга',
		char_questText: 		'сыграть ${this._declOfNum(o_tplValues.int_questSuccess, [" бой", " боя", " боев"])}',
		char_quest: 			'play',
		int_questSuccess: 		10, // количество char_quest для получения медали
		//int_numInArray: 		0, // номер этого элемента в массиве всехб сгенерируется автоматически
		o_award: 				{ // награда. Тут не будет оружия, только звезды, ресурсы и рейтинг
			int_diamonds: 			10,
			int_stars: 				30,
		},
		char_wallMessageText: 	'За ${this._declOfNum(o_tplValues.int_questSuccess, [" битву", " битвы", " битв"])} я получил ${o_tplValues.char_nameText} в игре ${this.o_other.char_gameName}'

	},
	{

		char_nameText: 			'Медаль Преданного III Ранга',
		char_questText: 		'сыграть ${this._declOfNum(o_tplValues.int_questSuccess, [" бой", " боя", " боев"])}',
		char_quest: 			'play',
		int_questSuccess: 		50,
		o_award: 				{
			int_metall: 			10,
			int_silicon: 			10,
			int_tnt: 				10,
			int_diamonds: 			10
		},
		char_wallMessageText: 	'За ${this._declOfNum(o_tplValues.int_questSuccess, [" битву", " битвы", " битв"])} я получил ${o_tplValues.char_nameText} в игре ${this.o_other.char_gameName}'

	},
	{

		char_nameText: 			'Медаль Преданного II Ранга',
		char_questText: 		'сыграть ${this._declOfNum(o_tplValues.int_questSuccess, [" бой", " боя", " боев"])}',
		char_quest: 			'play',
		int_questSuccess: 		100,
		o_award: 				{
			int_diamonds: 			30,
			int_stars: 				100,
		},
		char_wallMessageText: 	'За ${this._declOfNum(o_tplValues.int_questSuccess, [" битву", " битвы", " битв"])} я получил ${o_tplValues.char_nameText} в игре ${this.o_other.char_gameName}'

	},
	{

		char_nameText: 			'Медаль Преданного I Ранга',
		char_questText: 		'сыграть ${this._declOfNum(o_tplValues.int_questSuccess, [" бой", " боя", " боев"])}',
		char_quest: 			'play',
		int_questSuccess: 		500,
		o_award: 				{
			int_metall: 			50,
			int_silicon: 			50,
			int_tnt: 				50,
			int_diamonds: 			50
		},
		char_wallMessageText: 	'За ${this._declOfNum(o_tplValues.int_questSuccess, [" битву", " битвы", " битв"])} я получил ${o_tplValues.char_nameText} в игре ${this.o_other.char_gameName}'

	},
	{

		char_nameText: 			'Медаль Преданного Высшего Ранга',
		char_questText: 		'сыграть ${this._declOfNum(o_tplValues.int_questSuccess, [" бой", " боя", " боев"])}',
		char_quest: 			'play',
		int_questSuccess: 		1000,
		o_award: 				{
			int_metall: 			100,
			int_silicon: 			100,
			int_tnt: 				100,
			int_diamonds: 			100,
			int_stars: 				1000
		},
		char_wallMessageText: 	'За ${this._declOfNum(o_tplValues.int_questSuccess, [" битву", " битвы", " битв"])} я получил ${o_tplValues.char_nameText} в игре ${this.o_other.char_gameName}'

	},
	{

		char_nameText: 			'Медаль Победителя IV Ранга',
		char_questText: 		'победить в ${this._declOfNum(o_tplValues.int_questSuccess, [" бою", " боях", " боях"])}',
		char_quest: 			'win',
		int_questSuccess: 		10,
		o_award: 				{
			int_multiplierRating: 	5
		},
		char_wallMessageText: 	'За победу в ${this._declOfNum(o_tplValues.int_questSuccess, [" битве", " битвах", " битвах"])} я получил ${o_tplValues.char_nameText} в игре ${this.o_other.char_gameName}'

	},
	{

		char_nameText: 			'Медаль Победителя III Ранга',
		char_questText: 		'победить в ${this._declOfNum(o_tplValues.int_questSuccess, [" бою", " боях", " боях"])}',
		char_quest: 			'win',
		int_questSuccess: 		50,
		o_award: 				{
			int_multiplierRating: 	10
		},
		char_wallMessageText: 	'За победу в ${this._declOfNum(o_tplValues.int_questSuccess, [" битве", " битвах", " битвах"])} я получил ${o_tplValues.char_nameText} в игре ${this.o_other.char_gameName}'

	},
	{

		char_nameText: 			'Медаль Победителя II Ранга',
		char_questText: 		'победить в ${this._declOfNum(o_tplValues.int_questSuccess, [" бою", " боях", " боях"])}',
		char_quest: 			'win',
		int_questSuccess: 		100,
		o_award: 				{
			int_multiplierRating: 	20
		},
		char_wallMessageText: 	'За победу в ${this._declOfNum(o_tplValues.int_questSuccess, [" битве", " битвах", " битвах"])} я получил ${o_tplValues.char_nameText} в игре ${this.o_other.char_gameName}'

	},
	{

		char_nameText: 			'Медаль Победителя I Ранга',
		char_questText: 		'победить в ${this._declOfNum(o_tplValues.int_questSuccess, [" бою", " боях", " боях"])}',
		char_quest: 			'win',
		int_questSuccess: 		500,
		o_award: 				{
			int_multiplierRating: 	35
		},
		char_wallMessageText: 	'За победу в ${this._declOfNum(o_tplValues.int_questSuccess, [" битве", " битвах", " битвах"])} я получил ${o_tplValues.char_nameText} в игре ${this.o_other.char_gameName}'

	},
	{

		char_nameText: 			'Медаль Победителя Высшего Ранга',
		char_questText: 		'победить в ${this._declOfNum(o_tplValues.int_questSuccess, [" бою", " боях", " боях"])}',
		char_quest: 			'win',
		int_questSuccess: 		1000,
		o_award: 				{
			int_multiplierRating: 	50
		},
		char_wallMessageText: 	'За победу в ${this._declOfNum(o_tplValues.int_questSuccess, [" битве", " битвах", " битвах"])} я получил ${o_tplValues.char_nameText} в игре ${this.o_other.char_gameName}'

	},
	{

		char_nameText: 			'Награда за упорство',
		char_questText: 		'добить врага пулеметом',
		char_quest: 			'A',
		int_questSuccess: 		1,
		o_award: 				{
			int_stars: 	 			50
		},
		char_wallMessageText: 	'${o_tplValues.char_nameText} стала моей! Я получил ее за добивание врага из пулемета в игре ${this.o_other.char_gameName}'

	},
	{

		char_nameText: 			'Медаль Младшего Мародера',
		char_questText: 		'наворовать ${this._declOfNum(o_tplValues.int_questSuccess, [" литр", " литра", " литров"])} топлива',
		char_quest: 			'fuel',
		int_questSuccess: 		500,
		o_award: 				{
			int_multiplierFuel:	 	50
		},
		char_wallMessageText: 	'За воровство ${this._declOfNum(o_tplValues.int_questSuccess, [" литра", " литров", " литров"])} топлива я получил ${o_tplValues.char_nameText} в игре ${this.o_other.char_gameName}'

	},
	{

		char_nameText: 			'Медаль Старшего Мародера',
		char_questText: 		'наворовать ${this._declOfNum(o_tplValues.int_questSuccess, [" литр", " литра", " литров"])} топлива',
		char_quest: 			'fuel',
		int_questSuccess: 		1000,
		o_award: 				{
			bool_infinityFuel: 	 	true
		},
		char_wallMessageText: 	'За воровство ${this._declOfNum(o_tplValues.int_questSuccess, [" литра", " литров", " литров"])} топлива я получил ${o_tplValues.char_nameText} в игре ${this.o_other.char_gameName}'

	},
	{

		char_nameText: 			'Медаль Выжившего',
		char_questText: 		'победить с 1 жизнью',
		char_quest: 			'life',
		int_questSuccess: 		1,
		o_award: 				{
			int_metall: 			50,
			int_silicon: 			50,
			int_tnt: 				50,
			int_diamonds: 			50,
			int_stars: 				50
		},
		char_wallMessageText: 	'За победу с 1 жизнью я получил ${o_tplValues.char_nameText} в игре ${this.o_other.char_gameName}'

	},
	{

		char_nameText: 			'Серебряная Медаль за Отвагу',
		char_questText: 		'набрать ${o_tplValues.int_questSuccess} рейтинга',
		char_quest: 			'rating',
		int_questSuccess: 		10000,
		o_award: 				{
			int_metall: 			50,
			int_silicon: 			50,
			int_tnt: 				50,
			int_diamonds: 			50,
			int_stars: 				50
		},
		char_wallMessageText: 	'Я набрал ${o_tplValues.int_questSuccess} рейтинга в игре ${this.o_other.char_gameName} и получил Серебряную Медаль за Отвагу'

	},
	{

		char_nameText: 			'Золотая Медаль за Отвагу',
		char_questText: 		'набрать ${o_tplValues.int_questSuccess} рейтинга',
		char_quest: 			'rating',
		int_questSuccess: 		100000,
		o_award: 				{
			int_metall: 			50,
			int_silicon: 			50,
			int_tnt: 				50,
			int_diamonds: 			50,
			int_stars: 				50
		},
		char_wallMessageText: 	'Я набрал ${o_tplValues.int_questSuccess} рейтинга в игре ${this.o_other.char_gameName} и получил Золотую Медаль за Отвагу'

	},
	{

		char_nameText: 			'Медаль Пятого Дня',
		char_questText: 		'играть ${this._declOfNum(o_tplValues.int_questSuccess, [" день", " дня", " дней"])} подряд',
		char_quest: 			'days',
		int_questSuccess: 		5,
		o_award: 				{
			int_multiplierRating: 	3
		},
		char_wallMessageText: 	'Я играл ${this._declOfNum(o_tplValues.int_questSuccess, [" день", " дня", " дней"])} подряд в ${this.o_other.char_gameName} и получил ${o_tplValues.char_nameText}'

	},
	{

		char_nameText: 			'Медаль Десятого Дня',
		char_questText: 		'играть ${this._declOfNum(o_tplValues.int_questSuccess, [" день", " дня", " дней"])} подряд',
		char_quest: 			'days',
		int_questSuccess: 		10,
		o_award: 				{
			int_multiplierRating: 	5
		},
		char_wallMessageText: 	'Я играл ${this._declOfNum(o_tplValues.int_questSuccess, [" день", " дня", " дней"])} подряд в ${this.o_other.char_gameName} и получил ${o_tplValues.char_nameText}'

	},
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
		o_availableOnPlanes: { // доступно на самолетах (Mk 1, Mk2, Mk3)
			a_standard: 		[true, true, true],
			a_fast: 			[true, true, true],
			a_protected: 		[true, true, true],
			a_powerful: 		[true, true, true],
			a_maneuver: 		[true, true, true],
			a_secret: 			[true, true, true]
		},
		char_about: 'Пулемёт&nbsp;&mdash; оружие &laquo;быстрого огня&raquo;. Скорость стрельбы очень высокая, пуля летит достаточно быстро, но&nbsp;точность и&nbsp;убойность оставляют желать лучшего. Больше всего подходит для &laquo;добивания&raquo; соперника. При попадании не&nbsp;оказывает никакого дополнительного воздействия на&nbsp;самолёт.',
		char_buyButtonText: 'Купить ${this._declOfNum(o_tplValues.int_purchase, [" патрон", " патрона", " патронов"])} за ${this._declOfNum(o_tplValues.int_price, [" звезду", " звезды", " звезд"])}',
		char_buySuccessfullyText: 'Покупка ${this._declOfNum(o_tplValues.int_purchase, [" патрона", " патронов", " патронов"])} к пулемету прошла успешно',

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
		o_availableOnPlanes: { // доступно на самолетах (Mk 1, Mk2, Mk3)
			a_standard: 		[true, true, true],
			a_fast: 			[true, true, true],
			a_protected: 		[true, true, true],
			a_powerful: 		[true, true, true],
			a_maneuver: 		[true, true, true],
			a_secret: 			[true, true, true]
		}, 
		char_about: 'Аптечка восстанавливает 10&nbsp;жизней прямо во&nbsp;время боя. Рекомендуется использовать когда количество жизней уже меньше&nbsp;25.',
		char_buyButtonText: 'Купить ${this._declOfNum(o_tplValues.int_purchase, [" аптечку", " аптечки", " аптечек"])} за ${this._declOfNum(o_tplValues.int_price, [" звезду", " звезды", " звезд"])}',
		char_buySuccessfullyText: 'Покупка ${this._declOfNum(o_tplValues.int_purchase, [" аптечки", " аптечек", " аптечек"])} прошла успешно',

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
			a_stars: 				[100, 200, 300],
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
		o_availableWeapons: 	{ // доступное оружие на самолете (Mk 1, Mk2, Mk3) инициализируется функцией _getAvailableWeaponsAndSkillsForPlanes
			/*

			@a_A: 					[true, true, true],
			@a_B: 					[true, true, true],
			@a_C: 					[true, true, true],
			@a_D: 					[true, true, true],
			@a_E: 					[false, true, true],
			@a_F: 					[false, true, true],
			@a_G: 					[false, true, true],
			@a_H: 					[false, true, true]

			*/
		},
		o_availableSkills: 		{ // доступные скиллы на самолете (Mk 1, Mk2, Mk3) инициализируется функцией _getAvailableWeaponsAndSkillsForPlanes
			/*

			@a_I: 					[true, true, true],
			@a_J: 					[true, true, true],
			@a_K: 					[true, true, true],
			@a_L: 					[true, true, true],
			@a_M: 					[false, true, true],
			@a_N: 					[false, true, true],
			@a_O: 					[false, true, true],
			@a_P: 					[false, true, true]

			*/
		}	

	}
	// остальные самолеты
];
this.a_params = [	// все параметры самолета. Параметры распостраняются на все самолеты сразу
	{	// пример одного параметра

		char_nameText: 		'скорость',
		char_nameClass: 	'speed',
		int_numInArray: 	0, // номер этого элемента в массиве всех
		float_default: 		10,
		float_maxValue: 	30,
		a_priceStars: 		[], // массив цен по каждому шагу, формируется функцией _getPricesParams
		a_priceRating: 		[], // массив необходимого рейтинга для покупки, формируется функцией _getPricesParams

	}
];
this.a_technologies = [ 	// все парметри технологий
	{ 	// пример одной технологии

		char_nameText: 		'Усовершенствование микропроцессоров',
		char_about: 		'Разработка новых микропроцессоров&nbsp;&mdash; одно из&nbsp;основных направлений, над которым трудятся ученые. Новые, более быстрые процессоры позволяют получать доступ к&nbsp;базе данных противника, и&nbsp;перед вылетом узнавать некоторых характерисики самолёта. С&nbsp;каждым уровнем развития технологии можно узнать больше о&nbsp;самолёте соперника.',
		int_numInArray: 	0 // номер этого элемента в массиве всех

	}
];

// функция преобразует o_availableOnPlanes из a_skills и a_weapons в o_availableWeapons и в o_availableSkills
this._getAvailableWeaponsAndSkillsForPlanes = function(){

	// самолеты
	for (let p = 0; p < this.a_planes.length; p++) {

		// оружие
		for(let w = 0; w < this.a_weapons.length; w++){

			// имя класса оружия
			let char_className = 'a_' + this.a_weapons[w].char_class;

			// оружие[текущее].доступностьНаСамолетах[имяСамолетаБеретсяТекущее];
			let a_enabled = this.a_weapons[w].o_availableOnPlanes['a_' + this.a_planes[p].char_class];

			// собираем массив доступно ли оружие на текущем самолете (в цикле перебирается Mk1, Mk2, Mk3)
			let a_availableWeapons = [];
			for(let mk = 0; mk < a_enabled.length; mk++){

				// загоняем в массив доступность текущего оружия Mk на текущем самолете Mk
				a_availableWeapons.push(a_enabled[mk]);

			}

			// присваиваем текущему самолету Mk доступность текущего оружия
			this.a_planes[p].o_availableWeapons[char_className] = a_availableWeapons;

		}

		// скиллы
		for(let w = 0; w < this.a_skills.length; w++){

			// имя класса скилла
			let char_className = 'a_' + this.a_skills[w].char_class;

			// скилл[текущее].доступностьНаСамолетах[имяСамолетаБеретсяТекущее];
			let a_enabled = this.a_skills[w].o_availableOnPlanes['a_' + this.a_planes[p].char_class];

			// собираем массив доступен ли скилл на текущем самолете (в цикле перебирается Mk1, Mk2, Mk3)
			let a_availableSkills = [];
			for(let mk = 0; mk < a_enabled.length; mk++){

				// загоняем в массив доступность текущего скилла Mk на текущем самолете Mk
				a_availableSkills.push(a_enabled[mk]);

			}

			// присваиваем текущему самолету Mk доступность текущего скилла
			this.a_planes[p].o_availableSkills[char_className] = a_availableSkills;

		}

	}

	return;

}; // /_getAvailableWeaponsAndSkillsForPlanes

// функция генерирует текст по шаблону для оружия и скиллов
this._weaponsAndSkillsTextGenerator = function(){

	// обход по оружию
	for(let i = 0; i < this.a_weapons.length; i++){

		// готовим подстановки для _postTemplate
		let o_tplValues = {
			int_purchase: this.a_weapons[i].int_purchase,
			int_price: this.a_weapons[i].int_price
		}

		this.a_weapons[i].char_buyButtonText = this._postTemplate(this.a_weapons[i].char_buyButtonText, o_tplValues);
		this.a_weapons[i].char_buySuccessfullyText = this._postTemplate(this.a_weapons[i].char_buySuccessfullyText, o_tplValues);

	}

	// обход по скиллам
	for(let i = 0; i < this.a_skills.length; i++){

		// готовим подстановки для _postTemplate
		let o_tplValues = {
			int_purchase: this.a_skills[i].int_purchase,
			int_price: this.a_skills[i].int_price
		}

		this.a_skills[i].char_buyButtonText = this._postTemplate(this.a_skills[i].char_buyButtonText, o_tplValues);
		this.a_skills[i].char_buySuccessfullyText = this._postTemplate(this.a_skills[i].char_buySuccessfullyText, o_tplValues);

	}

	return;

}; // /_weaponsAndSkillsTextGenerator

// функция генерирует текст по шаблону для медалей
this._medailsTextGenerator = function(){

	// обход по медалям
	for(let i = 0; i < this.a_medails.length; i++){

		// готовим подстановки для _postTemplate
		let o_tplValues = {
			char_nameText: this.a_medails[i].char_nameText,
			int_questSuccess: this.a_medails[i].int_questSuccess
		}

		this.a_medails[i].char_questText = this._postTemplate(this.a_medails[i].char_questText, o_tplValues);
		this.a_medails[i].char_wallMessageText = this._postTemplate(this.a_medails[i].char_wallMessageText, o_tplValues);

	}
	return;

}; // /_medailsTextGenerator

// постобработка шаблона. char_tpl - строка-шаблон, o_tplValues - значения для подстановки в строке-шаблоне
// чтобы в шаблон подставились подстановки, в шаблоне должно быть o_tplValues.valueName
this._postTemplate = function(char_tpl, o_tplValues){

	return eval("`" + char_tpl + "`");

} // /_postTemplate

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

// функция рассчитывает время изучения технологии на каждом уровне
this._getTechnologiesTimes = function(){

	for(let l = 0; l < this.o_generalization.o_technologiesPrices.a_diamonds.length; l++){

		// время изучения технологии в миллисекундах и часах
		// алмазы * 4 == часы
		// алмазы * 4 * 1000 * 60 * 60
		let int_hours = this.o_generalization.o_technologiesPrices.a_diamonds[l] * 4;
		let int_timeMs = int_hours * 1000 * 60 * 60;

		// делаем фразу Х часов
		let char_timeHourText = this._declOfNum(int_hours, [' час', ' часа', ' часов']);

		this.o_generalization.a_technologiesTimes.push(int_timeMs);
		this.o_generalization.a_technologiesTimesText.push(char_timeHourText);

	}

	return;

}; // /_getTechnologiesTimes

// проверяет соответствие имя_переменной - тип_переменной. Принимает имя, которое потом рекурсивно конкатенирует с остальными
this._TEST = function(char_prevName){

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

	// результат для return
	var o_result = {
		a_ok: [], // без ошибок
		a_errors: [] // с ошибками
	};

	// циклом проходим по свойствам объекта
	for(let char_prop in this){

		// проверка на собственное значение, а не прототип
		if(this.hasOwnProperty(char_prop)){

			// вызываем функцию, возвращающую реальный тип и соответствие
			let o_type = f_getType(this[char_prop], char_prop);

			// готовим строку для вставки
			let char_stringForPush = `${char_prevName}.${char_prop}: ${o_type.char_type}, ${o_type.bool_equivalent}`;

			// если примитив - выведем еще значение
			if(o_type.char_type == 'string' || o_type.char_type == 'number' || o_type.char_type == 'boolean'){

				char_stringForPush += `: '${this[char_prop]}'`;

			}

			// заводим ошибку
			if(!o_type.bool_equivalent){

				o_result.a_errors.push(char_stringForPush);

			}
			// записываем без ошибок
			else{

				o_result.a_ok.push(char_stringForPush);

			}

			// если проверяемое значение является объектом - заглядываем внутрь (рекурсивно)
			if(o_type.char_type == 'object'){

				let o_recursionArr = CONFIG._TEST.call(this[char_prop], `	${char_prevName}.${char_prop}`);

				o_result.a_ok = o_result.a_ok.concat(o_recursionArr.a_ok);
				o_result.a_errors = o_result.a_errors.concat(o_recursionArr.a_errors);

			}
			// если проверяемое значение является массивом - заглядываем внутрь (рекурсивно)
			else if(o_type.char_type == 'array'){

				// внутри циклом обходим массив
				for(let i = 0; i < this[char_prop].length; i++){

					// и проверяем. Если элемент массива - объект, то заглядываем туда еще раз
					if(typeof this[char_prop][i] == 'object'){

						let o_recursionArr = CONFIG._TEST.call(this[char_prop][i], `	${char_prevName}.${char_prop}[${i}]`);

						o_result.a_ok = o_result.a_ok.concat(o_recursionArr.a_ok);
						o_result.a_errors = o_result.a_errors.concat(o_recursionArr.a_errors);

					}

				}

			}

		}

	}

	return o_result;

}; // /_TEST

// принимает число и массив слов [монитор, монитора, мониторов]
this._declOfNum = function(float_number, a_titles) {

    let a_cases = [2, 0, 1, 1, 1, 2];  
    return float_number + a_titles[ (float_number%100>4 && float_number%100<20)? 2 : a_cases[(float_number%10<5)?float_number%10:5] ];

} // /_declOfNum

this.o_ethalon = {int_a:1};
this.o_ethalonFalse = 1;

} // / Config

var CONFIG = new Config();

// инициализируем доступность оружия и бонусов на самолетах
CONFIG._getAvailableWeaponsAndSkillsForPlanes();
console.log('a_planes:', CONFIG.a_planes);

// инициализация цен и необходимого рейтинга для параметров
CONFIG._getPricesParams();
console.log('a_params:', CONFIG.a_params);

// инициализируем время изучения технологии, в миллисекундах и часах для текста
CONFIG._getTechnologiesTimes();
console.log('_getTechnologiesTimes:o_generalization:', CONFIG.o_generalization);

// обработка шаблонов в оружии и скиллах
CONFIG._weaponsAndSkillsTextGenerator();
console.log('a_weapons:', CONFIG.a_weapons);
console.log('a_skills:', CONFIG.a_skills);

// функция генерирует текст по шаблону для медалей
CONFIG._medailsTextGenerator();
console.log('a_medails:', CONFIG.a_medails);

// тестируем на соответствие имена переменных. Принимает имя, которое потом рекурсивно конкатенирует с остальными
{
	let test = CONFIG._TEST('CONFIG');
	console.log('test:', test);
}