"use strict";

class Player{

	constructor(str_socketId, o_websocket){

		// md5(время + соль + рандом)
		this.str_socketId = str_socketId;

		// ссылка на сокет
		this.o_socket = o_websocket;

	}

	// отправка json сообщения игроку, принимает объект который нужно передать
	_jsonSend(o_params){

		let str_params = JSON.stringify(o_params);

		this.o_socket.send(str_params);

	}

}

let CONFIG = require('./global_config.js').CONFIG;

// подключаем модуль файловой системы
let module_fs = require('fs');

// создаем https сервер на нужном порту
let https_server = require('https').createServer({
	key: module_fs.readFileSync('/etc/nginx/orange-maker.key'), 
	cert: module_fs.readFileSync('/etc/nginx/orange-maker.crt')
}).listen(80);

// создаем wss сервер поверх https сервера
let websocket_server = new require('ws').Server({server: https_server});
let module_crypto = require('crypto');

// массив сокетов для отправки всем
let arr_sockets = [];

// объект всех игроков
let o_players = {

	// отправка сообщения всем игрокам
	_broadcastJsonSend(o_message){

		for(let i = 0; i < arr_sockets.length; i++){

			if(!arr_sockets[i].str_socketId){

				arr_sockets.splice(i, 1);
				i--;

				continue;

			}
			else{

				arr_sockets[i]._jsonSend(o_message);
				
			}

		}

	},

	// генерирует уникальный (в рамках процесса) id для подключенного клиента
	_idGenerator(){

		// формируем id сокета по md5(время + соль + рандом)
		let str_socketId = Date.now() + 'fskjdnfirun' + Math.random();
		str_socketId = module_crypto.createHash('md5').update(str_socketId).digest('hex');

		if(!this[str_socketId]){

			return str_socketId;

		}
		else{

			return this._idGenerator();

		}

	}

};

// при коннекте клиента
websocket_server.on('connection', function(o_websocket){

	// формируем id сокета по md5(время + соль + рандом)
	let str_socketId = o_players._idGenerator();

	// создаем нового игрока
	o_players[str_socketId] = new Player(str_socketId, o_websocket);

	// создаем ссылку на объект игрока для последующего удобства. Работает через замыкание
	let o_currentPlayer = o_players[str_socketId];

	console.log(`Новый коннект: ${str_socketId}`);

	// добавляем ссылку на игрока в массив для общей рассылки
	arr_sockets.push(this);

	// скидываем клиенту конфиг
	o_currentPlayer._jsonSend(CONFIG);

	o_websocket.on('message', function(str_message){

		let o_message = JSON.parse(str_message);

		console.log(`сообщение получено:`);
		console.log(o_message);

		o_currentPlayer._jsonSend(o_message);


	});

	o_websocket.on('close', function(){

		// устанавливаем имя сокета в null для последующего удаления из массива всех игроков
		o_currentPlayer.str_socketId = null;

		console.log('close', o_currentPlayer.str_socketId);

		// чистим ссылки
		o_currentPlayer = null;
		o_players[str_socketId] = null;

	});

});