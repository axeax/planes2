/* Файл с глобальной конфигурацией, работающий и на клиенте и на сервере */
/* НЕ имеет методов работы с интерфейсом. Для работы с интерфейсом существует отдельный класс */
/* Существующие методы работают ТОЛЬКО с самим объектом конфига для объединения повторяющихся данных и генерации существующих */

"use strict";

var Config = function(){
this.o_other = { 	// то что не группируется

	str_gameName: 			'Авиамясо: Битва за территории',
	num_maxFuel: 			100,
	num_theftFuel: 			1, // сколько топлива воруется у каждого друга
	num_dropFuelAfterWar: 	10, // сколько топлива тратится после битвы,
	num_maxOverheat: 		100, // максимальный перегрев игрока
	num_minSuperSpeed: 		10, // минимальный показатель суперскорости для использования
	num_maxSuperSpeed: 		10, // максимальный показатель суперскорости
	num_countFramesAveraging: 		60, // количество кадров для подсчета среднего

};
this.o_generalization = { 	// обобщаяющий объект содержит обобщающие данные

	arr_technologiesTimes: 		[], // формируется из функции _getTechnologiesTimes
	arr_technologiesTimesText: 	[], // формируется из функции _getTechnologiesTimes, для отображения на кнопке
	o_technologiesPrices: 		{
		arr_stars: 					[10,30,50,100,200], // массив цен в звездах для каждого уровня технологии
		arr_diamonds: 				[3,5,10,20,50] // массив цен в алмазах для каждого уровня технологии
	}

};
this.arr_store = [ 	// внутриигровые покупки
	{

		num_price: 		1, // стоимсоть в голосах
		str_type: 		'stars',
		str_name: 		'',
		o_award: 		{
			num_stars: 		10,
			num_bonus: 		0, // дополнительные звезды
		}

	},
	{

		num_price: 		5,
		str_type: 		'stars',
		str_name: 		'',
		o_award: 		{
			num_stars: 		50,
			num_bonus: 		2,
		}

	},
	{

		num_price: 		10,
		str_type: 		'stars',
		str_name: 		'',
		o_award: 		{
			num_stars: 		100,
			num_bonus: 		10,
		}

	},
	{

		num_price: 		30,
		str_type: 		'stars',
		str_name: 		'',
		o_award: 		{
			num_stars: 		300,
			num_bonus: 		50,
		}

	},
	{

		num_price: 		50,
		str_type: 		'stars',
		str_name: 		'',
		o_award: 		{
			num_stars: 		500,
			num_bonus: 		100,
		}

	},
	{

		num_price: 		100,
		str_type: 		'stars',
		str_name: 		'',
		o_award: 		{
			num_stars: 		1000,
			num_bonus: 		250,
		}

	},
	{

		num_price: 		5,
		str_type: 		'rating', // % увеличения рейтинга
		str_name: 		'',
		o_award: 		{
			num_multiplierRating: 	0.05
		}

	},
	{

		num_price: 		3,
		str_type: 		'cube',
		str_name: 		'Малый куб ресурсов',
		o_maxValues: 	{ // максимальное количество ресурсов которые можно получить, начинается от 0, рандом на сервере
			num_start: 		50,
			num_metall: 	50,
			num_silicon: 	50,
			num_tnt: 		50,
			num_diamonds: 	50
		}

	},
	{

		num_price: 		7,
		str_type: 		'cube',
		str_name: 		'Большой куб ресурсов',
		o_maxValues: 	{ // максимальное количество ресурсов которые можно получить, начинается от 0, рандом на сервере
			num_start: 		100,
			num_metall: 	100,
			num_silicon: 	100,
			num_tnt: 		100,
			num_diamonds: 	100
		}

	},
];
this.arr_medails = [	// все медали
	{ 	// пример одной медали

		str_nameText: 		'Медаль Преданного IV Ранга',
		str_questText: 		'сыграть ${this._declOfNum(o_tplValues.num_questSuccess, [" бой", " боя", " боев"])}',
		str_quest: 			'play',
		num_questSuccess: 		10, // количество str_quest для получения медали
		//num_numInArray: 		0, // номер этого элемента в массиве всехб сгенерируется автоматически
		o_award: 				{ // награда. Тут не будет оружия, только звезды, ресурсы и рейтинг
			num_diamonds: 			10,
			num_stars: 				30,
		},
		str_wallMessageText: 	'За ${this._declOfNum(o_tplValues.num_questSuccess, [" битву", " битвы", " битв"])} я получил ${o_tplValues.str_nameText} в игре ${this.o_other.str_gameName}'

	},
	{

		str_nameText: 			'Медаль Преданного III Ранга',
		str_questText: 			'сыграть ${this._declOfNum(o_tplValues.num_questSuccess, [" бой", " боя", " боев"])}',
		str_quest: 				'play',
		num_questSuccess: 		50,
		o_award: 				{
			num_metall: 			10,
			num_silicon: 			10,
			num_tnt: 				10,
			num_diamonds: 			10
		},
		str_wallMessageText: 	'За ${this._declOfNum(o_tplValues.num_questSuccess, [" битву", " битвы", " битв"])} я получил ${o_tplValues.str_nameText} в игре ${this.o_other.str_gameName}'

	},
	{

		str_nameText: 			'Медаль Преданного II Ранга',
		str_questText: 			'сыграть ${this._declOfNum(o_tplValues.num_questSuccess, [" бой", " боя", " боев"])}',
		str_quest: 				'play',
		num_questSuccess: 		100,
		o_award: 				{
			num_diamonds: 			30,
			num_stars: 				100,
		},
		str_wallMessageText: 	'За ${this._declOfNum(o_tplValues.num_questSuccess, [" битву", " битвы", " битв"])} я получил ${o_tplValues.str_nameText} в игре ${this.o_other.str_gameName}'

	},
	{

		str_nameText: 			'Медаль Преданного I Ранга',
		str_questText: 			'сыграть ${this._declOfNum(o_tplValues.num_questSuccess, [" бой", " боя", " боев"])}',
		str_quest: 				'play',
		num_questSuccess: 		500,
		o_award: 				{
			num_metall: 			50,
			num_silicon: 			50,
			num_tnt: 				50,
			num_diamonds: 			50
		},
		str_wallMessageText: 	'За ${this._declOfNum(o_tplValues.num_questSuccess, [" битву", " битвы", " битв"])} я получил ${o_tplValues.str_nameText} в игре ${this.o_other.str_gameName}'

	},
	{

		str_nameText: 			'Медаль Преданного Высшего Ранга',
		str_questText: 			'сыграть ${this._declOfNum(o_tplValues.num_questSuccess, [" бой", " боя", " боев"])}',
		str_quest: 				'play',
		num_questSuccess: 		1000,
		o_award: 				{
			num_metall: 			100,
			num_silicon: 			100,
			num_tnt: 				100,
			num_diamonds: 			100,
			num_stars: 				1000
		},
		str_wallMessageText: 	'За ${this._declOfNum(o_tplValues.num_questSuccess, [" битву", " битвы", " битв"])} я получил ${o_tplValues.str_nameText} в игре ${this.o_other.str_gameName}'

	},
	{

		str_nameText: 			'Медаль Победителя IV Ранга',
		str_questText: 			'победить в ${this._declOfNum(o_tplValues.num_questSuccess, [" бою", " боях", " боях"])}',
		str_quest: 				'win',
		num_questSuccess: 		10,
		o_award: 				{
			num_multiplierRating: 	0.05
		},
		str_wallMessageText: 	'За победу в ${this._declOfNum(o_tplValues.num_questSuccess, [" битве", " битвах", " битвах"])} я получил ${o_tplValues.str_nameText} в игре ${this.o_other.str_gameName}'

	},
	{

		str_nameText: 			'Медаль Победителя III Ранга',
		str_questText: 			'победить в ${this._declOfNum(o_tplValues.num_questSuccess, [" бою", " боях", " боях"])}',
		str_quest: 				'win',
		num_questSuccess: 		50,
		o_award: 				{
			num_multiplierRating: 	0.1
		},
		str_wallMessageText: 	'За победу в ${this._declOfNum(o_tplValues.num_questSuccess, [" битве", " битвах", " битвах"])} я получил ${o_tplValues.str_nameText} в игре ${this.o_other.str_gameName}'

	},
	{

		str_nameText: 			'Медаль Победителя II Ранга',
		str_questText: 			'победить в ${this._declOfNum(o_tplValues.num_questSuccess, [" бою", " боях", " боях"])}',
		str_quest: 				'win',
		num_questSuccess: 		100,
		o_award: 				{
			num_multiplierRating: 	0.2
		},
		str_wallMessageText: 	'За победу в ${this._declOfNum(o_tplValues.num_questSuccess, [" битве", " битвах", " битвах"])} я получил ${o_tplValues.str_nameText} в игре ${this.o_other.str_gameName}'

	},
	{

		str_nameText: 			'Медаль Победителя I Ранга',
		str_questText: 			'победить в ${this._declOfNum(o_tplValues.num_questSuccess, [" бою", " боях", " боях"])}',
		str_quest: 				'win',
		num_questSuccess: 		500,
		o_award: 				{
			num_multiplierRating: 	0.35
		},
		str_wallMessageText: 	'За победу в ${this._declOfNum(o_tplValues.num_questSuccess, [" битве", " битвах", " битвах"])} я получил ${o_tplValues.str_nameText} в игре ${this.o_other.str_gameName}'

	},
	{

		str_nameText: 			'Медаль Победителя Высшего Ранга',
		str_questText: 			'победить в ${this._declOfNum(o_tplValues.num_questSuccess, [" бою", " боях", " боях"])}',
		str_quest: 				'win',
		num_questSuccess: 		1000,
		o_award: 				{
			num_multiplierRating: 	0.5
		},
		str_wallMessageText: 	'За победу в ${this._declOfNum(o_tplValues.num_questSuccess, [" битве", " битвах", " битвах"])} я получил ${o_tplValues.str_nameText} в игре ${this.o_other.str_gameName}'

	},
	{

		str_nameText: 			'Награда за упорство',
		str_questText: 			'добить врага пулеметом',
		str_quest: 				'A',
		num_questSuccess: 		1,
		o_award: 				{
			num_stars: 	 			50
		},
		str_wallMessageText: 	'${o_tplValues.str_nameText} стала моей! Я получил ее за добивание врага из пулемета в игре ${this.o_other.str_gameName}'

	},
	{

		str_nameText: 			'Медаль Младшего Мародера',
		str_questText: 			'наворовать ${this._declOfNum(o_tplValues.num_questSuccess, [" литр", " литра", " литров"])} топлива',
		str_quest: 				'fuel',
		num_questSuccess: 		500,
		o_award: 				{
			num_multiplierFuel:	 	0.5
		},
		str_wallMessageText: 	'За воровство ${this._declOfNum(o_tplValues.num_questSuccess, [" литра", " литров", " литров"])} топлива я получил ${o_tplValues.str_nameText} в игре ${this.o_other.str_gameName}'

	},
	{

		str_nameText: 			'Медаль Старшего Мародера',
		str_questText: 			'наворовать ${this._declOfNum(o_tplValues.num_questSuccess, [" литр", " литра", " литров"])} топлива',
		str_quest: 				'fuel',
		num_questSuccess: 		1000,
		o_award: 				{
			bool_infinityFuel: 	 	true
		},
		str_wallMessageText: 	'За воровство ${this._declOfNum(o_tplValues.num_questSuccess, [" литра", " литров", " литров"])} топлива я получил ${o_tplValues.str_nameText} в игре ${this.o_other.str_gameName}'

	},
	{

		str_nameText: 			'Медаль Выжившего',
		str_questText: 			'победить с 1 жизнью',
		str_quest: 				'life',
		num_questSuccess: 		1,
		o_award: 				{
			num_metall: 			50,
			num_silicon: 			50,
			num_tnt: 				50,
			num_diamonds: 			50,
			num_stars: 				50
		},
		str_wallMessageText: 	'За победу с 1 жизнью я получил ${o_tplValues.str_nameText} в игре ${this.o_other.str_gameName}'

	},
	{

		str_nameText: 			'Серебряная Медаль за Отвагу',
		str_questText: 			'набрать ${o_tplValues.num_questSuccess} рейтинга',
		str_quest: 				'rating',
		num_questSuccess: 		10000,
		o_award: 				{
			num_metall: 			50,
			num_silicon: 			50,
			num_tnt: 				50,
			num_diamonds: 			50,
			num_stars: 				50
		},
		str_wallMessageText: 	'Я набрал ${o_tplValues.num_questSuccess} рейтинга в игре ${this.o_other.str_gameName} и получил Серебряную Медаль за Отвагу'

	},
	{

		str_nameText: 			'Золотая Медаль за Отвагу',
		str_questText: 			'набрать ${o_tplValues.num_questSuccess} рейтинга',
		str_quest: 				'rating',
		num_questSuccess: 		100000,
		o_award: 				{
			num_metall: 			50,
			num_silicon: 			50,
			num_tnt: 				50,
			num_diamonds: 			50,
			num_stars: 				50
		},
		str_wallMessageText: 	'Я набрал ${o_tplValues.num_questSuccess} рейтинга в игре ${this.o_other.str_gameName} и получил Золотую Медаль за Отвагу'

	},
	{

		str_nameText: 			'Медаль Пятого Дня',
		str_questText: 			'играть ${this._declOfNum(o_tplValues.num_questSuccess, [" день", " дня", " дней"])} подряд',
		str_quest: 				'days',
		num_questSuccess: 		5,
		o_award: 				{
			num_multiplierRating: 	0.03
		},
		str_wallMessageText: 	'Я играл ${this._declOfNum(o_tplValues.num_questSuccess, [" день", " дня", " дней"])} подряд в ${this.o_other.str_gameName} и получил ${o_tplValues.str_nameText}'

	},
	{

		str_nameText: 			'Медаль Десятого Дня',
		str_questText: 			'играть ${this._declOfNum(o_tplValues.num_questSuccess, [" день", " дня", " дней"])} подряд',
		str_quest: 				'days',
		num_questSuccess: 		10,
		o_award: 				{
			num_multiplierRating: 	0.05
		},
		str_wallMessageText: 	'Я играл ${this._declOfNum(o_tplValues.num_questSuccess, [" день", " дня", " дней"])} подряд в ${this.o_other.str_gameName} и получил ${o_tplValues.str_nameText}'

	},
];
this.arr_tournaments = [ 	// все турниры
	{

		str_name: 			'Общий рейтинг игроков',
		num_period: 		604800000, // неделя в миллисекундах
		str_period: 		'1 неделя',
		num_price: 			0, // стоимость участия в звездах
		o_award: 			{ // награда за 1, 2, 3 и 4-10 место
			arr_metall: 		[20,15,5,3],
			arr_silicon: 		[20,15,5,3],
			arr_tnt: 			[20,15,5,3],
			arr_diamonds: 		[10,7,3,1],
			arr_stars: 			[30,25,10,5]
		}

	},
	{

		str_name: 			'Турнир побед за неделю',
		num_period: 		604800000, // неделя в миллисекундах
		str_period: 		'1 неделя',
		num_price: 			10, // стоимость участия в звездах
		o_award: 			{ // награда за 1, 2, 3 и 4-10 место
			arr_metall: 		[30,25,10,7],
			arr_silicon: 		[30,25,10,7],
			arr_tnt: 			[30,25,10,7],
			arr_diamonds: 		[15,10,5,3],
			arr_stars: 			[50,40,15,10]
		}

	},
	{

		str_name: 			'Турнир побед за 4 недели',
		num_period: 		604800000 * 4, // 4 недели в миллисекундах
		str_period: 		'4 недели',
		num_price: 			50, // стоимость участия в звездах
		o_award: 			{ // награда за 1, 2, 3 и 4-10 место
			arr_metall: 		[70,50,30,10],
			arr_silicon: 		[70,50,30,10],
			arr_tnt: 			[70,50,30,10],
			arr_diamonds: 		[50,30,15,7],
			arr_stars: 			[200,100,50,20]
		}

	}
]
this.arr_weapons = [	// все оружие
	{ 	// пример одной ракеты
		// там, где представлен массив значений, они разделяются на wl1, wl2 и wl3

		str_name: 			'Пулемет',
		str_class: 			'A',
		num_numInArray: 	0, // номер этого элемента в массиве всех
		arr_fullName: 		['Пулемет WL-1', 'Пулемет WL-2', 'Пулемет WL-3'],
		arr_damageStart: 	[0.3, 0.4, 0.5],
		arr_damageEnd: 		[1, 1.1, 1.2],
		arr_accuracy: 		[1, 2, 3],
		arr_speed: 			[11, 12, 13],
		arr_recharge: 		[0.1, 0.1, 0.1],
		arr_overheat: 		[2, 1.5, 0.5], // перегрев
		num_rating: 		100, // рейтинг для покупки
		num_price: 			1, // стоимость в звездах
		num_purchase: 		300, // количество при покупке
		o_wlPrice: 			{ // стоимость каждого уровня оружия (всего 2, т.к. Wl1 уже куплено)
			arr_metall: 		[10, 15],
			arr_silicon: 		[10, 15],
			arr_tnt: 			[10, 15],
			arr_diamonds: 		[10, 15]
		},
		o_availableOnPlanes: { // доступно на самолетах (Mk 1, Mk2, Mk3)
			arr_standard: 		[true, true, true],
			arr_fast: 			[true, true, true],
			arr_protected: 		[true, true, true],
			arr_powerful: 		[true, true, true],
			arr_maneuver: 		[true, true, true],
			arr_secret: 		[true, true, true]
		},
		str_about: 'Пулемёт&nbsp;&mdash; оружие &laquo;быстрого огня&raquo;. Скорость стрельбы очень высокая, пуля летит достаточно быстро, но&nbsp;точность и&nbsp;убойность оставляют желать лучшего. Больше всего подходит для &laquo;добивания&raquo; соперника. При попадании не&nbsp;оказывает никакого дополнительного воздействия на&nbsp;самолёт.',
		str_buyButtonText: 'Купить ${this._declOfNum(o_tplValues.num_purchase, [" патрон", " патрона", " патронов"])} за ${this._declOfNum(o_tplValues.num_price, [" звезду", " звезды", " звезд"])}',
		str_buySuccessfullyText: 'Покупка ${this._declOfNum(o_tplValues.num_purchase, [" патрона", " патронов", " патронов"])} к пулемету прошла успешно',

	}
	// остальные ракеты
];
this.arr_skills = [	// все скиллы
	{	// пример одного скилла
		// у скиллов нету Wl

		str_name: 			'Аптечка',
		num_value: 			10, // обобщенное увелчиение эффекта. У аптечки жизь, у защиты - защита и т.д.
		str_class: 			'I',
		num_numInArray: 	0, // номер этого элемента в массиве всех
		arr_recharge: 		1, // перезарядка == время действия
		num_rating: 		1500, // рейтинг для покупки
		num_price: 			1, // стоимость в звездах
		num_purchase: 		5, // количество при покупке
		o_availableOnPlanes: { // доступно на самолетах (Mk 1, Mk2, Mk3)
			arr_standard: 		[true, true, true],
			arr_fast: 			[true, true, true],
			arr_protected: 		[true, true, true],
			arr_powerful: 		[true, true, true],
			arr_maneuver: 		[true, true, true],
			arr_secret: 		[true, true, true]
		}, 
		str_about: 'Аптечка восстанавливает 10&nbsp;жизней прямо во&nbsp;время боя. Рекомендуется использовать когда количество жизней уже меньше&nbsp;25.',
		str_buyButtonText: 'Купить ${this._declOfNum(o_tplValues.num_purchase, [" аптечку", " аптечки", " аптечек"])} за ${this._declOfNum(o_tplValues.num_price, [" звезду", " звезды", " звезд"])}',
		str_buySuccessfullyText: 'Покупка ${this._declOfNum(o_tplValues.num_purchase, [" аптечки", " аптечек", " аптечек"])} прошла успешно',

	}
	// остальные скиллы
];
this.arr_planes = [	// все самолеты
	{	// пример одного самолета
		// там, где представлен массив значений, они разделяются на mk1, mk2 и mk3

		str_name: 				'Самолет курсанта',
		str_class: 				'standard',
		num_numInArray: 		0, // номер этого элемента в массиве всех
		num_speed: 				10,
		num_control: 			10,
		num_protection: 		10,
		num_damage: 			10,
		num_rate: 				10,
		o_multiplier: 			{ // множители параметров для каждого Mk
			arr_speed: 				[1, 1.1, 1.2],
			arr_control: 			[1, 1.1, 1.2],
			arr_protection: 		[1, 1.1, 1.2],
			arr_damage: 			[1, 1.1, 1.2],
			arr_rate: 				[1, 1.1, 1.2]
		},
		o_price: 				{ // стоимость каждого Mk
			arr_stars: 				[100, 200, 300],
			arr_metall: 			[5, 10, 15],
			arr_silicon: 			[5, 10, 15],
			arr_tnt: 				[5, 10, 15],
			arr_diamonds: 			[5, 10, 15]
		},
		o_requirements: 		{ // требования для покупки каждого Mk
			arr_rating: 			[10000, 15000, 20000],
			arr_technology1: 		[1,2,3], // микропроцессоры
			arr_technology2: 		[1,2,3], // турбины
			arr_technology3: 		[1,2,3], // строительные материалы
			arr_technology4: 		[1,2,3], // система наведения
			arr_technology5: 		[1,2,3], // искусственный интеллект
		},
		o_availableWeapons: 	{ // доступное оружие на самолете (Mk 1, Mk2, Mk3) инициализируется функцией _getAvailableWeaponsAndSkillsForPlanes
			/*

			@arr_A: 					[true, true, true],
			@arr_B: 					[true, true, true],
			@arr_C: 					[true, true, true],
			@arr_D: 					[true, true, true],
			@arr_E: 					[false, true, true],
			@arr_F: 					[false, true, true],
			@arr_G: 					[false, true, true],
			@arr_H: 					[false, true, true]

			*/
		},
		o_availableSkills: 		{ // доступные скиллы на самолете (Mk 1, Mk2, Mk3) инициализируется функцией _getAvailableWeaponsAndSkillsForPlanes
			/*

			@arr_I: 					[true, true, true],
			@arr_J: 					[true, true, true],
			@arr_K: 					[true, true, true],
			@arr_L: 					[true, true, true],
			@arr_M: 					[false, true, true],
			@arr_N: 					[false, true, true],
			@arr_O: 					[false, true, true],
			@arr_P: 					[false, true, true]

			*/
		}	

	}
	// остальные самолеты
];
this.arr_params = [	// все параметры самолета. Параметры распостраняются на все самолеты сразу
	{	// пример одного параметра

		str_nameText: 		'скорость',
		str_nameClass: 		'speed',
		num_numInArray: 	0, // номер этого элемента в массиве всех
		num_default: 		10,
		num_maxValue: 		30,
		arr_priceStars: 		[], // массив цен по каждому шагу, формируется функцией _getPricesParams
		arr_priceRating: 		[], // массив необходимого рейтинга для покупки, формируется функцией _getPricesParams

	}
];
this.arr_technologies = [ 	// все парметри технологий
	{ 	// пример одной технологии

		str_nameText: 		'Усовершенствование микропроцессоров',
		str_about: 			'Разработка новых микропроцессоров&nbsp;&mdash; одно из&nbsp;основных направлений, над которым трудятся ученые. Новые, более быстрые процессоры позволяют получать доступ к&nbsp;базе данных противника, и&nbsp;перед вылетом узнавать некоторых характерисики самолёта. С&nbsp;каждым уровнем развития технологии можно узнать больше о&nbsp;самолёте соперника.',
		num_numInArray: 	0 // номер этого элемента в массиве всех

	}
];

// функция преобразует o_availableOnPlanes из arr_skills и arr_weapons в o_availableWeapons и в o_availableSkills
this._getAvailableWeaponsAndSkillsForPlanes = function(){

	// самолеты
	for (let p = 0; p < this.arr_planes.length; p++) {

		// оружие
		for(let w = 0; w < this.arr_weapons.length; w++){

			// имя класса оружия
			let str_className = 'arr_' + this.arr_weapons[w].str_class;

			// оружие[текущее].доступностьНаСамолетах[имяСамолетаБеретсяТекущее];
			let arr_enabled = this.arr_weapons[w].o_availableOnPlanes['arr_' + this.arr_planes[p].str_class];

			// собираем массив доступно ли оружие на текущем самолете (в цикле перебирается Mk1, Mk2, Mk3)
			let arr_availableWeapons = [];
			for(let mk = 0; mk < arr_enabled.length; mk++){

				// загоняем в массив доступность текущего оружия Mk на текущем самолете Mk
				arr_availableWeapons.push(arr_enabled[mk]);

			}

			// присваиваем текущему самолету Mk доступность текущего оружия
			this.arr_planes[p].o_availableWeapons[str_className] = arr_availableWeapons;

		}

		// скиллы
		for(let w = 0; w < this.arr_skills.length; w++){

			// имя класса скилла
			let str_className = 'arr_' + this.arr_skills[w].str_class;

			// скилл[текущее].доступностьНаСамолетах[имяСамолетаБеретсяТекущее];
			let arr_enabled = this.arr_skills[w].o_availableOnPlanes['arr_' + this.arr_planes[p].str_class];

			// собираем массив доступен ли скилл на текущем самолете (в цикле перебирается Mk1, Mk2, Mk3)
			let arr_availableSkills = [];
			for(let mk = 0; mk < arr_enabled.length; mk++){

				// загоняем в массив доступность текущего скилла Mk на текущем самолете Mk
				arr_availableSkills.push(arr_enabled[mk]);

			}

			// присваиваем текущему самолету Mk доступность текущего скилла
			this.arr_planes[p].o_availableSkills[str_className] = arr_availableSkills;

		}

	}

	return;

}; // /_getAvailableWeaponsAndSkillsForPlanes

// функция генерирует текст по шаблону для оружия и скиллов
this._weaponsAndSkillsTextGenerator = function(){

	// обход по оружию
	for(let i = 0; i < this.arr_weapons.length; i++){

		// готовим подстановки для _postTemplate
		let o_tplValues = {
			num_purchase: this.arr_weapons[i].num_purchase,
			num_price: this.arr_weapons[i].num_price
		}

		this.arr_weapons[i].str_buyButtonText = this._postTemplate(this.arr_weapons[i].str_buyButtonText, o_tplValues);
		this.arr_weapons[i].str_buySuccessfullyText = this._postTemplate(this.arr_weapons[i].str_buySuccessfullyText, o_tplValues);

	}

	// обход по скиллам
	for(let i = 0; i < this.arr_skills.length; i++){

		// готовим подстановки для _postTemplate
		let o_tplValues = {
			num_purchase: this.arr_skills[i].num_purchase,
			num_price: this.arr_skills[i].num_price
		}

		this.arr_skills[i].str_buyButtonText = this._postTemplate(this.arr_skills[i].str_buyButtonText, o_tplValues);
		this.arr_skills[i].str_buySuccessfullyText = this._postTemplate(this.arr_skills[i].str_buySuccessfullyText, o_tplValues);

	}

	return;

}; // /_weaponsAndSkillsTextGenerator

// функция генерирует текст по шаблону для медалей
this._medailsTextGenerator = function(){

	// обход по медалям
	for(let i = 0; i < this.arr_medails.length; i++){

		// готовим подстановки для _postTemplate
		let o_tplValues = {
			str_nameText: this.arr_medails[i].str_nameText,
			num_questSuccess: this.arr_medails[i].num_questSuccess
		}

		this.arr_medails[i].str_questText = this._postTemplate(this.arr_medails[i].str_questText, o_tplValues);
		this.arr_medails[i].str_wallMessageText = this._postTemplate(this.arr_medails[i].str_wallMessageText, o_tplValues);

	}
	return;

}; // /_medailsTextGenerator

// постобработка шаблона. str_tpl - строка-шаблон, o_tplValues - значения для подстановки в строке-шаблоне
// чтобы в шаблон подставились подстановки, в шаблоне должно быть o_tplValues.valueName
this._postTemplate = function(str_tpl, o_tplValues){

	return eval("`" + str_tpl + "`");

} // /_postTemplate

// функция рассчитывает все цены и рейтинги для параметров самолета
this._getPricesParams = function(){

	for(let count_params = 0; count_params < this.arr_params.length; count_params++){

		let link_currentParam =  this.arr_params[count_params];

		for(let count_step = link_currentParam.num_default; count_step < link_currentParam.num_maxValue; count_step++){

			// инициализируем значения которые в конце добавятся в массив
			let num_stars = 0;
			let num_rating = 0;

			num_stars = f_getStars(count_step);
			num_rating = f_getRating(count_step);

			// добавляем рассчитанное значение в массив стоимости (звезды)
			link_currentParam.arr_priceStars[count_step] = num_stars;
			// добавляем рассчитанное значение в массив требований к рейтингу
			link_currentParam.arr_priceRating[count_step] = num_rating;

		}

	}

	// рассчитываем количество звезд для покупки исходя из текущего шага
	function f_getStars(count_step){

		// дефолная начальная стоимость - 10 звезд
		let num_stars;

		// рассчет по формуле
		num_stars = (count_step * count_step) / 10;

		// округляем в бОльшую сторону
		num_stars = Math.ceil(num_stars);	

		return num_stars;

	}

	// рассчитываем рейтинг необходимый для покупки исходя из текущего шага
	function f_getRating(count_step){

		// дефолная начальная стоимость - 10 звезд
		let num_rating;

		// рассчет по формуле
		num_rating = Math.pow(count_step, 4) / 10;

		// округляем в бОльшую сторону до 100
		num_rating = Math.ceil(num_rating);
		// округляем до 100
		num_rating = num_rating - num_rating%100;

		return num_rating;

	}

	return;

}; // /_getPricesParams

// функция рассчитывает время изучения технологии на каждом уровне
this._getTechnologiesTimes = function(){

	for(let l = 0; l < this.o_generalization.o_technologiesPrices.arr_diamonds.length; l++){

		// время изучения технологии в миллисекундах и часах
		// алмазы * 4 == часы
		// алмазы * 4 * 1000 * 60 * 60
		let num_hours = this.o_generalization.o_technologiesPrices.arr_diamonds[l] * 4;
		let num_timeMs = num_hours * 1000 * 60 * 60;

		// делаем фразу Х часов
		let str_timeHourText = this._declOfNum(num_hours, [' час', ' часа', ' часов']);

		this.o_generalization.arr_technologiesTimes.push(num_timeMs);
		this.o_generalization.arr_technologiesTimesText.push(str_timeHourText);

	}

	return;

}; // /_getTechnologiesTimes

// проверяет соответствие имя_переменной - тип_переменной. Принимает имя, которое потом рекурсивно конкатенирует с остальными
this._TEST = function(str_prevName){

	// принимает значение и имя переменной, возвращает тип и соответствие имени
	function f_getType(value, name){

		// возвращяемый объект
		let o_return = {
			str_type: '', // тип переменной
			bool_equivalent: '' // совпадает и именеи или нет
		}

		// массив соответствий
		let o_equivalents = {

			'array': 'arr_',
			'undefined': 'undefined_',
			'boolean': 'bool_',
			'string': 'str_',
			'number': 'num_',
			'object': 'o_',
			'function': ['f_', '_']

		}

		// назначаем текущий тип
		o_return.str_type = typeof value;

		// массив проходит отдельно
		if(Array.isArray(value)){ 

			o_return.str_type = 'array'; 

		}

		// сюда записывается тип переменной из имени
		let str_nameType = name.split('_')[0] + '_';

		// проверяем соответствие
		if(o_equivalents[o_return.str_type].indexOf(str_nameType) + 1){

			o_return.bool_equivalent = true;

		}
		else{

			o_return.bool_equivalent = false;

		}

		return o_return;

	}

	// результат для return
	var o_result = {
		arr_ok: [], // без ошибок
		arr_errors: [] // с ошибками
	};

	// циклом проходим по свойствам объекта
	for(let str_prop in this){

		// проверка на собственное значение, а не прототип
		if(this.hasOwnProperty(str_prop)){

			// вызываем функцию, возвращающую реальный тип и соответствие
			let o_type = f_getType(this[str_prop], str_prop);

			// готовим строку для вставки
			let str_stringForPush = `${str_prevName}.${str_prop}: ${o_type.str_type}, ${o_type.bool_equivalent}`;

			// если примитив - выведем еще значение
			if(o_type.str_type == 'string' || o_type.str_type == 'number' || o_type.str_type == 'boolean'){

				str_stringForPush += `: '${this[str_prop]}'`;

			}

			// заводим ошибку
			if(!o_type.bool_equivalent){

				o_result.arr_errors.push(str_stringForPush);

			}
			// записываем без ошибок
			else{

				o_result.arr_ok.push(str_stringForPush);

			}

			// если проверяемое значение является объектом - заглядываем внутрь (рекурсивно)
			if(o_type.str_type == 'object'){

				let o_recursionArr = CONFIG._TEST.call(this[str_prop], `	${str_prevName}.${str_prop}`);

				o_result.arr_ok = o_result.arr_ok.concat(o_recursionArr.arr_ok);
				o_result.arr_errors = o_result.arr_errors.concat(o_recursionArr.arr_errors);

			}
			// если проверяемое значение является массивом - заглядываем внутрь (рекурсивно)
			else if(o_type.str_type == 'array'){

				// внутри циклом обходим массив
				for(let i = 0; i < this[str_prop].length; i++){

					// и проверяем. Если элемент массива - объект, то заглядываем туда еще раз
					if(typeof this[str_prop][i] == 'object'){

						let o_recursionArr = CONFIG._TEST.call(this[str_prop][i], `	${str_prevName}.${str_prop}[${i}]`);

						o_result.arr_ok = o_result.arr_ok.concat(o_recursionArr.arr_ok);
						o_result.arr_errors = o_result.arr_errors.concat(o_recursionArr.arr_errors);

					}

				}

			}

		}

	}

	return o_result;

}; // /_TEST

// принимает число и массив слов [монитор, монитора, мониторов]
this._declOfNum = function(num_number, arr_titles) {

    let arr_cases = [2, 0, 1, 1, 1, 2];  
    return num_number + arr_titles[ (num_number%100>4 && num_number%100<20)? 2 : arr_cases[(num_number%10<5)?num_number%10:5] ];

} // /_declOfNum

this.o_ethalon = {num_a:1};
this.o_ethalonFalse = 1;

} // / Config

var CONFIG = new Config();

// инициализируем доступность оружия и бонусов на самолетах
CONFIG._getAvailableWeaponsAndSkillsForPlanes();
console.log('arr_planes:', CONFIG.arr_planes);

// инициализация цен и необходимого рейтинга для параметров
CONFIG._getPricesParams();
console.log('arr_params:', CONFIG.arr_params);

// инициализируем время изучения технологии, в миллисекундах и часах для текста
CONFIG._getTechnologiesTimes();
console.log('_getTechnologiesTimes:o_generalization:', CONFIG.o_generalization);

// обработка шаблонов в оружии и скиллах
CONFIG._weaponsAndSkillsTextGenerator();
console.log('arr_weapons:', CONFIG.arr_weapons);
console.log('arr_skills:', CONFIG.arr_skills);

// функция генерирует текст по шаблону для медалей
CONFIG._medailsTextGenerator();
console.log('arr_medails:', CONFIG.arr_medails);

// тестируем на соответствие имена переменных. Принимает имя, которое потом рекурсивно конкатенирует с остальными
{
	let test = CONFIG._TEST('CONFIG');
	console.log('test:', test);
}