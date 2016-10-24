;jQuery.fx.interval = 60;
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||
    function(callback, element){window.setTimeout(callback, 40)};
})();
window.cancelAnimFrame = (function(){
    return  window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||
    function(){};
})();
Array.prototype.toNumbers = function(){
	for(var i = 0; i < this.length; i++){
		this[i] = +this[i];
	}
}
Object.prototype.toNumbers = function(){
	for(prop in this){
		if(this.hasOwnProperty(prop)){
			this[prop] = +this.prop;
		}
	}
}
Object.prototype.fillData = function(properties, data){
	for(var i = 0; i < properties.length; i++){
		this[properties[i]] = data;
	}
}
var Data = function(params){
	this.GLOBAL_TIME = window.performance.now();
	this.turnirs = {};
	this.turnirs.update = 0;
	this.messages = [];
	this.online = params.online;
	this.chat = params.chat.join('###');
	this.chatTimer = window.performance.now();
};
//обновление времени до окончания турнира
setInterval(function(){
	Data.turnirs.update -= 1; 
	if(Data.turnir.update <= 0) Data.turnir.update = 0;
	$('.ratings .rel span').html('через '+funcs.chislen(Data.turnirs.update, [' минуту',' минуты',' минут']));
}, 60000);
var Interface = (function(){
	this.init = function(){
		$(document).tooltip({opacity: 0.7, content: function(){return $(this).prop('title')}});
		$('.war .turn').mCustomScrollbar({advanced:{updateOnContentResize: true}});
		$('.medails .c1 > div').mCustomScrollbar({advanced:{updateOnContentResize: true}});
		$('.tehno .c1 > div').mCustomScrollbar({advanced:{updateOnContentResize: true}});
		$('.ratings .scroll').mCustomScrollbar({advanced:{updateOnContentResize: true}});
		$('#content .chat .messages').mCustomScrollbar({advanced:{updateOnContentResize: true}});
	};
	this.message = function(type, message, b1, b2){
		if(type){
			document.getElementById('shadow').style.display = 'block';
			document.getElementById('ruletka').style.display = 'none';
			$('.message').css('display', 'none');
			$('.message *').unbind('click');
			$('#ruletka *').unbind('click');
			$(document).unbind('keyup');
			switch(type){
				case 'preloader':
					$('#preloader p').html(message);
					$('#preloader').css({display: 'block', top: (600-$('#preloader').outerHeight())/2});
				break;
				case 'one':
					$('#one p').html(message);
					$('#one .but').html(b1);
					$('#one').css({display: 'block', top: (600-$('#one').outerHeight())/2});
				break;
				case 'two':
					$('#two p').html(message);
					$('#two .but1').html(b1);
					$('#two .but2').html(b2);
					$('#two').css({display: 'block', top: (600-$('#two').outerHeight())/2});
				break;
				case 'rul':
					document.getElementById('ruletka').style.display = 'block';
				break;
			}
		}
		else{
			document.getElementById('shadow').style.display = 'none';
			$('.message *').unbind('click');
			$('.message').css('display', 'none');
			document.getElementById('ruletka').style.display = 'none';
			$('#ruletka *').unbind('click');
			$(document).unbind('keyup');
		}
	};
	this.getWidth = function(cur,max,maxw){
		var parr = [Math.round(maxw*((cur+(max/10)*cur)/((max/10)*cur+3))), Math.round(cur*10)+(max >= 0?'+':'')+Math.round(max*10)+'%'];
		return parr;
	};
	this.bonus = function(id, types, dayBonus, firstEnter){
		if(firstEnter){
			Interface.message('one','Привет, пилот! Вижу, что ты первый раз зашёл в игру. Перед тем, как ты захочешь сразиться с живым соперником, рекомендую пройти начальное лётное обучение. Для этого кликни по кнопке "Начать бой!" напротив Искусственного интеллекта 0 уровня.','ОК');
			$('#one .but, #one .close').click(function(){Interface.message()});
		}
		else if(weapons.messages.length >= 1){
			Interface.message('one', weapons.messages[0], ((dayBonus > 0) ? 'Забрать бонус' : 'Рассказать друзьям'));
			$('#one .but').click(function(){
				if(!dayBonus) wall(id, weapons.wallMessages[types[0]], types[0]);
				weapons.messages.splice(0,1);
				if(!dayBonus) types.splice(0,1);
				mesQ(id, types);
			});
			$('#one .close').click(function(){
				weapons.messages.splice(0,1);
				if(!dayBonus) types.splice(0,1);
				mesQ(id, types);
			});
		}
		else Interface.message();
	};
	this.fillTop = function(){
		$('#stars span').html(avatars[0].stars);
		$('#rating span, #inTurn .rating').html(avatars[0].rating);
		$('#fuel span').html(avatars[0].fuel);
		$('#info .online span').html('<b title = "Всего в игре">'+Data.online+'</b> / <b title = "Войн в данный момент">'+0+'</b>');
		$('#botGame .lv').html(avatars[0].levelBot);
	}
	this.fillQuests = function(cur){
		for(var i = 0; i < cur.length; i++){
			$('#content .medails .q'+(i+1)).html(((cur[i] >= static.quests[i]) ? static.quests[i] : cur[i])+'/'+static.quests[i]);
			$('#content .medails .qq'+(i+1)).css('opacity', cur[i]/static.quests[i]);
		}
		i = null; delete i;
	};
	this.fillWeapons = {
		all: function(){
			for(var i = 0; i < static.weaponsAll.length; i++){
				$('.weapons .'+static.weaponsAll[i]+' .val span').html(avatars[0].weapons[static.weaponsAll[i]]);
			}
		},
		one: function(type){
			$('.weapons .'+type+' .val span').html(avatars[0].weapons[type]);
		},
		war: function(type){
			$('#warWeapons .'+type+' span').html(avatars[0].weapons[type]);
		}
	};
	this.fillPrices = function(p){
		p.speedPrice = Math.ceil(((p.speed-1)*15)*p.speed*2) || 1;
		p.speedRating = Math.ceil(((p.speed-1)*15)*p.speed*1000) || 1000;
		p.radiusPrice = Math.ceil(((p.radius-1)*15)*p.radius*2) || 1;
		p.radiusRating = Math.ceil(((p.radius-1)*15)*p.radius*1000) || 1000;
		p.protectionPrice = Math.ceil(((p.protection-1)*15)*p.protection*2) || 1;
		p.protectionRating = Math.ceil(((p.protection-1)*15)*p.protection*1000) || 1000;
		p.damagePrice = Math.ceil(((p.damage-1)*15)*p.damage*2) || 1;
		p.damageRating = Math.ceil(((p.damage-1)*15)*p.damage*1000) || 1000;
		p.ratePrice = Math.ceil(((p.rate-1)*15)*p.rate*2) || 1;
		p.rateRating = Math.ceil(((p.rate-1)*15)*p.rate*1000) || 1000;
		$('#content .planes .speed .plus, #content .war .speed .plus').attr('title', (p.speed >= static.maxParam.speed) ? 'Параметр на максимуме !' : 'Увеличить<br/>Необходимо звёзд: '+p.speedPrice+'<br/>Необходимо рейтинга: '+p.speedRating).css('opacity', (p.rating < p.speedRating || p.stars < p.speedPrice || p.speed >= static.maxParam.speed) ? 0.4 : 1);
		$('#content .planes .radius .plus, #content .war .radius .plus').attr('title', (p.radius >= static.maxParam.radius) ? 'Параметр на максимуме !' : 'Увеличить<br/>Необходимо звёзд: '+p.radiusPrice+'<br/>Необходимо рейтинга: '+p.radiusRating).css('opacity', (p.rating < p.radiusRating || p.stars < p.radiusPrice || p.radius >= static.maxParam.radius) ? 0.4 : 1);
		$('#content .planes .protection .plus, #content .war .protection .plus').attr('title', (p.protection >= static.maxParam.protection) ? 'Параметр на максимуме !' : 'Увеличить<br/>Необходимо звёзд: '+p.protectionPrice+'<br/>Необходимо рейтинга: '+p.protectionRating).css('opacity', (p.rating < p.protectionRating || p.stars < p.protectionPrice || p.protection >= static.maxParam.protection) ? 0.4 : 1);
		$('#content .planes .damage .plus, #content .war .damage .plus').attr('title', (p.damage >= static.maxParam.damage) ? 'Параметр на максимуме !' : 'Увеличить<br/>Необходимо звёзд: '+p.damagePrice+'<br/>Необходимо рейтинга: '+p.damageRating).css('opacity', (p.rating < p.damageRating || p.stars < p.damagePrice || p.damage >= static.maxParam.damage) ? 0.4 : 1);
		$('#content .planes .rate .plus, #content .war .rate .plus').attr('title', (p.rate >= static.maxParam.rate) ? 'Параметр на максимуме !' : 'Увеличить<br/>Необходимо звёзд: '+p.ratePrice+'<br/>Необходимо рейтинга: '+p.rateRating).css('opacity', (p.rating < p.rateRating || p.stars < p.ratePrice || p.rate >= static.maxParam.rate) ? 0.4 : 1);
	};
	this.fillResources = function(r){
		$('#metall span').html(r[0]);
		$('#silicon span').html(r[1]);
		$('#trotill span').html(r[2]);
		$('#diamonds span').html(r[3]);
	};
	this.fillTehno = function(t,r,d,s){
		for(var i = 0; i < 5; i++){
			$('#teh'+i+' .level span').html(r[i]);
			if(t!=i){
				$('#teh'+i+' .tehnod').html(r[i]*r[i]*3).css('opacity', r[i]*r[i]*3 > d ? 0.4 : 1); 
				$('#teh'+i+' .tehnos').html(r[i]*r[i]*10).css('opacity', r[i]*r[i]*10 > s ? 0.4 : 1);
				$('#teh'+i+' .ttt').html(funcs.chislen(6+r[i]*6, [' час ',' часа ',' часов ']));
				$('#teh'+i+' .s, #teh'+i+' .d, #teh'+i+' .tehnos, #teh'+i+' .tehnod').css('display', 'inline-block');
				if(t==10) $('#teh'+i+' .buy').css('opacity', 1).html('Начать изучение технологии');
				$('#teh'+i+' .sss').html('Время изучения: ');	
			}
		}
	};
	this.fillTehnoTime = function(tn,ttt,ut){
		if(tn != 10){				
			var tt = [Math.floor((ttt-ut)/1000/60/60), Math.floor((ttt-ut)/1000/60)]; //1 - часов, 2 - минут
			tt[1] -= tt[0]*60;
			if(ttt - ut > 0){
				$('.teh .buy').css('opacity', 0.2);
				$('#teh'+tn+' .buy').css('opacity', 1).html('Ускорить процесс изучения');
				$('#teh'+tn+' .s, #teh'+tn+' .d, #teh'+tn+' .tehnos, #teh'+tn+' .tehnod').css('display', 'none');
				$('#teh'+tn+' .sss').html('До окончания процесса изучения осталось: ');				
				$('#teh'+tn+' .ttt').html(' '+funcs.chislen(tt[0], [' час ',' часа ',' часов '])+funcs.chislen(tt[1], [' минута',' минуты',' минут']));
			}
			else{
				$('#teh'+tn+' .sss').html('До окончания процесса изучения осталось: ');
				$('#teh'+tn+' .ttt').html('0 часов 0 минут');
				return true;
			}
		}
	};
	this.fillWlWeapons = function(wls){
		for(var i = 0; i < static.weapons.length; i++){
			$('.weapons .'+static.weapons[i]+' .valWL span').html(wls[static.weapons[i]]);
		}
	}
	this.fillPlaneParams = function(mk,pow){ //отображение параметров самолета (полоски + %)
		//pow - выбранное меню planes of war
		var menuclass = pow ? 'planes' : 'war';
		pow = !!pow ? 'activePlane' : 'plane';
		var params;
		params = Interface.getWidth(avatars[0].speed, static[avatars[0][pow]][mk].speed, 94);
		$('#content .'+menuclass+' .speed .left').css('width', params[0]).parent().prev().html(params[1]);
		$('#content .'+menuclass+' .speed .light').css('margin-left', params[0]-2);
		params = Interface.getWidth(avatars[0].radius, static[avatars[0][pow]][mk].radius, 94);
		$('#content .'+menuclass+' .radius .left').css('width', params[0]).parent().prev().html(params[1]);
		$('#content .'+menuclass+' .radius .light').css('margin-left', params[0]-2);
		params = Interface.getWidth(avatars[0].protection, static[avatars[0][pow]][mk].protection, 94);
		$('#content .'+menuclass+' .protection .left').css('width', params[0]).parent().prev().html(params[1]);
		$('#content .'+menuclass+' .protection .light').css('margin-left', params[0]-2);
		params = Interface.getWidth(avatars[0].damage, static[avatars[0][pow]][mk].damage, 94);
		$('#content .'+menuclass+' .damage .left').css('width', params[0]).parent().prev().html(params[1]);
		$('#content .'+menuclass+' .damage .light').css('margin-left', params[0]-2);
		params = Interface.getWidth(avatars[0].rate, static[avatars[0][pow]][mk].rate, 94);
		$('#content .'+menuclass+' .rate .left').css('width', params[0]).parent().prev().html(params[1]);
		$('#content .'+menuclass+' .rate .light').css('margin-left', params[0]-2);
	}
	this.chat = function(chat){
		for(var i = 0; i < chat.length; i++){
			$('#content .chat .messages .m').append(chat[i]);
		}
	}
})();
var API = (function(){
	this.selfWall = function(id, msg, typeMsg){
		Interface.message();
		VK.api('photos.getWallUploadServer', {https: 1}, function (data) {
			$.post('upload.php', {'uploadUrl': data.response.upload_url, type: ((typeMsg >= 0) ? typeMsg : 'plane')}, function(data) {
				var upload = $.parseJSON(data);
				VK.api('photos.saveWallPhoto', {'hash': upload.hash, 'photo': upload.photo, 'server': upload.server, 'uid': id, 'gid': '', https: 1}, function (data) {
					if(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement){toggleFullScreen()};
					VK.api('wall.post', {'message': msg, attachments: data.response[0].id, https: 1}, function(data){
					})
				})
			});
		});
	};
	this.friendWall = function(fids,wallFriends,friendId){
		VK.api('friends.get', {fields: 'photo_50', https: 1}, function(response){
			for(var i = 0; i < response.response.length; i++){
				if(fids.indexOf(response.response[i].uid) >= 0 || wallFriends.indexOf(response.response[i].uid) >= 0){
					response.response[i] = 0; 
				}
			}
			friendId = []; 
			for(var i = 0; i < response.response.length; i++){
				if(response.response[i] != 0) friendId.push(response.response[i]);
			}
			if(friendId.length >= 1){						
				friendId = friendId[Math.round(Math.random()*(friendId.length-1))];
			}
			else{
				friendId = null;
			}
			if(friendId){
				$('#turn .inviteFriend').remove();
				$('#turn').append('<tr class = "inviteFriend"><td class = "foto"><img src = "'+friendId.photo_50+'"></img></td><td><span class = "name">'+friendId.first_name+'</span><br/>Ещё не<br/>играет</td><td><div class = "button" id = "inviteTurn">Пригласить</div></td></tr>');
				$('#inviteTurn').click(function(){
					$('#turn .inviteFriend').remove();
					if(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement){toggleFullScreen()};
					VK.api('wall.post', {message: 'Тут такое месево! Давай присоединяйся =) http://vk.com/aviamyaso_online', https: 1, owner_id: friendId.uid}, function(data){});
					wallFriends.push(friendId.uid);
					$.cookie('wallFriends', wallFriends.join(','), {expires: 3});
					wallF(fids,wallFriends,friendId);
				});
			}
		});
		/*VK.api('friends.getOnline', {https: 1, count: 1, order: 'random'}, function(response2){
			console.log(response2.response[0]);
			VK.api('users.get', {https: 1, user_ids: response2.response[0], fields: 'photo_50'}, function(response){
			$('#turn').append('<tr class = "inviteFriend"><td class = "foto"><img src = "'+response.response[0].photo_50+'"></img></td><td><span class = "name">'+response.response[0].first_name+'</span><br/>Не в<br/>игре</td><td><div class = "button" id = "inviteTurn">Позвать</div></td>');
			$('#inviteTurn').click(function(){
				$('#turn .inviteFriend').remove();
				VK.callMethod('showRequestBox', response.response[0].uid, 'Давай сюда! Постреляемся =)', 1);
				wallF();
			});
			});
		});*/
	};
})();
var PreBuffer = (function(){
	var planes = [];
	var rockets = [];
	var effects = [];
	var sprites = [];
})();
var Avatar = function(params){
	//share
	this.id = +params.id;
	this.foto = params.foto;
	this.name = params.name;
	//achivements
	this.quests = params.quests.toNumbers(); //[0,0,0,0,0,0,0,0,0,0,0,3,0,0,1000,1000,1]
	this.medails = params.medails.toNumbers(); //[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	this.levelBot = +params.levelBot;
	//interface flags
	this.activeWeapon = false;
	this.activePlane = false;
	this.activePlaneMk = 0;
	this.planeNum = 0; //счетчик перелистывания самолетов в меню боя
	this.itemBuy = false; //тип покупки (оружие, самолет, параметр...)
	this.typeBuy = false; //что конкретно покупается (пулемет, скоростной самолёт, скорость...)
	this.curTurnir = 0;
	this.turn = false;
	//player params and resources
	this.wl = params.wl.toNumbers(); //{a:1, b:1...}
	this.stars = +params.stars;
	this.rating = +params.rating;
	this.fuel = +params.fuel;
	this.resources = params.resources.toNumbers(); //[1,1,1,1]
	this.tehno = params.tehno.toNumbers(); //[1,1,1,1,1]
	this.tehnoNum = params.tehnoTime[0]; //номер технологии которая изучается
	this.tehnoTime = params.tehnoTime[1]; //[10,0]
	this.unixTime = params.unixTime; //для технологий
	this.planes = params.planes.toNumbers(); //[1,0,0,0,0,1,0,0,0...]
	this.setPlanesTrue = function(){
		this.planesTrue = [];
		for(var i = 0; i < 6; i++){
			if(this.planes[i]) this.planesTrue.push(static.planesArr[i]);
		}
	}
	this.setPlanesTrue();
	//for game
	////plane params
	this.plane = params.plane || 'default';
	this.planeMk = params.planeMk || 0;
	this.speed = +params.speed;
	this.radius = +params.radius;
	this.protection = +params.protection;
	this.damage = +params.damage;
	this.rate = +params.rate;
	this.wspeed = +params.wspeed;
	this.wradius = +params.wradius;
	this.wprotection = +params.wprotection;
	this.wdamage = +params.wdamage;
	this.wrate = +params.wrate;
	this.superSpeed = 0; //максимальное время действия. Уменьшается с каждым кадром при ускорении, увеличивается если не ускоряться
	this.superSpeedT = 0; //скорость уменьшения полоски супер скорости
	this.wSuperSpeed = 0; //как wspeed, добавляется к wspeed при расчтете timeK для итогового ускорения
	this.superSpeedW = 200; //размер полоски супер скорости 0...200
	////weapons
	this.weapons = params.weapons.toNumbers(); //{a:100, b:100...}
	this.per = {}.fillData(static.allWeapons, window.performance.now()); //время выстрела, наращивается с каждым кадром
	this.tper = {}.fillData(static.allWeapons, window.performance.now()); //время окончания перезарядки
	this.hot = 0; //перегрев, максимум 100 или 200
	////game moment
	this.key = false;
	this.fallen = false;
	this.life = 100;
	this.debaff = {M: {per: 1, tper: 1}, E: {per: 1, tper: 1}};
	this.timers = [0,0,0,0,0];
	//settings
}
Avatar.prototype = {
	this.setLife = function(){
		$('#lifeW').css({width:this.life*1.8});
		$('#life .img').css({left:-20+this.life*1.8});
	},
	this.setSpeed = function(){
		$('#superSpeedW').css({width:this.superSpeedW});
		$('#superSpeed .img').css({left:-25+this.superSpeedW});
	},
	this.setHot = function(){
		$('#hotW').css({width:this.hot*1.8});
		$('#hot .img').css({left:-14+this.hot*1.8});
	},
	this.calc = function(fl){
		//fl = frameLength //время от предыдущего вызова
		this.tr = tr;
		this.x2 = this.x;
		this.y2 = this.y;
		this.s2 = this.s;
		this.r2 = this.r;
		this.cosa2 = this.cosa;
		this.a2 = this.a;
		this.ra2 = this.ra;
		this.timeK = tr/40;
		if(this.shift && this.superSpeed >= 100){
			if(this.id){
				this.superSpeed -= tr/this.superSpeedT+10;
			}
			this.timeK += (this.wspeed+this.wSuperSpeed)/this.wspeed;
		}
		this.x += this.timeK*this.koef*this.s*Math.sin((90-this.ra)*this.PI180);
		//TODO ISNAN
		this.y -= this.timeK*this.koef*this.s*Math.sin(this.ra*this.PI180);
		//TODO ISNAN
		this.s -= this.timeK*(this.koef*Math.sin(this.ra*this.PI180))*(this.wspeed/(this.y/this.wspeed))/4.5;
		//TODO ISNAN
		if(this.s <= 0) this.s = this.koef*0.0001;
		this.a = this.tr/40*this.koef*this.wradius*2.5; //скорость поворота
		if(this.id){
			for(var i = 0; i < static.weaponsAll.length; i++){
				if(this.per[static.weaponsAll[i]]-400 <= this.tper[static.weaponsAll[i]]){
					this.per[static.weaponsAll[i]] += tr; //время выстрела (наращивается с каждым кадром)
				}
			}
			this.opacity = (this.per.M < this.tper.M) ? 0.6 : 1;
			if(this.debaff.M.per != 1) this.debaff.M.per += tr;
			if(this.debaff.E.per <= this.debaff.E.tper) this.debaff.E.per += tr;
			if(this.superSpeed < 10000 && !this.shift){
				this.superSpeed += tr;
			}
			else if(!this.shift){
				this.superSpeed = 10000;
			}
			this.superSpeedW = 180*(this.superSpeed/10000);
			if(this.hot <= 0) this.hot = 0
			else this.hot -= 0.33*tr/40;
			this.setSpeed();
			this.setHot();
		}
		if(this.x > 700+this.w) this.x = -this.w;
		if(this.x < -this.w) this.x = 700+this.w;
		if(this.key == 'up') this.ra += this.a*this.timeK
		else if(this.key == 'down') this.ra -= this.a*this.timeK;
		if(isNaN(this.x) || isNaN(this.y) || isNaN(this.r) || isNaN(this.a) || isNaN(this.ra) || isNaN(this.s) || isNaN(this.cosa) || isNaN(this.timeK)){
			this.x = (this.sideName == 'left') ? 40 : 660;		
			this.y = 450;
			this.s = this.wspeed;
			this.r = this.s*50/this.wradius;
			this.cosa = (this.r*this.r+this.r*this.r-this.s*this.s)/(2*this.r*this.r);
			this.a = 0;
			this.ra = this.a;
		}	
	},
	this.draw = function(){
		if(this.opacity >= 0.5){
			ctx.globalAlpha = this.opacity;
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.fillStyle = this.id ? '#0d0' : '#f00';
			ctx.strokeStyle = '#000';
			ctx.lineWidth = 1;
			ctx.fillRect(-34,-40,(this.life/100)*67,4);
			ctx.strokeRect(-34,-40,67,4);
			ctx.rotate(-this.ra*this.PI/180);
			ctx.drawImage(this.image, -this.w/2, -this.h/2, this.w, this.h);
			ctx.restore();
		}
	}
}
var Rocket = function(params){
	this.koef = params.koef;
	this.x = params.x;
	this.y = params.y;
	this.s = params.speed;
	this.PI180 = Math.PI/180;
	this.typeW = params.typeW;
	this.a = (this.typeW == 'H') ? -Math.atan2(this.y-y, this.x-x)*180/Math.PI+((this.koef == 1)?180:0) : params.a;
	this.ra = -this.a*this.PI180;
	this.hit = params.hit;
	this.image = new Image();
	this.image.src = (this.koef == 1) ? 'rockets/'+this.typeW+'.png' : 'rockets/r'+this.typeW+'.png';
	this.w = (this.typeW == 'A') ? 13 : 28;
	this.h = (this.typeW == 'A') ? 6 : 10;
	this.w2 = -this.w/2;
	this.h2 = -this.h/2;
}
Rocket.prototype = {
	this.calc = function(fl){
		//fl = frameLength //время от предыдущего вызова
		if(this.x > 1000 || this.x < -300 || this.y > 1000 || this.y < -300) return true;
		var nach = fl/40*this.koef*this.s;
		this.y -= var nach*Math.sin(this.a*this.PI180);
		this.x += var nach*Math.sin((90-this.a)*this.PI180);
	},
	this.draw = function(){
		ctx.globalAlpha = 1;
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.ra);
		ctx.drawImage(this.image, this.w2, this.h2, this.w, this.h);
		ctx.restore();
	}
}
var Effect = function(params){
	//добавить в инициализацию все динамически создаваемые значения
	this.typeW = params.type;
	this.side = params.side || params.koef;
	switch(this.typeW){
		case 'smoke':
			this.op = this.rand(0.0001,0.5);
			if(params.life < 10)
				params.life = 10;
			this.dop = this.rand(params.life/100*0.01,params.life/100*0.02);
			this.r = this.rand(3,10);
			this.dr = this.rand(0.2,0.7);
			this.x = this.rand(params.x-2,params.x+2);
			this.dx = this.rand(-0.1,0.1);
			this.y = this.rand(params.y-2,params.y+2);
			this.dy = this.rand(0.5,0.2);
			this.calc = function(){
				this.op -= this.dop;
				this.r += this.dr;
				this.x -= this.dx;
				this.y -= this.dy;
				this.x2 = this.x-this.r/2;
				this.y2 = this.y-this.r/2;
				if(this.op <= 0 || this.x < -100 || this.x > 900 || this.y < -30 || this.y > 900){
					ctx.globalAlpha = 0;
					return true;
				}
			}
			this.draw = function(){
				ctx.globalAlpha = this.op;
				ctx.drawImage(smoke_canvas,this.x2,this.y2,this.r,this.r);
			}
		break;
		case 'message':
			this.op = 1;
			this.dop = 0.015;
			this.x = params.x;
			this.y = params.y-60;
			this.text = params.text;
			this.dx = this.rand(-0.7, 0.7);
			this.dy = this.rand(0.7, 1.5);
			this.calc = function(){
				this.op -= this.dop;
				if(this.op <= 0){
					ctx.globalAlpha = 0;
					return true;
				}
				this.y -= this.dy;
				this.x += this.dx;
			}
			this.draw = function(){
				ctx.globalAlpha = this.op;
				ctx.fillText(this.text, this.x, this.y);
			}
		break;
		case 'A':
			this.x = params.x;
			this.y = params.y;
			this.w = 15;
			this.h = 24;
			this.op = 1;
			this.dop = 0.03;
			this.image = new Image();
			this.image.src = 'effects/A.png';
			this.angle = this.rand(0,360)*Math.PI/180;
			this.calc = function(){
				this.op -= this.dop;
				if(this.op <= 0){
					ctx.globalAlpha = 0;
					return 'off';
				}
				this.w += 3;
				this.h += 3;
				this.w2 = -this.w/2;
				this.h2 = -this.h/2;
			}
			this.draw = function(){
				ctx.globalAlpha = this.op;
				ctx.save();
				ctx.translate(this.x, this.y);
				ctx.rotate(this.angle);
				ctx.drawImage(this.image, this.w2, this.h2, this.w, this.h);
				ctx.restore();
			}
		break;
		case 'B':
			this.op = 1;
			this.dop = 0.035;
			this.fillStyle = '#ff4500';
			this.calc = function(){
				this.op -= this.dop;
				if(this.op <= 0){
					ctx.globalAlpha = 0;
					return true;
				}
			}
			this.draw = function(){
				ctx.globalAlpha = this.op;
				ctx.fillStyle = this.fillStyle;
				ctx.fillRect(0, 0, 700, 600);
			}
		break;
		case 'C':
			this.x = params.x;
			this.y = params.y;
			this.w = 5;
			this.h = 5;
			this.op = 1;
			this.dop = 0.03/((params.damage > 10) ? 10 : params.damage);
			this.image = new Image();
			this.image.src = 'effects/C.png';
			this.angle = this.rand(0,360)*Math.PI/180;
			this.calc = function(){
				this.op -= this.dop;
				if(this.op <= 0){
					ctx.globalAlpha = 0;
					return true;
				}
				this.w += 7;
				this.h += 7;
				this.w2 = -this.w/2;
				this.h2 = -this.h/2;
			}
			this.draw = function(){
				ctx.globalAlpha = this.op;
				ctx.save();
				ctx.translate(this.x, this.y);
				ctx.rotate(this.angle);
				ctx.drawImage(this.image, this.w2, this.h2, this.w, this.h);
				ctx.restore();
			}
		break;
		case 'D':
			this.x = params.x;
			this.y = params.y;
			this.w = 5;
			this.h = 5;
			this.op = 1;
			this.dop = 0.03/((params.damage > 10) ? 10 : params.damage);
			this.image = new Image();
			this.image.src = 'effects/D.png';
			this.angle = this.rand(0,360)*Math.PI/180;
			this.calc = function(){
				this.op -= this.dop;
				if(this.op <= 0){
					ctx.globalAlpha = 0;
					return true;
				}
				this.w += 7;
				this.h += 7;
				this.w2 = -this.w/2;
				this.h2 = -this.h/2;				
			}
			this.draw = function(){
				ctx.globalAlpha = this.op;
				ctx.save();
				ctx.translate(this.x, this.y);
				ctx.rotate(this.angle);
				ctx.drawImage(this.image, this.w2, this.h2, this.w, this.h);
				ctx.restore();
			}
		break;
		case 'E':
			this.time = params.damage*500;
			this.why = [[29,20,0],[31,19,21],[27,20,41],[29,20,0],[31,19,21],[27,20,41]];
			this.a = [this.rand(0,360),this.rand(0,360),this.rand(0,360),this.rand(0,360),this.rand(0,360),this.rand(0,360)];
			this.times = [this.rand(300,800),this.rand(300,800),this.rand(300,800),this.rand(300,800),this.rand(300,800),this.rand(300,800)];
			this.image = new Image();
			this.image.src = 'effects/E.png';
			this.side = params.side;
			this.PI180 = Math.PI/180;
			this.calc = function(t){
				this.time -= t.tr;
				if(this.time <= 0)
					return true;
				this.x = !this.side ? t.x : t.x1;
				this.y = !this.side ? t.y : t.y1;
				for(var i = 0; i < this.a.length; i++){
					this.times[i] -= 40;
					if(this.times[i] <= 0){
						this.times[i] = this.rand(100,500);
						this.a[i] = this.rand(0,360);
					}
				}
			}
			this.draw = function(){				
				ctx.globalAlpha = 1;
				ctx.save();
				ctx.translate(this.x, this.y);
				for(var i = 0; i < this.a.length; i++){
					ctx.rotate(this.a[i]*this.PI180);
					ctx.drawImage(this.image, 0, this.why[i][2], this.why[i][0], this.why[i][1], -2, -2, this.why[i][0], this.why[i][1]);
				}				
				ctx.restore(); 
			}
		break;
		case 'F':
			this.op = 1;
			this.dop = 0.004/params.damage;
			this.fillStyle = '#fff';
			this.calc = function(){
				this.op -= this.dop;
				if(this.op <= 0){	
					ctx.globalAlpha = 0;
					return true;
				}
			}
			this.draw = function(){
				ctx.save();
				ctx.globalAlpha = this.op;
				ctx.fillStyle = this.fillStyle;
				ctx.fillRect(0, 0, 700, 600);
				ctx.restore();
			}
		break;
		case 'G':
			this.draw = function(){return true;};
		break;
		case 'H':
			this.draw = function(){return true;};
		break;
		case 'I':
			this.wh = 10;
			this.op = 1;
			this.dop = 0.01;
			this.image = new Image();
			this.image.src = 'effects/I.png';
			this.side = params.side;
			this.calc = function(t){
				this.x = !this.side ? t.x : t.x1;
				this.y = !this.side ? t.y : t.y1;
				this.op -= this.dop;
				if(this.op <= 0){
					ctx.globalAlpha = 0;
					return true;
				}
				this.wh += 3;
				this.wh2 = -this.wh/2;
			}
			this.draw = function(){
				ctx.globalAlpha = this.op;
				ctx.save();
				ctx.translate(this.x, this.y);
				ctx.drawImage(this.image, this.wh2, this.wh2, this.wh, this.wh);
				ctx.restore(); 
			}
		break;
		case 'J':
			this.time = params.per;
			this.w = 77;
			this.h = 77;
			this.w2 = -this.w/2;
			this.h2 = -this.h/2;
			this.op = 0;
			this.dop = 0.004;
			this.dopk = -1;
			this.image = new Image();
			this.image.src = 'effects/J.png';
			this.calc = function(t){
				this.x = t.x;
				this.y = t.y;
				this.time -= t.tr;
				if(this.time <= 0){
					this.op -= this.dop;
					if(this.op <= 0){
						ctx.globalAlpha = 0;
						return true;
					}
				}
				else{
					if(this.op > 1) this.dopk = -1
					if(this.op < 0.4) this.dopk = 1;
					this.op += this.dop*this.dopk;
				}
			}
			this.draw = function(){
				ctx.globalAlpha = this.op;
				ctx.save();
				ctx.translate(this.x, this.y);
				ctx.drawImage(this.image, this.w2, this.h2, this.w, this.h);
				ctx.restore(); 
			}
		break;
		case 'K':
			this.time = params.per;
			this.koef = params.koef;
			this.PI180 = Math.PI/180;
			this.calc = function(t){
				this.time -= t.tr;
				if(this.time <= 0) 
					return true;
				this.x = t.x+this.koef*(Math.cos((t.ra-(10*this.koef))*this.PI180)*40);
				this.y = t.y-this.koef*(Math.sin((t.ra-(10*this.koef))*this.PI180)*40);
				this.ltx = this.x+this.koef*(Math.cos(t.ra*this.PI180)*2000);
				this.lty = this.y-this.koef*(Math.sin(t.ra*this.PI180)*2000);
			}
			this.draw = function(){
				ctx.globalAlpha = 1;
				ctx.beginPath();
				ctx.lineWidth = 1;
				ctx.strokeStyle = '#f00';
				ctx.moveTo(this.x, this.y);
				ctx.lineTo(this.ltx, this.lty);
				ctx.stroke();
			}
		break;
		case 'L':
			this.draw = function(t){return true};
		break;
		case 'M':
			this.time = params.per;
			this.w = 77;
			this.h = 77;
			this.w2 = -this.w/2;
			this.h2 = -this.h/2;
			this.op = 0;
			this.dop = 0.004;
			this.dopk = -1;
			this.image = new Image();
			this.image.src = 'effects/M.png';
			this.calc = function(t){
				this.time -= t.tr;
				if(this.time <= 0){
					this.op -= this.dop;
					if(this.op <= 0){
						ctx.globalAlpha = 0;
						return true;						
					}
				}
				else{
					if(this.op > 1) this.dopk = -1
					if(this.op < 0.4) this.dopk = 1;
					this.op += this.dop*this.dopk;
					this.x = t.x;
					this.y = t.y;
				}
			}
			this.draw = function(){				
				ctx.globalAlpha = this.op;
				ctx.save();
				ctx.translate(this.x, this.y);
				ctx.drawImage(this.image, this.w2, this.h2, this.w, this.h);
				ctx.restore(); 
			}
		break;
		case 'N':
			this.time = params.per;
			this.w = 77;
			this.h = 77;
			this.w2 = -this.w/2;
			this.h2 = -this.h/2;
			this.op = 0;
			this.dop = 0.004;
			this.dopk = -1;
			this.image = new Image();
			this.image.src = 'effects/N.png';
			this.calc = function(){
				this.time -= t.tr;
				if(this.time <= 0){
					this.op -= 0.01;
					if(this.op <= 0){
						ctx.globalAlpha = 0;
						return true;
					}
				}
				else{
					if(this.op > 1) this.dopk = -1
					if(this.op < 0.4) this.dopk = 1;
					this.op += this.dop*this.dopk;
					this.x = t.x;
					this.y = t.y;
				}
			}
			this.draw = function(){				
				ctx.globalAlpha = this.op;
				ctx.save();
				ctx.translate(this.x, this.y);
				ctx.drawImage(this.image, this.w2, this.h2, this.w, this.h);
				ctx.restore(); 
			}
		break;
		case 'O':
			this.time = params.per;
			this.wh = [8];
			this.op = [1];
			this.times = 0;
			this.dop = 0.003;
			this.image = new Image();
			this.image.src = 'effects/O.png';
			this.calc = function(t){
				this.time -= t.tr;
				if(this.wh.length < 10 && this.times > 40 && this.time >= 0){ 
					this.wh.push(5);
					this.op.push(1);
					this.times = 0;
					this.x = t.x;
					this.y = t.y;
				}
				this.times += 1;
				if(this.wh.length == 0){
					ctx.globalAlpha = 0;
					return true;					
				}
				for(var i = 0; i < this.wh.length; i++){
					this.wh[i] += 0.5;
					this.op[i] -= this.dop;
					if(this.op[i] < 0){
						this.op.splice(i,1);
						this.wh.splice(i,1);
						i-=1;
					}
				}
			}
			this.draw = function(){			
				for(var i = 0; i < this.wh.length; i++){
					ctx.globalAlpha = this.op[i];
					ctx.save();
					ctx.translate(this.x, this.y);
					ctx.drawImage(this.image, -this.wh[i]/2, -this.wh[i]/2, this.wh[i], this.wh[i]);
					ctx.restore();
				}
			}
		break;
		case 'P':
			this.time = params.per;
			this.image = new Image();
			this.image.src = 'effects/P.png';
			this.side = params.koef;
			this.i = 0;
			this.time2 = 0;
			this.y = [0,11,22,33,44,55,66];
			this.calc = function(){
				this.time -= t.tr;
				if(this.time <= 0) 
					return true;				
				this.time2 += 1;
				if(this.time2 >= 2){
					this.i += 1;
					this.time2 = 0;
				}
				if(this.i >= this.y.length) this.i = 0;				
				this.x1 = t.x+this.side*40;
				this.y1 = t.y+20;
			}
			this.draw = function(){				
				ctx.globalAlpha = 1;
				ctx.save();
				ctx.translate(this.x1, this.y1);
				ctx.drawImage(this.image, 0, this.y[this.i], 11, 10, 0, 0, 15, 15);
				ctx.restore(); 
			}
		break;
		case 'stock':
			this.draw = function(){return true};
		break;
		case 'per':
			this.type = params.typeW;
			this.tper = false; //окончание перезарядки
			this.per = false; //начало перезарядки
			this.firstdraw = function(){
				wp_canv[this.type][1].clearRect(0,0,50,50);
				wp_canv[this.type][1].beginPath();
				wp_canv[this.type][1].arc(25,25,22,Math.PI,3*Math.PI);
				wp_canv[this.type][1].stroke();
				wp_canv[this.type][1].closePath();
			};
			this.firstdraw();
			this.alfaTop = Math.PI;
			this.fl = false;
			this.calc = function(params){
				if(this.per){
					params.tper = params.per - this.per;
					params.per = this.tper - this.per;				
					if(this.fl = !this.fl && params.tper <= params.per+400){
						this.alfaTop = 2*Math.PI*(params.tper/params.per);
						wp_canv[this.type][1].clearRect(0,0,50,50);
						wp_canv[this.type][1].beginPath();
						wp_canv[this.type][1].arc(25,25,22,Math.PI,Math.PI+this.alfaTop);
						wp_canv[this.type][1].stroke();
						wp_canv[this.type][1].closePath();
					}
				}
			}
			this.draw = function(){};		
		break;
		default:
			this.draw = function(){return 'off'}
	}
}
Effect.prototype = {
	this.rand = function(min,max){
		return Math.random()*(max - min) + min;
	}
}
var Events = (function(){
	this.overWar = function(msg){
		console.log('Событые '+msg.type+' произошло после окончания битвы');
	};
	this.init = function(msg){
		Interface.message('preloader', 'Инициализация...');
		Interface.message();
		avatars[0] = new Avatar(msg);
		Data = new Data(msg);
		Interface.fillWeapons.all(avatars[0].weapons);
		Interface.fillWlWeapons(avatars[0].wl);
		Interface.fillPrices(avatars[0]);
		Interface.fillResources(avatars[0].resources);
		Interface.chat(msg.chat.split('###'));
		Interface.init();
		Interface.fillTop();
		$('#menu td[id]').click(clicks.menu);
		$('#stars div.buyStars').click(clicks.bank);
		$('#fuel .getfuel').click(clicks.getFuel);
		$('#content .war .plane').click(clicks.infoPlaneWar);

	}
})();
var clicks = (function(){
	this.setTurnirs = function(type){
		$('.setTurnir').css('display', type == 'rating' || (Data.turnirs.w7 == 1 && type == 'win7') || (Data.turnirs.w30 == 1 && type == 'win30') ? 'none' : 'block');
		$('.ratings .per span').html(Data.turnirs[type].period);
		$('.ratings .pri span').html(Data.turnirs[type].price);
		$('.ratings .ove span').html(Data.turnirs[type].timeEnd);
		$('.ratings .rel span').html('через '+chislen(Data.turnirs.update, [' минуту',' минуты',' минут']));
		$('.ratings .col').html(Data.turnirs[type].col);
		$('.ratings .turnirName').html(Data.turnirs[type].name);
		for(var i = 0; i < 4; i++){
			for(var j = 0; j < 5; j++){
				$('.ratings .'+Data.turnirs.sel[j]+(i+1)+' span').html(Data.turnirs[type].win[i][j]);
			}
		}
		$('.ratings .list').empty();
		$('.ratings .list').html(Data.turnirs[type].html);
	};
	this.menu = function(){	//клик по пунктам меню
		if($(this).attr('class') != 'active'){
			var id = this.id;
			$('#content > div').fadeOut(250);
			$('#content > div.'+id).delay(250).fadeIn(250);
			var left = $(this).position().left+$(this).outerWidth(true)/2-14;
			$('#menuLight').css({'left': left});
			$('#menu td').removeClass('active');
			$(this).addClass('active');
			if(id == 'chat'){
				$('#content .chat input').focus();
			}
		} 
	};
	this.bank = function(){ //покупка звезд		
		
		$('#bank').click();
	};
	this.getFuel = function(){ //TODO слив топлива у друзей, добавить интерактив c приглашениями
		if(avatars[0].fuel >= 100){
			Interface.message('one', 'У тебя полный бак!', 'OK');
			$('#one .but, #one .close').click(Interface.message);
		}
		else{
			if(avatars[0].turn){
				Interface.message('one', 'Ты уже на взлетной полосе! Выйди из очереди, если хочешь заправиться!', 'ОК');
				$('#one .but, #one .close').click(Interface.message);
			}
			else{
				Interface.message('preloader', 'Сливаем топливо у друзей...<br/>Слито: 0');
				sock.send($.toJSON({type: 'getfuel'}));
			}
		}
	};
	this.infoPlaneWar = function(){ //отображение информации о самолете при клике на самолет в меню боя		
		if(avatars[0].planeNum < avatars[0].planesTrue.length-1) 
			avatars[0].planeNum += 1;
		else 
			avatars[0].planeNum = 0;
		avatars[0].planeMk = 0;
		var mk = 0;
		$('#content .war .wmk span.wkk0').css('display', (avatars[0].planes[static.planes[avatars[0].planesTrue[avatars[0].planeNum]]] == 1)?'inline-block':'none');
		$('#content .war .wmk span.wkk1').css('display', (avatars[0].planes[static.planes[avatars[0].planesTrue[avatars[0].planeNum]]+6] == 1)?'inline-block':'none');
		$('#content .war .wmk span.wkk2').css('display', (avatars[0].planes[static.planes[avatars[0].planesTrue[avatars[0].planeNum]]+12] == 1)?'inline-block':'none');
		$('#content .war .wmk span').css('opacity', 0.3);
		$('#content .war .wmk span.wkk0').css('opacity', 1);
		avatars[0].plane = avatars[0].planesTrue[avatars[0].planeNum].replace(/\d/g, "");
		$('#name span').html(static[avatars[0].plane][mk].name);
		$('#content .war .c1 .choisePlane img.plane').attr('src', 'planes/zip/big-'+avatars[0].plane+'0.png');
		setPlaneParams(mk);
		$('#content .war .weapons > div').addClass('not');
		for(var i = 0; i < static[avatars[0].plane][mk].weapons.length; i++){
			$('#content .war .'+static[avatars[0].plane][mk].weapons[i]).removeClass('not');
		}
		for(i = 0; i < static[avatars[0].plane][mk].bonuses.length; i++){
			$('#content .war .'+static[avatars[0].plane][mk].bonuses[i]).removeClass('not');
		}
	}
})();
$(document).ready(function(){VK.init(function(){
	Interface.message('preloader', 'Подключение к серверу...');
	var avatars = [];
	try{
		//var sock = io.connect('https://orange-maker.ru:1010', {reconnect: false});
		var sock = io.connect('https://78.155.197.229:80', {reconnect: false});
		window.onbeforeunload = function(){
			sock.disconnect();
		};
	}catch(er){
		Interface.message('one', 'Игровой сервер временно недоступен. Попробуйте войти позже.', 'ОК', null, function(){
			$('#one .but').attr({'href': 'http://vk.com/aviamyaso_online', 'target': '_parent'});
			$('#one close').click(function(){$('#one .but').click()});
		});
	}
	sock.on('connect', function () {
		sock.on('message', function (msg) {
			if(data.warMessages[msg.type] && avatars[0].cancelAnimFrame){
				msg.type = 'overWar';
			}
			Events[msg.type](msg);
			msg = null;
		}
	}
}});