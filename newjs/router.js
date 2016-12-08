/* INCOMING MESSAGES ROUTER */



/* WAR ROUTER */

f_warRouter(o_message){

	switch(o_message.case_type){

		case 'startWar':
		// старт битвы

			// убираем игровой интерфейс
			_Interface.f_$_hideGameInterface();

			// включаем интерфейс битвы
			_Interface.f_$_showWarInterface();

			// зполняем интерфейс битвы данными
			_Interface.f_$_fillWarInterface();

			// инициализируем объект войны
			var _War = new War();

			// инициализируем игроков
			var _o_Players = new Players();;

			// инициализация объекта с ракетами
			var _o_Rockets = new Rockets();

			// инициализация объекта со скиллами
			var _o_Skills = new Skills();

			// включаем клавиатурные события
			_War._keyboardEvents();

			// старт отрисовки
			_War._start();

		break;

		case 'correctTraectory':
		// корректировка положения соперников

			// метод корректирует движение соперников
			_o_Players._correctTraectory(o_message);

		break;

		case 'shot':
		// выстрел

			// во все активные ракеты вставляется новая ракета
			_o_Rockets._push(new Rocket(o_message));

		break;

		case 'skill':
		// включение скилла

			// во все активные скиллы вставляется новый скилл
			_o_Skills._push(new Skill(o_message));

		break;

		case 'dropItem':
		// на поле появился бонусный предмет

			// добавляем предмет на поле
			_War._dropItem(new WarItem(o_message));

		break;

		case 'putItem':
		// кто-то подобрал предмет

			// обработка поднятия предмена
			_War._putItem(o_message);

		break;

		case 'hit':
		// попадание

			// отработка попадания
			_o_Players._hit(o_message);

		break;

		case 'mapObject':
		// событие карты (метеорит, гроза и т.д.)

			// добавляем объект на карту TODO
			_o_War._putMapObject(new MapObject(o_message));

	}

}



/* INTERFACE ROUTER */

f_interfaceRouter(o_message){



}