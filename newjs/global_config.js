/* Файл с глобальной конфигурацией, работающий и на клиенте и на сервере */
const CONFIG = {
a_medails = [
	{

		// пример одной медали

		char_nameText: 			'name',
		char_questText: 		'сыграть 10 раз | добить пулеметом',
		char_quest: 			'win | play | computer win ...',
		int_numInArray: 		0, // номер этого элемента в массиве всех
		int_progress: 			3,
		int_fullProgress: 		10,
		a_award: 				[
			{
				char_type: 			metall,
				int_value: 			10
			},
			{
				char_type: 			stars,
				int_value: 			20
			}
		],
		char_wallMessageText: 	'текст для стены',
		char_wallImageSrc: 		'/path/to/file',
		char_interfaceImageSrc: '/path/to/file'

	},
	// остальные медали
],
a_weapons = [
	{

		// пример одной ракеты
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
			int_metall: 		[10, 15],
			int_silicon: 		[10, 15],
			int_tnt: 			[10, 15],
			int_diamonds: 		[10, 15]
		},
		o_availableOnPlanes: { // доступно на самолетах
			bool_standard: 			true,
			bool_fast: 				true,
			bool_protected: 		true,
			bool_powerful: 			true,
			bool_maneuver: 			true,
			bool_secret: 			true
		}, 
		char_about: 		'Пулемёт&nbsp;&mdash; оружие &laquo;быстрого огня&raquo;. Скорость стрельбы очень высокая, пуля летит достаточно быстро, но&nbsp;точность и&nbsp;убойность оставляют желать лучшего. Больше всего подходит для &laquo;добивания&raquo; соперника. При попадании не&nbsp;оказывает никакого дополнительного воздействия на&nbsp;самолёт.'


	},
	// остальные ракеты
],
a_skills = [
	{

		// пример одного скилла
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
			bool_standard: 			true,
			bool_fast: 				true,
			bool_protected: 		true,
			bool_powerful: 			true,
			bool_maneuver: 			true,
			bool_secret: 			true
		}, 
		char_about: 		'Аптечка восстанавливает 10&nbsp;жизней прямо во&nbsp;время боя. Рекомендуется использовать когда количество жизней уже меньше&nbsp;25.'

	},
	// остальные скиллы
],
a_planes = [
	{

		// пример одного самолета
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
			int_star: 				[100, 200, 300],
			int_metall: 			[5, 10, 15],
			int_silicon: 			[5, 10, 15],
			int_tnt: 				[5, 10, 15],
			int_diamonds: 			[5, 10, 15]
		},
		o_requirements: 		{ // требования для покупки каждого Mk
			int_rating: 			[10000, 15000, 20000],
			int_technology1: 		[1,2,3], // микропроцессоры
			int_technology2: 		[1,2,3], // турбины
			int_technology3: 		[1,2,3], // строительные материалы
			int_technology4: 		[1,2,3], // система наведения
			int_technology5: 		[1,2,3], // искусственный интеллект
		},
		o_availableWeapons: 	{ // инициализируется функцией _a_planes__getAvailableWeapons

		},
		

	},
	// остальные самолеты
],

// функция преобразует o_availableOnPlanes в o_availableWeapons, принимает текущий номер самолета
_a_planes__getAvailableWeapons: 	function(){

	for(let p = 0; p < this.a_planes.length, p++){

		for(let w; w < this.a_weapons.length; w++){

			// имя класса оружия
			let char_className = this.a_weapons[w].char_class;

			// доступно ли оружие на текущем самолете
			let bool_enabled = this.a_weapons[w].o_availableOnPlanes['bool_' + this.this.a_planes[p].char_class];

			// присваиваем текущему самолету доступность текущего оружия
			this.a_planes[p].o_availableWeapons[char_className] = bool_enabled;

		}

	}

	return;

},

