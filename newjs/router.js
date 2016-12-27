/* INCOMING MESSAGES ROUTER */



/* OTHER ROUTER */

const f_otherRouter = function(o_message){

	switch(o_message.case_type){
	
		case 'initPlayer':
		// самое первое сообщение инифиализации игрока

			// создаем игрока клиента из пришедших данных
			var o_player = new Player(o_message);


		break;

	}

}



/* WAR ROUTER */

const f_warRouter = function(o_message){

	switch(o_message.case_type){

		case 'startWar':
		// старт битвы

			// убираем игровой интерфейс
			o_interface._$_hideGame();

			// включаем интерфейс битвы
			o_interface._$_showWar();

			// инициализируем объект войны
			let o_war = new War(o_message);

			// инициализируем игроков
			let arr_players = [];

			// пробегаемся по массиву с пришедшими игроками и засовываем их в свой массив через new Player(); 
			for(let i; i < o_message.arr_players.length; i++){

				// ссылка на игрока, которого сейчас обходим в цикле
				let o_currentPlayer = o_message.arr_players[i];

				// Если имеем дело с самими собой, принудительно пихаем в 0 элемент массива.
				let num_playerIdInPlayers = o_currentPlayer.num_vkId == o_player.num_vkId ? 0 : i+1;

				arr_players[num_playerIdInPlayers] = new Player(o_currentPlayer);

			}

			// инициализация объекта с ракетами
			let arr_rockets = new Rockets();

			// инициализация объекта со скиллами
			let arr_skills = new Skills();

			// включаем клавиатурные события
			o_war._initKeyboardEvents();

			// старт отрисовки
			o_war._start();

		break;

		case 'correctTraectory':
		// корректировка положения соперников

			// метод корректирует движение соперников


		break;

		case 'shot':
		// выстрел

			// во все активные ракеты вставляется новая ракета
			arr_rockets._push(new Rocket(o_message));

		break;

		case 'skill':
		// включение скилла

			// во все активные скиллы вставляется новый скилл
			arr_skills._push(new Skill(o_message));

		break;

		case 'dropItem':
		// на поле появился бонусный предмет

			// добавляем предмет на поле
			o_war._dropItem(new WarItem(o_message));

		break;

		case 'putItem':
		// кто-то подобрал предмет

			// обработка поднятия предмена
			o_war._putItem(o_message);

		break;

		case 'hit':
		// попадание

			// отработка попадания
			arr_players._hit(o_message);

		break;

		case 'mapObject':
		// событие карты (метеорит, гроза и т.д.)

			// добавляем объект на карту TODO
			o_war._putMapObject(new MapObject(o_message));

		break;

	} // /switch

	return;

}



/* INTERFACE ROUTER */

const f_interfaceRouter = function(o_message){



}