"use strict";

// подключаем модуль файловой системы
let module_fs = require('fs');

// создаем https сервер на нужном порту
let https_server = require('https').createServer({
	key: module_fs.readFileSync('/etc/nginx/orange-maker.key'), 
	cert: module_fs.readFileSync('/etc/nginx/orange-maker.crt')
}).listen(80);

// создаем wss сервер поверх https сервера
let websocket_server = new require('ws').Server({server: https_server});

// массив игроков
let arr_players = [];
// объект игроков
let o_players = {};

// при коннекте клиента
websocket_server.on('connection', function(o_websocket){

	// берем последний id пользователя
	let num_id = arr_players.length;

	// в объекте нового игрока сохраняем сокет
	o_players[`o_${num_id}`] = o_websocket;

	// добавляем этот же сокет в массив всех игроков
	arr_players.push(o_websocket);

	//console.log('open', num_id);

	o_websocket.on('message', function(str_message){

		console.log(`before: ${str_message}`);

		let o_message = JSON.parse(str_message);

		console.log(`after: ${o_message}`);

	});

	o_websocket.on('close', function(){

		console.log('close', num_id);
		delete arr_players[num_id];
		delete o_players[`o_${num_id}`];

	});

});

var test = 0;
var test2 = Date.now();
var iters = 0;

setInterval(function(){

	test += (Date.now() - test2);
	iters += 1;
	test2 = Date.now();

}, 5);

setInterval(function(){

	for(let num_socket = 0; num_socket < arr_players.length; num_socket++){

		if(arr_players[num_socket]){

			arr_players[num_socket].send(`${arr_players.length}`);

		}

	}

	console.log(`${arr_players.length}`);
	console.log('sended', test/iters);
	test = 0;
	iters = 0;

}, 5000);