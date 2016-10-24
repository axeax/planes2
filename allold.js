jQuery.fx.interval = 60;
initTurnirs = false;
armessages = {};
var Avatar = function(init){
	if(init.id){
		this.win7 = init.onWin7;
		this.win30 = init.onWin30;
		this.wallFriends = $.cookie('wallFriends');
		this.fids = init.fids.split(',');
		for(var i = 0; i < this.fids.length; i++){
			this.fids[i] -= 0;
		}
		if(!this.wallFriends){
			$.cookie('wallFriends', '', {expires: 999})
			this.wallFriends = [];
		}
		else this.wallFriends = this.wallFriends.split(',');
		this.prices();
		this.range = 0;		
		this.gameInterval = false;
		this.fuelInterval = false;
		this.pingTimeout = false;
		this.time1 = 0;
		this.time2 = 0;
		this.time3 = 0;	
		this.oppId = false;
	}
	this.game = function(par){
		this.wspeed = par.wspeed;
		this.wprotection = par.wprotection;
		this.wradius = par.wradius;
		this.wdamage = par.wdamage;
		this.wrate = par.wrate;
		this.plane = par.plane;
		this.planeMk = par.planeMk;
		this.timeK = 1;
		this.foto = par.foto;
		this.sideName = par.side;
		this.regenTime = par.regenTime;
		this.x = (par.side == 'left') ? 40 : 660;		
		this.y = 450;
		this.w = 67;
		this.h = 17;
		this.koef = (par.side == 'left') ? 1 : -1;
		this.key = false;
		this.keyFlag = false;
		this.s = this.wspeed;
		this.r = this.s*50/this.wradius;
		this.cosa = (this.r*this.r+this.r*this.r-this.s*this.s)/(2*this.r*this.r);
		this.a = 0;
		this.ra = this.a;
		this.PI = Math.PI;
		this.PI180 = this.PI/180;
		/*this.image = new Image();
		this.image.src = 'planes/'+((this.sideName == 'left')?'l':'r')+((this.id)?'g':'r')+weapons.plan0[this.plane]+this.planeMk+'.png';*/
		this.image = document.createElement('canvas'); this.image.width = this.w; this.image.height = this.h;
		this.imagectx = this.image.getContext('2d');
		this.imagePng = new Image();
		this.imagePng.src = 'planes/'+((this.sideName == 'left')?'l':'r')+((this.id)?'g':'r')+weapons.plan0[this.plane]+this.planeMk+'.png';

		this.opacity = 1;
		this.cam = 0;
		this.camD = 0;
		this.gameInterface = $('#cam');
		this.rand = function(min,max){
			return Math.random()*(max - min) + min;
		};
		this.camX = 0;
		this.camY = 0;
		this.shift = false;
		//this.tehnoSettings = [1,2,5,1,1];
		this.wSuperSpeed = par.wSuperSpeed;
		this.superSpeedT = par.superSpeedT;
		this.pinger = 30;
		this.pingx = 0;
		this.pingy = 0;
		this.interpol = false;
	}
	this.getCorrect = function(key){
		if(key){
			return {type: 'correct', key: this.key, k: 1, shift: this.shift}
		}
		else{
			//return {type: 'correct', relx: Math.abs(this.x2-this.x), rely: Math.abs(this.y2-this.y), rels: Math.abs(this.s2-this.s), x:this.x, y:this.y, s:this.s, r:this.r, cosa:this.cosa, a:this.a, key:this.key, k: 0};
			var cadrs = this.pinger/this.tr;
			var lcadrs;
			var x = this.x; //х координата
			var y = this.y; //у координата
			var s = this.s; //скосроть
			var key = this.key;
			var a = this.a; //скосроть изменения угла, близко к 3.78, постоянная?
			var ra = this.ra; //общий угол, изменяется постоянно на поворотах
			/*a = this.tr/40*this.koef*this.wradius*2.5;
			var i = 0;
			if(cadrs>=1){
				for(i; i < cadrs; i++){
					x += this.timeK*this.koef*s*Math.sin((90-ra)*this.PI180);
					y -= this.timeK*this.koef*s*Math.sin(ra*this.PI180);
					s -= this.timeK*(this.koef*Math.sin(ra*this.PI180))*(this.wspeed/(y/this.wspeed))/4.5;
					if(key == 'up') ra += a
					else if(key == 'down') ra -= a;
				}
			}
			lcadrs = cadrs-i;
			x += lcadrs*this.timeK*this.koef*s*Math.sin((90-ra)*this.PI180);
			y -= lcadrs*this.timeK*this.koef*s*Math.sin(ra*this.PI180);
			s -= lcadrs*this.timeK*(this.koef*Math.sin(ra*this.PI180))*(this.wspeed/(y/this.wspeed))/4.5;
			if(key == 'up') ra += a*lcadrs
			else if(key == 'down') ra -= a*lcadrs;*/
			return {type:'correct',x:x,y:y,s:s,key:key,shift:this.shift,a:a,ra:ra,k:0};
		}
	}
	this.setCorrect = function(data){
		if(data.k == 0){
			this.x = data.x; //-33-733
			this.y = data.y; //0-600
			this.s = data.s;
			this.key = data.key;
			this.shift = data.shift;
			this.timeK = 1000/60/40;
			if(this.shift && this.superSpeed >= 100){
				this.timeK += (this.wspeed+this.wSuperSpeed)/this.wspeed;
			}
			this.a = this.timeK*this.koef*this.wradius*2.5;
			this.ra = data.ra;
			this.pinger = data.ping;
			var cadrs = this.pinger/this.tr;
			var lcadrs;
			var i = 0;
			if(cadrs>=1){
				for(i; i < cadrs; i++){
					this.x += this.timeK*this.koef*this.s*Math.sin((90-this.ra)*this.PI180);
					this.y -= this.timeK*this.koef*this.s*Math.sin(this.ra*this.PI180);
					this.s -= this.timeK*(this.koef*Math.sin(this.ra*this.PI180))*(this.wspeed/(this.y/this.wspeed))/4.5;
					//if(this.key == 'up') this.ra += this.a*this.timeK
					//else if(this.key == 'down') this.ra -= this.a*this.timeK;
				}
			}
			lcadrs = cadrs-i;
			this.x += lcadrs*this.timeK*this.koef*this.s*Math.sin((90-this.ra)*this.PI180);
			this.y -= lcadrs*this.timeK*this.koef*this.s*Math.sin(this.ra*this.PI180);
			this.s -= lcadrs*this.timeK*(this.koef*Math.sin(this.ra*this.PI180))*(this.wspeed/(this.y/this.wspeed))/4.5;
			//if(this.key == 'up') this.ra += lcadrs*this.a*this.timeK
			//else if(this.key == 'down') this.ra -= lcadrs*this.a*this.timeK;
			console.log('correct: '+this.key);
		}
		else{
			this.key = data.key;
			this.shift = data.shift;
		}
	}
}
var turn = []; 
var errors = [];
var weapons_0 = [];
var weapons_1 = [];
var bonuses = [];
var particles = [];
var lasers = [];
var smoke = [];
$(document).ready(function(){VK.init(function(){
	//VK.Widgets.Ads('vk_ads_4726', {}, {"ad_unit_id":4726,"ad_unit_hash":"077e6d88a789bf207c6b8f058e198327"});
	ctx = document.getElementById('particles').getContext('2d');
	smoke_canvas = document.createElement('canvas'); smoke_canvas.width = 20; smoke_canvas.height = 19;
	smoke_context = smoke_canvas.getContext('2d');
	smoke_image = new Image();
	smoke_image.src = 'effects/smoke.png';
	smoke_image.onload = function(){
		smoke_context.drawImage(smoke_image, 0, 0);
	}	
	try{
		//var sock = io.connect('https://orange-maker.ru:1010', {reconnect: false});
		var sock = io.connect('http://109.206.131.74:1006', {reconnect: false});
	} catch(er) {
		message('one', 'Игровой сервер временно недоступен. Попробуйте войти позже.', 'ОК');
		$('#one .but').attr({'href': 'http://vk.com/aviamyaso_online', 'target': '_parent'});
		$('#one close').click(function(){$('#one .but').click()});
	}
	VK.api('users.get',{fields:'uid,first_name,last_name,photo_200',https: 1}, function(uid){
		VK.api('friends.getAppUsers', {https: 1}, function(fids){
			$('#inTurn .foto img').attr('src', uid.response[0].photo_200);
			sock.send($.toJSON({type:'init',id:uid.response[0].uid,foto:uid.response[0].photo_200,name:uid.response[0].first_name,full_name:uid.response[0].first_name+' '+uid.response[0].last_name,fids: (fids.response.join(',')+','+uid.response[0].uid), token: location.search.replace(/(.*)(auth_key=)([a-z0-9]*)(.*)/g, '$3')}));
		})
	});
	window.onbeforeunload = function(){
		sock.disconnect();
	};
	sock.on('connect', function () {
		sock.on('message', function (msg) {
			if(weapons.warMessages[msg.type] && avatars[0].cancelAnimFrame){
				console.log('Событые '+msg.type+' произошло после окончания битвы');
				msg.type = false;
			}
			switch(msg.type){
				case 'init':
					//отображение информации о самолете при клике на самолет в меню боя
					$('#content .war .plane').click(function(){						
						if(avatars[0].planeNum < avatars[0].planesTrue.length-1) avatars[0].planeNum += 1;
						else avatars[0].planeNum = 0;
						avatars[0].planeMk = 0;
						var mk = 0;
						$('#content .war .wmk span.wkk0').css('display', (avatars[0].planes[weapons.planes[avatars[0].planesTrue[avatars[0].planeNum]]] == 1)?'inline-block':'none');
						$('#content .war .wmk span.wkk1').css('display', (avatars[0].planes[weapons.planes[avatars[0].planesTrue[avatars[0].planeNum]]+6] == 1)?'inline-block':'none');
						$('#content .war .wmk span.wkk2').css('display', (avatars[0].planes[weapons.planes[avatars[0].planesTrue[avatars[0].planeNum]]+12] == 1)?'inline-block':'none');
						$('#content .war .wmk span').css('opacity', 0.3);
						$('#content .war .wmk span.wkk0').css('opacity', 1);
						avatars[0].plane = avatars[0].planesTrue[avatars[0].planeNum].replace(/\d/g, "");
						$('#name span').html(weapons[avatars[0].plane][mk].name);
						$('#content .war .c1 .choisePlane img.plane').attr('src', 'planes/zip/big-'+avatars[0].plane+'0.png');
						setPlaneParams(mk);
						$('#content .war .weapons > div').addClass('not');
						for(var i = 0; i < weapons[avatars[0].plane][mk].weapons.length; i++){
							$('#content .war .'+weapons[avatars[0].plane][mk].weapons[i]).removeClass('not');
						}
						for(i = 0; i < weapons[avatars[0].plane][mk].bonuses.length; i++){
							$('#content .war .'+weapons[avatars[0].plane][mk].bonuses[i]).removeClass('not');
						}
					});
					//отображение информации о самолете при клике на МК в меню боя
					$('#content .war .wmk span').click(function(){
						avatars[0].planeMk = this.className.replace(/wkk/g, "");
						var mk = avatars[0].planeMk;
						$('#content .war .wmk span').css('opacity', 0.3);
						$('#content .war .wmk span.wkk'+mk).css('opacity', 1);
						$('#content .war .c1 .choisePlane img.plane').attr('src', 'planes/zip/big-'+(avatars[0].plane+mk)+'.png');
						$('#name span').html(weapons[avatars[0].plane][mk].name);
						setPlaneParams(mk);
						$('#content .war .weapons > div').addClass('not');
						for(var i = 0; i < weapons[avatars[0].plane][mk].weapons.length; i++){
							$('#content .war .'+weapons[avatars[0].plane][mk].weapons[i]).removeClass('not');
						}
						for(i = 0; i < weapons[avatars[0].plane][mk].bonuses.length; i++){
							$('#content .war .'+weapons[avatars[0].plane][mk].bonuses[i]).removeClass('not');
						}
					})
					//выбор ставки
					$('#inTurn .plus, #inTurn .minus').click(function(){
						avatars[0].range += (this.className == 'plus') ? 1 : -1;
						if(avatars[0].range >= avatars[0].stars) avatars[0].range = avatars[0].stars;
						if(avatars[0].range >= Math.floor(avatars[0].rating/800)) avatars[0].range = Math.floor(avatars[0].rating/800);
						if(avatars[0].range >= 9) avatars[0].range = 9;
						if(avatars[0].range <= 0) avatars[0].range = 0;
						$('#inTurn .range').html(avatars[0].range);
					});
					//вход/выход из очереди
					$('#turn').on('click', '#inTurn .button, tr.id .button, .getParamOpp', function(){
						if($(this).attr('class').split(' ')[0] == 'getParamOpp'){
							sock.send($.toJSON({type: 'getParamOpp', id: $(this).attr('class').split(' ')[1].replace(/\D*/g, '')}));
							message('preloader', 'Взлом системы противника...');							
						}
						else{
							if($(this).parent().parent().attr('id') == "inTurn"){
								if(!avatars[0].timeoutTurn){
									if(!avatars[0].turn){
										avatars[0].turn = true;
										avatars[0].timeoutTurn = true;
										setTimeout(function(){
											sock.send($.toJSON({type: 'inTurn', range: avatars[0].range, plane: avatars[0].plane, planeMk: avatars[0].planeMk}));
											avatars[0].timeoutTurn = false;
										}, 2000);
										$(this).html('Ожидание...');
									}
									else{
										avatars[0].turn = false;
										sock.send($.toJSON({type: 'outTurn'}));							
										$(this).html('Ожидание...');
									}
								}
							}
							else{
								if(this.id) avatars[0].oppId = this.id.replace('id', '');
								if(avatars[0].oppId){
									sock.send($.toJSON({type: 'initWar', id: avatars[0].oppId, plane: avatars[0].plane, planeMk: avatars[0].planeMk}));
									message('one', 'Ожидание ответа игрока...</br><img src = "images/search.gif" alt = "Ожидание..."></img>','Отмена');
									$('#one .but, #one .close').click(function(){
										sock.send($.toJSON({type: 'initWarOkCancel'}));
										message();
									})
								}
							}
						}
					});
					//клик по человеку из рейтинга
					$('.ratings .list').on('click', 'tr[class]', function(){
						var pars = turnir[turnir.turnirs[avatars[0].curTurnir]];
						var num = this.className.replace(/win7|win30|rating/g, '')-1;	
						$('.ratings .profile .photo').attr('src', pars.players[num].foto);
						$('.ratings .profile .name span').html(pars.players[num].name);
						$('.ratings .profile .rating span').html(pars.players[num].rating);
						$('.ratings .profile .game span').html(chislen(pars.players[num].game, [' день',' дня',' дней']));
						$('.ratings .profile .win span').html(pars.players[num].win);
						$('.ratings .profile .fail span').html(pars.players[num].fail);
						$('.ratings .profile .online span').html(pars.players[num].online == 0 ? 'Сейчас не в игре' : 'Сейчас в игре').css('color', pars.players[num].online == 0 ? '#f00' : '#0f0');
						$('.ratings .profile .med div').each(function(){
							$(this).css('display', pars.players[num].medails[this.className.replace(/\D/g, '')-1] == 1 ? 'block' : 'none');
						});
						$('.ratings .profile .ar span').html(pars.players[num].posRating);
						$('.ratings .profile .nr span').html(pars.players[num].posWin7);
						$('.ratings .profile .mr span').html(pars.players[num].posWin30);
					});
					//клик на бой с ИИ
					$('#botGame .buttonb').click(function(){
						message('two', 'Ты собираешься вступить в схватку с искусственным интеллектом '+avatars[0].levelBot+' уровня. Если победишь - получишь '+weapons.bots(avatars[0].levelBot)+'. Проиграешь - потеряешь только потраченное оружие.', 'Начать бой!', 'Попробую потом');
						$('#two .but1').click(function(){
							avatars[0].oppId = 'computer';
							sock.send($.toJSON({type: 'startWar', plane: avatars[0].plane, planeMk: avatars[0].planeMk, range: 1, bot: 1}));
							message('preloader', 'Создание игры...');
						});
						$('#two .but2, #two .close').click(function(){message()});
					});
					//клик на большой самолет в меню самолетов
					$('#content .planes .carousel img').click(function(){
						//$('.planes img.'+avatars[0].activePlane).attr('src', 'planes/zip/big-'+avatars[0].activePlane+'0.png');
						avatars[0].activePlane = this.className;
						//avatars[0].activePlaneMk = 0;
						var mk = avatars[0].activePlaneMk || 0;
						$('#content .planes .c3 span').css('opacity', 0.3);
						$('#content .planes .c3 .mkk'+mk).css('opacity', 1);
						
						$('#content .planes .c3 img.mk0').attr('src', 'planes/zip/big-'+avatars[0].activePlane+'0.png');
						$('#content .planes .c3 img.mk1').attr('src', 'planes/zip/big-'+avatars[0].activePlane+'1.png');
						$('#content .planes .c3 img.mk2').attr('src', 'planes/zip/big-'+avatars[0].activePlane+'2.png');
						
						$('#content .planes .carousel img').css('background', 'none');
						$(this).css('background', 'url(images/bg-planes.png)');

						$('#content .planes .c3 h1').html(weapons[avatars[0].activePlane][mk].name);
						setPlaneParams(mk,true);
						if(avatars[0].planes[weapons.planes[avatars[0].activePlane+mk]] == 0){
							$('#content .planes .price span').html(weapons[avatars[0].activePlane][mk].price);
							$('#content .planes .rating span').html(weapons[avatars[0].activePlane][mk].rating);
							$('#content .planes .r0 span').html(weapons[avatars[0].activePlane][mk].resources[0]);
							$('#content .planes .r1 span').html(weapons[avatars[0].activePlane][mk].resources[1]);
							$('#content .planes .r2 span').html(weapons[avatars[0].activePlane][mk].resources[2]);
							$('#content .planes .r3 span').html(weapons[avatars[0].activePlane][mk].resources[3]);
							$('#content .planes .t0 span').html(weapons[avatars[0].activePlane][mk].tehno[0]);
							$('#content .planes .t1 span').html(weapons[avatars[0].activePlane][mk].tehno[1]);
							$('#content .planes .t2 span').html(weapons[avatars[0].activePlane][mk].tehno[2]);
							$('#content .planes .t3 span').html(weapons[avatars[0].activePlane][mk].tehno[3]);
							$('#content .planes .t4 span').html(weapons[avatars[0].activePlane][mk].tehno[4]);
							
							$('#content .planes .price').css('opacity', weapons[avatars[0].activePlane][mk].price > avatars[0].stars ? 0.4 : 1);
							$('#content .planes .rating').css('opacity', weapons[avatars[0].activePlane][mk].rating > avatars[0].rating ? 0.4 : 1);
							$('#content .planes .r0').css('opacity', weapons[avatars[0].activePlane][mk].resources[0] > avatars[0].resources[0] ? 0.4 : 1);
							$('#content .planes .r1').css('opacity', weapons[avatars[0].activePlane][mk].resources[1] > avatars[0].resources[1] ? 0.4 : 1);
							$('#content .planes .r2').css('opacity', weapons[avatars[0].activePlane][mk].resources[2] > avatars[0].resources[2] ? 0.4 : 1);
							$('#content .planes .r3').css('opacity', weapons[avatars[0].activePlane][mk].resources[3] > avatars[0].resources[3] ? 0.4 : 1);
							$('#content .planes .t0').css('opacity', weapons[avatars[0].activePlane][mk].tehno[0] > avatars[0].tehno[0] ? 0.4 : 1);
							$('#content .planes .t1').css('opacity', weapons[avatars[0].activePlane][mk].tehno[1] > avatars[0].tehno[1] ? 0.4 : 1);
							$('#content .planes .t2').css('opacity', weapons[avatars[0].activePlane][mk].tehno[2] > avatars[0].tehno[2] ? 0.4 : 1);
							$('#content .planes .t3').css('opacity', weapons[avatars[0].activePlane][mk].tehno[3] > avatars[0].tehno[3] ? 0.4 : 1);
							$('#content .planes .t4').css('opacity', weapons[avatars[0].activePlane][mk].tehno[4] > avatars[0].tehno[4] ? 0.4 : 1);
							
							var op = 0;
							$('#content .planes>table td').each(function(ind){
								op += ($(this).css('opacity')-0); 
							});
							if(op < 11.8){
								$('.buy.plane').css('opacity', 0.4);
							}
							else{
								$('.buy.plane').css('opacity', 1);
							}
							
							$('#content .planes>table').css('display', 'block');
							$('#content .planes .buyes').css('display', 'none');							
						}
						else{
							$('#content .planes>table').css('display', 'none');
							$('#content .planes .buyes').css('display', 'block');
						}
						$('#content .planes .weapons div').addClass('not');
						for(var i = 0; i < weapons[avatars[0].activePlane][mk].weapons.length; i++){
							$('#content .planes .'+weapons[avatars[0].activePlane][mk].weapons[i]).removeClass('not');
						}
						for(i = 0; i < weapons[avatars[0].activePlane][mk].bonuses.length; i++){
							$('#content .planes .'+weapons[avatars[0].activePlane][mk].bonuses[i]).removeClass('not');
						}
						$('#content .planes .c3 img.mk'+mk).click();
					});
					//клик на маленький самолет в меню самолетов
					$('#content .planes .c3 img, #content .planes .c3 span').click(function(){
						avatars[0].activePlaneMk = this.className.replace(/mk/g, "");
						avatars[0].activePlaneMk = avatars[0].activePlaneMk.replace(/k/g, "");
						var mk = avatars[0].activePlaneMk;
						$('#content .planes .c3 span').css('opacity', 0.3);
						$('#content .planes .c3 .mkk'+mk).css('opacity', 1);
						//$('.planes img.'+avatars[0].activePlane).attr('src', 'planes/zip/big-'+(avatars[0].activePlane+mk)+'.png');
						$('.planes img.default').attr('src', 'planes/zip/big-'+('default'+mk)+'.png');
						$('.planes img.speed').attr('src', 'planes/zip/big-'+('speed'+mk)+'.png');
						$('.planes img.protection').attr('src', 'planes/zip/big-'+('protection'+mk)+'.png');
						$('.planes img.damage').attr('src', 'planes/zip/big-'+('damage'+mk)+'.png');
						$('.planes img.nyancat').attr('src', 'planes/zip/big-'+('nyancat'+mk)+'.png');
						$('.planes img.radius').attr('src', 'planes/zip/big-'+('radius'+mk)+'.png');
						/*$('#content .planes .carousel img:not(.'+avatars[0].activePlane+')').css({width: 50, height: 25, 'margin-top': 37}, 500);
						$('#content .planes .carousel img.'+avatars[0].activePlane).css({width: 200, height: 100, 'margin-top': 10}, 500);*/
						$('#content .planes .c3 h1').html(weapons[avatars[0].activePlane][mk].name);
						setPlaneParams(mk,true);
						$('#content .planes .weapons div').addClass('not');
						for(var i = 0; i < weapons[avatars[0].activePlane][mk].weapons.length; i++){
							$('#content .planes .'+weapons[avatars[0].activePlane][mk].weapons[i]).removeClass('not');
						}
						for(i = 0; i < weapons[avatars[0].activePlane][mk].bonuses.length; i++){
							$('#content .planes .'+weapons[avatars[0].activePlane][mk].bonuses[i]).removeClass('not');
						}
						i = null; delete i;
						if(avatars[0].planes[weapons.planes[avatars[0].activePlane+mk]] == 0){
							$('#content .planes .price span').html(weapons[avatars[0].activePlane][mk].price);
							$('#content .planes .rating span').html(weapons[avatars[0].activePlane][mk].rating);
							$('#content .planes .r0 span').html(weapons[avatars[0].activePlane][mk].resources[0]);
							$('#content .planes .r1 span').html(weapons[avatars[0].activePlane][mk].resources[1]);
							$('#content .planes .r2 span').html(weapons[avatars[0].activePlane][mk].resources[2]);
							$('#content .planes .r3 span').html(weapons[avatars[0].activePlane][mk].resources[3]);
							$('#content .planes .t0 span').html(weapons[avatars[0].activePlane][mk].tehno[0]);
							$('#content .planes .t1 span').html(weapons[avatars[0].activePlane][mk].tehno[1]);
							$('#content .planes .t2 span').html(weapons[avatars[0].activePlane][mk].tehno[2]);
							$('#content .planes .t3 span').html(weapons[avatars[0].activePlane][mk].tehno[3]);
							$('#content .planes .t4 span').html(weapons[avatars[0].activePlane][mk].tehno[4]);
							
							$('#content .planes .price').css('opacity', weapons[avatars[0].activePlane][mk].price > avatars[0].stars ? 0.4 : 1);
							$('#content .planes .rating').css('opacity', weapons[avatars[0].activePlane][mk].rating > avatars[0].rating ? 0.4 : 1);
							$('#content .planes .r0').css('opacity', weapons[avatars[0].activePlane][mk].resources[0] > avatars[0].resources[0] ? 0.4 : 1);
							$('#content .planes .r1').css('opacity', weapons[avatars[0].activePlane][mk].resources[1] > avatars[0].resources[1] ? 0.4 : 1);
							$('#content .planes .r2').css('opacity', weapons[avatars[0].activePlane][mk].resources[2] > avatars[0].resources[2] ? 0.4 : 1);
							$('#content .planes .r3').css('opacity', weapons[avatars[0].activePlane][mk].resources[3] > avatars[0].resources[3] ? 0.4 : 1);
							$('#content .planes .t0').css('opacity', weapons[avatars[0].activePlane][mk].tehno[0] > avatars[0].tehno[0] ? 0.4 : 1);
							$('#content .planes .t1').css('opacity', weapons[avatars[0].activePlane][mk].tehno[1] > avatars[0].tehno[1] ? 0.4 : 1);
							$('#content .planes .t2').css('opacity', weapons[avatars[0].activePlane][mk].tehno[2] > avatars[0].tehno[2] ? 0.4 : 1);
							$('#content .planes .t3').css('opacity', weapons[avatars[0].activePlane][mk].tehno[3] > avatars[0].tehno[3] ? 0.4 : 1);
							$('#content .planes .t4').css('opacity', weapons[avatars[0].activePlane][mk].tehno[4] > avatars[0].tehno[4] ? 0.4 : 1);
							var op = 0;
							$('#content .planes>table td').each(function(ind){
								op += ($(this).css('opacity')-0); 
							});
							if(op < 11.8){
								$('.buy.plane').css('opacity', 0.4);
							}
							else{
								$('.buy.plane').css('opacity', 1);
							}
							
							$('#content .planes>table').css('display', 'block');
							$('#content .planes .buyes').css('display', 'none');							
						}
						else{
							$('#content .planes>table').css('display', 'none');
							$('#content .planes .buyes').css('display', 'block');
						}
					})
					//клик по оружию и отображение информации
					$('#content .shop .weapons > div').click(function(){
						//if(avatars[0].activeWeapon != this.className){
							$('#content .shop .weapons .'+avatars[0].activeWeapon+' .back').fadeOut(500, function(){$(this).remove()});
							avatars[0].activeWeapon = this.className;
							$('#content .shop .weapons .'+avatars[0].activeWeapon).prepend('<div class = "back" style = "display: none"></div>').find('.back').fadeIn(500);
							if(weapons.weaponsNI[this.className]){
								$('#content .shop .rate td:first-child').html('Перезарядка');
								$('#content .shop .rate').attr('title', 'Время перезарядки после выстрела');
								$('#content .shop .left div').attr('class', this.className);
								$('#content .shop .c1 h1').html(weapons[this.className].name+' WL-'+(avatars[0].wl[this.className]));
								$('#content .shop .about').html(weapons[this.className].about);
								$('#content .shop .damage span').html(weapons[this.className].damage[avatars[0].wl[this.className]-1] || '-');
								$('#content .shop .radius span').html(weapons[this.className].radius[avatars[0].wl[this.className]-1] || '-');
								$('#content .shop .speed span').html(weapons[this.className].speed[avatars[0].wl[this.className]-1] || '-');
								$('#content .shop .rate span').html(weapons[this.className].rate[avatars[0].wl[this.className]-1]);
								$('#content .shop .rating span').html(weapons[this.className].rating);
								$('#content .shop .buy.weapon span').html(weapons[this.className].buy);
								$('#content .shop .buy.wl').css('display', (avatars[0].wl[this.className] >= 3 ? 'none' : 'block'));
								$('#content .shop .buy.wl span').html('Улучшить оружие до WL-'+(avatars[0].wl[this.className]+1));
							}
							else{
								$('#content .shop .rate td:first-child').html('Длительность');
								$('#content .shop .rate').attr('title', 'Длительность действия эффекта после использования');
								$('#content .shop .left div').attr('class', this.className);
								$('#content .shop .c1 h1').html(weapons[this.className].name);
								$('#content .shop .about').html(weapons[this.className].about);
								$('#content .shop .damage span').html(weapons[this.className].damage || '-');
								$('#content .shop .radius span').html(weapons[this.className].radius || '-');
								$('#content .shop .speed span').html(weapons[this.className].speed || '-');
								$('#content .shop .rate span').html(weapons[this.className].rate);
								$('#content .shop .rating span').html(weapons[this.className].rating);
								$('#content .shop .buy.weapon span').html(weapons[this.className].buy);
								$('#content .shop .buy.wl').css('display', 'none');
							}
						//}
					});
					$('.buy.wl').hover(
						function(){
							$('.shop .left table tr:not(.rating)').find('span').addClass('wlc');
							$('#content .shop .damage span').html(weapons[avatars[0].activeWeapon].damage[avatars[0].wl[avatars[0].activeWeapon]]);
							$('#content .shop .radius span').html(weapons[avatars[0].activeWeapon].radius[avatars[0].wl[avatars[0].activeWeapon]]);
							$('#content .shop .speed span').html(weapons[avatars[0].activeWeapon].speed[avatars[0].wl[avatars[0].activeWeapon]]);
							$('#content .shop .rate span').html(weapons[avatars[0].activeWeapon].rate[avatars[0].wl[avatars[0].activeWeapon]]);

						},
						function(){
							$('.shop .left table tr span').removeClass('wlc');
							$('#content .shop .damage span').html(weapons[avatars[0].activeWeapon].damage[avatars[0].wl[avatars[0].activeWeapon]-1]);
							$('#content .shop .radius span').html(weapons[avatars[0].activeWeapon].radius[avatars[0].wl[avatars[0].activeWeapon]-1]);
							$('#content .shop .speed span').html(weapons[avatars[0].activeWeapon].speed[avatars[0].wl[avatars[0].activeWeapon]-1]);
							$('#content .shop .rate span').html(weapons[avatars[0].activeWeapon].rate[avatars[0].wl[avatars[0].activeWeapon]-1]);
						}
					);
					//TODO изменение управления, глянуть что за кнопки для оружия
					$('#content .shop .c2 table.info tr.key, #content .war .c1 .settings div').click(function(){
						message('one', 'Нажмите клавишу, которую хотите присвоить этому оружию', 'Отмена');
						var watKey = (this.className == 'key') ? avatars[0].activeWeapon : this.className;
						$(document).keyup(function(ev){
							avatars[0].keys[weapons.keysNames.indexOf(watKey)] = ev.keyCode;
							if(watKey != 'up' && watKey != 'down'){
								$('#content .weapons .c2 table.info tr.key td:last-child').html(weapons.keySet[avatars[0].keys[weapons.all.indexOf(watKey)]]);
							}
							else{
								$('#content .war .c1 .settings tr td div.'+watKey).html(weapons.keySet[avatars[0].keys[weapons.keysNames.indexOf(watKey)]]);
							}
							$.cookie('keys', avatars[0].keys.join(','), {expires: 999});
							message('one', 'Клавиша изменена успешно!', 'ОК');
							$('#one .but, #one .close').click(function(){
								$(document).unbind('keyup');
								message();
							});
							$(document).unbind('keyup');
						});
						$('#one .but, #one .close').click(function(){
							$(document).unbind('keyup');
							message();
						});
					});
					//покупка
					$('.buy, .plus').click(function(){
						avatars[0].typeBuy = this.className.replace(/plus |buy /g, '');
						avatars[0].item = false;
						console.log(avatars[0].typeBuy);
						switch(avatars[0].typeBuy){
							case 'param':
								avatars[0].item = $(this).parent().attr('class');
								if(avatars[0].item){
									if(avatars[0][avatars[0].item]*10+1 > maxParam[avatars[0].item]*10){
										message('one', 'Этот параметр уже на максимуме!', 'ОК');
										$('#one .but, #one .close').click(function(){message()});
										//avatars[0].item = false;
									}
									else if(avatars[0].rating < avatars[0][avatars[0].item+'Rating'] || avatars[0].stars < avatars[0][avatars[0].item+'Price']){
										message('one', 'Недостаточно звёзд или рейтинга для увеличения параметра', 'Получить звёзды');
										$('#one .but').click(function(){										
											$('#bank').click();
											message();
										});
										$('#one .close').click(function(){message();});
										//avatars[0].item = false;
									}
									else{
										message('two', ('Для увеличения'+weapons.paramsName[avatars[0].item]+'самолёта нужно иметь рейтинг не ниже '+(avatars[0][avatars[0].item+'Rating'])+', и заплатить '+(chislen((''+avatars[0][avatars[0].item+'Price']), [' звезду',' звезды',' звёзд']))+'. При покупке данная характеристика изменится для всех самолётов. Продолжить?'), 'Да', 'Нет');
										$('#two .but1').click(function(){
											sock.send($.toJSON({type: 'buy', typeBuy: avatars[0].typeBuy, item: avatars[0].item}));
											message('preloader', 'Ожидание ответа от сервера...');
										});
										$('#two .but2, #two .close').click(function(){message();});
									}
								}
								//avatars[0].item = false;
							break;
							case 'plane':
								avatars[0].item = [avatars[0].activePlane, avatars[0].activePlaneMk];
								if(avatars[0].item){
									if($(this).css('opacity') < 0.9){
										avatars[0].item = false;
									}
									else if(avatars[0].item[1] == 1 || avatars[0].item[1] == 2){
										if(avatars[0].planes[weapons.planes[avatars[0].item[0]+''+(avatars[0].item[1]-1)]] != 1){
											message('one','Для покупки самолёта модели Mk.'+['I','II','III'][avatars[0].item[1]]+' необходимо сначала купить модель Mk.'+['I','II','III'][avatars[0].item[1]-1],'OK');
											$('#one .but, #one .close').click(function(){message();});
											avatars[0].item = false;
										}

									}
								}
							break;
							case 'wl':
								avatars[0].item = avatars[0].activeWeapon;
								if(avatars[0].item){
									message('two', ('Для улучшения оружия "'+weapons[avatars[0].activeWeapon].name+'" нужно потратить '+weapons[avatars[0].activeWeapon].WLprice[avatars[0].wl[avatars[0].activeWeapon]][0]+' металла, '+weapons[avatars[0].activeWeapon].WLprice[avatars[0].wl[avatars[0].activeWeapon]][1]+' кремния, '+weapons[avatars[0].activeWeapon].WLprice[avatars[0].wl[avatars[0].activeWeapon]][2]+' тротилла и '+weapons[avatars[0].activeWeapon].WLprice[avatars[0].wl[avatars[0].activeWeapon]][3]+' алмазов. Продолжить?'), 'Да', 'Нет');
									$('#two .but1').click(function(){
										if(avatars[0].resources[0] < weapons[avatars[0].activeWeapon].WLprice[avatars[0].wl[avatars[0].activeWeapon]][0] ||
										avatars[0].resources[1] < weapons[avatars[0].activeWeapon].WLprice[avatars[0].wl[avatars[0].activeWeapon]][1] ||
										avatars[0].resources[2] < weapons[avatars[0].activeWeapon].WLprice[avatars[0].wl[avatars[0].activeWeapon]][2] ||
										avatars[0].resources[3] < weapons[avatars[0].activeWeapon].WLprice[avatars[0].wl[avatars[0].activeWeapon]][3]){
											message('one', 'Недостаточно ресурсов для усовершенствования оружия', 'Получить ресурсы');
											$('#one .but').click(function(){										
												$('#bank').click();
												message();
											});
											$('#one .close').click(function(){message();});
											avatars[0].item = false;
										}
										else{
											sock.send($.toJSON({type: 'buy', typeBuy: avatars[0].typeBuy, item: avatars[0].item}));
											message('preloader', 'Ожидание ответа от сервера...');
										}
									});
									$('#two .but2, #two .close').click(function(){message();});
									/*if(avatars[0].resources[0] < weapons[avatars[0].activeWeapon].WLprice[avatars[0].wl[avatars[0].activeWeapon]][0] ||
									avatars[0].resources[1] < weapons[avatars[0].activeWeapon].WLprice[avatars[0].wl[avatars[0].activeWeapon]][1] ||
									avatars[0].resources[2] < weapons[avatars[0].activeWeapon].WLprice[avatars[0].wl[avatars[0].activeWeapon]][2] ||
									avatars[0].resources[3] < weapons[avatars[0].activeWeapon].WLprice[avatars[0].wl[avatars[0].activeWeapon]][3]){
										message('one', 'Недостаточно ресурсов для усовершенствования ресурсов', 'Получить ресурсы');
										$('#one .but').click(function(){										
											$('#bank').click();
											message();
										});
										$('#one .close').click(function(){message();});
										avatars[0].item = false;
									}
									else{
										message('two', ('Для улучшения оружия "'+weapons[avatars[0].activeWeapon].name+'" нужно потратить '+weapons[avatars[0].activeWeapon].WLprice[avatars[0].wl[avatars[0].activeWeapon]][0]+' металла, '+weapons[avatars[0].activeWeapon].WLprice[avatars[0].wl[avatars[0].activeWeapon]][1]+' кремния, '+weapons[avatars[0].activeWeapon].WLprice[avatars[0].wl[avatars[0].activeWeapon]][2]+' тротилла и '+weapons[avatars[0].activeWeapon].WLprice[avatars[0].wl[avatars[0].activeWeapon]][3]+' алмазов. Продолжить?'), 'Да', 'Нет');
										$('#two .but1').click(function(){
											sock.send($.toJSON({type: 'buy', typeBuy: avatars[0].typeBuy, item: avatars[0].item}));
											message('preloader', 'Ожидание ответа от сервера...');
										});
										$('#two .but2, #two .close').click(function(){message();});
									}*/
								}
								//avatars[0].item = false;
							break;
							case 'weapon':
								avatars[0].item = avatars[0].activeWeapon;
								if(avatars[0].item){
									if(avatars[0].rating < weapons[avatars[0].item].rating || avatars[0].stars < 1){
										message('one', 'Недостаточно звёзд или рейтинга для покупки', 'Получить звёзды');
										$('#one .but').click(function(){										
											$('#bank').click();
											message();
										});
										$('#one .close').click(function(){message();});
										avatars[0].item = false;
									}
									else if((avatars[0].weapons[avatars[0].item]+weapons[avatars[0].item].complect).toFixed(2) > maxParam[avatars[0].item]){
										message('one', 'Нельзя купить больше. Максимум '+maxParam[avatars[0].item], 'ОК');
										$('#one .but, #one .close').click(function(){message()});
										avatars[0].item = false;
									}
								}
							break;
							case 'tehnology':
								avatars[0].item = $(this).closest('.teh').attr('id').replace(/teh/g, '');
								if(avatars[0].item){
									if(avatars[0].tehnoNum != 10){
										if(avatars[0].tehnoNum == avatars[0].item){
											var ttt = avatars[0].tehnoTime - (1000*60*60*10);
											if(ttt-avatars[0].unixTime > 0){ 
												var tt = [Math.floor((ttt-avatars[0].unixTime)/1000/60/60), Math.floor((ttt-avatars[0].unixTime)/1000/60)];
												tt[1] -= tt[0]*60;
											}
											else{
												var tt = [0,0];
											}
											avatars[0].item = false;
											message('two', 'За 3 голоса можно сократить время изучения технологии на 10 часов. После оплаты останется ждать'+(' '+chislen(tt[0], [' час ',' часа ',' часов '])+chislen(tt[1], [' минута',' минуты',' минут'])), 'Сократить время', 'Отмена');
											$('#two .but1').click(function(){
												avatars[0].buyTehnoTime = true;
												sock.send($.toJSON({type: 'buyTehno'}));
												if(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement){toggleFullScreen()};
												VK.callMethod('showOrderBox', {type: 'item', item: 'tehno'});
												message();
											});
											$('#two .close, #two .but2').click(function(){message()});
										}
										else{
											message('one', 'Нельзя изучать одновременно несколько технологий', 'OK');
											$('#one .but, #one .close').click(function(){message()});
											avatars[0].item = false;
										}
									}
									else if(avatars[0].stars < avatars[0].tehno[avatars[0].item]*10*avatars[0].tehno[avatars[0].item] || avatars[0].resources[3] < avatars[0].tehno[avatars[0].item]*3*avatars[0].tehno[avatars[0].item]){
										message('one', 'Недостаточно звёзд или алмазов для изучения', 'Получить звёзды');
										$('#one .but').click(function(){										
											$('#bank').click();
											message();
										});
										$('#one .close').click(function(){message();});
										avatars[0].item = false;
									}
								}
							break;
						}
						if(avatars[0].item && avatars[0].typeBuy && avatars[0].typeBuy != 'wl' && avatars[0].typeBuy != 'param'){
							sock.send($.toJSON({type: 'buy', typeBuy: avatars[0].typeBuy, item: avatars[0].item})); 
							message('preloader', 'Ожидание ответа от сервера...');
						}
					});
					//купить % добавления рейтинга
					$('#rating .buyRating').click(function(){
						message('two','Ты можешь увеличить получаемый за победу рейтинг получая медали, или добавить 10% за 3 голоса.', 'Добавить 10%', 'Отмена');
						$('#two .but1').click(function(){ 
							avatars[0].buyRating = true;
							sock.send($.toJSON({type: 'buyRating'}));
							if(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement){toggleFullScreen()};
							VK.callMethod('showOrderBox', {type: 'item', item: 'rating'});
							message();
						});
						$('#two .close, #two .but2').click(function(){message()});
					});
					//купить чтото в банке
					$('#content .bank .buys').click(function(){
						if(this.className.replace(/buys /g, '') == 'cube1' || this.className.replace(/buys /g, '') == 'cube2'){
							var it = this.className.replace(/buys /g, '');
							message('two', it == 'cube1'?'В малом кубе ресурсов может находится до 50 ресурсов всех видов и до 50 звёзд. Хотите проодлжить покупку?':'В большом кубе ресурсов может находиться до 100 ресурсов всех видов и до 100 звёзд. Шанс выпадения большего количества ресурсов и звёзд гораздо выше чем в малом кубе ресурсов. Продолжить покупку?', 'Да', 'Нет');
							$('#two .but2, #two .close').click(function(){message()});
							$('#two .but1').click(function(){
								avatars[0].buyCube = true;
								sock.send($.toJSON({type: 'buyCube', val: it}));
								if(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement){toggleFullScreen()};
								VK.callMethod('showOrderBox', {type: 'item', item: it});
							});
						}
						else{
							sock.send($.toJSON({type: 'buyStars', val: this.className.replace(/buys /g, '')}));
							if(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement){toggleFullScreen()};
							VK.callMethod('showOrderBox', {type: 'item', item: this.className.replace(/buys _/g, '')});
						}
					});					
					//TODO управление
					$('#content .war .control').click(function(){
						document.getElementById('shadow').style.display = 'block';
						document.getElementById('control').style.display = 'block';
					});
					//окно для изменения управления
					$('#control > div').click(function(){
						message('one', 'Нажмите клавишу, которую хотите назначить', 'Отмена');
						var keyName = this.className;
						$(document).keyup(function(ev){
							avatars[0].keys[weapons.keysNames.indexOf(keyName)] = ev.keyCode;
							$.cookie('keys', avatars[0].keys.join(','), {expires: 999})
							$('#control .'+keyName).html(weapons.keySet[avatars[0].keys[weapons.keysNames.indexOf(keyName)]]);
							message('one', 'Клавиша управления успешно изменена!', 'ОК');
							$('#one .but, #one .close').click(function(){message()});
						});
						$('#one .but, #one .close').click(function(){message()});
					});
					//события клавиатуры в чате
					$('#content .chat input').keypress(function(ev){
						var mess = $(this).val().replace(/[<>/\\@\[\]\{\}\&\$|`~^#№%\(\)]/g, '');
						setTimeout(function(){$('#content .chat input').val($('#content .chat input').val().replace(/[<>/\\@\[\]\{\}\&\$|`~^#№%\(\)]/g, ''))}, 0);
						if(ev.keyCode == 13 && mess.length > 0 && mess.replace(/[ ]/g, '').length > 0){
							if(avatars[0].chatTimer){
								$('#content .chat .messages .m').append('<span class="fail">Сообщения можно отсылать не чаще одного раза в секунду!</span><br/>');
								$('#content .chat .messages').mCustomScrollbar("scrollTo","bottom",{scrollInertia:0});
							}
							if(mess.length > 80){
								$('#content .chat .messages .m').append('<span class="fail">Сообщение должно быть длиной не больше 80 символов!</span><br/>');
								$('#content .chat .messages').mCustomScrollbar("scrollTo","bottom",{scrollInertia:0});
							}
							if(!avatars[0].chatTimer && mess.length <= 80){
								sock.send($.toJSON({type: 'chat', text: mess}));
								$(this).val('');
								avatars[0].chatTimer = true;
								setTimeout(function(){avatars[0].chatTimer = false}, 1000);
							}
						}
					});
					//события клавиатуры в поле секретного кода
					$('#secretCode').click(function(){
						if($(this).val() == 'Введите код и нажмите Enter'){
							$(this).val('');
						}
					});
					$('#secretCode').focusout(function(){
						if($(this).val() == ''){
							$(this).val('Введите код и нажмите Enter');
						}
					});
					$('#secretCode').keyup(function(ev){
						if(ev.keyCode == 13){
							message('preloader', 'Проверка кода...');
							sock.send($.toJSON({type: 'promo', code: $(this).val()}));
							$(this).val('Введите код и нажмите Enter');
						}
					});
					//турниры
					turnir.w7 = avatars[0].win7;
					turnir.w30 = avatars[0].win30;
					//переход между типами турниров
					$('.ratings .turnirName').click(function(){
						avatars[0].curTurnir = turnir.turnirs[avatars[0].curTurnir+1] ? avatars[0].curTurnir+1 : 0;
						setTurnirs(turnir.turnirs[avatars[0].curTurnir]);
					});
					//заявка на участие в турнире
					$('.ratings .setTurnir').click(function(){
						if(avatars[0].curTurnir == 1){
							message('two', 'Для подачи заявки на участие в недельном турнире побед нужно заплатить 10 звёзд. Победы начнут считаться с момента подачи заявки. Продолжить?', 'Да', 'Нет');
							$('#two .close, #two .but2').click(function(){message()});
							$('#two .but1').click(function(){
								if(avatars[0].stars < 10){
									message('one', 'Недостаточн звёзд для участия в турнире', 'Получить звёзды');
									message('one', msg.why, 'Получить звёзды');
									$('#one .but').click(function(){										
										$('#bank').click();
										message();
									});
									$('#one .close').click(function(){message()});
								}
								else{
									sock.send($.toJSON({type: 'setTurnir', num: avatars[0].curTurnir}));
								}
							});
						}
						if(avatars[0].curTurnir == 2){
							message('two', 'Для подачи заявки на участие в месячном турнире побед нужно заплатить 50 звёзд. Победы начнут считаться с момента подачи заявки. Продолжить?', 'Да', 'Нет');
							$('#two .close, #two .but2').click(function(){message()});
							$('#two .but1').click(function(){
								if(avatars[0].stars < 50){
									message('one', 'Недостаточн звёзд для участия в турнире', 'Получить звёзды');
									message('one', msg.why, 'Получить звёзды');
									$('#one .but').click(function(){										
										$('#bank').click();
										message();
									});
									$('#one .close').click(function(){message()});
								}
								else{
									sock.send($.toJSON({type: 'setTurnir', num: avatars[0].curTurnir}));
								}
							});
						}
					});
					VK.addCallback('onOrderSuccess', function(orderId) {
						if(avatars[0].buyRating == true){
							avatars[0].buyRating = false;
							sock.send($.toJSON({type: 'buyRatingOk', orderId: orderId}));
						}
						else if(avatars[0].buyTehnoTime == true){
							avatars[0].buyTehnoTime = false;
							sock.send($.toJSON({type: 'buyTehnoOk', orderId: orderId}));
						}
						else if(avatars[0].buyCube == true){
							avatars[0].buyCube = false;
							sock.send($.toJSON({type: 'buyCubeOk', orderId: orderId}));
						}
						else{
							sock.send($.toJSON({type: 'buyStarsOk', orderId: orderId}));
						}
					});
					VK.addCallback('onOrderCancel', function() {
						if(avatars[0].buyRating == true){
							avatars[0].buyRating = false;
							sock.send($.toJSON({type: 'buyRatingCancel'}));
						}
						else if(avatars[0].buyTehnoTime == true){
							avatars[0].buyTehnoTime = false;
							sock.send($.toJSON({type: 'buyTehnoCancel'}));
						}
						else if(avatars[0].buyCube == true){
							avatars[0].buyCube = false;
							sock.send($.toJSON({type: 'buyCubeCancel'}));
						}
						else{
							sock.send($.toJSON({type: 'buyStarsCancel'}));
						}
					});
					VK.addCallback('onOrderFail', function() {
						if(avatars[0].buyRating == true){
							avatars[0].buyRating = false;
							sock.send($.toJSON({type: 'buyRatingFail'}));
						}
						else if(avatars[0].buyTehnoTime == true){
							avatars[0].buyTehnoTime = false;
							sock.send($.toJSON({type: 'buyTehnoFail'}));
						}
						else if(avatars[0].buyCube == true){
							avatars[0].buyCube = false;
							sock.send($.toJSON({type: 'buyCubeFail'}));
						}
						else{
							sock.send($.toJSON({type: 'buyStarsFail'}));
						}
					});
					VK.addCallback('onRequestSuccess', function(){
						message('one', 'Возврат рейтинга проведён успешно!', 'ОК');
						$('#one .but, #one .close').click(function(){
							sock.send($.toJSON({type: 'endWarOkRating'}));
							message();
						});
					});
					VK.addCallback('onRequestCancel', function(){
						message('one', 'Возврат рейтинга отменён', 'ОК');
						$('#one .but, #one .close').click(function(){
							sock.send($.toJSON({type: 'endWarOk'}));
							message();
						});
					});
					VK.addCallback('onRequestFail', function(){
						message('one', 'Возврат рейтинга отменён', 'ОК');
						$('#one .but, #one .close').click(function(){
							sock.send($.toJSON({type: 'endWarOk'}));
							message();
						});
					});
					//прокликивание для инициализации
					$('#war').click();
					$('#content .war .plane').click();
					$('#content .planes .carousel img.default').click();
					$('#content .shop .weapons .A').click();
					//заполнение квестов
					fillQuests(avatars[0].quests)
					//восстановление топлива
					avatars[0].fuelInterval = setInterval(function(){
						sock.send($.toJSON({type: 'fuel'}));
					}, 11000);
					//заполнение технологий
					avatars[0].setTehno(avatars[0].tehnoNum,avatars[0].tehno,avatars[0].resources[3],avatars[0].stars);
					if(avatars[0].tehnoNum != 10){
						avatars[0].tehnoInterval = setInterval(function(){
							if(avatars[0].setTehnoTime(avatars[0].tehnoNum, avatars[0].tehnoTime, avatars[0].unixTime)){
								sock.send($.toJSON({type: 'getTehno'}));
							}
							else{
								avatars[0].unixTime -= 0;
								avatars[0].unixTime += 61000;
							}
						}, 60000);
						avatars[0].setTehnoTime(avatars[0].tehnoNum, avatars[0].tehnoTime, avatars[0].unixTime);
					}
					//канвасы для ПЕРЕЗАРЯДКИ оружия
					wp_x = [35,95,155,215,485,545,605,665,35,95,155,215,485,545,605,665];
					wp_canv = [];
					for(var i = 0; i < weapons.all.length; i++){
						wp_canv[weapons.all[i]] = [document.createElement('canvas')];
						wp_canv[weapons.all[i]][1] = wp_canv[weapons.all[i]][0].getContext('2d');
						wp_canv[weapons.all[i]][0].width = 50;
						wp_canv[weapons.all[i]][0].height = 50;
						wp_canv[weapons.all[i]][1].strokeStyle = i < 8 ? '#daa204' : '#a5cc0b';
						wp_canv[weapons.all[i]][1].lineWidth = 4;
						wp_canv[weapons.all[i]][0].id = 'cnv'+weapons.all[i];
						canvases.appendChild(wp_canv[weapons.all[i]][0]);
						wp_canv[weapons.all[i]][0].style.position = 'absolute';
						wp_canv[weapons.all[i]][0].style.top = i < 8 ? 534 : 12;
						wp_canv[weapons.all[i]][0].style.left = wp_x[i]-25;
					}
				break;
				case 'turnirOk':
					avatars[0].stars = msg.stars;
					$('#stars span').html(msg.stars);
					message('one', 'Заявка на участие в турнире успешно подана. Твоё имя появится в турнирной таблице в течении 30 минут.', 'OK');
					$('#one .close, #one .but').click(function(){message()});
					avatars[0].win7 = msg.w7;
					avatars[0].win30 = msg.w30;
					turnir.w7 = avatars[0].win7;
					turnir.w30 = avatars[0].win30;
					setTurnirs(turnir.turnirs[avatars[0].curTurnir]);
				break;
				case 'turnirCancel':
					message('one','При подаче заявки произошла ошибка. Попробуйте обновить страницу и совершить покупку снова.','ОК');
					$('#one .but, #one .close').click(function(){message()});
				break;
				case 'buyCancel':
					message('one','При покупке произошла ошибка. Попробуйте обновить страницу и совершить покупку снова.','ОК');
					$('#one .but, #one .close').click(function(){message()});
				break;
				case 'chat':
					if($('.chat').css('display') == 'none'){
						$('#chat').attr('style', 'color: #ffdc00');						
					}
					$('#content .chat .messages .m').append('<span class="mestime">'+new Date().toLocaleTimeString()+'</span> <a href="https://vk.com/id'+((msg.id=='adm')?37350847:msg.id)+'" target = "_blank"><span class="mesname mesid'+msg.id+'">'+msg.name+':</span></a> <span class="'+((msg.id==avatars[0].id) ? 'mesyou' : 'mestext')+'">'+msg.message+'</span><br/>');
					$('#content .chat .messages').mCustomScrollbar("scrollTo","bottom",{scrollInertia:0});
				break;
				case 'getTehno':
					if(msg.tehno){
						avatars[0].tehno = msg.tehno;
						avatars[0].tehnoNum = 10;
						avatars[0].tehnoTime = 0;
						avatars[0].setTehno(avatars[0].tehnoNum,avatars[0].tehno,avatars[0].resources[3],avatars[0].stars);
						clearInterval(avatars[0].tehnoInterval);
					}
					else{
						avatars[0].unixTime = msg.unixTime;						
					}
				break;
				case 'buy':
					avatars[0].stars = msg.stars;
					$('#stars span').html(msg.stars);
					switch(msg.typeBuy){
						case 'param':
							avatars[0][msg.item] = msg.value;
							$('#content .planes .carousel img.'+avatars[0].activePlane).click();
							$('#content .war .wmk span.wkk'+avatars[0].planeMk).click();
							var mes = '';
							switch(msg.item){
								case 'speed':
									mes += 'скорость';
								break;
								case 'radius':
									mes += 'манёвренность';
								break;
								case 'protection':
									mes += 'защиту';
								break;
								case 'damage':
									mes += 'мощность оружия';
								break;
								case 'rate':
									mes += 'скорость перезарядки';
								break;
							}
							mes += ' своего самолёта';
							message('one', 'Ты успешно увеличил '+mes, 'Рассказать друзьям');
							$('#one .but').click(function(){wall(avatars[0].id, ('Я увеличил '+mes+' в игре Авиамясо! Померимся силами? http://vk.com/aviamyaso_online'))});
							$('#one .close').click(function(){message()});
						break;
						case 'plane':
							avatars[0].planes = msg.planes;
							avatars[0].resources = msg.resources;
							avatars[0].setResources(avatars[0].resources);
							avatars[0].planesTrue.length = 0;
							for(var i = 0; i < 6; i++){
								if(avatars[0].planes[i]) avatars[0].planesTrue.push(weapons.planesArr[i]);
							}
							$('#content .planes .carousel img.'+avatars[0].activePlane).click();
							message('one', 'Ты успешно приобрёл '+weapons[msg.item[0]][msg.item[1]].name+', Mk. '+['I','II','III'][msg.item[1]] ,'Рассказать друзьям');
							$('#one .but').click(function(){wall(avatars[0].id, 'Я купил новый самолёт в игре Авиамясо! Померимся силами? http://vk.com/aviamyaso_online');sock.send($.toJSON({type: 'endWarOk'}));});
							$('#one .close').click(function(){message();sock.send($.toJSON({type: 'endWarOk'}));});
						break;
						case 'weapon':				
							avatars[0].weapons[msg.item] = msg.value;
							$('.weapons .'+msg.item+' .val span').html(msg.value);
							message('one', 'Ты успешно приобрёл '+weapons[msg.item].buy.replace(/(Купить )(.*)(за 1 звезду)/, '$2'), 'ОК');
							$('#one .but, #one .close').click(function(){message()});
						break;
						case 'wl':
							avatars[0].wl[msg.item] = msg.wl;
							avatars[0].resources = msg.resources;
							avatars[0].setResources(avatars[0].resources);
							$('.weapons .'+msg.item+' .valWL span').html(msg.wl);
							$('#content .shop .weapons .'+msg.item).click();
							message('one', 'Ты успешно улучшил оружие "'+weapons[msg.item].name+'" до модификации WL-'+msg.wl, 'ОК');
							$('#one .but, #one .close').click(function(){message()});
						break;
						case 'tehnology':
							avatars[0].resources = msg.resources;
							avatars[0].tehnoNum = msg.tehnoTime[0];
							avatars[0].tehnoTime = msg.tehnoTime[1];
							avatars[0].unixTime = msg.unixTime;
							avatars[0].setResources(avatars[0].resources);
							message();
							if(avatars[0].tehnoNum != 10){
								avatars[0].tehnoInterval = setInterval(function(){
									if(avatars[0].setTehnoTime(avatars[0].tehnoNum, avatars[0].tehnoTime, avatars[0].unixTime)){
										sock.send($.toJSON({type: 'getTehno'}));
									}
									else{
										avatars[0].unixTime -= 0;
										avatars[0].unixTime += 61000;
									}
								}, 60000);
								avatars[0].setTehnoTime(avatars[0].tehnoNum, avatars[0].tehnoTime, avatars[0].unixTime);
							}
						break;
					}
					avatars[0].prices();
					avatars[0].setTehno(avatars[0].tehnoNum,avatars[0].tehno,avatars[0].resources[3],avatars[0].stars);
				break;
				case 'buyCubeOk':
					avatars[0].stars = msg.stars;
					avatars[0].resources = msg.resources;
					$('#stars span').html(avatars[0].stars);
					avatars[0].setResources(avatars[0].resources);
					avatars[0].prices();
					avatars[0].setTehno(avatars[0].tehnoNum,avatars[0].tehno,avatars[0].resources[3],avatars[0].stars);
					message('one', 'При вскрытии куба в нём нашлось:<br/>Звёзды: '+msg.what[0]+'<br/>Металл: '+msg.what[1]+'<br/>Тротилл: '+msg.what[2]+'<br/>Кремний: '+msg.what[3]+'<br/>Алмазы: '+msg.what[4]+'<br/>', 'Продолжить');
					$('#one .but, #one .close').click(function(){message()});
				break;
				case 'buyStarsOk':
					avatars[0].stars = msg.val;
					$('#stars span').html(msg.val);
					if(msg.bnc == 1){message('one', 'Поздравляем! Ты оказался третьим игроком и получил в 2 раза больше звёзд!', 'Спасибо!');}
					else{message('one', 'Покупка прошла успешно!', 'Продолжить');}
					$('#one .but, #one .close').click(function(){message()});
					avatars[0].prices();
					avatars[0].setTehno(avatars[0].tehnoNum,avatars[0].tehno,avatars[0].resources[3],avatars[0].stars);
				break;
				case 'buyRatingOk':
					$('#rating span').html(avatars[0].rating+'<b title = "Процент рейтинга, добавляемый за каждую победу"> +'+msg.rating+'%</b>');
				break;
				case 'buyTehnoOk':
					avatars[0].tehnoNum = msg.tehnoTime[0];
					avatars[0].tehnoTime = msg.tehnoTime[1];
					avatars[0].unixTime = msg.unixTime;
					avatars[0].tehno = msg.tehno;
					avatars[0].setTehno(avatars[0].tehnoNum,avatars[0].tehno,avatars[0].resources[3],avatars[0].stars);
					clearInterval(avatars[0].tehnoInterval);
					if(avatars[0].tehnoNum != 10){
						avatars[0].tehnoInterval = setInterval(function(){
							if(avatars[0].setTehnoTime(avatars[0].tehnoNum, avatars[0].tehnoTime, avatars[0].unixTime)){
								sock.send($.toJSON({type: 'getTehno'}));
							}
							else{
								avatars[0].unixTime -= 0;
								avatars[0].unixTime += 61000;
							}
						}, 60000);
						avatars[0].setTehnoTime(avatars[0].tehnoNum, avatars[0].tehnoTime, avatars[0].unixTime);
					}
				break;
				case 'turn': 
					if(typeof(msg.ids) == 'object'){
						turn.length = 0;
						for(var i = 0; i < msg.ids.length; i++){
							turn.push([msg.ids[i], msg.rating[i], msg.range[i], msg.names[i], msg.fotos[i]]);
						}
						i = null; delete i;
					}
					else{
						turn.push([msg.ids, msg.rating, msg.range, msg.names, msg.fotos]);
					}
					turn.sort(function(a,b){return a[1]-b[1]});
					if(msg.ids == avatars[0].id){	//id undefined
						$('#inTurn .button').html('Выйти'); 
					} 
					$('#turn tr.id').remove();
					for(var i = 0; i < turn.length; i++){
						if(Math.abs(avatars[0].rating-turn[i][1]) < 5000){
							if($('#turn .inviteFriend').length > 0){ 
								$('#turn .inviteFriend').before('<tr class = "'+((turn[i][0] == avatars[0].id) ? 'you id' : 'id')+'"><td class = "foto"><a href = "http://vk.com/id'+turn[i][0]+'" target = "_blank"><img src = "'+turn[i][4]+'"></img></a></td><td><span class = "name">'+turn[i][3]+' </span> <span title = "Информация о сопернике" class = "getParamOpp id'+turn[i][0]+'"> &#9737;</span><br/>Рейтинг: <span class = "rating">'+turn[i][1]+'</span><br/>Ставка: <span class = "range" title = "Если выиграешь - заработаешь '+chislen(turn[i][2]*2, [' звезду',' звезды',' звёзд'])+'. Проиграешь - потеряешь '+chislen(turn[i][2], [' звезду',' звезды',' звёзд'])+'.">'+turn[i][2]+'</span><div class = "star"></div></td><td>'+((turn[i][0] == avatars[0].id) ? '' : '<div class = "button" id = "id'+turn[i][0]+'">Начать бой!</div>')+'</td></tr>');
							}
							else{
								$('#turn').append('<tr class = "'+((turn[i][0] == avatars[0].id) ? 'you id' : 'id')+'"><td class = "foto"><a href = "http://vk.com/id'+turn[i][0]+'" target = "_blank"><img src = "'+turn[i][4]+'"></img></a></td><td><span class = "name">'+turn[i][3]+' </span> <span title = "Информация о сопернике" class = "getParamOpp id'+turn[i][0]+'"> &#9737;</span><br/>Рейтинг: <span class = "rating">'+turn[i][1]+'</span><br/>Ставка: <span class = "range" title = "Если выиграешь - заработаешь '+chislen(turn[i][2]*2, [' звезду',' звезды',' звёзд'])+'. Проиграешь - потеряешь '+chislen(turn[i][2], [' звезду',' звезды',' звёзд'])+'.">'+turn[i][2]+'</span><div class = "star"></div></td><td>'+((turn[i][0] == avatars[0].id) ? '' : '<div class = "button" id = "id'+turn[i][0]+'">Начать бой!</div>')+'</td></tr>');
							}
						}
					}
					if(turn.length == 0 || typeof(msg.ids) == 'object') wallF(avatars[0].fids,avatars[0].wallFriends,avatars[0].friendId);
				break;
				case 'turnirs':
					turnir.rating.players = msg.rating;
					turnir.win7.players = msg.win7;
					turnir.win30.players = msg.win30;
					turnir.rating.html = '';
					turnir.win7.html = '';
					turnir.win30.html = '';
					var tt7 = [Math.floor(msg.t7/60/60/24), Math.floor(msg.t7/60/60)]; //1 - дни, 2 - часы
					tt7[1] -= tt7[0]*24;
					var tt30 = [Math.floor(msg.t30/60/60/24), Math.floor(msg.t30/60/60)]; //1 - дни, 2 - часы
					tt30[1] -= tt30[0]*24;
					
					turnir.update = msg.update;
					turnir.rating.timeEnd = chislen(tt7[0], [' день',' дня',' дней'])+' '+chislen(tt7[1], [' час',' часа',' часов']);
					turnir.win7.timeEnd = chislen(tt7[0], [' день',' дня',' дней'])+' '+chislen(tt7[1], [' час',' часа',' часов']);
					turnir.win30.timeEnd = chislen(tt30[0], [' день',' дня',' дней'])+' '+chislen(tt30[1], [' час',' часа',' часов']);
					var type = '';
					for(var j = 0; j < 3; j++){
						type = turnir.turnirs[j];
						for(var i = 0; i < (turnir[type].players.length-1 < 13 ? 13 : turnir[type].players.length); i++){
							if(turnir[type].players[i]){
								if(turnir[type].players[i].id == 0){
									turnir[type].players.splice(i,1);
									i -= 1;
								}
								else{
									var t = '';
									if(type == 'rating') t = turnir[type].players[i].rating
									else if(type == 'win7') t = turnir[type].players[i].win7
									else t = turnir[type].players[i].win30;
									if(turnir[type].players[i].id != avatars[0].id) turnir[type].html += '<tr class = "'+type+(i+1)+'"><td>'+(i+1)+'</td><td>'+turnir[type].players[i].name+'</td><td>'+t+'</td></tr>'
									else turnir[type].html += '<tr class = "'+type+(i+1)+'"><td style="color:#0f0">'+(i+1)+'</td><td style="color:#0f0">'+turnir[type].players[i].name+'</td><td style="color:#0f0">'+t+'</td></tr>';
								}
							}
							else{
								turnir[type].html += '<tr><td></td><td></td><td></td></tr>';
							}
						}
					}
					turnir.w7 = avatars[0].win7;
					turnir.w30 = avatars[0].win30;
					setTurnirs(turnir.turnirs[avatars[0].curTurnir]);
					$('.ratings .list .'+turnir.turnirs[avatars[0].curTurnir]+'1').click();
				break;
				case 'outTurn':
					if(msg.id == avatars[0].id){
						avatars[0].turn = false;
						$('#inTurn .button').html('В очередь');
						$('#turn .you').remove();
					}
					$('#id'+msg.id).parent().parent().remove();
					for(var i = 0; i < turn.length; i++){
						if(turn[i][0] == msg.id) turn.splice(i, 1);
					}
				break;
				case 'initWar':
					message('two', '<img style = "float: left; width: 50px; height: 50px;" src = "'+msg.foto+'"></img>'+msg.name+'<div class = "messagerating"></div>'+msg.rating+'<br/>хочет сразиться с тобой. Принять вызов?', 'ДА !', 'Нет');
					$('#two .but1').click(function(){
						sock.send($.toJSON({type: 'startWar'})); 
						message('preloader', 'Ожидание ответа сервера...');
					});
					$('#two .but2, #two .close').click(function(){
						sock.send($.toJSON({type: 'initWarCancel'})); 
						message();
					});
				break;
				case 'initWarCancel':
					avatars[0].oppId = false;
					msg.why2 = msg.why;
					switch(msg.why){
						case 'stars':
							msg.why = 'Недостаточно звёзд для участия в этой битве. Попробуйте выбрать другого игрока или пополнить запас звёзд';
							if($('#inTurn .button').html() == 'Ожидание...') $('#inTurn .button').html('В очередь')
						break;
						case 'fuel':
							msg.why = 'Для участия в битве в баке должно быть не меньше 10 литров топлива. Можно подождать окончания заправки или слить топливо у друзей';
						break;
						case 'no':
							msg.why = 'Этот игрок уже в бою или вышел из игры. Попробуйте выбрать другого соперника.';
						break;
						case 'load':
							msg.why = 'Этого игрока уже кто-то выбрал. Попробуйте выбрать другого соперника';
						break;
						case 'ratingMax':
							msg.why = 'Твой рейтинг намного выше, чем у выбранного игрока. Выбери себе более опытного соперника...';
						break;
						case 'ratingMin':
							msg.why = 'Твой рейтинг намного ниже, чем у выбранного игрока. Выбери себе менее опытного соперника...';
						break;
						default:
							msg.why = 'Игрок отклонил вызов. Попробуйте выбрать другого...';
					}
					if(msg.why2 == 'stars'){
						message('one', msg.why, 'Получить звёзды');
						$('#one .but').click(function(){										
							$('#bank').click();
							message();
						});
						$('#one .close').click(function(){message();});
					}
					else if(msg.why2 == 'fuel'){
						message('two', msg.why, 'Слить у друзей', 'Ждать окончания заправки');
						$('#two .but1').click(function(){
							message();
							$('#fuel .getfuel').click();
						});
						$('#two .but2, #two .close').click(function(){
							message();
						});
					}
					else{
						message('one', msg.why, 'OK');
						$('#one .but, #one .close').click(function(){message()});
					}
				break;
				case 'initWarOkCancel':
					message('one', 'Игрок отклонил вызов.', 'OK');
					$('#one .but, #one .close').click(function(){message()});
				break;
				case 'endWar':
					avatars[0].debaff = {
						M: {per: 1, tper: 1},
						E: {per: 1, tper: 1}
					};
					for(var i = 0; i < weapons.all.length; i++){
						avatars[0].per[weapons.all[i]] = Date.now();		//время выстрела (наращивается с каждым кадром)
						avatars[0].tper[weapons.all[i]] = Date.now();		//время окончания перезарядки
					}
					avatars[0].fallen = false;
					avatars[0].oppId = false;
					$('#learning').empty();
					$('#nl').css('display','none').unbind('click');
					document.getElementById('containerbody').style.background = 'none';
					avatars[0].fuelInterval = setInterval(function(){
						sock.send($.toJSON({type: 'fuel'}));
					}, 11000)
					//clearInterval(avatars[0].gameInterval);
					avatars[0].cancelAnimFrame = true;
					document.getElementById('particles').width = 700;
					avatars[1] = null; delete avatars[1];
					$(document).unbind('keyup');
					$(document).unbind('keydown');
					$('#warWeapons div, #particles').unbind('click'); 
					for(var i = 0; i < weapons_0.length; i++){
						weapons_0.splice(i,1);
						i -= 1;
					}
					for(var i = 0; i < weapons_1.length; i++){
						weapons_1.splice(i,1);
						i -= 1;
					}
					for(var i = 0; i < lasers.length; i++){
						lasers.splice(i,1);
						i -= 1;
					}
					for(var i = 0; i < bonuses.length; i++){
						if(bonuses[i].element) document.getElementById('bonuses').removeChild(bonuses[i].element);
						bonuses.splice(i,1);
						i -= 1;
					}
					turn = [];
					weapons_0 = [];
					weapons_1 = [];
					particles = [];
					lasers = [];
					smoke = [];
					avatars[0].time1 = 0;
					avatars[0].time2 = 0;
					avatars[0].time3 = 0;
					switch(msg.why){
						case 'kamikadze':
							msg.message = 'Ты взорвал свой самолёт. Бой закончился вничью.';
						break;
						case 'kamikadzeWin':
							msg.message = 'Соперник взорвал свой самолёт. Бой закончился вничью.';
						break;
						case 'fallen':
							avatars[0].fallen = false;
							avatars[0].stars -= msg.stars;
							avatars[0].rating -= msg.rating;
							if(msg.level) msg.message = 'Ты разбил свой самолёт об землю и проиграл! За проигрыш искусственному интеллекту ты не теряешь звёзд и рейтинга.'
							else msg.message = 'Ты разбил свой самолёт об землю и проиграл!<br/>Потеряно рейтинга: '+msg.rating+'<br/>Потеряно звёзд: '+msg.stars;
						break;
						case 'fallenWin':
							avatars[0].stars += msg.stars;
							avatars[0].rating += msg.rating+msg.bonusRating;
							if(msg.level) msg.message = 'Вражеский самолёт разбился об землю, ты победил искусственный интеллект '+(msg.level-1)+' уровня!<br/>Получено звёзд: '+msg.stars
							else msg.message = 'Вражеский самолёт разбился об землю, ты выиграл!<br/>Получено рейтинга: '+msg.rating+((msg.bonusRating > 0) ? ('<br/><span class = "b"> + '+msg.bonusRating+' за медали</span>') : '')+'<br/>Получено звёзд: '+msg.stars;
						break; 
						case 'looser':
							avatars[0].stars -= msg.stars;
							avatars[0].rating -= msg.rating;
							if(msg.level) msg.message = 'Ты проиграл в честной битве! За проигрыш искусственному интеллекту ты не теряешь звёзд и рейтинга.'
							else msg.message = 'Ты проиграл в честной битве!<br/>Потеряно рейтинга: '+msg.rating+'<br/>Потеряно звёзд: '+msg.stars;
						break;
						case 'winner':
							avatars[0].stars += msg.stars;
							avatars[0].rating += msg.rating+msg.bonusRating;
							if(msg.level) msg.message = 'Ты победил искуственный интеллект '+(msg.level-1)+' уровня!<br/>Получено звёзд: '+msg.stars
							else msg.message = 'Ты победил в честной битве!<br/>Получено рейтинга: '+msg.rating+((msg.bonusRating > 0) ? ('<br/><span class = "b"> + '+msg.bonusRating+' за медали</span>') : '')+'<br/>Получено звёзд: '+msg.stars;
						break;
						case 'disconnectOpponent':
							msg.message = 'Соперник вышел из игры. Всё топливо и боеприпасы будут возвращены.';
							avatars[0].weapons = msg.weapons;
							avatars[0].fuel += 10;
							clearInterval(avatars[0].fuelInterval);
						break;
					}
					avatars[0].life = 100;
					avatars[0].fuel -= 10; 
					if(avatars[0].fuel < 0) avatars[0].fuel = 0;
					if(avatars[0].stars < 0) avatars[0].stars = 0;
					if(avatars[0].rating < 0) avatars[0].rating = 0;
					if(msg.level){
						avatars[0].levelBot = msg.level;
						if(avatars[0].levelBot >= 0){
							$('#botGame .name').html('Исскуственный<br/>интеллект');
						}
						$('#botGame .lv').html(avatars[0].levelBot);
					}
					$('#fuel span').html(avatars[0].fuel);
					//$('#life2 span').html(avatars[0].life);
					avatars[0].setLife();
					$('#rating span, #inTurn .rating').html(avatars[0].rating);
					$('#stars span').html(avatars[0].stars);
					avatars[0].prices();
					avatars[0].setTehno(avatars[0].tehnoNum,avatars[0].tehno,avatars[0].resources[3],avatars[0].stars);
					avatars[0].setResources(avatars[0].resources);
					$('#warWeapons .weapons > div').removeClass('not');
					for(var i = 0; i < weapons.all.length; i++){
						avatars[0].per[weapons.all[i]] = Date.now();
						avatars[0].tper[weapons.all[i]] = Date.now();
					}
					$('.interface').css('display', 'block');
					$('.gameInterface').css('display', 'none');
					$('#info tr td.imafuel').css('display', 'block');
					if(!msg.level && msg.why != 'disconnectOpponent'){
						if(!msg.level && (msg.why=='looser'||msg.why=='fallen')){
							armessages.message = msg.message+'<br/>Чтобы не потерять рейтинг и звёзды, отправь другу подарок!';
							armessages.message2 = 'Возврат рейтинга и звёзд проведён успешно!';
							armessages.message3 = 'Не удалось разместить запись. Возврат рейтинга и звёзд отменён.';
							armessages.message4 = false;
						}
						else if(msg.why!='looser'||msg.why!='fallen'){
							armessages.message = msg.message+'<br/>Ты можешь удвоить полученный рейтинг, если отправишь другу подарок!';
							armessages.message2 = 'Удваивание рейтинга прошло успешно!';
							armessages.message3 = 'Не удалось разместить запись. Удваивание рейтинга отменено.';
							armessages.message4 = true;
						}
						message('one', armessages.message, 'Отправить подарок');
						$('#one .but').click(function(){
							VK.api('friends.get', {https: 1, count: 1, order: 'random'}, function(response){
								if(response.response[0] > 0){
									VK.api('photos.getWallUploadServer', {https: 1}, function (data) {
										$.post('upload.php', {'uploadUrl': data.response.upload_url, type: 'plane'}, function(data) {
											var upload = $.parseJSON(data);
											VK.api('photos.saveWallPhoto', {'hash': upload.hash, 'photo': upload.photo, 'server': upload.server, 'uid': response.response[0], 'gid': '', https: 1}, function (data) {
												if(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement){toggleFullScreen()};
												var brd = response.response[0]+'bonus'+Math.round(Math.random()*1000000);
												VK.api('wall.post', {message: 'Спасибо за помощь! =) Вот тебе за это подарок от меня! Введи в банке секретный код '+brd+' и получи валюту! http://vk.com/aviamyaso_online', attachments: data.response[0].id+',http://vk.com/aviamyaso_online', https: 1, owner_id: response.response[0]}, function(data){
													$('#vk_ads_4726').css('display', 'block');
													message('preloader', 'Сохранение результатов');
													setTimeout(function(){
														if(data.response){
															message('one', armessages.message2, 'ОК');
															$('#one .but, #one .close').click(function(){
																sock.send($.toJSON({type: ((!armessages.message4)?'endWarOkRating':'endWarOkRatingPlus'),brd:brd}));
																message();
															});
														}
														else{
															message('one', armessages.message3, 'ОК'); 
															$('#one .but, #one .close').click(function(){
																sock.send($.toJSON({type: 'endWarOk'}));
																message();
															});
														}
														$('#vk_ads_4726').css('display', 'none');
													}, 7000);
												})
											})
										});
									});
								}
								else{
									message('one', 'К сожалению, сейчас у тебя нет друзей, которые могут помочь =(', 'ОК');
									$('#one .close, #one .but').click(function(){
										$('#vk_ads_4726').css('display', 'block');
										message('preloader', 'Сохранение результатов');
										setTimeout(function(){
											if(msg.level){
												message('one', 'В следующий раз попробуй сыграть с другом, это гораздо интересней!', 'Пригласить друзей');
												$('#one .but').click(function(){
													if(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement){toggleFullScreen()};
													VK.callMethod('showInviteBox');
													sock.send($.toJSON({type: 'endWarOk'}));
													message();
												});
												$('#one .close').click(function(){
													sock.send($.toJSON({type: 'endWarOk'}));
													message();
												});
											}
											else{
												sock.send($.toJSON({type: 'endWarOk'}));
												message();
											}
											$('#vk_ads_4726').css('display', 'none');
										}, 7000);
									});
								}
							});
						});
						$('#one .close').click(function(){
							$('#vk_ads_4726').css('display', 'block');
							message('preloader', 'Сохранение результатов');
							setTimeout(function(){
								if(msg.level){
									message('one', 'В следующий раз попробуй сыграть с другом, это гораздо интересней!', 'Пригласить друзей');
									$('#one .but').click(function(){
										if(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement){toggleFullScreen()};
										VK.callMethod('showInviteBox');
										sock.send($.toJSON({type: 'endWarOk'}));
										message();
									});
									$('#one .close').click(function(){
										sock.send($.toJSON({type: 'endWarOk'}));
										message();
									});
								}
								else{
									sock.send($.toJSON({type: 'endWarOk'}));
									message();
								}
								$('#vk_ads_4726').css('display', 'none');
							}, 7000);
						});
					}
					else{
						message('one', msg.message, 'ОК');
						$('#one .close, #one .but').click(function(){
							$('#vk_ads_4726').css('display', 'block');
							message('preloader', 'Сохранение результатов');
							setTimeout(function(){
								if(msg.level && msg.why != 'disconnectOpponent'){								
									message('one', 'В следующий раз попробуй сыграть с другом, это гораздо интересней!', 'Пригласить друзей');
									$('#one .but').click(function(){
										if(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement){toggleFullScreen()};
										VK.callMethod('showInviteBox');
										sock.send($.toJSON({type: 'endWarOk'}));
										message();
									});
									$('#one .close').click(function(){
										sock.send($.toJSON({type: 'endWarOk'}));
										message();
									});
								}
								else{
									sock.send($.toJSON({type: 'endWarOk'}));
									message();
								}
								$('#vk_ads_4726').css('display', 'none');
							}, 7000);
						});
					}
				break;
				case 'promo':
					message('one','Вы успешно активировали серетный код и получили дополнительно 10 звёзд!','ОК');
					$('#secretCode').val();
					avatars[0].stars = msg.stars;
					$('#stars span').html(avatars[0].stars);
					$('#one .but, #one .close').click(function(){message()});
				break;
				case 'superPromo':
					message('one','Вы успешно активировали серетный код и получили дополнительно 30 звёзд!','ОК');
					$('#secretCode').val();
					avatars[0].stars = msg.stars;
					$('#stars span').html(avatars[0].stars);
					$('#one .but, #one .close').click(function(){message()});
				break;
				case 'cancelPromo':
					message('one','Секретный код введён неверно или предназначан не для Вас!','ОК');
					$('#one .but, #one .close').click(function(){message()});
				break;
				case 'fuel':
					avatars[0].fuel = msg.fuel;
					if(avatars[0].fuel >= 100){
						avatars[0].fuel = 100;
						clearInterval(avatars[0].fuelInterval);
					}
					$('#fuel span').html(avatars[0].fuel);
				break;
				case 'getParamOpp':
					if(msg.params){
						var mes = '<p style = "font-size: 15px">';
						for(var i = 0; i < weapons.hacked.length; i++){
							if(msg.params[i]){
								if(i >= 2 && i <= 6) msg.params[i] *= 10;
								if(i == 9) msg.params[i] = weapons[msg.params[i]][0].name;								
							}
							if(i == 10 && msg.params[i] >= 0){msg.params[i] -= 0; msg.params[i] += 1;}
							mes += weapons.hacked[i]+(msg.params[i] ? msg.params[i]+'  <br/>' : ' неизвестно<br/>');
						}
						message('one', mes+'</p>', 'OK');
						$('#one .but, #one .close').click(function(){message()});
					}
					else{
						message('one', 'Не удалось взломать систему противника', 'OK');
						$('#one .but, #one .close').click(function(){message()});
					}
				break;
				case 'startWar':
					clearInterval(avatars[0].fuelInterval);
					message();
					ctx.font = '35px Cuprum bold';
					ctx.textBaseline = 'middle';
					ctx.textAlign = 'center';
					ctx.fillStyle = '#ff4808';
					ctx.strokeStyle = '#ff0000';
					var ver = function(tw, nolog){
						tw = tw.replace(' not', '');
						if(!tw){
							return false;
						}
						if(avatars[0].per[tw] < avatars[0].tper[tw]){;
							if(!nolog)particles.push(new Effect({type: 'message', x: 350, y: 300, text: 'Перезарядка...', t: 2000}));
							return false;
						}
						if(!weapons[avatars[0].plane][avatars[0].planeMk].weaponsNI[tw] && weapons.weaponsNI[tw]){
							if(!nolog)particles.push(new Effect({type: 'message', x: 350, y: 300, text: 'Оружие недоступно на этом самолёте !', t: 2000}));
							return false;
						}
						if(!weapons[avatars[0].plane][avatars[0].planeMk].bonusesNI[tw] && weapons.bonusesNI[tw]){
							if(!nolog)particles.push(new Effect({type: 'message', x: 350, y: 300, text: 'Бонус недоступен на этом самолёте !', t: 2000}));
							return false;
						}
						if(avatars[0].weapons[tw] <= 0){
							avatars[0].weapons[tw] = 0;
							if(!nolog)particles.push(new Effect({type: 'message', x: 350, y: 300, text: 'Закончились боеприпасы !', t: 2000}));
							return false;
						}
						if(avatars[0].hot + (weapons[tw].hot/3)+(weapons[tw].hot/avatars[0].tehno[4]) > 100){
							particles.push(new Effect({type: 'message', x: 350, y: 300, text: 'Перегрев !', t: 2000}));
							return false;
						}
						return true;
					}
					avatars[1] = new Avatar(msg.parOpp);
					avatars[1].game(msg.parOpp);
					avatars[0].game(msg.parGame);
					avatars[0].imagePng.onload = function(){
						avatars[0].imagectx.drawImage(avatars[0].imagePng, 0, 0);
					}
					avatars[1].imagePng.onload = function(){
						avatars[1].imagectx.drawImage(avatars[1].imagePng, 0, 0);
					}
					avatars[1].time1 = 0;
					avatars[1].time2 = 0;
					avatars[1].time3 = 90;
					avatars[0].time4 = 0;
					avatars[0].time5 = 0;
					avatars[0].time6 = 0;
					avatars[0].timeRT0 = 0;
					avatars[1].learning = [0,0];
					avatars[0].clickWeapon = 0;
					avatars[0].regen = 0;
					avatars[0].superSpeed = 5000;
					avatars[1].superSpeed = 5000;
					avatars[0].superSpeedW = 200;
					//avatars[0].superSpeedT = 0;
					avatars[0].hot = 0;
					if(avatars[0].oppId == 'computer'){
						avatars[1].weapons = msg.parOpp.weapons;
						avatars[1].all = msg.parOpp.all;
						avatars[1].foto = msg.parOpp.foto;
						avatars[1].y = 451;
						avatars[1].debafE = 0;
						avatars[1].debafF = 0;
						if(avatars[0].levelBot == 0){
							$('#nl').css('display','block').click(function(){
								avatars[1].learning[0] = 15;
								avatars[1].learning[1] = 0;
								avatars[1].time2 = 90;
								avatars[1].time3 = 1000;
								$('#learning').empty();
								$(this).css('display','none').unbind('click');
							});
						}
					} 
					else if(avatars[0].levelBot == 0){
						$('#learning').html('УПРАВЛЕНИЕ САМОЛЁТОМ:<br/>'+weapons.keySet[avatars[0].keys[16]]+' - ВВЕРХ, '+weapons.keySet[avatars[0].keys[17]]+' - ВНИЗ<br/>ДЛЯ ВЫСТРЕЛА МОЖНО БЫСТРО<br/>КЛИКАТЬ В ЛЮБОМ МЕСТЕ ЭКРАНА,<br/>ПРИ ЭТОМ ВЫСТРЕЛ БУДЕТ ПРОИЗВЕДЕН ОДНИМ ИЗ 4 ОСНОВНЫХ<br/>ВИДОВ ОРУЖИЯ, КОТОРОЕ ЕСТЬ В НАЛИЧИИ И ПЕРЕЗАРЯЖЕНО.<br/>ИЛИ ПРОСТО КЛИКАТЬ ПО ИКОНКАМ С ОРУЖИЕМ.');
						setTimeout(function(){$('#learning').empty();}, 20000);
					}
					$('.interface').css('display', 'none');
					$('.gameInterface').css('display', 'block');
					document.getElementById('containerbody').style.background = 'url(images/bg.jpg)';
					for(var i = 0; i < weapons.all.length; i++){
						if(weapons[avatars[0].plane][avatars[0].planeMk].weaponsNI[weapons.all[i]] || weapons[avatars[0].plane][avatars[0].planeMk].bonusesNI[weapons.all[i]]){
							
						}
						else{
							$('#warWeapons .weapons > div.'+weapons.all[i]).addClass('not');							
						}
						particles.push(new Effect({type: 'per', typeW: weapons.all[i]}));
					}
					$(document).keydown(function(ev){
						//VK.callMethod('scrollWindow', {top: 40, speed: 0});
						if(!avatars[0].key){
							switch(ev.keyCode){
								case avatars[0].keys[16]:
									avatars[0].key = 'up';
								break;
								case avatars[0].keys[17]:
									avatars[0].key = 'down';
								break;
							}
							if(avatars[0].debaff.E.per < avatars[0].debaff.E.tper && !avatars[0].keyFlag){
								particles.push(new Effect({type: 'message', text: 'Управление заблокировано!', x: 350, y: 300, t: 1000}));
								avatars[0].key = false;
							}
							else if((ev.keyCode == avatars[0].keys[16] || ev.keyCode == avatars[0].keys[17]) && !avatars[0].keyFlag&& avatars[0].oppId != 'computer'){
								sock.send($.toJSON(avatars[0].getCorrect(1)));
								avatars[0].keyFlag = true;
							}
						}
						if(ev.keyCode == 16 && !avatars[0].shift && avatars[0].superSpeed > 500){
							avatars[0].shift = true;
							sock.send($.toJSON(avatars[0].getCorrect(1)));
						}
					});
					$(document).keyup(function(ev){
						//VK.callMethod('scrollWindow', {top: 40, speed: 0});
						if(ev.keyCode == avatars[0].keys[16] || ev.keyCode == avatars[0].keys[17]){
							avatars[0].key = false;
							if(avatars[0].keyFlag == true && avatars[0].oppId != 'computer'){
								sock.send($.toJSON(avatars[0].getCorrect(0)));
								avatars[0].keyFlag = false;
							}
						}
						else if(ev.keyCode == 16 && avatars[0].shift){
							avatars[0].shift = false;
							sock.send($.toJSON(avatars[0].getCorrect(0)));
						}
					});
					$('#warWeapons > div > div, #particles'/*, #superSpeed'*/).click(function(){
						/*if($(this).attr('id') == 'superSpeed'){
							if(avatars[0].superSpeed+10000 < Date.now()){
								sock.send($.toJSON({type:'superSpeed'}));
							}
							else{
								particles.push(new Effect({type: 'message', x: 350, y: 300, text: 'Перезарядка...', t: 2000}));
							}
						}
						else{*/
							var tw;
							if(this.id == 'particles'){
								avatars[0].clickWeapon = 0;
								tw = weapons.all[avatars[0].clickWeapon];
								for(var i = 0; i <= 3; i++){
									if(ver(weapons.all[i], true)){
										avatars[0].clickWeapon = i;
										tw = weapons.all[avatars[0].clickWeapon];
									}
								}
								if(ver(tw, true)) sock.send($.toJSON({type:'shot',x:avatars[0].x.toFixed(4)-0,y:avatars[0].y.toFixed(4)-0,a:avatars[0].ra.toFixed(4)-0,koef:avatars[0].koef,typeW:tw,side:avatars[0].sideName}));
							}
							else{
								tw = this.className;						
								if(ver(tw, false)) sock.send($.toJSON({type:'shot',x:avatars[0].x.toFixed(4)-0,y:avatars[0].y.toFixed(4)-0,a:avatars[0].ra.toFixed(4)-0,koef:avatars[0].koef,typeW:tw,side:avatars[0].sideName}));
							}
						//}
					});
					if(avatars[0].oppId == 'computer'){
						avatars[1].per = {};
						avatars[1].tper = {};
						for(var i = 0; i < weapons.all.length; i++){
							avatars[1].per[weapons.all[i]] = Date.now();		//время выстрела (наращивается с каждым кадром)
							avatars[1].tper[weapons.all[i]] = Date.now();		//время окончания перезарядки
						}
						for(var i = 0; i < avatars[1].all.length; i++){
							if(!weapons[avatars[1].plane][avatars[0].planeMk].weaponsNI[avatars[1].all[i]] && weapons.weaponsNI[avatars[1].all[i]]){
								avatars[1].all.splice(i,1);
								i -= 1;
							}
						}
					}
					//старт отрисовки
					avatars[0].gameInterval = function(rt){
						if(!avatars[0].cancelAnimFrame){
						//console.log(rt)
						//0time - время старта кадра
						//0time2 - время отрисовки кадра
						//0time3 - для корректировки
						//0time4 - подсчет кадров для вычисления среднего времени кадра
						ctx.clearRect(0,0,700,600); 						
						avatars[0].timeRT1 = rt-avatars[0].timeRT0;
						avatars[0].timeRT0 = rt;
						avatars[0].time = window.performance.now();
						avatars[0].time6 = window.performance.now();
						//проверка на падение
						if(avatars[0].y > 570 && !avatars[0].fallen){
							avatars[0].fallen = true;
							sock.send($.toJSON({type: 'hit', typeW: 'fallen'}));
						}
						//проверка компьютера на падение
						if(avatars[0].oppId == 'computer' && avatars[1].y > 570 && !avatars[1].fallen){
							avatars[1].fallen = true;
							sock.send($.toJSON({type: 'hit', typeW: 'fallen', bot: 1}));
						}
						//проверка попадания компьютера
						for(var i = 0; i < weapons_0.length; i++){
							if(weapons_0[i].draw({t:avatars[0].time2, tr:avatars[0].timeRT1, x:avatars[0].x, y:avatars[0].y, ra:avatars[0].ra}) == 'coordLimit'){
								weapons_0.splice(i,1);
							}
							else if(avatars[0].oppId == 'computer' && weapons_0[i].s && Math.abs(avatars[1].x-weapons_0[i].x) < 80 && Math.abs(avatars[1].y-weapons_0[i].y) < 80){
								var dl = Math.sqrt(((avatars[1].x-weapons_0[i].x)*(avatars[1].x-weapons_0[i].x))+((avatars[1].y-weapons_0[i].y)*(avatars[1].y-weapons_0[i].y)));
								if(dl < (avatars[1].w/4+weapons_0[i].w/4)+weapons_0[i].hit){
									sock.send($.toJSON({type: 'hit', typeW: weapons_0[i].typeW, i: i, bot: 1}));
									weapons_0.splice(i,1);
								};
							}
						}
						//проверка попадания с живым игроком
						for(var i = 0; i < weapons_1.length; i++){
							if(weapons_1[i].draw({t:avatars[0].time2, tr:avatars[0].timeRT1, x:avatars[0].x, y:avatars[0].y, ra:avatars[0].ra}) == 'coordLimit'){
								weapons_1.splice(i,1);
							}
							else if(weapons_1[i].s && Math.abs(avatars[0].x-weapons_1[i].x) < 80 && Math.abs(avatars[0].y-weapons_1[i].y) < 80){
								var dl = Math.sqrt(((avatars[0].x-weapons_1[i].x)*(avatars[0].x-weapons_1[i].x))+((avatars[0].y-weapons_1[i].y)*(avatars[0].y-weapons_1[i].y)));
								if(dl < (avatars[0].w/4+weapons_1[i].w/4)+weapons_1[i].hit){
									sock.send($.toJSON({type: 'hit', typeW: weapons_1[i].typeW, i: i}));
									weapons_1.splice(i,1);
								};
							}
						}
						//просчет игрока 1 и 2
						avatars[0].draw(avatars[0].time2,avatars[0].timeRT1);
						avatars[1].draw(avatars[0].time2,avatars[0].timeRT1);
						if(avatars[0].superSpeed < 100 && avatars[0].shift){
							avatars[0].shift = false;
							sock.send($.toJSON(avatars[0].getCorrect(1)));
						}
						//отрисовка эффектов
						for(var i = 0; i < particles.length; i++){
							if(avatars[0].oppId == 'computer' && particles[i].side == 1 && particles[i].typeW == 'E'){
								avatars[1].debafE = 1;
							}
							else{
								avatars[1].debafE = 0;
							}
							if(avatars[0].oppId == 'computer' && particles[i].side == 1 && particles[i].typeW == 'F'){
								avatars[1].debafF = 1;
							}
							else{
								avatars[1].debafF = 0;
							}
							if(particles[i].draw({t: avatars[0].time2, tr:avatars[0].timeRT1, per: avatars[0].per[particles[i].type], tper: avatars[0].tper[particles[i].type], x:avatars[0].x, y:avatars[0].y, ra:avatars[0].ra, x1:avatars[1].x, y1:avatars[1].y, ra1:avatars[0].ra}) == 'off'){
								particles.splice(i, 1);
								i -= 1;
							}
						}
						//отрисовка оружия
						for(var i = 0; i < lasers.length; i++){
							if(lasers[i].draw({t:avatars[0].time2, tr:avatars[0].timeRT1, x:avatars[0].x, y:avatars[0].y, ra:avatars[0].ra, x1:avatars[1].x, y1:avatars[1].y, ra1:avatars[0].ra}) == 'off'){
								lasers.splice(i,1);
								i -= 1;
							}
						}
						//отрисовка дыма
						for(var i = 0; i < smoke.length; i++){
							if(smoke[i].draw(avatars[0].time2,avatars[0].timeRT1) == 'off'){
								smoke.splice(i,1);
								if(smoke[i]) smoke[i].draw(avatars[0].time2,avatars[0].timeRT1);
							}
						}
						//отрисовка бонусов
						for(var i = 0; i < bonuses.length; i++){
							if(bonuses[i] && Math.abs(avatars[0].x-bonuses[i].x) < 50 && Math.abs(avatars[0].y-bonuses[i].y < 50)){
								var dl = Math.sqrt(((avatars[0].x-bonuses[i].x)*(avatars[0].x-bonuses[i].x))+((avatars[0].y-bonuses[i].y)*(avatars[0].y-bonuses[i].y)));
								if(dl < (avatars[0].w/4+5)+5){
									if(bonuses[i].element) document.getElementById('bonuses').removeChild(bonuses[i].element);
									sock.send($.toJSON({type: 'bonus', typeB: bonuses[i].typeB, i: i}));
									bonuses.splice(i, 1);
								};
							}
						} 
						//добавление дыма
						if(avatars[0].life < 65 && avatars[0].time2 < 10){
							smoke.push(new Effect({life:avatars[0].life, x:avatars[0].x, y:avatars[0].y, type:'smoke'}));
						}
						if(avatars[1].life < 65 && avatars[0].time2 < 10){
							smoke.push(new Effect({life:avatars[1].life, x:avatars[1].x, y:avatars[1].y, type:'smoke'}));
						}
						//проверка на отражение
						if(avatars[0].debaff.M.per > avatars[0].debaff.M.tper){
							avatars[0].debaff.M.per = 1;
							avatars[0].debaff.M.tper = 1;
							avatars[1].opacity = 1;
						}
						//автоаптечка если уровень технологии ИИ 3+
						if(avatars[0].tehno[4] >= 3 && avatars[0].weapons.I > 0 && avatars[0].life <= 30 && avatars[0].per.I >= avatars[0].tper.I){
							sock.send($.toJSON({type:'shot',x:avatars[0].x.toFixed(4)-0,y:avatars[0].y.toFixed(4)-0,a:avatars[0].ra.toFixed(4)-0,koef:avatars[0].koef.toFixed(4)-0,typeW:'I',side:avatars[0].sideName}));
						}
						//отрисовка компьютером себя, проверка оружия и т.д.
						if(avatars[0].oppId == 'computer'){
							var x = Math.abs(avatars[0].x-avatars[1].x);
							var y = Math.abs(avatars[0].y-avatars[1].y);
							var gp = Math.sqrt((x*x)+(y*y));
							var rad = avatars[1].ra*Math.PI/180;
							var prom;
							if(avatars[0].x < avatars[1].x && avatars[0].y < avatars[1].y) prom = Math.asin(y/gp)+rad
							else if(avatars[0].x > avatars[1].x && avatars[0].y < avatars[1].y) prom = (Math.PI/2)-Math.asin(y/gp)+rad+(Math.PI/2)
							else if(avatars[0].x > avatars[1].x && avatars[0].y > avatars[1].y) prom = Math.asin(y/gp)+rad+Math.PI
							else if(avatars[0].x < avatars[1].x && avatars[0].y > avatars[1].y) prom = (Math.PI/2)-Math.asin(y/gp)+rad+(Math.PI*1.5);
							var sin = Math.sin(prom);
							var cos = Math.cos(prom);
							avatars[1].time1 -= 40;
							avatars[1].time2 -= 40;
							avatars[1].time3 -= 40;
							if(avatars[1].time2 <= 0 && avatars[0].levelBot == 0 && avatars[1].time3 <= 0){
								if(weapons.learning[avatars[1].learning[0]]){
									if(weapons.learning[avatars[1].learning[0]][avatars[1].learning[1]] == '^') $('#learning').append('<br/>')
									else $('#learning').append(weapons.learning[avatars[1].learning[0]][avatars[1].learning[1]]);
									avatars[1].learning[1] += 1;
									avatars[1].time3 = 90;
									if(avatars[1].learning[1] >= weapons.learning[avatars[1].learning[0]].length){
										avatars[1].learning[1] = 0;
										avatars[1].learning[0] += 1;
										avatars[1].time2 = 1000;
										$('#learning').empty();
									}
								}
							}
							if(weapons.learning[avatars[1].learning[0]] && avatars[0].levelBot == 0){avatars[1].x = -800}
							else if(avatars[1].debafE === 0){
								if(avatars[1].debafF === 0 && avatars[0].opacity > 0.9){
									if(sin > 0.02){
										if(avatars[1].time1 <= 0){avatars[1].key = 'up'; avatars[1].time1 = 100/avatars[1].wradius}
									}
									else if(sin <= 0.02 && sin >= -0.02){
										if(avatars[1].time1 <= 0){avatars[1].key = false; avatars[1].time1 = 100/avatars[1].wradius}
									}
									else if(sin < -0.02){
										if(avatars[1].time1 <= 0){avatars[1].key = 'down'; avatars[1].time1 = 100/avatars[1].wradius}
									}
								}
								if(avatars[1].y > 500){
									if(Math.cos(rad) >= 0){avatars[1].key = 'up'; avatars[1].time1 = 100/avatars[1].wradius}
									else{avatars[1].key = 'down'; avatars[1].time1 = 100/avatars[1].wradius}
								}
								if(avatars[1].weapons.I > 0 && avatars[1].life <= ((avatars[1].weapons.I*10>80)?80:avatars[1].weapons.I) && avatars[0].life >= 50-avatars[0].levelBot && avatars[1].per.I >= avatars[1].tper.I){
									sock.send($.toJSON({type:'shot',x:avatars[1].x.toFixed(4)-0,y:avatars[1].y.toFixed(4)-0,a:avatars[1].ra.toFixed(4)-0,koef:avatars[1].koef,typeW:'I',side:avatars[1].sideName,bot: 1}));
									avatars[1].weapons.I -= 1;
								}
								if(avatars[1].weapons.J > 0 && avatars[1].life <= 50 && avatars[1].per.J >= avatars[1].tper.J){
									sock.send($.toJSON({type:'shot',x:avatars[1].x,y:avatars[1].y,a:avatars[1].ra,koef:avatars[1].koef,typeW:'J',side:avatars[1].sideName,bot: 1}));
									avatars[1].weapons.J -= 1;
								}
								for(var i = 0; i < avatars[1].all.length; i++){
									avatars[1].per[avatars[1].all[i]] += 40;
									if((sin <= 0.035 && sin >= -0.035 || (sin <= 0.3 && sin >= -0.3 && gp < 30) || gp < 15)&&(avatars[1].per[avatars[1].all[i]] >= avatars[1].tper[avatars[1].all[i]])&&(avatars[1].weapons[avatars[1].all[i]] > 0 && avatars[1].all[i] != 'I' && avatars[1].all[i] != 'J')){
										sock.send($.toJSON({type:'shot',x:avatars[1].x.toFixed(4)-0,y:avatars[1].y.toFixed(4)-0,a:avatars[1].ra.toFixed(4)-0,koef:avatars[1].koef,typeW:avatars[1].all[i],side:avatars[1].sideName,bot: 1}));
										avatars[1].weapons[avatars[1].all[i]] -= 1;
									}
								}
							}
							avatars[1].debafE = 0;
							avatars[1].debafF = 0;
							avatars[1].debafM = 0;
						}
						//корректировка координат
						if(avatars[0].time3 >= 1500 && avatars[0].oppId != 'computer'){
							//sock.send($.toJSON(avatars[0].getCorrect()));
							avatars[0].time3 = 0;						
						}
						//просчет времени отрисовки всего кадра
						avatars[0].time2 = window.performance.now()-avatars[0].time;
						avatars[0].time5 += window.performance.now() - avatars[0].time6;
						//console.log(window.performance.now() - avatars[0].time6);
						avatars[0].time4+=1;
						if(avatars[0].time4 > 100){
							console.log(avatars[0].time5/avatars[0].time4);
							avatars[0].time5 =0;
							avatars[0].time4 =0;
						}
						//регенерация (технология материала)
						avatars[0].regen += avatars[0].timeRT1;
						if(avatars[0].regen >= avatars[0].regenTime){
							sock.send($.toJSON({type: 'regen'}));
							avatars[0].regen = 0;
						}
						avatars[0].time3 += avatars[0].timeRT1;
						requestAnimFrame(avatars[0].gameInterval, document.getElementById('particles'));
						}
					};
					avatars[0].cancelAnimFrame = false;
					requestAnimFrame(avatars[0].gameInterval, document.getElementById('particles'));
				break;
				case 'correct':
					avatars[1].setCorrect(msg);
					avatars[0].pinger = msg.ping;
				break;
				case 'shot':
					//если выстрел от себя
					if(msg.side == avatars[0].sideName){
						//если это оружие, добавляем ракету на поле и добавляем перегрев
						if(weapons.weaponsNI[msg.typeW]){
							weapons_0.push(new Rocket(msg,avatars[1].x,avatars[1].y));
							avatars[0].hot += msg.hot*2;
						}
						//иначе добавляем эффект бонуса
						else{
							lasers.push(new Effect({type: msg.typeW, per: msg.per, koef: avatars[0].koef, side: 0}));
						}
						//меняем счетчик патронов
						avatars[0].weapons[msg.typeW] = msg.val;
						$('.weapons .'+msg.typeW+' .val span').html(avatars[0].weapons[msg.typeW]);
						//время перезарядки и анимация
						avatars[0].per[msg.typeW] = Date.now();
						avatars[0].tper[msg.typeW] = Date.now()+msg.per;
						particles[weapons[msg.typeW].index].per = avatars[0].per[msg.typeW];
						particles[weapons[msg.typeW].index].tper = avatars[0].tper[msg.typeW];
						//если бонус
						switch(msg.typeW){
							case 'I':
								avatars[0].life = msg.life;
								//$('#life2 span').html(msg.life);
								avatars[0].setLife();
								particles.push(new Effect({type: 'message', text: ('+10 HP'), x: 350, y: 250, t: 1000}));
							break;
							case 'J':
								particles.push(new Effect({type: 'message', text: ('Щит активирован!'), x: 350, y: 250, t: 2000}));
							break;
							case 'K':
								particles.push(new Effect({type: 'message', text: ('Лазерный приицел активирован!'), x: 350, y: 250, t: 2000}));
							break;
							case 'L':
								//sock.send($.toJSON({type: 'hit', typeW: 'kamikadze'}));
								avatars[0].x = (avatars[0].sideName == 'left') ? 40 : 660;		
								avatars[0].y = 450;
								avatars[0].s = avatars[0].wspeed;
								avatars[0].r = avatars[0].s*50/avatars[0].wradius;
								avatars[0].cosa = (avatars[0].r*avatars[0].r+avatars[0].r*avatars[0].r-avatars[0].s*avatars[0].s)/(2*avatars[0].r*avatars[0].r);
								avatars[0].a = 0;
								avatars[0].ra = avatars[0].a;
								sock.send($.toJSON(avatars[0].getCorrect()));
								particles.push(new Effect({type: 'message', text: ('Телепорт сработал успешно!'), x: 350, y: 250, t: 2000}));
							break;
							case 'M':
								particles.push(new Effect({type: 'message', text: ('Генератор невидимости активирован!'), x: 350, y: 250, t: 2000}));
							break;
							case 'N':
								particles.push(new Effect({type: 'message', text: ('Отражатель активирован!'), x: 350, y: 250, t: 2000}));
							break;
							case 'O':
								particles.push(new Effect({type: 'message', text: ('Антинаведение активировано!'), x: 350, y: 250, t: 2000}));
							break;
							case 'P':
								particles.push(new Effect({type: 'message', text: ('Быстрая перезарядка активирована!'), x: 350, y: 250, t: 2000}));
							break;
						}
					}
					else if(msg.side == avatars[1].sideName){
						if(avatars[0].oppId == 'computer'){
							avatars[1].per[msg.typeW] = Date.now();
							avatars[1].tper[msg.typeW] = Date.now()+msg.per+100;
						}
						if(weapons.weaponsNI[msg.typeW]){
							weapons_1.push(new Rocket(msg,avatars[0].x,avatars[0].y));
						}
						else if(msg.typeW == 'I'){
							lasers.push(new Effect({type: msg.typeW, per: msg.per, koef: avatars[1].koef, side: 1}));
						}
						switch(msg.typeW){
							case 'I':
								avatars[1].life = msg.life;
								particles.push(new Effect({type: 'message', text: ('Соперник применил аптечку'), x: 350, y: 350, t: 2000}));
							break;
							case 'J':
								particles.push(new Effect({type: 'message', text: ('Соперник активировал щит!'), x: 350, y: 350, t: 2000}));
							break;
							case 'L':
								particles.push(new Effect({type: 'message', text: ('Соперник телепортировался!'), x: 350, y: 350, t: 2000}));
							break;
							case 'M':
								particles.push(new Effect({type: 'message', text: ('Соперник активировал генератор невидимости!'), x: 350, y: 350, t: 2000}));
								avatars[0].debaff.M.per = Date.now();
								avatars[0].debaff.M.tper = Date.now()+msg.per;
								avatars[1].opacity = 0;
							break;
							case 'N':
								particles.push(new Effect({type: 'message', text: ('Соперник активировал отражатель!'), x: 350, y: 350, t: 2000}));
							break;
							case 'O':
								particles.push(new Effect({type: 'message', text: ('Соперник активировал антинаведение!'), x: 350, y: 350, t: 2000}));
							break;
						}
					}
				break;
				case 'superSpeed':
					//if(msg.side == avatars[0].sideName){
						//particles.push(new Effect({type: 'message', text: ('Супер-скорость активирована!'), x: 350, y: 350, t: 2000}));
						//avatars[0].wSuperSpeed = msg.speed;
						//avatars[0].superSpeed = Date.now()+msg.timer; //когда закончится супер скорость
						//avatars[0].superSpeedT = msg.timer;
					//}
					//else{
						//avatars[1].wSuperSpeed = msg.speed;
						//avatars[1].superSpeed = Date.now()+msg.timer;
						//particles.push(new Effect({type: 'message', text: ('Соперник активировал супер-скорость!'), x: 350, y: 350, t: 2000}));
					//}
				break;
				case 'bonus':
					//if(avatars[0].oppId != 'computer'){
						bonuses.push({typeB: msg.typeB, element: document.createElement('img'), x: msg.x, y: msg.y});
						bonuses[bonuses.length-1].element.style.left = msg.x-10;
						bonuses[bonuses.length-1].element.style.top = msg.y-10;
						bonuses[bonuses.length-1].element.src = 'rockets/'+msg.typeB+'.png';
						document.getElementById('bonuses').appendChild(bonuses[bonuses.length-1].element);
					//}
				break;
				case 'bonusLoose':
					if(msg.typeB == 'apteka'){
						avatars[1].life += 10;
						if(avatars[1].life >= 100) avatars[1].life = 100;
					}
					if(bonuses[msg.i].element) document.getElementById('bonuses').removeChild(bonuses[msg.i].element);
					bonuses.splice(msg.i, 1);
				break;
				case 'bonusOk':
					avatars[0].rating = msg.rating; 
					avatars[0].stars = msg.stars;
					avatars[0].life = msg.life;
					avatars[0].resources = msg.resources;
					//$('#life2 span').html(msg.life);
					avatars[0].setLife();
					var mes = '';
					switch(msg.typeB){
						case 'star':
							mes = '+ 1 звезда!';
						break;
						case 'rating':
							mes = '+ 20 рейтинга!';
						break;
						case 'apteka':
							mes = '+ 10 HP!';
						break;
						case 'metall':
							mes = '+1 металл';
						break;
						case 'silicon':
							mes = '+1 кремний';
						break;
						case 'trotill':
							mes = '+1 тротилл';
						break;
						case 'diamonds':
							mes = '+1 алмаз';
						break;
					}
					particles.push(new Effect({type: 'message', text: mes, x: 350, y: 300, t: 2000}));					
				break;
				case 'regen':
					avatars[0].life = msg.life;
					//$('#life2 span').html(msg.life);
					avatars[0].setLife();
				break;
				case 'regenOpp':
					avatars[1].life = msg.life;
				break;
				case 'hit':
					msg.damageCam = msg.damage >= 5 ? 5 : msg.damage;
					if(msg.damageCam >= 2){
						avatars[0].camX = avatars[0].rand(-msg.damageCam*5,msg.damageCam*5);
						avatars[0].camY = avatars[0].rand(-msg.damageCam*5,msg.damageCam*5);
						avatars[0].cam = msg.damageCam*100;
						avatars[0].camD = 16;	
					}
					avatars[0].life = msg.life;
					if(avatars[0].life <= 0) avatars[0].life = 0;
					if(avatars[0].life > 100) avatars[0].life = 100;
					//$('#life2 span').html(msg.life);
					avatars[0].setLife();
					if(msg.damage <= 0){
						particles.push(new Effect({type: 'message', text: ('ПРОМАХ!'), x: avatars[0].x, y: avatars[0].y, t: 1000}));
					}
					else{ 
						particles.push(new Effect({type: 'message', text: ('-'+(Math.round(msg.damage))), x: avatars[0].x, y: avatars[0].y, t: 1000}));
					}
					switch(msg.typeW){
						case 'C':
							avatars[0].ra -= msg.damage*3*avatars[1].koef;
						break;
						case 'E':
							avatars[0].debaff.E.per = Date.now();
							avatars[0].debaff.E.tper = Date.now()+(msg.damage*500);
							particles.push(new Effect({type: 'message', text: ('Управление заблокировано!'), x: 350, y: 350, t: 2000}));
						break;
					}
					particles.push(new Effect({type: msg.typeW, x: avatars[0].x, y: avatars[0].y, side: 0, damage: msg.damage}));
				break;
				case 'pop':
					msg.damageCam = msg.damage >= 5 ? 5 : msg.damage;
					if(msg.damageCam >= 2){
						avatars[0].camX = avatars[0].rand(-msg.damageCam*2,msg.damageCam*2);
						avatars[0].camY = avatars[0].rand(-msg.damageCam*2,msg.damageCam*2);
						avatars[0].cam = msg.damageCam*70;
						avatars[0].camD = 16;	
					}
					avatars[1].life = msg.life; 
					if(avatars[1].life <= 0) avatars[1].life = 0;
					if(avatars[1].life > 100) avatars[1].life = 100;
					if(weapons_0.length > msg.i){
						weapons_0.splice(msg.i,1);
					}
					if(msg.damage <= 0){
						particles.push(new Effect({type: 'message', text: ('ПРОМАХ!'), x: avatars[1].x, y: avatars[1].y, t: 1000}));
					}
					else{
						particles.push(new Effect({type: 'message', text: ('-'+(Math.round(msg.damage))), x: avatars[1].x, y: avatars[1].y, t: 1000}));
					}
					switch(msg.typeW){
						case 'C':
							avatars[1].ra += msg.damage*3*avatars[1].koef;
						break;
						case 'E':
							particles.push(new Effect({type: 'message', text: ('Прямое попадание! Управление соперника заблокировано!'), x: 300, y: 220, t: 2000}));
						break;
					}
					if(msg.typeW == 'F') msg.damage = 1;
					particles.push(new Effect({type: msg.typeW, x: avatars[1].x, y: avatars[1].y, side: 1, damage: msg.damage}));
				break; 
				case 'medails':
					weapons.messages = [];
					avatars[0].quests = msg.quests;
					for(var i = 0; i < msg.one.length; i++){
						switch(msg.one[i]){
							case 0:
								weapons.messages.push('Ты сыграл 10 игр, прими медаль и награду - 5 осколочных ракет!');
							break;
							case 1:
								weapons.messages.push('Ты сыграл 50 игр, прими медаль и награду - 50 ударных и 50 осколочных ракет!');
							break;
							case 2:
								weapons.messages.push('Ты сыграл 100 игр, прими медаль и награду - 10 алмазов!');
							break;
							case 3:
								weapons.messages.push('Ты сыграл 500 игр, прими медаль и награду - 30 металла, 30 кремния, 30 тротилла и 15 алмазов!');
							break;
							case 4:
								weapons.messages.push('Ты сыграл 1000 игр, прими медаль и награду - 50 алмазов и 100 звёзд!');
							break;
							case 5:
								weapons.messages.push('Ты одержал победу 10 раз, прими медаль и награду - теперь за каждую победу ты будешь получать на 5% больше рейтинга!');
							break;
							case 6:
								weapons.messages.push('Ты одержал победу 50 раз, прими медаль и награду - теперь за каждую победу ты будешь получать на 10% больше рейтинга!');
							break;
							case 7:
								weapons.messages.push('Ты одержал победу 100 раз, прими медаль и награду - теперь за каждую победу ты будешь получать на 20% больше рейтинга!');
							break;
							case 8:
								weapons.messages.push('Ты одержал победу 500 раз, прими медаль и награду - теперь за каждую победу ты будешь получать на 35% больше рейтинга!');
							break;
							case 9:
								weapons.messages.push('Ты одержал победу 1000 раз, прими медаль и награду - теперь за каждую победу ты будешь получать на 50% больше рейтинга!');
							break;
							case 16:
								weapons.messages.push('Ты заходил в игру 5 дней подряд, прими медаль и награду - теперь за каждую победу ты будешь получать на 3% больше рейтинга!');
							break;
							case 10:
								weapons.messages.push('Ты добил соперника пулемётом, прими медаль и награду - 100 патронов к пулемёту!');
							break;
							case 11:
								weapons.messages.push('Ты купил все самолёты, прими медаль и награду - 100 алмазов!');
							break;
							case 12:
								weapons.messages.push('Ты наворовал 500 единиц топлива, прими медаль и награду - 50 металла, 50 кремния, 50 тротилла и 30 алмазов!');
							break;
							case 13:
								weapons.messages.push('Ты победил с 1 жизнью, прими медаль и награду - 20 щитов и 20 аптечек!');
							break;
							case 14:
								weapons.messages.push('Ты набрал 10000 рейтинга, прими медаль и награду - 10 алмазов!');
							break;
							case 15:
								weapons.messages.push('Ты набрал 100000 рейтинга, прими медаль и награду - 40 металла, 40 кремния, 40 тротилла и 100 звёзд!');
							break;
						}
						weapons.messages[i] += '<br/><div class = "qq'+(msg.one[i]+1)+' medal"></div>';
					}
					for(var i = 0; i < weapons.all.length; i++){
						avatars[0].weapons[weapons.all[i]] = msg.weapons[i]-=0;
						$('.weapons .'+weapons.all[i]+' .val span').html(avatars[0].weapons[weapons.all[i]]);
					}
					if(msg.dayBonus > 0){
						weapons.messages.unshift('<div class = "dayBonus"></div>Ты играешь '+msg.dayBonus+' день подряд и заслуживаешь бонус - '+(msg.dayBonus*3)+' звёзд!');
						avatars[0].stars += (msg.dayBonus*3);
					}
					if(msg.leftRating && msg.leftStars){
						avatars[0].rating = msg.leftRating;
						avatars[0].stars = msg.leftStars;
						$('#rating span, #inTurn .rating').html(avatars[0].rating);
						$('#stars span').html(avatars[0].stars);
					}
					else if(msg.leftRating && !msg.leftStars){
						avatars[0].rating = msg.leftRating;
						$('#rating span, #inTurn .rating').html(avatars[0].rating);
					}
					fillQuests(avatars[0].quests);
					msg.ruletka = 0;
					if(msg.turnirs.r >= 1 && msg.turnirs.r <= 10){
						msg.one.push(20);
						weapons.wallMessages[20] = 'Я занял '+msg.turnirs.r+' место в общем рейтинге игроков за неделю! Слабо со мной потягаться?';
						var nagrada = '';
						if(msg.turnirs.r <= 3){
							nagrada = '<span class = "nagrad st">'+turnir.rating.win[msg.turnirs.r-1][0]+'<div></div></span></br><span class = "nagrad me">'+turnir.rating.win[msg.turnirs.r-1][1]+'<div></div></span></br><span class = "nagrad si">'+turnir.rating.win[msg.turnirs.r-1][2]+'<div></div></span></br><span class = "nagrad tr">'+turnir.rating.win[msg.turnirs.r-1][3]+'<div></div></span></br><span class = "nagrad di">'+turnir.rating.win[msg.turnirs.r-1][4]+'<div></div></span></br>';
						}
						else{
							nagrada = '<span class = "nagrad st">'+turnir.rating.win[3][0]+'<div></div></span></br><span class = "nagrad me">'+turnir.rating.win[3][1]+'<div></div></span></br><span class = "nagrad si">'+turnir.rating.win[3][2]+'<div></div></span></br><span class = "nagrad tr">'+turnir.rating.win[3][3]+'<div></div></span></br><span class = "nagrad di">'+turnir.rating.win[3][4]+'<div></div></span></br>';
						}
						weapons.messages.push('Ты завоевал '+msg.turnirs.r+' место в общем рейтинге игроков!<br/>Твоя награда:<br/>'+nagrada);
					}
					if(msg.turnirs.w7 >= 1 && msg.turnirs.w7 <= 10){
						msg.one.push(21);
						weapons.wallMessages[21] = 'Я занял '+msg.turnirs.w7+' место в недельном турнире побед! Слабо со мной потягаться?';
						var nagrada = '';
						if(msg.turnirs.w7 <= 3){
							nagrada = '<span class = "nagrad st">'+turnir.win7.win[msg.turnirs.w7-1][0]+'<div></div></span></br><span class = "nagrad me">'+turnir.win7.win[msg.turnirs.w7-1][1]+'<div></div></span></br><span class = "nagrad si">'+turnir.win7.win[msg.turnirs.w7-1][2]+'<div></div></span></br><span class = "nagrad tr">'+turnir.win7.win[msg.turnirs.w7-1][3]+'<div></div></span></br><span class = "nagrad di">'+turnir.win7.win[msg.turnirs.w7-1][4]+'<div></div></span></br>';
						}
						else{
							nagrada = '<span class = "nagrad st">'+turnir.win7.win[3][0]+'<div></div></span></br><span class = "nagrad me">'+turnir.win7.win[3][1]+'<div></div></span></br><span class = "nagrad si">'+turnir.win7.win[3][2]+'<div></div></span></br><span class = "nagrad tr">'+turnir.win7.win[3][3]+'<div></div></span></br><span class = "nagrad di">'+turnir.win7.win[3][4]+'<div></div></span></br>';
						}
						weapons.messages.push('Ты завоевал '+msg.turnirs.w7+' место в недельном турнире побед!<br/>Твоя награда:<br/>'+nagrada);
					}
					if(msg.turnirs.w30 >= 1 && msg.turnirs.w30 <= 10){
						msg.one.push(22);
						weapons.wallMessages[22] = 'Я занял '+msg.turnirs.w30+' место в месячном турнире побед! Слабо со мной потягаться?';
						var nagrada = '';
						if(msg.turnirs.w30 <= 3){
							nagrada = '<span class = "nagrad st">'+turnir.win30.win[msg.turnirs.w30-1][0]+'<div></div></span></br><span class = "nagrad me">'+turnir.win30.win[msg.turnirs.w30-1][1]+'<div></div></span></br><span class = "nagrad si">'+turnir.win30.win[msg.turnirs.w30-1][2]+'<div></div></span></br><span class = "nagrad tr">'+turnir.win30.win[msg.turnirs.w30-1][3]+'<div></div></span></br><span class = "nagrad di">'+turnir.win30.win[msg.turnirs.w30-1][4]+'<div></div></span></br>';
						}
						else{
							nagrada = '<span class = "nagrad st">'+turnir.win30.win[3][0]+'<div></div></span></br><span class = "nagrad me">'+turnir.win30.win[3][1]+'<div></div></span></br><span class = "nagrad si">'+turnir.win30.win[3][2]+'<div></div></span></br><span class = "nagrad tr">'+turnir.win30.win[3][3]+'<div></div></span></br><span class = "nagrad di">'+turnir.win30.win[3][4]+'<div></div></span></br>';
						}
						weapons.messages.push('Ты завоевал '+msg.turnirs.w30+' место в месячном турнире побед!<br/>Твоя награда:<br/>'+nagrada);
					}
					if(msg.ruletka != 0){
						weapons.helpForRul = {one: msg.one, dayBonus: msg.dayBonus};
						message('one', '1 раз в день ты можешь крутить колесо удачи, и выиграть ценный бонус!', 'Ну давай!');
						$('#one .but, #one .close').click(function(){
							message('rul');
							$('.start_rul').click(function(){
								$(this).css('opacity', 0);
								$('img.shape').css('-webkit-transform', 'rotate('+(2880+(22.5*msg.ruletka))+'deg)');
								$('.surprize').html(weapons.rul_text[msg.ruletka]).css('top', 185-$('.surprize').height()/2);
								setTimeout(function(){
									$('.start_rul').css('display', 'none');
									$('.surprize').css('opacity', '1');
									setTimeout(function(){
										message();
										mesQ(avatars[0].id, weapons.helpForRul.one, weapons.helpForRul.dayBonus, ((avatars[0].rating == 1000 && avatars[0].stars == 10 && avatars[0].fuel == 100) ? true : false));
										//$('.surprize').css('opacity', '0');
										//TODO
									}, 5000);
								}, 9000);
							});
						});
					}
					else{
						mesQ(avatars[0].id, msg.one, msg.dayBonus, ((avatars[0].rating == 1000 && avatars[0].stars == 10 && avatars[0].fuel == 100) ? true : false));
					}
					avatars[0].resources = msg.resources;
					avatars[0].stars = msg.stars;
					$('#rating span').html(avatars[0].rating+'<b title = "Процент рейтинга, добавляемый за каждую победу"> +'+msg.rating+'%</b>');
					$('#stars span').html(avatars[0].stars);
					avatars[0].prices();
					avatars[0].setTehno(avatars[0].tehnoNum,avatars[0].tehno,avatars[0].resources[3],avatars[0].stars);
					avatars[0].setResources(avatars[0].resources);
				break;
				case 'ping':
					if(avatars[0]){
						msg.rnd = Math.round(Math.random()*(300 - 100) + 100);
						setTimeout(function(){sock.send($.toJSON({type: 'pong', pingTime: msg.pingTime, rnd: msg.rnd}));}, msg.rnd);
					}
				break;
				case 'pingDisconnect':
					try{
						avatars[0].pingDisconnect = true;
						message('one', 'Сервер обнаружил нестабильное интернет-соединение. Попробуйте войти позже.', 'ОК');
						$('#one .but').attr({'href': 'http://vk.com/aviamyaso_online', 'target': '_parent'});
						$('#one close').click(function(){$('#one .but').click()});
					} catch(er) {}
				break;
				case 'fuelFriends':
					$('#fuel span').html(msg.fuel);
					if(msg.all == 'fuelOut'){
						clearInterval(avatars[0].getfuel);
						message();
						message('one', 'У тебя полный бак!', 'ОК');
						$('#one .but, #one .close').click(function(){message()});
					}
					else if(msg.all == 'fuelOutEnd'){
						clearInterval(avatars[0].getfuel);
						message();
						message('one', 'Заправка завершена! Всего слито '+avatars[0].fuelPlus+' топлива.', 'ОК');
						$('#one .but, #one .close').click(function(){message()});
					}
					else if(msg.all == 'drain'){
						clearInterval(avatars[0].getfuel);
						message();
						message('one', 'Ты уже недавно сливал топливо у друзей. Попробуй позже, или пригласи еще друзей!', 'Пригласить друзей');
						$('#one .but').click(function(){message();if(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement){toggleFullScreen()}; VK.callMethod('showInviteBox');});
						$('#one .close').click(function(){message()});
					}
					else if(msg.fuelPlus > 0){
						avatars[0].fuelPlus += msg.fuelPlus;
						message('preloader', 'Сливаем топливо у друзей...<br/>Слито: '+avatars[0].fuelPlus);
					}
					else if(msg.fuelPlus == 0){
						clearInterval(avatars[0].getfuel);
						message();
						message('one', 'Ты слил '+avatars[0].fuelPlus+' топлива у друзей.<br/>Слить топливо теперь можно через пол часа, или пригласив новых друзей', 'Пригласить друзей');
						$('#one .but').click(function(){message();if(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement){toggleFullScreen()}; VK.callMethod('showInviteBox');});
						$('#one .close').click(function(){message()});
					}
				break;
				case 'online':
					$('#info .online span').html('<b title = "Всего в игре">'+msg.online+'</b> / <b title = "Войн в данный момент">'+msg.wars+'</b>');
				break;
				case 'waitTurnirs':
					initTurnirs = true;
					message('one', 'Сервер запускается...попробуйте войти в игру через пару минут.', 'ОК');
					$('#one .but').attr({'href': 'http://vk.com/aviamyaso_online', 'target': '_parent'});
				break;
			}
		});
		sock.on('disconnect', function (msg) {
			if(!initTurnirs){
				try{
					if(!avatars[0].pingDisconnect){
						message('one', 'Потеряно соединение с сервером. Попробуйте войти позже.', 'ОК');
						$('#one .but').attr({'href': 'http://vk.com/aviamyaso_online', 'target': '_parent'});
					}
				} catch(er) {
					message('one', 'Потеряно соединение с сервером. Попробуйте войти позже.', 'ОК');
					$('#one .but').attr({'href': 'http://vk.com/aviamyaso_online', 'target': '_parent'});
				}
			}
		});
	});
},'5.40')})