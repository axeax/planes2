;var static = {
	//все классы оружия и бонусов
	allWeapons: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P'],
	//все сообщения для поста на стену
	wallMwssages: ['Я сыграл уже 10 игр и получил в награду 5 осколочных ракет и медаль в игре Авиамясо! http://vk.com/aviamyaso_online',
	'Я сыграл уже 50 игр и получил в награду 50 осколочных ракет, 50 ударных ракет и медаль в игре Авиамясо! http://vk.com/aviamyaso_online',
	'Я сыграл уже 100 игр и получил в награду 10 алмазов и медаль в игре Авиамясо! http://vk.com/aviamyaso_online',
	'Я сыграл уже 500 игр и получил в награду 30 металла, 30 кремния, 30 тротилла, 15 алмазов и медаль в игре Авиамясо! http://vk.com/aviamyaso_online',
	'Я сыграл уже 1000 игр и получил в награду 100 звёзд, 50 алмазов и медаль в игре Авиамясо! http://vk.com/aviamyaso_online',
	'Я победил уже 10 раз и получил медаль в игре Авиамясо! http://vk.com/aviamyaso_online',
	'Я победил уже 50 раз и получил медаль в игре Авиамясо! http://vk.com/aviamyaso_online',
	'Я победил уже 100 раз и получил медаль в игре Авиамясо! http://vk.com/aviamyaso_online',
	'Я победил уже 500 раз и получил медаль в игре Авиамясо! http://vk.com/aviamyaso_online',
	'Я победил уже 1000 раз и получил медаль в игре Авиамясо! http://vk.com/aviamyaso_online',
	'Я добил соперника пулемётом и получил в награду 100 патронов и медаль в игре Авиамясо! http://vk.com/aviamyaso_online',
	'Я купил все самолёты и получил в награду 100 алмазов и медаль в игре Авиамясо! http://vk.com/aviamyaso_online',
	'Я наворовал 500 литров топлива и получил в награду 50 металла, 50 кремния, 50 тротилла, 30 алмазов и медаль в игре Авиамясо! http://vk.com/aviamyaso_online',
	'Я победил с 1 жизнью и получил в награду 20 щитов, 20 аптечек и медаль в игре Авиамясо! http://vk.com/aviamyaso_online',
	'Я набрал 10 000 рейтинга и получил в награду 10 алмазов и медаль в игре Авиамясо! http://vk.com/aviamyaso_online',
	'Я набрал 100 000 рейтинга и получил в награду 40 металла, 40 кремния, 40 тротилла, 100 звёзд и медаль в игре Авиамясо! http://vk.com/aviamyaso_online',
	'Я играл 5 дней подряд и получил медаль в игре Авиамясо! http://vk.com/aviamyaso_online'],
	//положение светящейся фигни в меню
	menu: {war: 22, planes: 92, shop: 174, medails: 251, ratings: 326, bank: 393, help: 453},
	//только классы оружия
	weapons: ['A','B','C','D','E','F','G','H'],
	//чтобы небыло weapons.weapons.indexOf 
	weaponsNI: {A:true,B:true,C:true,D:true,E:true,F:true,G:true,H:true},
	//только классы бонусов
	bonuses: ['I','J','K','L','M','N','O','P'],
	//чтобы небыло weapons.bonuses.indexOf 
	bonusesNI: {I:true,J:true,K:true,L:true,M:true,N:true,O:true,P:true},
	//вставляется в сообщение "для увеличения %% самолета..."
	paramsName: {speed: ' скорости ', radius: ' маневренности ', protection: ' защиты ', damage: ' мощности оружия ', rate: ' скорострельности '},
	//все классы оружия и бонусов
	all: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P'],
	//соотношения Название самолета:порядковый номер
	planes: {'default0':0,'speed0':1,'radius0':2,'protection0':3,'damage0':4,'nyancat0':5,
	'default1':6,'speed1':7,'radius1':8,'protection1':9,'damage1':10,'nyancat1':11,
	'default2':12,'speed2':13,'radius2':14,'protection2':15,'damage2':16,'nyancat2':17},
	//все названия самолетов в виде массива
	planesArr: ['default0','speed0','radius0','protection0','damage0','nyancat0',
	'default1','speed1','radius1','protection1','damage1','nyancat1',
	'default2','speed2','radius2','protection2','damage2','nyancat2'],
	//
	plan0: {default:0,speed:1,radius:2,protection:3,damage:4,nyancat:5},
	keySet: ["none",,,,,,,,"backspace","Tab",,,,"Enter",,,"Shift","Ctrl","Alt","Pause","CapsLock",,,,,,,"Esc",,,,,"Пробел","PageUp","PageDown","End","Home","&#8592;","&#8593;", "&#8594;","&#8595;",,,,,"Insert","Delete",,"0","1","2","3","4","5","6","7","8","9",,,,,,,,"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W", "X","Y","Z","Left Win","Right Win","App",,,"Num 0","Num 1","Num 2","Num 3","Num 4","Num 5","Num 6","Num 7","Num 8","Num 9","Num *","Num +",,"Num -","Num .","Num /","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12",,,,,,,,,,,,,,,,,,,,,"NumLock","ScrollLock",,,,,,,,,"PrintScreen",,,"Meta",,,,,,,,,,,,,,,,,,,,,,,,,,,,,";","=",",","-",".","/","~",,,,,,,,,,,,,,,,,,,,,,,,,,,"[","\\","]","\'"],
	keysNames: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','up','down'],
	A: {WLprice: [[0,0,0,0],[5,5,5,5],[7,7,7,5]], index: 0, hot: 1, complect: 300, damage: ['0.3-1','0.4-1.1','0.5-1.2'], radius: [1,1.5,2], speed: [11,13,15], rate: [0.1,0.1,0.1], rating: 100, name: 'Пулемёт', about: '<p>Пулемёт - оружие "быстрого огня". Скорость стрельбы очень высокая, пуля летит достаточно быстро, но точность и убойность оставляют желать лучшего. Больше всего подходит для "добивания" соперника. При попадании не оказывает никакого дополнительного воздействия на самолёт.<br/><b>Пулемёт доступен на всех самолётах</b></p>', buy: 'Купить 300 патронов за 1 звезду', maxCount: 999},
	B: {WLprice: [[0,0,0,0],[6,6,6,5],[8,8,8,6]], index: 1, hot: 2, complect: 50, damage: ['2-4','3-4','4-5'], radius: [6,7,9], speed: [8,9,10], rate: [1,0.8,0.7], rating: 500, name: 'Лёгкая ракета', about: '<p>Лёгкая ракета - основной вид оружия. Скорость стрельбы ниже чем у пулемёта, но точность и убойность в несколько раз выше. Подходит для любой ситуации. При попадании происходит небольшой взрыв, на долю секунды ослепляющий игроков.<br/><b>Лёгкая ракета доступна на всех самолётах</b></p>', buy: 'Купить 50 ракет за 1 звезду', maxCount: 999},
	C: {WLprice: [[0,0,0,0],[7,7,7,5],[9,9,9,7]], index: 2, hot: 3, complect: 30, damage: ['4-6','5-6','6-7'], radius: [10,11,12], speed: [7,8,9], rate: [2,1.8,1.5], rating: 700, name: 'Ударная ракета', about: '<p>Ударная ракета - одна из специализированных ракет арсенала. Урон и точность на высоком уровне. При попадании в соперника разворачивает его самолёт мощной взрывной волной. Сила разворота зависит от нанесённого ракетой урона.<br/><b>Ударная ракета доступна на всех самолётах</b></p>', buy: 'Купить 30 ракет за 1 звезду', maxCount: 999},
	D: {WLprice: [[0,0,0,0],[8,8,8,6],[10,10,10,8]], index: 3, hot: 5, complect: 20, damage: ['2-8','4-9','6-10'], radius: [10,10,11], speed: [6,7,8], rate: [3,2.7,2.5], rating: 1000, name: 'Осколочная ракета', about: '<p>Осколочная ракета - самая эффективная ракета своего класса. Нанесённый урон иногда может обеспечить пол победы. При попадании в соперника происходит большой взрыв с осколками, безопасными для стреляющего.<br/><b>Осколочная ракета доступна на всех самолётах</b></p>', buy: 'Купить 20 ракет за 1 звезду', maxCount: 999},
	E: {WLprice: [[0,0,0,0],[10,10,10,10],[20,20,20,20]], index: 4, hot: 7, complect: 10, damage: ['10-15','11-16','12-17'], radius: [10,11,12], speed: [7,8,9], rate: [7,6,5], rating: 5000, name: 'Электро-ракета', about: '<p>Электро-ракета - оружие специального назначения. Дорогая в изготовлении, по-этому приобретается небольшими партиями. При попадании вызывает сильный электрический разряд, и соперник полностью теряет управление на некоторое время.<br/><b>Электро-ракета доступна только на скоростном и захваченном самолёте</b></p>', buy: 'Купить 10 ракет за 1 звезду', maxCount: 999},
	F: {WLprice: [[0,0,0,0],[10,10,10,10],[20,20,20,20]], index: 5, hot: 7, complect: 10, damage: ['5-10','6-11','7-12'], radius: [30,31,32], speed: [8,9,10], rate: [7,6,5], rating: 5000, name: 'Слеповая ракета', about: '<p>Слеповая ракета - опасная штука. Процент попадания очень велик, скорость полёта ракеты как у обычной пули из пулемёта. При попадании ослепляет соперника на несколько секунд. Время ослепления зависит от нанесённого урона.<br/><b>Слеповая ракета доступна только на манёвренном и захваченном самолёте</b></p>', buy: 'Купить 10 ракет за 1 звезду', maxCount: 999},
	G: {WLprice: [[0,0,0,0],[10,10,10,10],[20,20,20,20]], index: 6, hot: 7, complect: 10, damage: ['8-13','9-14','10-15'], radius: [1,2,3], speed: [25,26,27], rate: [7,6,5], rating: 5000, name: 'Быстрая ракета', about: '<p>Быстрая ракета - самая быстрая ракета из всех. Процент попадания низкий из-за применения на дальних расстояниях. Долетает до соперника почти мгновенно, нанося при этом существенный урон. Идеальна для стрельбы по дальним целям.<br/><b>Быстрая ракета доступна только на броневом и захваченном самолёте</b></p>', buy: 'Купить 10 ракет за 1 звезду', maxCount: 999},
	H: {WLprice: [[0,0,0,0],[10,10,10,10],[20,20,20,20]], index: 7, hot: 7, complect: 10, damage: ['10-15','11-16','12-17'], radius: [35,36,37], speed: [7,8,9], rate: [7,6,5], rating: 5000, name: 'Точная ракета', about: '<p>Точная ракета - самая высокотехнологичная разработка. За счёт подвижного шасси запуска, ракета сама наводится в сторону соперника и стреляет в его сторону, независимо от того, куда летишь ты. Очень пригодится в сложных ситуациях.<br/><b>Точная ракета доступна только на боевом и захваченном самолёте</b></p>', buy: 'Купить 10 ракет за 1 звезду', maxCount: 999},
	I: {index: 8, hot: 0, complect: 5, rate: 0, rating: 1500, name: 'Аптечка', about: '<p>Аптечка восстанавливает 10 жизней прямо во время боя. Рекомендуется использовать когда количество жизней уже меньше 25.<br/><b>Аптечкой можно пользоваться на всех самолётах.</b></p>', buy: 'Купить 5 аптечек за 1 звезду', maxCount: 999},
	J: {index: 9, hot: 0, complect: 5, rate: 7, rating: 2000, name: 'Защита', about: '<p>Защитное поле в течении некоторого времени увеличивает показатель защиты твоего самолёта на 20 пунктов.<br/><b>Защитное поле можно включать на всех самолётах.</b></p>', buy: 'Купить 5 щитов за 1 звезду', maxCount: 999},
	K: {index: 10, hot: 0, complect: 5, rate: 20, rating: 1500, name: 'Прицел', about: '<p>Включение лазерного луча. Помогает попасть в соперника с большого расстояния.<br/><b>Прицел работает на всех самолётах.</b></p>', buy: 'Купить 5 прицелов за 1 звезду', maxCount: 999},
	L: {index: 11, hot: 0, complect: 5, rate: 0, rating: 2000, name: 'Телепорт', about: '<p>При активации твой самолёт телепортируется в начальную точку - место, откуда ты начинал полёт.<br/><b>Телепорт есть у каждого самолёта.</b></p>', buy: 'Купить 5 телепортов за 1 звезду', maxCount: 999},
	M: {index: 12, hot: 0, complect: 3, rate: 10, rating: 10000, name: 'Невидимость', about: '<p>На небольшой промежуток времени делает твой самолёт невидимым для соперника. Однако он увидит, откуда летят ракеты.<br/><b>Генератор невидимости можно включить только на скоростном и захваченном самолёте.</b></p>', buy: 'Купить 3 невидимости за 1 звезду', maxCount: 999},
	N: {index: 13, hot: 0, complect: 3, rate: 10, rating: 10000, name: 'Отражатель', about: '<p>На небольшое время активируется поглощающе-отражающее поле, и половину урона который получаешь ты, получает и соперник.<br/><b>Отражатель можно включить только на манёвренном и захваченном самолёте.</b></p>', buy: 'Купить 3 отражателя за 1 звезду', maxCount: 999},
	O: {index: 14, hot: 0, complect: 3, rate: 10, rating: 10000, name: 'Антинаведение', about: '<p>Активируется радиоизлучение, сбивающее все приборы соперника, из за чего ему будет сложнее попасть в тебя.<br/><b>Антинаведение активируетсятолько на броневом и захваченном самолёте.</b></p>', buy: 'Купить 3 антинаведения за 1 звезду', maxCount: 999},
	P: {index: 15, hot: 0, complect: 3, rate: 10, rating: 10000, name: 'Быстрая перезарядка', about: '<p>При включении некоторое время перезарядка всего оружия длится 1 секунду. (Будьте внимательны! Пулемет будет перезаряжаться тоже 1 секунду!)<br/><b>Быстрая перезарядка возможна только на боевом и захваченном самолёте.</b></p>', buy: 'Купить 3 перезарядки за 1 звезду', maxCount: 999},
	default: [
		{speed: 0, radius: 0, protection: 0, damage: 0, rate: 0, rating: 0, price: 0, name: 'Самолёт курсанта', weapons: ['A','B','C','D'], bonuses: ['I','J','K','L'], resources: [0,0,0,0], tehno: [1,1,1,1,1],weaponsNI: {A:true,B:true,C:true,D:true}, bonusesNI: {I:true,J:true,K:true,L:true}},
		{speed: -1, radius: 2, protection: -1, damage: 2, rate: -1, rating: 0, price: 0, name: 'Самолёт курсанта', weapons: ['A','B','C','D'], bonuses: ['I','J','K','L'], resources: [0,0,0,0], tehno: [1,1,1,1,1],weaponsNI: {A:true,B:true,C:true,D:true}, bonusesNI: {I:true,J:true,K:true,L:true}},
		{speed: 2, radius: -1, protection: 2, damage: -1, rate: -1, rating: 0, price: 0, name: 'Самолёт курсанта', weapons: ['A','B','C','D'], bonuses: ['I','J','K','L'], resources: [0,0,0,0], tehno: [1,1,1,1,1],weaponsNI: {A:true,B:true,C:true,D:true}, bonusesNI: {I:true,J:true,K:true,L:true}}
	],
	speed: [
		{speed: 1.5, radius: 0, protection: 0, damage: 0, rate: 0, rating: 5000, price: 100, name: 'Скоростной самолёт', weapons: ['A','B','C','D','E'], bonuses: ['I','J','K','L','M'], resources: [10,10,10,3], tehno: [1,1,1,1,1],weaponsNI: {A:true,B:true,C:true,D:true,E:true}, bonusesNI: {I:true,J:true,K:true,L:true,M:true}},
		{speed: 3.5, radius: 1, protection: 1, damage: 1, rate: 1, rating: 7000, price: 500, name: 'Скоростной самолёт', weapons: ['A','B','C','D','E','H'], bonuses: ['I','J','K','L','M'], resources: [100,100,100,30], tehno: [3,3,3,3,3],weaponsNI: {A:true,B:true,C:true,D:true,E:true,H:true}, bonusesNI: {I:true,J:true,K:true,L:true,M:true}},
		{speed: 5, radius: 2, protection: 2, damage: 2, rate: 2, rating: 12000, price: 1000, name: 'Скоростной самолёт', weapons: ['A','B','C','D','E','H'], bonuses: ['I','J','K','L','M','P'], resources: [300,300,300,100], tehno: [7,7,7,7,7],weaponsNI: {A:true,B:true,C:true,D:true,E:true,H:true}, bonusesNI: {I:true,J:true,K:true,L:true,M:true,P:true}}
	],
	radius: [
		{speed: 0, radius: 1.5, protection: 0, damage: 0, rate: 0, rating: 5000, price: 100, name: 'Манёвренный самолёт', weapons: ['A','B','C','D','F'], bonuses: ['I','J','K','L','N'], resources: [10,10,10,3], tehno: [1,1,1,1,1],weaponsNI: {A:true,B:true,C:true,D:true,F:true}, bonusesNI: {I:true,J:true,K:true,L:true,N:true}},
		{speed: 1, radius: 3.5, protection: 1, damage: 1, rate: 1, rating: 7000, price: 500, name: 'Манёвренный самолёт', weapons: ['A','B','C','D','F','E'], bonuses: ['I','J','K','L','N'], resources: [100,100,100,30], tehno: [3,3,3,3,3],weaponsNI: {A:true,B:true,C:true,D:true,F:true,E:true}, bonusesNI: {I:true,J:true,K:true,L:true,N:true}},
		{speed: 2, radius: 5, protection: 2, damage: 2, rate: 2, rating: 12000, price: 1000, name: 'Манёвренный самолёт', weapons: ['A','B','C','D','F','E'], bonuses: ['I','J','K','L','N','M'], resources: [300,300,300,100], tehno: [7,7,7,7,7],weaponsNI: {A:true,B:true,C:true,D:true,F:true,E:true}, bonusesNI: {I:true,J:true,K:true,L:true,N:true,M:true}}
	],
	protection: [
		{speed: 0, radius: 0, protection: 1.5, damage: 0, rate: 0, rating: 5000, price: 100, name: 'Броневой самолёт', weapons: ['A','B','C','D','G'], bonuses: ['I','J','K','L','O'], resources: [10,10,10,3], tehno: [1,1,1,1,1],weaponsNI: {A:true,B:true,C:true,D:true,G:true}, bonusesNI: {I:true,J:true,K:true,L:true,O:true}},
		{speed: 1, radius: 1, protection: 3.5, damage: 1, rate: 1, rating: 7000, price: 500, name: 'Броневой самолёт', weapons: ['A','B','C','D','G','F'], bonuses: ['I','J','K','L','O'], resources: [100,100,100,30], tehno: [3,3,3,3,3],weaponsNI: {A:true,B:true,C:true,D:true,G:true,F:true}, bonusesNI: {I:true,J:true,K:true,L:true,O:true}},
		{speed: 2, radius: 2, protection: 5, damage: 2, rate: 2, rating: 12000, price: 1000, name: 'Броневой самолёт', weapons: ['A','B','C','D','G','F'], bonuses: ['I','J','K','L','O','N'], resources: [300,300,300,100], tehno: [7,7,7,7,7],weaponsNI: {A:true,B:true,C:true,D:true,G:true,F:true}, bonusesNI: {I:true,J:true,K:true,L:true,O:true,N:true}}
	],
	damage: [
		{speed: 0, radius: 0, protection: 0, damage: 1.5, rate: 0, rating: 5000, price: 100, name: 'Боевой самолёт', weapons: ['A','B','C','D','H'], bonuses: ['I','J','K','L','P'], resources: [10,10,10,3], tehno: [1,1,1,1,1],weaponsNI: {A:true,B:true,C:true,D:true,H:true}, bonusesNI: {I:true,J:true,K:true,L:true,P:true}},
		{speed: 1, radius: 1, protection: 1, damage: 3.5, rate: 1, rating: 7000, price: 500, name: 'Боевой самолёт', weapons: ['A','B','C','D','H','G'], bonuses: ['I','J','K','L','P'], resources: [100,100,100,30], tehno: [3,3,3,3,3],weaponsNI: {A:true,B:true,C:true,D:true,H:true,G:true}, bonusesNI: {I:true,J:true,K:true,L:true,P:true}},
		{speed: 2, radius: 2, protection: 2, damage: 5, rate: 2, rating: 12000, price: 1000, name: 'Боевой самолёт', weapons: ['A','B','C','D','H','G'], bonuses: ['I','J','K','L','P','O'], resources: [300,300,300,100], tehno: [7,7,7,7,7],weaponsNI: {A:true,B:true,C:true,D:true,H:true,G:true}, bonusesNI: {I:true,J:true,K:true,L:true,P:true,O:true}}
	],
	nyancat: [
		{speed: 1, radius: 1, protection: 1, damage: 1, rate: 1, rating: 7000, price: 500, name: 'Захваченный самолёт', weapons: ['A','B','C','D','E','F','G','H'], bonuses: ['I','J','K','L','M','N','O','P'], resources: [100,100,100,30], tehno: [5,5,5,5,5],weaponsNI: {A:true,B:true,C:true,D:true,E:true,F:true,G:true,H:true}, bonusesNI: {I:true,J:true,K:true,L:true,M:true,N:true,O:true,P:true}},
		{speed: 2.5, radius: 2.5, protection: 2.5, damage: 2.5, rate: 2.5, rating: 20000, price: 2000, name: 'Захваченный самолёт', weapons: ['A','B','C','D','E','F','G','H'], bonuses: ['I','J','K','L','M','N','O','P'], resources: [500,500,500,150], tehno: [7,7,7,7,7],weaponsNI: {A:true,B:true,C:true,D:true,E:true,F:true,G:true,H:true}, bonusesNI: {I:true,J:true,K:true,L:true,M:true,N:true,O:true,P:true}},
		{speed: 4, radius: 4, protection: 4, damage: 4, rate: 4, rating: 100000, price: 20000, name: 'Захваченный самолёт', weapons: ['A','B','C','D','E','F','G','H'], bonuses: ['I','J','K','L','M','N','O','P'], resources: [1000,1000,1000,300], tehno: [10,10,10,10,10],weaponsNI: {A:true,B:true,C:true,D:true,E:true,F:true,G:true,H:true}, bonusesNI: {I:true,J:true,K:true,L:true,M:true,N:true,O:true,P:true}}
	],
	learning: ['ТЫ СЕЙЧАС НАХОДИШЬСЯ^НА ТРЕНИРОВОЧНОЙ БАЗЕ.^ПОПРОБУЙ ПРОСТО ПОУПРАВЛЯТЬ^САМОЛЁТОМ ИСПОЛЬЗУЯ КЛАВИШИ^W (ВВЕРХ) И S (ВНИЗ)                              ','ПРИ ЖЕЛАНИИ ТЫ МОЖЕШЬ^ИЗМЕНИТЬ КЛАВИШИ УПРАВЛЕНИЯ^САМОЛЁТОМ В ГЛАВНОМ МЕНЮ ИГРЫ                              ','ОТЛИЧНО! НО НЕ ЗАБЫВАЙ, ЧТО^НЕЛЬЗЯ ЛЕТАТЬ СЛИШКОМ НИЗКО^- ТАК ТЫ РИСКУЕШЬ РАЗБИТЬСЯ ОБ ЗЕМЛЮ!                              ','ЧТОЖ, НАУЧИЛСЯ ЛЕТАТЬ^- ТЕПЕРЬ Я РАССКАЖУ ОБ ОРУЖИИ И БОНУСАХ                              ','КРУГИ СВЕРХУ - ЭТО БОНУСЫ.^ЗЕЛЁНАЯ ПОЛОСКА СВЕРХУ ОЗНАЧАЕТ^ДЛИТЕЛЬНОСТЬ ДЕЙСТВИЯ БОНУСА.^ПОКА БОНУС АКТИВЕН, ЕГО НЕЛЬЗЯ^ВКЛЮЧИТЬ ЕЩЁ РАЗ                              ','ПОЛОСКА СНИЗУ ОБОЗНАЧАЕТ^СКОЛЬКО БОНУСОВ ДАННОГО ТИПА^У ТЕБЯ ОСТАЛОСЬ                              ','ПОПРОБУЙ АКТИВИРОВАТЬ ЗАЩИТНОЕ^ПОЛЕ КЛИКНУВ ПО ЗНАЧКУ С ЩИТОМ                              ','КАК ВИДИШЬ, АКТИВИРОВАЛОСЬ^ЗАЩИТНОЕ ПОЛЕ, ДЕЙСТВИЕ КОТОРОГО^ЗАКОНЧИТСЯ КОГДА ЗЕЛЁНАЯ^ПОЛОСКА ЗАПОЛНИТСЯ                              ','ТЕПЕРЬ ОБ ОРУЖИИ.^ВСЁ ОРУЖИЕ НАХОДИТСЯ ВНИЗУ.^ЖЕЛТАЯ ПОЛОСА НАД КАЖДЫМ ЗНАЧКОМ^- ИНДИКАТОР ПЕРЕЗАРЯДКИ                              ','ОРАНЖЕВАЯ ПОЛОСКА - ОСТАВШЕЕСЯ ОРУЖИЕ.^ТАК ЖЕ РЯДОМ С КАЖДЫМ ОРУЖИЕМ^И БОНУСОМ НАПИСАНО КОНКРЕТНОЕ^ОСТАВШЕЕСЯ КОЛИЧЕСТВО                              ','СДЕЛАТЬ ВЫСТРЕЛ МОЖНО ДВУМЯ СПОСОБАМИ:^1 СПОСОБ - КЛИКНУТЬ ПО ЗНАЧКУ С ОРУЖИЕМ.^ПОПРОБУЙ ВЫСТРЕЛИТЬ ЛЮБЫМ ОРУЖИЕМ                              ',' ','2 СПОСОБ - МОЖНО КЛИКАТЬ МЫШКОЙ^В ЛЮБОМ МЕСТЕ ЭКРАНА.^В ЭТОМ СЛУЧАЕ ВЫБОР ОРУЖИЯ БУДЕТ^СДЕЛАН АВТОМАТИЧЕСКИ ИЗ 4 ОСНОВНЫХ^ВИДОВ ОРУЖИЯ.                              ','ПОПРОБУЙ СТРЕЛЯТЬ ЧАСТО НАЖИМАЯ НА ЭКРАН.^КАК ВИДИШЬ, ВЫСТРЕЛ ПРОИСХОДИТ^ОРУЖИЕМ, КОТОРОЕ ПЕРЕЗАРЯЖЕНО^И ЕСТЬ В НАЛИЧИИ.                              ','ОТЛИЧНО! ТЫ НАУЧИЛСЯ СТРЕЛЯТЬ^РАЗНЫМИ СПОСОБАМИ. КАКОЙ УДОБНЕЕ - РЕШАТЬ ТЕБЕ                              ','КАЖЕТСЯ, КТО-ТО ВТОРГСЯ^НА НАШУ УЧЕБНУЮ ТЕРРИТОРИЮ...                              ','К БОЮ ПИЛОТ!^УНИЧТОЖЬ СВОЕГО ПЕРВОГО ПРОТИВНИКА,^И ВОЗВРАЩАЙСЯ НА БАЗУ!                              '],
	bgs: {_4: [-300,-550, 250], _3: [-10, -150, 140], _2: [-350, -450, 100]},
	rul_text: ['К сожалению, ты ничего не выиграл =(','+10% рейтинга к каждой победе на 24 часа','Скорость восстановления топлива х2 на 24 часа','Ты выиграл 10 звёзд!','+50% рейтинга к каждой победе на 24 часа','Ты выиграл 15 алмазов!','+20% рейтинга к каждой победе на 24 часа','Ты выиграл 15 тротилла!','Ты выиграл 3 звезды!','+40% рейтинга к каждой победе на 24 часа','Скорость восстановления топлива х5 на 24 часа','Ты выиграл 15 кремния!','Ты выиграл 5 звёзд!','+30% рейтинга к каждой победе на 24 часа','Ты выиграл 15 металла!','Ты выиграл 50 звёзд!','К сожалению, ты ничего не выиграл =('],
	hacked: ['Основное оружие: ','Основные бонусы: ','Скорость: ','Управление: ','Защита: ','Мощность: ','Перезарядка: ','Специальное оружие: ','Специальные бонусы: ','Самолёт: ','Модификация самолёта: ','Уровень микропроцессоров: ','Уровень турбин: ','Уровень строительного материала: ','Уровень системы наведения: ','Уровень технологий ИИ: ',],
	warMessages: {pop:true,hit:true,regenOpp:true,regen:true,bonusOk:true,bonusLoose:true,bonus:true,superSpeed:true,correct:true,shot:true},
	maxParam: {speed: 3, radius: 3, protection: 3, damage: 3, rate: 3, defaultPlane: 1, speedPlane: 1, radiusPlane: 1, protectionPlane: 1, damagePlane: 1, nyancatPlane: 1, A: 999, B: 999, C: 999, D: 999, E: 999, F: 999, G: 999, H: 999, I: 999, J: 999, K: 999, L: 999, M: 999, N: 999, O: 999, P: 999},
	levelsBotText: ['0 звёзд (тренировочный уровень, дальше - больше)','3 звезды','3 звезды','3 звезды','3 звезды','3 звезды','3 звезды','5 звёзд','5 звёзд','5 звёзд','5 звёзд','5 звёзд','5 звёзд','5 звёзд','8 звёзд','8 звёзд','8 звёзд','8 звёзд','8 звёзд','8 звёзд','8 звёзд','10 звёзд','10 звёзд','10 звёзд','10 звёзд','10 звёзд','13 звёзд','13 звёзд','13 звёзд','13 звёзд','13 звёзд'],
	turnirParams = {
		turnirs: ['rating', 'win7', 'win30'],
		sel: ['stars','metall','silicon','trotill','diamonds'],
		rating: {col: 'Рейтинг', name: 'Общий рейтинг игроков', period: '1 неделя', price: 'бесплатно', timeEnd: '1 день 0 часов', reload: 'Каждые 20 минут', win: [[30,20,20,20,10],[25,15,15,15,7],[10,5,5,5,3],[5,3,3,3,1]], players: []},
		win7: {col: 'Победы', name: 'Турнир побед за неделю', period: '1 неделя', price: '10 звёзд', timeEnd: '1 день 0 часов', reload: 'Каждые 20 минут', win: [[50,30,30,30,15],[40,25,25,25,10],[15,10,10,10,5],[10,7,7,7,3]], players: []},
		win30: {col: 'Победы', name: 'Турнир побед за месяц', period: '30 дней', price: '50 звёзд', timeEnd: '1 день 0 часов', reload: 'Каждые 20 минут', win: [[200,70,70,70,50],[100,50,50,50,30],[50,30,30,30,15],[20,10,10,10,7]], players: []}
	},
	quests = [10,50,100,500,1000,10,50,100,500,1000,1,18,500,1,10000,100000,5];
};
var funcs = function(){
	this.bots = function(level){
		if(level <= 30) return static.levelsBotText[level];
		else{
			return this.chislen(Math.round(13+(level/10)), [' звезду', ' звезды', ' звёзд']);
		}
	};
	this.chislen = function(number, titles){
		var cases = [2, 0, 1, 1, 1, 2];  
    	return number+titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
	};
	this.clone = function(obj){
	    if(!obj || typeof obj !== 'object'){
	        return obj;
	    }   
	    var c = (typeof obj.pop === 'function') ? [] : {};
	    var p, v;    
	    for(p in obj){
	        if(obj.hasOwnProperty(p)){
	            v = obj[p];
	            if(v && typeof v === 'object'){
	                c[p] = funcs.clone(v);
	            }
	            else{
	                c[p] = v;
	            }
	        }
	    }   
	    return c;
	};
})();