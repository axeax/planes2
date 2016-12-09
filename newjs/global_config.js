/* Файл с глобальной конфигурацией, работающий и на клиенте и на сервере */

class Config{

	constructor(){

		// медали
		this.a_medails = [
			// пример одной медали
			{
				char_nameText: 'name',
				char_questText: 'сыграть 10 раз | добить пулеметом',
				char_quest: 'win | play | computer win ...',
				int_progress: 3,
				int_fullProgress: 10,
				a_award: [
					{
						char_type: metall,
						int_value: 10
					},
					{
						char_type: stars,
						int_value: 20
					}
				],
				char_wallMessageText: 'текст для стены',
				char_wallImageSrc: '/path/to/file',
				char_interfaceImageSrc: '/path/to/file'
			}
		];

	}

	

}

let CONFIG = new Config();

export {CONFIG};