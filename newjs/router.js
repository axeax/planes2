/* INCOMING MESSAGES ROUTER */



/* OTHER ROUTER */

const f_allRouter = function(str_message){

	let o_message = JSON.parse(str_message.data);

	let str_messageEcho = JSON.stringify(o_message, '\t');

	console.log(o_test);

	o_test.str_data = str_message;

}

const f_otherRouter = function(str_message){

	switch(o_message.case_type){
	
		case 'initPlayer':
		// самое первое сообщение инифиализации игрока

			// создаем игрока клиента из пришедших данных
			let o_player = new Player(o_message);
			let o_war = new War();


		break;

	}

}



/* WAR ROUTER */

const f_warRouter = function(str_message){

	switch(o_message.case_type){

		case 'startWar':
		// старт битвы

			// убираем игровой интерфейс
			o_interface._$_hideGame();

			// включаем интерфейс битвы
			o_interface._$_showWar();

			// инициализируем объект войны
			o_war._init();

			// инициализируем игроков
			o_war.arr_players = [];

			// пробегаемся по массиву с пришедшими игроками и засовываем их в свой массив через new Player(); 
			for(let i; i < o_message.arr_players.length; i++){

				// ссылка на игрока, которого сейчас обходим в цикле
				let o_currentPlayer = o_message.arr_players[i];

				// Если имеем дело с самими собой, принудительно пихаем в 0 элемент массива.
				let num_playerIdInPlayers = o_currentPlayer.num_vkId == o_player.num_vkId ? 0 : i+1;

				o_war.arr_players[num_playerIdInPlayers] = new Player(o_currentPlayer);

			}

			// инициализация массива с ракетами
			o_war.arr_rockets = [];

			// инициализация массива с эффектами
			o_war.arr_effects = [];

			// инициализация массива с объектами на карте
			o_war.arr_mapItems = [];

			// инициализация массива с объектами на карте (метеориты, дождь и т.д.)
			o_war.arr_mapEvents = [];

			// включаем клавиатурные события
			o_war._initKeyboardEvents();

			// старт отрисовки
			o_war._start();

		break;

		case 'correctTraectory':
		// корректировка положения соперников

			// метод корректирует движение соперников
			o_war._correctTraectory(o_message);

		break;

		case 'shot':
		// выстрел

			// во все активные ракеты вставляется новая ракета
			o_war.arr_rockets.push(new Rocket(o_message));

		break;

		case 'skill':
		// включение скилла

			// у ого-то сработал скилл
			o_war._skill(new Skill(o_message));

		break;

		case 'dropItem':
		// на поле появился бонусный предмет

			// добавляем предмет на поле
			o_war._dropItem(new MapItem(o_message));

		break;

		case 'putItem':
		// кто-то подобрал предмет

			// обработка поднятия предмена
			o_war._putItem(o_message);

		break;

		case 'hit':
		// попадание

			// отработка попадания
			o_war._hit(o_message);

			// во все активные эффекты вставляется новый эффект
			o_war.arr_effects.push(new Effect(o_message));

		break;

		case 'mapObject':
		// событие карты (метеорит, гроза и т.д.)

			// добавляем объект на карту TODO
			o_war._mapEvent(new MapEvent(o_message));

		break;

	} // /switch

	return;

}



/* INTERFACE ROUTER */

const f_interfaceRouter = function(str_message){



}

let f_Router = function(str_routerType, o_test){

	if(str_routerType == 'all'){

		return function(str_message){

			let o_message = JSON.parse(str_message.data);

			let str_messageEcho = JSON.stringify(o_message);

			o_test.str_data = str_messageEcho;

			o_test = Object.assign(o_test, o_message);

		}

	}

}