/* INCOMING MESSAGES ROUTER */



/* OTHER ROUTER */

var f_otherRouter = function(o_message){

	switch(o_message.case_type){
	
		case 'initPlayer':
		// самое первое сообщение инифиализации игрока

			// создаем игрока клиента из пришедших данных
			var _Player = new Player(o_message);


		break;

	}

}



/* WAR ROUTER */

var f_warRouter = function(o_message){

	switch(o_message.case_type){

		case 'startWar':
		// старт битвы

			// убираем игровой интерфейс
			_Interface._$_hideGame();

			// включаем интерфейс битвы
			_Interface._$_showWar();

			// зполняем интерфейс битвы данными
			_Interface._$_fillWar();

			// инициализируем объект войны
			// TODO: передать глобальный объект и объект игрока по ссылке
			var _War = new War();

			// инициализируем игроков
			var _a_Players = [];

			// пробегаемся по массиву с пришедшими игроками и засовываем их в свой массив через new Player(); 
			for(let i; i < o_message._a_players.length; i++){

				// ссылка на игрока, которого сейчас обходим в цикле
				let link_currentPlayer = o_message._a_players[i];

				// Если имеем дело с самими собой, принудительно пихаем в 0 элемент массива.
				let int_playerIdInPlayers = link_currentPlayer.int_vkId == _Player.vkId ? 0 : i+1;

				_a_Players[int_playerIdInPlayers] = new Player(link_currentPlayer);

			}

			// инициализация объекта с ракетами
			var _a_Rockets = new Rockets();

			// инициализация объекта со скиллами
			var _a_Skills = new Skills();

			// включаем клавиатурные события
			_War._initKeyboardEvents();

			// старт отрисовки
			_War._start();

		break;

		case 'correctTraectory':
		// корректировка положения соперников

			// метод корректирует движение соперников
			_a_Players._correctTraectory(o_message);

		break;

		case 'shot':
		// выстрел

			// во все активные ракеты вставляется новая ракета
			_a_Rockets._push(new Rocket(o_message));

		break;

		case 'skill':
		// включение скилла

			// во все активные скиллы вставляется новый скилл
			_a_Skills._push(new Skill(o_message));

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
			_a_Players._hit(o_message);

		break;

		case 'mapObject':
		// событие карты (метеорит, гроза и т.д.)

			// добавляем объект на карту TODO
			_a_War._putMapObject(new MapObject(o_message));

		break;

	} // /switch

	return;

}



/* INTERFACE ROUTER */

var f_interfaceRouter = function(o_message){



}