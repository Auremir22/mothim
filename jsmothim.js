var cfg = {
	kukuiCount: 0,
	kukuiBlock: false,
	//tutorial
	lillieCount: 0,
	tutorialActive: false,
	//Cronometro
	timer: 0,
	segundo: 0 + '0',
	minuto: 0 + '0',
	hora: 0 + '0',
	//base
	shooter: ' ',
	//array
	tempObj: {},
	arr: [],
	//dados teste
	region: 0,
	nameNow: 0,
	idNow: 0,
	positionId: 0,
	totalNow: 0,
	jump: [],
	jumps: 0,
	jumpOriginal: 0,
	jumpKey: false,
	jumpLocked: false,
	//pontuação
	erros: 0,
	acertos: 0,
	scoreFinal: 0,
	idshared: 0,
	//rotom speech
	doNotKnow: false,
	whatsThePokemon: false,
};
var storage = {
	_get: function (name) {
		"use strict";
		var st = localStorage.getItem(name);
		if (st === void 0 || st === 'undefinned' || st === 'NaN') {
			st = 0;
		}
		return st;
	},
	_set: function (name, value) {
		"use strict";
		localStorage.setItem(name, value);
	},
	//Player
	namePlayerNow: localStorage.getItem('namePlayerNow'),
	//Audio
	noAudio: localStorage.getItem('noAudio'),
	audioVolume: localStorage.getItem('audioVolume'),
	//analise
	playedGames: localStorage.getItem('playedGames') || 0,
	playedtutorialGames: localStorage.getItem('playedtutorialGames') || 0,
	hitsTotal: localStorage.getItem('hitsTotal') || 0,
	errorsTotal: localStorage.getItem('errorsTotal') || 0,
	jumpsTotal: localStorage.getItem('jumpsTotal') || 0,
	sharesTotal: localStorage.getItem('sharesTotal') || 0,
	withdrawalsTotal: localStorage.getItem('withdrawalsTotal') || 0, //desisti 

};
var screenStart = {
	animationClass: function () {
		//animation icon
		"use strict";
		var configR = {
			max: 6,
			min: 0
		};
		var $anEx = ['bounce', 'jello', 'pulse', 'rubberBand', 'swing', 'tada', 'fadeInLeft'];
		var $randomAnimation = Math.floor(Math.random() * (configR.max - configR.min)) + configR.min;
		$('.rotomdex').addClass($anEx[$randomAnimation]);
	},
	loadedImagem: function () {
		//Carrega as imagens
		"use strict";
		//all images
		var $allImg = ['https://lh3.googleusercontent.com/-OLItr-XPM9A/V8b9Y6ged_I/AAAAAAAABhY/-wXv1WyX_hMdcVhClW30OBWffURgx8neQCEw/w4032-h3512-p/all%2Bpokemon%2Bshuffle.png'];
		//max e min
		var configloaded = {
			total: $allImg.length,
			totalinit: 0
		};
		$('.text-warnig').text('Carregando...');
		$('.text-total').text(configloaded.total);
		for (var i = 0; i < $allImg.length; i++) {
			$('<img>').attr('src', $allImg[i]).on('load', function (response, status, xhr) {
				configloaded.totalinit++;
				$('.text-now').text(configloaded.totalinit);
				if (configloaded.totalinit === configloaded.total) {
					$('#loadingDex').slideUp();
					AudioComponente.initAudio();
				}
			});
		}
	},
	kukuiSpeech: function () {
		"use strict";
		if (!cfg.kukuiBlock) {
			var $speechKukui = ['Bem-vindos a MothimDex, o nosso teste dos verdadeiros treinadores Pokémon! Para iniciarmos o processo, digite seu nome ou apelido clique no botão Enter.', 'A MothimDex é um teste conciso, rápido e dinâmico que tem o objetivo de analisar quantos Pokémon os treinadores conseguem se lembrar no menor tempo possível.', 'Com base numa imagem simples, porém clara e objetiva, o treinador deverá digitar logo em seguida o nome do monstrinho de bolso em questão.', 'Depois de todos os Pokémon serem nomeados, o teste acabará e será possível descobrir quanto tempo você levou para concluir e quais Pokémon você errou com base numa pontuação definida em 5 estrelas.', 'O nosso teste também poderá ser compartilhado no Facebook, para mostrar aos seus amigos, o quão bom treinador você é!', 'Quem será o melhor treinador Pokémon de todos?', 'Aguadando.... '];
			//escreve a fala
			$('.box-text-dialog').text($speechKukui[cfg.kukuiCount]);

			console.log(cfg.kukuiCount); //apagar

			cfg.kukuiCount++;
			if (cfg.kukuiCount === 1) {
				cfg.kukuiBlock = true;
			} else if (cfg.kukuiCount === 4) {
				AudioComponente.initAudio();
			} else if (cfg.kukuiCount === 7) {
				$('#kukui-welcome').slideToggle();
				$('#menu-dex').slideToggle();
			}
		}
	},
	namePlayerNow: function () {
		"use strict";
		var $erro = "Nome muito curto ou contém caracteres inválidos";
		var $playerinput = $("#PlayerName").val().replace(/[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9-]+/g, "");
		if ($playerinput.length >= 4) {
			localStorage.setItem('namePlayerNow', $playerinput);
			textComponente.textName('{Meu nome}', localStorage.getItem('namePlayerNow'));
			cfg.kukuiBlock = false;
			screenStart.kukuiSpeech();
			$(".form-player").css({
				position: 'absolute',
				top: '-100%'
			});
		} else {
			$('.player-warning').slideToggle('slow').text($erro);
			setTimeout(function () {
				$('.player-warning').slideToggle('slow');
			}, 3000);
		}
	},
	lillieSpeech: function () {
		"use strict";
		var $speechLillie = ['Esses são os 3 botões principais do aplicativo. O botão "Confirmar" irá computar a sua resposta e avançar para o próximo Pokémon, apertar Enter no seu teclado fará com que o aplicativo ative o botão confirmar. ', 'O botão "Pular" tem a função de ignorar aquele Pokémon naquele momento, mas ele voltará no teste no futuro. Você só pode pular 3 monstrinhos por teste, então use com sabedoria. Evitar usar o botão fará com que você ganhe pontos extras.', 'E por último, o botão "Desistir" finalizará seu teste e computará seus dados até aquele momento.', 'Agora vamos ver se você entendeu como o aplicativo funciona. Clique em iniciar para realizar um pequeno teste.', 'Essa é a sua pontuação. Você poderá obter até 5 estrelas baseada em uma pontuação máxima de 10.000 pontos. Essa pontuação é calculada de acordo com as respostas computadas e o tempo gasto nos testes.', 'Esse é o botão compartilhar. Você terá a opção de compartilhar o seu teste no Facebook para que seus amigos saibam quantos pontos você fez.', 'Esse é o botão "Abrir respostas". Você poderá ver onde errou e onde acertou para que não erre novamente nas próximas vezes.', 'Esse é o botão "Voltar". Você voltará para a tela inicial do nosso aplicativo.', 'Aguadando.... '];
		//escreve a fala

		$('.box-text-dialog-tutorial').text($speechLillie[cfg.lillieCount]);

		if (cfg.lillieCount === 0) {
			$('.wicke-left').addClass('wicke-right').removeClass('wicke-left');
			$('.indicador').css({
				left: '57%',
				top: '50%'
			});
			$('#start-my-quiz').removeClass('expositor');
			$('.clock-timer').removeClass('expositor');
			$('#expositor-img').css('display', 'block');

		} else if (cfg.lillieCount === 1) {
			$('.clock-timer').removeClass('expositor');
			$('#expositor-img').css('display', 'block');
			$('.indicador').css({
				left: '18%',
				top: '16%'
			});

		} else if (cfg.lillieCount === 2) {
			$('.indicador').css({
				left: '18%',
				top: '26%'
			});
			$('#expositor-img').css('display', 'block');

		} else if (cfg.lillieCount === 3) {
			$('.screen-tutorial-contain').slideToggle('slow');
			cfg.timer = setInterval(quizCode.cromometro, 983);
			$('#expositor-img').css('display', 'none');
			$('#expositor-img-2').show();

		} else if (cfg.lillieCount === 4) {
			$('#expositor-img-2').addClass('score-expositor score-expositor-01');
			$('.indicador').css({
				left: ' 47%',
				top: '51%'
			});
		} else if (cfg.lillieCount === 5) {
			$('#expositor-img-2').removeClass('score-expositor-01').addClass('score-expositor-02');
		} else if (cfg.lillieCount === 6) {
			$('#expositor-img-2').removeClass('score-expositor-02').addClass('score-expositor-03');
		} else if (cfg.lillieCount === 7) {
			$('#expositor-img-2').removeClass('score-expositor-03').addClass('score-expositor-04');
		} else if (cfg.lillieCount === 8) {
			$('#expositor-img-2').removeClass(' score-expositor score-expositor-04');
			$('.screen-tutorial-contain').slideToggle('slow');
			cfg.lillieCount = 0;
			cfg.tutorialActive = false;
		}
		cfg.lillieCount++;
	},
	avatar: function () {
		"use strict";
		var max = 5;
		var min = 0;
		var nAv = Math.floor(Math.random() * (max - min)) + min;
		if (typeof storage._get('avatar') === undefined || storage._get('avatar') === null) {
			storage._set('avatar', 'r-' + nAv);
		} else {
			storage._set('avatar', 'r-0');
		}
	},
};
var screenMenu = {
	clickMenu: function (section) {
		"use strict";
		$('.section-dex,section').css('display', 'none');
		$('#loadingDex').slideToggle('slow');
		console.log(section); //apagar
		$('#loadingDex').slideToggle('slow');
		$('#' + section).slideToggle('slow');
	},
	geratorChoice: function () {
		"use strict";
		var $quizAvailable = [
			['kanto', 151, 'https://i.imgur.com/PlTfpZ3.png', 'Nacional Dex', 'kanto'],
			['johto', 99, 'https://i.imgur.com/PlTfpZ3.png', 'Nacional Dex', 'johto'],
			['hoenn', 134, 'https://i.imgur.com/PlTfpZ3.png', 'Nacional Dex', 'hoenn'],
			['sinnoh', 106, 'https://i.imgur.com/PlTfpZ3.png', 'Nacional Dex', 'sinnoh'],
			['unova', 155, 'https://i.imgur.com/PlTfpZ3.png', 'Nacional Dex', 'unova'],
			['kalos', 72, 'https://i.imgur.com/PlTfpZ3.png', 'Nacional Dex', 'kalos'],
		];
//			Em breve
//
//			['alola', 0, 'http://i.imgur.com/PlTfpZ3.png', 'Nacional Dex', 'alola'],
//			['TestGrass', 18, 'http://i.imgur.com/PlTfpZ3.png', 'Type Teste', 'Teste Grass'],
		
		for (var i = 0; i < $quizAvailable.length; i++) {
			var $contentAvailable = '<div class="col-md-6 item-choices ' + $quizAvailable[i][0] + '">' +
				'<div class="info-quiz">' +
				'<div class="region">' + $quizAvailable[i][4] + '</div>' +
				'<div class="wrapper-slect-info">' +
				'<div class="qnt-pokemon"><b>Total de Pokémon -</b> ' + $quizAvailable[i][1] + '</div>' +
				'<div class="topic-quiz"><b>Tema do Quiz -</b><img src="' + $quizAvailable[i][2] + '" alt="pokedex' + $quizAvailable[i][0] + '"' + 'class="topic-icon"> ' + $quizAvailable[i][3] + '</div>' +
				'</div>' +
				'<div class="enter-quiz" data-quiz="' + $quizAvailable[i][0] + '" data-bgMenu="rotom-dex">Abrir</div>' +
				'</div>';
			$('.choices-contain').append($contentAvailable);

		}
	},
	refreshPerfil: function () {
		"use strict";
		var obj = $('.text-string');
		var varStor = ["hitsTotal", "errorsTotal", "playedGames", "playedtutorialGames", "jumpsTotal", "withdrawalsTotal"];
		for (var i = 0; i < obj.length; i++) {
			var stringN = storage._get(varStor[i]) || 0;
			obj.eq(i).text(stringN);
		}
	},
	refreshConquistas: function () {
		"use strict";
		var a = storage._get('arrConquistas').length;
		var incG = 0;
		var arrCon = storage._get('arrConquistas');
		for (var g = 0; g < a; g++) {
			var checkArr = arrCon.charAt(incG);
			if (checkArr === '1') {
				$('.item-Achievements').eq(g).attr('data-lock', 'false');
				var $id = $('.item-Achievements').eq(g).attr('data-achievements');
				var $count = 0;
				for (var prop in dataBaseAchievements) {
					if ($count === parseInt($id)) {
						$('.item-Achievements').eq(g).css('backgroundPosition', dataBaseAchievements[prop].imagePositionAchievements);
					}
					$count++;
				}
			} else {
				$('.item-Achievements').eq(g).attr('data-lock', 'true');
			}
			incG++;
			incG++;
		}
	},
};
var dataBase = {
	tutorial: {
		total: 3,
		base: jQuery.parseJSON('{"nome":"pokedex tutorial v1.0","id":"5","pokemonj":[{"id":"412","nome":"Burmy","type":["Bug"],"posicao":"-3113px -1947px"},{"id":"413","nome":"Wormadam","type":["Bug","Bug","Bug","Grass","Ground","Steel"],"posicao":"-3506px -1947px"},{"id":"414","nome":"Mothim","type":["Bug","Flying"],"posicao":"-3894px -1947px"}]}')
	},
	kanto: {
		total: 151,
		base: jQuery.parseJSON('{"nome":"kanto","id":"1","pokemonj":[{"id":"1","nome":"Bulbasaur","type":["Grass","Poison"],"posicao":"-2340px -130px"},{"id":"2","nome":"Ivysaur","type":["Grass","Poison"],"posicao":"-2470px -130px"},{"id":"3","nome":"Venusaur","type":["Grass","Poison"],"posicao":"-2600px -130px"},{"id":"4","nome":"Charmander","type":["Fire"],"posicao":"-2730px -130px"},{"id":"5","nome":"Charmeleon","type":["Fire"],"posicao":"-2860px -130px"},{"id":"6","nome":"Charizard","type":["Fire","Flying"],"posicao":"-2990px -130px"},{"id":"7","nome":"Squirtle","type":["Water"],"posicao":"-3120px -130px"},{"id":"8","nome":"Wartortle","type":["Water"],"posicao":"-3250px -130px"},{"id":"9","nome":"Blastoise","type":["Water"],"posicao":"-3380px -130px"},{"id":"10","nome":"Caterpie","type":["Bug"],"posicao":"-3510px -130px"},{"id":"11","nome":"Metapod","type":["Bug"],"posicao":"-3640px -130px"},{"id":"12","nome":"Butterfree","type":["Bug","Flying"],"posicao":"-3770px -130px"},{"id":"13","nome":"Weedle","type":["Bug","Poison"],"posicao":"-3900px -130px"},{"id":"14","nome":"Kakuna","type":["Bug","Poison"],"posicao":"-0px -260px"},{"id":"15","nome":"Beedrill","type":["Bug","Poison"],"posicao":"-130px -260px"},{"id":"16","nome":"Pidgey","type":["Normal","Flying"],"posicao":"-260px -260px"},{"id":"17","nome":"Pidgeotto","type":["Normal","Flying"],"posicao":"-390px -260px"},{"id":"18","nome":"Pidgeot","type":["Normal","Flying"],"posicao":"-520px -260px"},{"id":"19","nome":"Rattata","type":["Normal"],"posicao":"-650px -260px"},{"id":"20","nome":"Raticate","type":["Normal"],"posicao":"-780px -260px"},{"id":"21","nome":"Spearow","type":["Normal","Flying"],"posicao":"-910px -260px"},{"id":"22","nome":"Fearow","type":["Normal","Flying"],"posicao":"-1040px -260px"},{"id":"23","nome":"Ekans","type":["Poison"],"posicao":"-1170px -260px"},{"id":"24","nome":"Arbok","type":["Poison"],"posicao":"-1300px -260px"},{"id":"25","nome":"Pikachu","type":["Electric"],"posicao":"-1430px -260px"},{"id":"26","nome":"Raichu","type":["Electric"],"posicao":"-1560px -260px"},{"id":"27","nome":"Sandshrew","type":["Ground"],"posicao":"-1690px -260px"},{"id":"28","nome":"Sandslash","type":["Ground"],"posicao":"-1820px -260px"},{"id":"29","nome":"Nidoran","type":["Poison"],"posicao":"-1950px -260px"},{"id":"30","nome":"Nidorina","type":["Poison"],"posicao":"-2080px -260px"},{"id":"31","nome":"Nidoqueen","type":["Poison","Ground"],"posicao":"-2210px -260px"},{"id":"32","nome":"Nidoran","type":["Poison"],"posicao":"-2340px -260px"},{"id":"33","nome":"Nidorino","type":["Poison"],"posicao":"-2470px -260px"},{"id":"34","nome":"Nidoking","type":["Poison","Ground"],"posicao":"-2600px -260px"},{"id":"35","nome":"Clefairy","type":["Fairy"],"posicao":"-2730px -260px"},{"id":"36","nome":"Clefable","type":["Fairy"],"posicao":"-2860px -260px"},{"id":"37","nome":"Vulpix","type":["Fire"],"posicao":"-2990px -260px"},{"id":"38","nome":"Ninetales","type":["Fire"],"posicao":"-3120px -260px"},{"id":"39","nome":"Jigglypuff","type":["Normal","Fairy"],"posicao":"-3250px -260px"},{"id":"40","nome":"Wigglytuff","type":["Normal","Fairy"],"posicao":"-3380px -260px"},{"id":"41","nome":"Zubat","type":["Poison","Flying"],"posicao":"-3510px -260px"},{"id":"42","nome":"Golbat","type":["Poison","Flying"],"posicao":"-3640px -260px"},{"id":"43","nome":"Oddish","type":["Grass","Poison"],"posicao":"-3770px -260px"},{"id":"44","nome":"Gloom","type":["Grass","Poison"],"posicao":"-3900px -260px"},{"id":"45","nome":"Vileplume","type":["Grass","Poison"],"posicao":"-0px -390px"},{"id":"46","nome":"Paras","type":["Bug","Grass"],"posicao":"-130px -390px"},{"id":"47","nome":"Parasect","type":["Bug","Grass"],"posicao":"-260px -390px"},{"id":"48","nome":"Venonat","type":["Bug","Poison"],"posicao":"-390px -390px"},{"id":"49","nome":"Venomoth","type":["Bug","Poison"],"posicao":"-520px -390px"},{"id":"50","nome":"Diglett","type":["Ground"],"posicao":"-650px -390px"},{"id":"51","nome":"Dugtrio","type":["Ground"],"posicao":"-780px -390px"},{"id":"52","nome":"Meowth","type":["Normal"],"posicao":"-910px -390px"},{"id":"53","nome":"Persian","type":["Normal"],"posicao":"-1040px -390px"},{"id":"54","nome":"Psyduck","type":["Water"],"posicao":"-1170px -390px"},{"id":"55","nome":"Golduck","type":["Water"],"posicao":"-1300px -390px"},{"id":"56","nome":"Mankey","type":["Fighting"],"posicao":"-1430px -390px"},{"id":"57","nome":"Primeape","type":["Fighting"],"posicao":"-1560px -390px"},{"id":"58","nome":"Growlithe","type":["Fire"],"posicao":"-1690px -390px"},{"id":"59","nome":"Arcanine","type":["Fire"],"posicao":"-1820px -390px"},{"id":"60","nome":"Poliwag","type":["Water"],"posicao":"-1950px -390px"},{"id":"61","nome":"Poliwhirl","type":["Water"],"posicao":"-2080px -390px"},{"id":"62","nome":"Poliwrath","type":["Water","Fighting"],"posicao":"-2210px -390px"},{"id":"63","nome":"Abra","type":["Psychic"],"posicao":"-2340px -390px"},{"id":"64","nome":"Kadabra","type":["Psychic"],"posicao":"-2470px -390px"},{"id":"65","nome":"Alakazam","type":["Psychic"],"posicao":"-2600px -390px"},{"id":"66","nome":"Machop","type":["Fighting"],"posicao":"-2730px -390px"},{"id":"67","nome":"Machoke","type":["Fighting"],"posicao":"-2860px -390px"},{"id":"68","nome":"Machamp","type":["Fighting"],"posicao":"-2990px -390px"},{"id":"69","nome":"Bellsprout","type":["Grass","Poison"],"posicao":"-3120px -390px"},{"id":"70","nome":"Weepinbell","type":["Grass","Poison"],"posicao":"-3250px -390px"},{"id":"71","nome":"Victreebel","type":["Grass","Poison"],"posicao":"-3380px -390px"},{"id":"72","nome":"Tentacool","type":["Water","Poison"],"posicao":"-3510px -390px"},{"id":"73","nome":"Tentacruel","type":["Water","Poison"],"posicao":"-3640px -390px"},{"id":"74","nome":"Geodude","type":["Rock","Ground"],"posicao":"-3770px -390px"},{"id":"75","nome":"Graveler","type":["Rock","Ground"],"posicao":"-3900px -390px"},{"id":"76","nome":"Golem","type":["Rock","Ground"],"posicao":"-0px -520px"},{"id":"77","nome":"Ponyta","type":["Fire"],"posicao":"-130px -520px"},{"id":"78","nome":"Rapidash","type":["Fire"],"posicao":"-260px -520px"},{"id":"79","nome":"Slowpoke","type":["Water","Psychic"],"posicao":"-390px -520px"},{"id":"80","nome":"Slowbro","type":["Water","Psychic"],"posicao":"-520px -520px"},{"id":"81","nome":"Magnemite","type":["Electric","Steel"],"posicao":"-650px -520px"},{"id":"82","nome":"Magneton","type":["Electric","Steel"],"posicao":"-780px -520px"},{"id":"83","nome":"Farfetchd","type":["Normal","Flying"],"posicao":"-910px -520px"},{"id":"84","nome":"Doduo","type":["Normal","Flying"],"posicao":"-1040px -520px"},{"id":"85","nome":"Dodrio","type":["Normal","Flying"],"posicao":"-1170px -520px"},{"id":"86","nome":"Seel","type":["Water"],"posicao":"-1300px -520px"},{"id":"87","nome":"Dewgong","type":["Water","Ice"],"posicao":"-1430px -520px"},{"id":"88","nome":"Grimer","type":["Poison"],"posicao":"-1560px -520px"},{"id":"89","nome":"Muk","type":["Poison"],"posicao":"-1690px -520px"},{"id":"90","nome":"Shellder","type":["Water"],"posicao":"-1820px -520px"},{"id":"91","nome":"Cloyster","type":["Water","Ice"],"posicao":"-1950px -520px"},{"id":"92","nome":"Gastly","type":["Ghost","Poison"],"posicao":"-2080px -520px"},{"id":"93","nome":"Haunter","type":["Ghost","Poison"],"posicao":"-2210px -520px"},{"id":"94","nome":"Gengar","type":["Ghost","Poison"],"posicao":"-2340px -520px"},{"id":"95","nome":"Onix","type":["Rock","Ground"],"posicao":"-2470px -520px"},{"id":"96","nome":"Drowzee","type":["Psychic"],"posicao":"-2600px -520px"},{"id":"97","nome":"Hypno","type":["Psychic"],"posicao":"-2730px -520px"},{"id":"98","nome":"Krabby","type":["Water"],"posicao":"-2860px -520px"},{"id":"99","nome":"Kingler","type":["Water"],"posicao":"-2990px -520px"},{"id":"100","nome":"Voltorb","type":["Electric"],"posicao":"-3120px -520px"},{"id":"101","nome":"Electrode","type":["Electric"],"posicao":"-3250px -520px"},{"id":"102","nome":"Exeggcute","type":["Grass","Psychic"],"posicao":"-3380px -520px"},{"id":"103","nome":"Exeggutor","type":["Grass","Psychic"],"posicao":"-3510px -520px"},{"id":"104","nome":"Cubone","type":["Ground"],"posicao":"-3640px -520px"},{"id":"105","nome":"Marowak","type":["Ground"],"posicao":"-3770px -520px"},{"id":"106","nome":"Hitmonlee","type":["Fighting"],"posicao":"-3900px -520px"},{"id":"107","nome":"Hitmonchan","type":["Fighting"],"posicao":"-0px -650px"},{"id":"108","nome":"Lickitung","type":["Normal"],"posicao":"-130px -650px"},{"id":"109","nome":"Koffing","type":["Poison"],"posicao":"-260px -650px"},{"id":"110","nome":"Weezing","type":["Poison"],"posicao":"-390px -650px"},{"id":"111","nome":"Rhyhorn","type":["Ground","Rock"],"posicao":"-520px -650px"},{"id":"112","nome":"Rhydon","type":["Ground","Rock"],"posicao":"-650px -650px"},{"id":"113","nome":"Chansey","type":["Normal"],"posicao":"-780px -650px"},{"id":"114","nome":"Tangela","type":["Grass"],"posicao":"-910px -650px"},{"id":"115","nome":"Kangaskhan","type":["Normal"],"posicao":"-1040px -650px"},{"id":"116","nome":"Horsea","type":["Water"],"posicao":"-1170px -650px"},{"id":"117","nome":"Seadra","type":["Water"],"posicao":"-1300px -650px"},{"id":"118","nome":"Goldeen","type":["Water"],"posicao":"-1430px -650px"},{"id":"119","nome":"Seaking","type":["Water"],"posicao":"-1560px -650px"},{"id":"120","nome":"Staryu","type":["Water"],"posicao":"-1690px -650px"},{"id":"121","nome":"Starmie","type":["Water","Psychic"],"posicao":"-1820px -650px"},{"id":"122","nome":"MrMime","type":["Psychic","Fairy"],"posicao":"-1950px -650px"},{"id":"123","nome":"Scyther","type":["Bug","Flying"],"posicao":"-2080px -650px"},{"id":"124","nome":"Jynx","type":["Ice","Psychic"],"posicao":"-2210px -650px"},{"id":"125","nome":"Electabuzz","type":["Electric"],"posicao":"-2340px -650px"},{"id":"126","nome":"Magmar","type":["Fire"],"posicao":"-2470px -650px"},{"id":"127","nome":"Pinsir","type":["Bug"],"posicao":"-2600px -650px"},{"id":"128","nome":"Tauros","type":["Normal"],"posicao":"-2730px -650px"},{"id":"129","nome":"Magikarp","type":["Water"],"posicao":"-2860px -650px"},{"id":"130","nome":"Gyarados","type":["Water","Flying"],"posicao":"-2990px -650px"},{"id":"131","nome":"Lapras","type":["Water","Ice"],"posicao":"-3120px -650px"},{"id":"132","nome":"Ditto","type":["Normal"],"posicao":"-3250px -650px"},{"id":"133","nome":"Eevee","type":["Normal"],"posicao":"-3380px -650px"},{"id":"134","nome":"Vaporeon","type":["Water"],"posicao":"-3510px -650px"},{"id":"135","nome":"Jolteon","type":["Electric"],"posicao":"-3640px -650px"},{"id":"136","nome":"Flareon","type":["Fire"],"posicao":"-3770px -650px"},{"id":"137","nome":"Porygon","type":["Normal"],"posicao":"-3900px -650px"},{"id":"138","nome":"Omanyte","type":["Rock","Water"],"posicao":"-0px -780px"},{"id":"139","nome":"Omastar","type":["Rock","Water"],"posicao":"-130px -780px"},{"id":"140","nome":"Kabuto","type":["Rock","Water"],"posicao":"-260px -780px"},{"id":"141","nome":"Kabutops","type":["Rock","Water"],"posicao":"-390px -780px"},{"id":"142","nome":"Aerodactyl","type":["Rock","Flying"],"posicao":"-520px -780px"},{"id":"143","nome":"Snorlax","type":["Normal"],"posicao":"-650px -780px"},{"id":"144","nome":"Articuno","type":["Ice","Flying"],"posicao":"-780px -780px"},{"id":"145","nome":"Zapdos","type":["Electric","Flying"],"posicao":"-910px -780px"},{"id":"146","nome":"Moltres","type":["Fire","Flying"],"posicao":"-1040px -780px"},{"id":"147","nome":"Dratini","type":["Dragon"],"posicao":"-1170px -780px"},{"id":"148","nome":"Dragonair","type":["Dragon"],"posicao":"-1300px -780px"},{"id":"149","nome":"Dragonite","type":["Dragon","Flying"],"posicao":"-1430px -780px"},{"id":"150","nome":"Mewtwo","type":["Psychic"],"posicao":"-1560px -780px"},{"id":"151","nome":"Mew","type":["Psychic"],"posicao":"-1690px -780px"}]}')
	},
	johto: {
		total: 99,
		base: jQuery.parseJSON('{"nome":"johto","id":"1","pokemonj":[{"id":"152","nome":"Chikorita","type":["Grass"],"posicao":"-1820px -780px"},{"id":"153","nome":"Bayleef","type":["Grass"],"posicao":"-1950px -780px"},{"id":"154","nome":"Meganium","type":["Grass"],"posicao":"-2080px -780px"},{"id":"155","nome":"Cyndaquil","type":["Fire"],"posicao":"-2210px -780px"},{"id":"156","nome":"Quilava","type":["Fire"],"posicao":"-2340px -780px"},{"id":"157","nome":"Typhlosion","type":["Fire"],"posicao":"-2470px -780px"},{"id":"158","nome":"Totodile","type":["Water"],"posicao":"-2600px -780px"},{"id":"159","nome":"Croconaw","type":["Water"],"posicao":"-2730px -780px"},{"id":"160","nome":"Feraligatr","type":["Water"],"posicao":"-2860px -780px"},{"id":"161","nome":"Sentret","type":["Normal"],"posicao":"-2990px -780px"},{"id":"162","nome":"Furret","type":["Normal"],"posicao":"-3120px -780px"},{"id":"163","nome":"Hoothoot","type":["Normal","Flying"],"posicao":"-3250px -780px"},{"id":"164","nome":"Noctowl","type":["Normal","Flying"],"posicao":"-3380px -780px"},{"id":"165","nome":"Ledyba","type":["Bug","Flying"],"posicao":"-3510px -780px"},{"id":"166","nome":"Ledian","type":["Bug","Flying"],"posicao":"-3640px -780px"},{"id":"167","nome":"Spinarak","type":["Bug","Poison"],"posicao":"-3770px -780px"},{"id":"168","nome":"Ariados","type":["Bug","Poison"],"posicao":"-3900px -780px"},{"id":"169","nome":"Crobat","type":["Poison","Flying"],"posicao":"-0px -910px"},{"id":"170","nome":"Chinchou","type":["Water","Electric"],"posicao":"-130px -910px"},{"id":"171","nome":"Lanturn","type":["Water","Electric"],"posicao":"-260px -910px"},{"id":"172","nome":"Pichu","type":["Electric"],"posicao":"-390px -910px"},{"id":"173","nome":"Cleffa","type":["Fairy"],"posicao":"-520px -910px"},{"id":"174","nome":"Igglybuff","type":["Normal","Fairy"],"posicao":"-650px -910px"},{"id":"175","nome":"Togepi","type":["Fairy"],"posicao":"-780px -910px"},{"id":"176","nome":"Togetic","type":["Fairy","Flying"],"posicao":"-910px -910px"},{"id":"177","nome":"Natu","type":["Psychic","Flying"],"posicao":"-1040px -910px"},{"id":"178","nome":"Xatu","type":["Psychic","Flying"],"posicao":"-1170px -910px"},{"id":"179","nome":"Mareep","type":["Electric"],"posicao":"-1300px -910px"},{"id":"180","nome":"Flaaffy","type":["Electric"],"posicao":"-1430px -910px"},{"id":"181","nome":"Ampharos","type":["Electric"],"posicao":"-1560px -910px"},{"id":"182","nome":"Bellossom","type":["Grass"],"posicao":"-1690px -910px"},{"id":"183","nome":"Marill","type":["Water","Fairy"],"posicao":"-1820px -910px"},{"id":"184","nome":"Azumarill","type":["Water","Fairy"],"posicao":"-1950px -910px"},{"id":"185","nome":"Sudowoodo","type":["Rock"],"posicao":"-2080px -910px"},{"id":"186","nome":"Politoed","type":["Water"],"posicao":"-2210px -910px"},{"id":"187","nome":"Hoppip","type":["Grass","Flying"],"posicao":"-2340px -910px"},{"id":"188","nome":"Skiploom","type":["Grass","Flying"],"posicao":"-2470px -910px"},{"id":"189","nome":"Jumpluff","type":["Grass","Flying"],"posicao":"-2600px -910px"},{"id":"190","nome":"Aipom","type":["Normal"],"posicao":"-2730px -910px"},{"id":"191","nome":"Sunkern","type":["Grass"],"posicao":"-2860px -910px"},{"id":"192","nome":"Sunflora","type":["Grass"],"posicao":"-2990px -910px"},{"id":"193","nome":"Yanma","type":["Bug","Flying"],"posicao":"-3120px -910px"},{"id":"194","nome":"Wooper","type":["Water","Ground"],"posicao":"-3250px -910px"},{"id":"195","nome":"Quagsire","type":["Water","Ground"],"posicao":"-3380px -910px"},{"id":"196","nome":"Espeon","type":["Psychic"],"posicao":"-3510px -910px"},{"id":"197","nome":"Umbreon","type":["Dark"],"posicao":"-3640px -910px"},{"id":"198","nome":"Murkrow","type":["Dark","Flying"],"posicao":"-3770px -910px"},{"id":"199","nome":"Slowking","type":["Water","Psychic"],"posicao":"-3900px -910px"},{"id":"200","nome":"Misdreavus","type":["Ghost"],"posicao":"-0px -1040px"},{"id":"201","nome":"Unown","type":["Psychic"],"posicao":"-3640px -1040px"},{"id":"202","nome":"Wobbuffet","type":["Psychic"],"posicao":"-3770px -1040px"},{"id":"203","nome":"Girafarig","type":["Normal","Psychic"],"posicao":"-3900px -1040px"},{"id":"204","nome":"Pineco","type":["Bug"],"posicao":"-0px -1170px"},{"id":"205","nome":"Forretress","type":["Bug","Steel"],"posicao":"-130px -1170px"},{"id":"206","nome":"Dunsparce","type":["Normal"],"posicao":"-260px -1170px"},{"id":"207","nome":"Gligar","type":["Ground","Flying"],"posicao":"-390px -1170px"},{"id":"208","nome":"Steelix","type":["Steel","Ground"],"posicao":"-520px -1170px"},{"id":"209","nome":"Snubbull","type":["Fairy"],"posicao":"-650px -1170px"},{"id":"210","nome":"Granbull","type":["Fairy"],"posicao":"-780px -1170px"},{"id":"211","nome":"Qwilfish","type":["Water","Poison"],"posicao":"-910px -1170px"},{"id":"212","nome":"Scizor","type":["Bug","Steel"],"posicao":"-1040px -1170px"},{"id":"213","nome":"Shuckle","type":["Bug","Rock"],"posicao":"-1170px -1170px"},{"id":"214","nome":"Heracross","type":["Bug","Fighting"],"posicao":"-1300px -1170px"},{"id":"215","nome":"Sneasel","type":["Dark","Ice"],"posicao":"-1430px -1170px"},{"id":"216","nome":"Teddiursa","type":["Normal"],"posicao":"-1560px -1170px"},{"id":"217","nome":"Ursaring","type":["Normal"],"posicao":"-1690px -1170px"},{"id":"218","nome":"Slugma","type":["Fire"],"posicao":"-1820px -1170px"},{"id":"219","nome":"Magcargo","type":["Fire","Rock"],"posicao":"-1950px -1170px"},{"id":"220","nome":"Swinub","type":["Ice","Ground"],"posicao":"-2080px -1170px"},{"id":"221","nome":"Piloswine","type":["Ice","Ground"],"posicao":"-2210px -1170px"},{"id":"222","nome":"Corsola","type":["Water","Rock"],"posicao":"-2340px -1170px"},{"id":"223","nome":"Remoraid","type":["Water"],"posicao":"-2470px -1170px"},{"id":"224","nome":"Octillery","type":["Water"],"posicao":"-2600px -1170px"},{"id":"225","nome":"Delibird","type":["Ice","Flying"],"posicao":"-2730px -1170px"},{"id":"226","nome":"Mantine","type":["Water","Flying"],"posicao":"-2860px -1170px"},{"id":"227","nome":"Skarmory","type":["Steel","Flying"],"posicao":"-2990px -1170px"},{"id":"228","nome":"Houndour","type":["Dark","Fire"],"posicao":"-3120px -1170px"},{"id":"229","nome":"Houndoom","type":["Dark","Fire"],"posicao":"-3250px -1170px"},{"id":"230","nome":"Kingdra","type":["Water","Dragon"],"posicao":"-3380px -1170px"},{"id":"231","nome":"Phanpy","type":["Ground"],"posicao":"-3510px -1170px"},{"id":"232","nome":"Donphan","type":["Ground"],"posicao":"-3640px -1170px"},{"id":"233","nome":"Porygon2","type":["Normal"],"posicao":"-3770px -1170px"},{"id":"234","nome":"Stantler","type":["Normal"],"posicao":"-3900px -1170px"},{"id":"235","nome":"Smeargle","type":["Normal"],"posicao":"-0px -1300px"},{"id":"236","nome":"Tyrogue","type":["Fighting"],"posicao":"-130px -1300px"},{"id":"237","nome":"Hitmontop","type":["Fighting"],"posicao":"-260px -1300px"},{"id":"238","nome":"Smoochum","type":["Ice","Psychic"],"posicao":"-390px -1300px"},{"id":"239","nome":"Elekid","type":["Electric"],"posicao":"-520px -1300px"},{"id":"240","nome":"Magby","type":["Fire"],"posicao":"-650px -1300px"},{"id":"241","nome":"Miltank","type":["Normal"],"posicao":"-780px -1300px"},{"id":"242","nome":"Blissey","type":["Normal"],"posicao":"-910px -1300px"},{"id":"243","nome":"Raikou","type":["Electric"],"posicao":"-1040px -1300px"},{"id":"244","nome":"Entei","type":["Fire"],"posicao":"-1170px -1300px"},{"id":"245","nome":"Suicune","type":["Water"],"posicao":"-1300px -1300px"},{"id":"246","nome":"Larvitar","type":["Rock","Ground"],"posicao":"-1430px -1300px"},{"id":"247","nome":"Pupitar","type":["Rock","Ground"],"posicao":"-1560px -1300px"},{"id":"248","nome":"Tyranitar","type":["Rock","Dark"],"posicao":"-1690px -1300px"},{"id":"249","nome":"Lugia","type":["Psychic","Flying"],"posicao":"-1820px -1300px"},{"id":"250","nome":"Ho-Oh","type":["Fire","Flying"],"posicao":"-1950px -1300px"},{"id":"251","nome":"Celebi","type":["Psychic", "Grass"],"posicao":"-2080px -1300px"}]}')
	},
	hoenn: {
		total: 134,
		base: jQuery.parseJSON('{"nome":"hoenn","id":"1","pokemonj":[{"id":"252","nome":"Treecko","type":["Grass"],"posicao":"-2210px -1300px"},{"id":"253","nome":"Grovyle","type":["Grass"],"posicao":"-2340px -1300px"},{"id":"254","nome":"Sceptile","type":["Grass"],"posicao":"-2470px -1300px"},{"id":"255","nome":"Torchic","type":["Fire"],"posicao":"-2600px -1300px"},{"id":"256","nome":"Combusken","type":["Fire","Fighting"],"posicao":"-2730px -1300px"},{"id":"257","nome":"Blaziken","type":["Fire","Fighting"],"posicao":"-2860px -1300px"},{"id":"258","nome":"Mudkip","type":["Water"],"posicao":"-2990px -1300px"},{"id":"259","nome":"Marshtomp","type":["Water","Ground"],"posicao":"-3120px -1300px"},{"id":"260","nome":"Swampert","type":["Water","Ground"],"posicao":"-3250px -1300px"},{"id":"261","nome":"Poochyena","type":["Dark"],"posicao":"-3380px -1300px"},{"id":"262","nome":"Mightyena","type":["Dark"],"posicao":"-3510px -1300px"},{"id":"263","nome":"Zigzagoon","type":["Normal"],"posicao":"-3640px -1300px"},{"id":"264","nome":"Linoone","type":["Normal"],"posicao":"-3770px -1300px"},{"id":"265","nome":"Wurmple","type":["Bug"],"posicao":"-3900px -1300px"},{"id":"266","nome":"Silcoon","type":["Bug"],"posicao":"-0px -1430px"},{"id":"267","nome":"Beautifly","type":["Bug","Flying"],"posicao":"-130px -1430px"},{"id":"268","nome":"Cascoon","type":["Bug"],"posicao":"-260px -1430px"},{"id":"269","nome":"Dustox","type":["Bug","Poison"],"posicao":"-390px -1430px"},{"id":"270","nome":"Lotad","type":["Water","Grass"],"posicao":"-520px -1430px"},{"id":"271","nome":"Lombre","type":["Water","Grass"],"posicao":"-650px -1430px"},{"id":"272","nome":"Ludicolo","type":["Water","Grass"],"posicao":"-780px -1430px"},{"id":"273","nome":"Seedot","type":["Grass"],"posicao":"-910px -1430px"},{"id":"274","nome":"Nuzleaf","type":["Grass","Dark"],"posicao":"-1040px -1430px"},{"id":"275","nome":"Shiftry","type":["Grass","Dark"],"posicao":"-1170px -1430px"},{"id":"276","nome":"Taillow","type":["Normal","Flying"],"posicao":"-1300px -1430px"},{"id":"277","nome":"Swellow","type":["Normal","Flying"],"posicao":"-1430px -1430px"},{"id":"278","nome":"Wingull","type":["Water","Flying"],"posicao":"-1560px -1430px"},{"id":"279","nome":"Pelipper","type":["Water","Flying"],"posicao":"-1690px -1430px"},{"id":"280","nome":"Ralts","type":["Psychic","Fairy"],"posicao":"-1820px -1430px"},{"id":"281","nome":"Kirlia","type":["Psychic","Fairy"],"posicao":"-1950px -1430px"},{"id":"282","nome":"Gardevoir","type":["Psychic","Fairy"],"posicao":"-2080px -1430px"},{"id":"283","nome":"Surskit","type":["Bug","Water"],"posicao":"-2210px -1430px"},{"id":"284","nome":"Masquerain","type":["Bug","Flying"],"posicao":"-2340px -1430px"},{"id":"285","nome":"Shroomish","type":["Grass"],"posicao":"-2470px -1430px"},{"id":"286","nome":"Breloom","type":["Grass","Fighting"],"posicao":"-2600px -1430px"},{"id":"287","nome":"Slakoth","type":["Normal"],"posicao":"-2730px -1430px"},{"id":"288","nome":"Vigoroth","type":["Normal"],"posicao":"-2860px -1430px"},{"id":"289","nome":"Slaking","type":["Normal"],"posicao":"-2990px -1430px"},{"id":"290","nome":"Nincada","type":["Bug","Ground"],"posicao":"-3120px -1430px"},{"id":"291","nome":"Ninjask","type":["Bug","Flying"],"posicao":"-3250px -1430px"},{"id":"292","nome":"Shedinja","type":["Bug","Ghost"],"posicao":"-3380px -1430px"},{"id":"293","nome":"Whismur","type":["Normal"],"posicao":"-3510px -1430px"},{"id":"294","nome":"Loudred","type":["Normal"],"posicao":"-3640px -1430px"},{"id":"295","nome":"Exploud","type":["Normal"],"posicao":"-3770px -1430px"},{"id":"296","nome":"Makuhita","type":["Fighting"],"posicao":"-3900px -1430px"},{"id":"297","nome":"Hariyama","type":["Fighting"],"posicao":"-0px -1560px"},{"id":"298","nome":"Azurill","type":["Normal","Fairy"],"posicao":"-130px -1560px"},{"id":"299","nome":"Nosepass","type":["Rock"],"posicao":"-260px -1560px"},{"id":"300","nome":"Skitty","type":["Normal"],"posicao":"-390px -1560px"},{"id":"301","nome":"Delcatty","type":["Normal"],"posicao":"-520px -1560px"},{"id":"302","nome":"Sableye","type":["Dark","Ghost"],"posicao":"-650px -1560px"},{"id":"303","nome":"Mawile","type":["Steel","Fairy"],"posicao":"-780px -1560px"},{"id":"304","nome":"Aron","type":["Steel","Rock"],"posicao":"-910px -1560px"},{"id":"305","nome":"Lairon","type":["Steel","Rock"],"posicao":"-1040px -1560px"},{"id":"306","nome":"Aggron","type":["Steel","Rock"],"posicao":"-1170px -1560px"},{"id":"307","nome":"Meditite","type":["Fighting","Psychic"],"posicao":"-1300px -1560px"},{"id":"308","nome":"Medicham","type":["Fighting","Psychic"],"posicao":"-1430px -1560px"},{"id":"309","nome":"Electrike","type":["Electric"],"posicao":"-1560px -1560px"},{"id":"310","nome":"Manectric","type":["Electric"],"posicao":"-1690px -1560px"},{"id":"311","nome":"Plusle","type":["Electric"],"posicao":"-1820px -1560px"},{"id":"312","nome":"Minun","type":["Electric"],"posicao":"-1950px -1560px"},{"id":"313","nome":"Volbeat","type":["Bug"],"posicao":"-2080px -1560px"},{"id":"314","nome":"Illumise","type":["Bug"],"posicao":"-2210px -1560px"},{"id":"315","nome":"Roselia","type":["Grass","Poison"],"posicao":"-2340px -1560px"},{"id":"316","nome":"Gulpin","type":["Poison"],"posicao":"-2470px -1560px"},{"id":"317","nome":"Swalot","type":["Poison"],"posicao":"-2600px -1560px"},{"id":"318","nome":"Carvanha","type":["Water","Dark"],"posicao":"-2730px -1560px"},{"id":"319","nome":"Sharpedo","type":["Water","Dark"],"posicao":"-2860px -1560px"},{"id":"320","nome":"Wailmer","type":["Water"],"posicao":"-2990px -1560px"},{"id":"321","nome":"Wailord","type":["Water"],"posicao":"-3120px -1560px"},{"id":"322","nome":"Numel","type":["Fire","Ground"],"posicao":"-3250px -1560px"},{"id":"323","nome":"Camerupt","type":["Fire","Ground"],"posicao":"-3380px -1560px"},{"id":"324","nome":"Torkoal","type":["Fire"],"posicao":"-3510px -1560px"},{"id":"325","nome":"Spoink","type":["Psychic"],"posicao":"-3640px -1560px"},{"id":"326","nome":"Grumpig","type":["Psychic"],"posicao":"-3770px -1560px"},{"id":"327","nome":"Spinda","type":["Normal"],"posicao":"-3900px -1560px"},{"id":"328","nome":"Trapinch","type":["Ground"],"posicao":"-0px -1690px"},{"id":"329","nome":"Vibrava","type":["Ground","Dragon"],"posicao":"-130px -1690px"},{"id":"330","nome":"Flygon","type":["Ground","Dragon"],"posicao":"-260px -1690px"},{"id":"331","nome":"Cacnea","type":["Grass"],"posicao":"-390px -1690px"},{"id":"332","nome":"Cacturne","type":["Grass","Dark"],"posicao":"-520px -1690px"},{"id":"333","nome":"Swablu","type":["Normal","Flying"],"posicao":"-650px -1690px"},{"id":"334","nome":"Altaria","type":["Dragon","Flying"],"posicao":"-780px -1690px"},{"id":"335","nome":"Zangoose","type":["Normal"],"posicao":"-910px -1690px"},{"id":"336","nome":"Seviper","type":["Poison"],"posicao":"-1040px -1690px"},{"id":"337","nome":"Lunatone","type":["Rock","Psychic"],"posicao":"-1170px -1690px"},{"id":"338","nome":"Solrock","type":["Rock","Psychic"],"posicao":"-1300px -1690px"},{"id":"339","nome":"Barboach","type":["Water","Ground"],"posicao":"-1430px -1690px"},{"id":"340","nome":"Whiscash","type":["Water","Ground"],"posicao":"-1560px -1690px"},{"id":"341","nome":"Corphish","type":["Water"],"posicao":"-1690px -1690px"},{"id":"342","nome":"Crawdaunt","type":["Water","Dark"],"posicao":"-1820px -1690px"},{"id":"343","nome":"Baltoy","type":["Ground","Psychic"],"posicao":"-1950px -1690px"},{"id":"344","nome":"Claydol","type":["Ground","Psychic"],"posicao":"-2080px -1690px"},{"id":"345","nome":"Lileep","type":["Rock","Grass"],"posicao":"-2210px -1690px"},{"id":"346","nome":"Cradily","type":["Rock","Grass"],"posicao":"-2340px -1690px"},{"id":"347","nome":"Anorith","type":["Rock","Bug"],"posicao":"-2470px -1690px"},{"id":"348","nome":"Armaldo","type":["Rock","Bug"],"posicao":"-2600px -1690px"},{"id":"349","nome":"Feebas","type":["Water"],"posicao":"-2730px -1690px"},{"id":"350","nome":"Milotic","type":["Water"],"posicao":"-2860px -1690px"},{"id":"351","nome":"Castform","type":["Normal"],"posicao":"-2990px -1690px"},{"id":"352","nome":"Kecleon","type":["Normal"],"posicao":"-3120px -1690px"},{"id":"353","nome":"Shuppet","type":["Ghost"],"posicao":"-3250px -1690px"},{"id":"354","nome":"Banette","type":["Ghost"],"posicao":"-3380px -1690px"},{"id":"355","nome":"Duskull","type":["Ghost"],"posicao":"-3510px -1690px"},{"id":"356","nome":"Dusclops","type":["Ghost"],"posicao":"-3640px -1690px"},{"id":"357","nome":"Tropius","type":["Grass","Flying"],"posicao":"-3770px -1690px"},{"id":"358","nome":"Chimecho","type":["Psychic"],"posicao":"-3900px -1690px"},{"id":"359","nome":"Absol","type":["Dark"],"posicao":"-0px -1820px"},{"id":"360","nome":"Wynaut","type":["Psychic"],"posicao":"-130px -1820px"},{"id":"361","nome":"Snorunt","type":["Ice"],"posicao":"-260px -1820px"},{"id":"362","nome":"Glalie","type":["Ice"],"posicao":"-390px -1820px"},{"id":"363","nome":"Spheal","type":["Ice","Water"],"posicao":"-520px -1820px"},{"id":"364","nome":"Sealeo","type":["Ice","Water"],"posicao":"-650px -1820px"},{"id":"365","nome":"Walrein","type":["Ice","Water"],"posicao":"-780px -1820px"},{"id":"366","nome":"Clamperl","type":["Water"],"posicao":"-910px -1820px"},{"id":"367","nome":"Huntail","type":["Water"],"posicao":"-1040px -1820px"},{"id":"368","nome":"Gorebyss","type":["Water"],"posicao":"-1170px -1820px"},{"id":"369","nome":"Relicanth","type":["Water","Rock"],"posicao":"-1300px -1820px"},{"id":"370","nome":"Luvdisc","type":["Water"],"posicao":"-1430px -1820px"},{"id":"371","nome":"Bagon","type":["Dragon"],"posicao":"-1560px -1820px"},{"id":"372","nome":"Shelgon","type":["Dragon"],"posicao":"-1690px -1820px"},{"id":"373","nome":"Salamence","type":["Dragon","Flying"],"posicao":"-1820px -1820px"},{"id":"374","nome":"Beldum","type":["Steel","Psychic"],"posicao":"-1950px -1820px"},{"id":"375","nome":"Metang","type":["Steel","Psychic"],"posicao":"-2080px -1820px"},{"id":"376","nome":"Metagross","type":["Steel","Psychic"],"posicao":"-2210px -1820px"},{"id":"377","nome":"Regirock","type":["Rock"],"posicao":"-2340px -1820px"},{"id":"378","nome":"Regice","type":["Ice"],"posicao":"-2470px -1820px"},{"id":"379","nome":"Registeel","type":["Steel"],"posicao":"-2600px -1820px"},{"id":"380","nome":"Latias","type":["Dragon","Psychic"],"posicao":"-2730px -1820px"},{"id":"381","nome":"Latios","type":["Dragon","Psychic"],"posicao":"-2860px -1820px"},{"id":"382","nome":"Kyogre","type":["Water"],"posicao":"-2990px -1820px"},{"id":"383","nome":"Groudon","type":["Ground"],"posicao":"-3249px -1820px"},{"id":"384","nome":"Rayquaza","type":["Dragon","Flying"],"posicao":"-3507px -1820px"},{"id":"385","nome":"Jirachi","type":["Steel","Psychic"],"posicao":"-3631px -1820px"},{"id":"386","nome":"Deoxys","type":["Psychic"],"posicao":"-3765px -1820px"}]}')
	},
	sinnoh: {
		total: 107,
		base: jQuery.parseJSON('{"nome":"0","id":"?","pokemonj":[{"id":"387","nome":"Turtwig","type":["Grass"],"posicao":"-3900px -3900px"},{"id":"388","nome":"Grotle","type":["Grass"],"posicao":"-0px -1951px"},{"id":"389","nome":"Torterra","type":["Grass","Ground"],"posicao":"-130px -1951px"},{"id":"390","nome":"Chimchar","type":["Fire"],"posicao":"-260px -1951px"},{"id":"391","nome":"Monferno","type":["Fire","Fighting"],"posicao":"-390px -1951px"},{"id":"392","nome":"Infernape","type":["Fire","Fighting"],"posicao":"-520px -1951px"},{"id":"393","nome":"Piplup","type":["Water"],"posicao":"-650px -1951px"},{"id":"394","nome":"Prinplup","type":["Water"],"posicao":"-780px -1951px"},{"id":"395","nome":"Empoleon","type":["Water","Steel"],"posicao":"-910px -1951px"},{"id":"396","nome":"Starly","type":["Normal","Flying"],"posicao":"-1040px -1951px"},{"id":"397","nome":"Staravia","type":["Normal","Flying"],"posicao":"-1170px -1951px"},{"id":"398","nome":"Staraptor","type":["Normal","Flying"],"posicao":"-1300px -1951px"},{"id":"399","nome":"Bidoof","type":["Normal"],"posicao":"-1430px -1951px"},{"id":"400","nome":"Bibarel","type":["Normal","Water"],"posicao":"-1560px -1951px"},{"id":"401","nome":"Kricketot","type":["Bug"],"posicao":"-1690px -1951px"},{"id":"402","nome":"Kricketune","type":["Bug"],"posicao":"-1820px -1951px"},{"id":"403","nome":"Shinx","type":["Electric"],"posicao":"-1950px -1951px"},{"id":"404","nome":"Luxio","type":["Electric"],"posicao":"-2080px -1951px"},{"id":"405","nome":"Luxray","type":["Electric"],"posicao":"-2210px -1951px"},{"id":"406","nome":"Budew","type":["Grass","Poison"],"posicao":"-2340px -1951px"},{"id":"407","nome":"Roserade","type":["Grass","Poison"],"posicao":"-2470px -1951px"},{"id":"408","nome":"Cranidos","type":["Rock"],"posicao":"-2600px -1951px"},{"id":"409","nome":"Rampardos","type":["Rock"],"posicao":"-2730px -1951px"},{"id":"410","nome":"Shieldon","type":["Rock","Steel"],"posicao":"-2860px -1951px"},{"id":"411","nome":"Bastiodon","type":["Rock","Steel"],"posicao":"-2990px -1951px"},{"id":"412","nome":"Burmy","type":["Bug"],"posicao":"-3120px -1951px"},{"id":"413","nome":"Wormadam","type":["Bug","Grass"],"posicao":"-3510px -1951px"},{"id":"414","nome":"Mothim","type":["Bug","Flying"],"posicao":"-3900px -1951px"},{"id":"415","nome":"Combee","type":["Bug","Flying"],"posicao":"-0px -2081px"},{"id":"416","nome":"Vespiquen","type":["Bug","Flying"],"posicao":"-130px -2081px"},{"id":"417","nome":"Pachirisu","type":["Electric"],"posicao":"-260px -2081px"},{"id":"418","nome":"Buizel","type":["Water"],"posicao":"-390px -2081px"},{"id":"419","nome":"Floatzel","type":["Water"],"posicao":"-520px -2081px"},{"id":"420","nome":"Cherubi","type":["Grass"],"posicao":"-650px -2081px"},{"id":"421","nome":"Cherrim","type":["Grass"],"posicao":"-780px -2081px"},{"id":"422","nome":"Shellos","type":["Water"],"posicao":"-1040px -2081px"},{"id":"423","nome":"Gastrodon","type":["Water","Ground"],"posicao":"-1300px -2081px"},{"id":"424","nome":"Ambipom","type":["Normal"],"posicao":"-1560px -2081px"},{"id":"425","nome":"Drifloon","type":["Ghost","Flying"],"posicao":"-1690px -2081px"},{"id":"426","nome":"Drifblim","type":["Ghost","Flying"],"posicao":"-1820px -2081px"},{"id":"427","nome":"Buneary","type":["Normal"],"posicao":"-1950px -2081px"},{"id":"428","nome":"Lopunny","type":["Normal"],"posicao":"-2080px -2081px"},{"id":"429","nome":"Mismagius","type":["Ghost"],"posicao":"-2210px -2081px"},{"id":"430","nome":"Honchkrow","type":["Dark","Flying"],"posicao":"-2340px -2081px"},{"id":"431","nome":"Glameow","type":["Normal"],"posicao":"-2470px -2081px"},{"id":"432","nome":"Purugly","type":["Normal"],"posicao":"-2600px -2081px"},{"id":"433","nome":"Chingling","type":["Psychic"],"posicao":"-2730px -2081px"},{"id":"434","nome":"Stunky","type":["Poison","Dark"],"posicao":"-2860px -2081px"},{"id":"435","nome":"Skuntank","type":["Poison","Dark"],"posicao":"-2990px -2081px"},{"id":"436","nome":"Bronzor","type":["Steel","Psychic"],"posicao":"-3120px -2081px"},{"id":"437","nome":"Bronzong","type":["Steel","Psychic"],"posicao":"-3250px -2081px"},{"id":"438","nome":"Bonsly","type":["Rock"],"posicao":"-3380px -2081px"},{"id":"439","nome":"MimeJr","type":["Psychic","Fairy"],"posicao":"-3510px -2081px"},{"id":"440","nome":"Happiny","type":["Normal"],"posicao":"-3640px -2081px"},{"id":"441","nome":"Chatot","type":["Normal","Flying"],"posicao":"-3770px -2081px"},{"id":"442","nome":"Spiritomb","type":["Ghost","Dark"],"posicao":"-3900px -2081px"},{"id":"443","nome":"Gible","type":["dragon","Ground"],"posicao":"-0px -2211px"},{"id":"444","nome":"Gabite","type":["dragon","Ground"],"posicao":"-130px -2211px"},{"id":"445","nome":"Garchomp","type":["dragon","Ground"],"posicao":"-260px -2211px"},{"id":"446","nome":"Munchlax","type":["Normal"],"posicao":"-390px -2211px"},{"id":"447","nome":"Riolu","type":["Fighting"],"posicao":"-520px -2211px"},{"id":"448","nome":"Lucario","type":["Fighting","Steel"],"posicao":"-650px -2211px"},{"id":"449","nome":"Hippopotas","type":["Ground"],"posicao":"-780px -2211px"},{"id":"450","nome":"Hippowdon","type":["Ground"],"posicao":"-910px -2211px"},{"id":"451","nome":"Skorupi","type":["Poison","Bug"],"posicao":"-1040px -2211px"},{"id":"452","nome":"Drapion","type":["Poison","Dark"],"posicao":"-1170px -2211px"},{"id":"453","nome":"Croagunk","type":["Poison","Fighting"],"posicao":"-1300px -2211px"},{"id":"454","nome":"Toxicroak","type":["Poison","Fighting"],"posicao":"-1430px -2211px"},{"id":"455","nome":"Carnivine","type":["Grass"],"posicao":"-1560px -2211px"},{"id":"456","nome":"Finneon","type":["Water"],"posicao":"-1690px -2211px"},{"id":"457","nome":"Lumineon","type":["Water"],"posicao":"-1820px -2211px"},{"id":"458","nome":"Mantyke","type":["Water","Flying"],"posicao":"-1950px -2211px"},{"id":"459","nome":"Snover","type":["Grass","Ice"],"posicao":"-2080px -2211px"},{"id":"460","nome":"Abomasnow","type":["Grass","Ice"],"posicao":"-2210px -2211px"},{"id":"461","nome":"Weavile","type":["Dark","Ice"],"posicao":"-2340px -2211px"},{"id":"462","nome":"Magnezone","type":["Electric","Steel"],"posicao":"-2470px -2211px"},{"id":"463","nome":"Lickilicky","type":["Normal"],"posicao":"-2600px -2211px"},{"id":"464","nome":"Rhyperior","type":["Ground","Rock"],"posicao":"-2730px -2211px"},{"id":"465","nome":"Tangrowth","type":["Grass"],"posicao":"-2860px -2211px"},{"id":"466","nome":"Electivire","type":["Electric"],"posicao":"-2990px -2211px"},{"id":"467","nome":"Magmortar","type":["Fire"],"posicao":"-3120px -2211px"},{"id":"468","nome":"Togekiss","type":["Fairy","Flying"],"posicao":"-3250px -2211px"},{"id":"469","nome":"Yanmega","type":["Bug","Flying"],"posicao":"-3380px -2211px"},{"id":"470","nome":"Leafeon","type":["Grass"],"posicao":"-3510px -2211px"},{"id":"471","nome":"Glaceon","type":["Ice"],"posicao":"-3640px -2211px"},{"id":"472","nome":"Gliscor","type":["Ground","Flying"],"posicao":"-3770px -2211px"},{"id":"473","nome":"Mamoswine","type":["Ice","Ground"],"posicao":"-3900px -2211px"},{"id":"474","nome":"Porygon-Z","type":["Normal"],"posicao":"-0px -2341px"},{"id":"475","nome":"Gallade","type":["Psychic","Fighting"],"posicao":"-130px -2341px"},{"id":"476","nome":"Probopass","type":["Rock","Steel"],"posicao":"-260px -2341px"},{"id":"477","nome":"Dusknoir","type":["Ghost"],"posicao":"-390px -2341px"},{"id":"478","nome":"Froslass","type":["Ice","Ghost"],"posicao":"-520px -2341px"},{"id":"479","nome":"Rotom","type":["Electric","Ghost"],"posicao":"-650px -2341px"},{"id":"480","nome":"Uxie","type":["Psychic"],"posicao":"-1430px -2341px"},{"id":"481","nome":"Mesprit","type":["Psychic"],"posicao":"-1560px -2341px"},{"id":"482","nome":"Azelf","type":["Psychic"],"posicao":"-1690px -2341px"},{"id":"483","nome":"Dialga","type":["Steel","dragon"],"posicao":"-1820px -2341px"},{"id":"484","nome":"Palkia","type":["Water","dragon"],"posicao":"-1950px -2341px"},{"id":"485","nome":"Heatran","type":["Fire","Steel"],"posicao":"-2080px -2341px"},{"id":"486","nome":"Regigigas","type":["Normal"],"posicao":"-2210px -2341px"},{"id":"487","nome":"Giratina","type":["Ghost","dragon"],"posicao":"-2340px -2341px"},{"id":"488","nome":"Cresselia","type":["Psychic"],"posicao":"-2600px -2341px"},{"id":"489","nome":"Phione","type":["Water"],"posicao":"-2730px -2341px"},{"id":"490","nome":"Manaphy","type":["Water"],"posicao":"-2860px -2341px"},{"id":"491","nome":"Darkrai","type":["Dark"],"posicao":"-2990px -2341px"},{"id":"492","nome":"Shaymin","type":["Grass"],"posicao":"-3120px -2341px"},{"id":"493","nome":"Arceus","type":["Normal"],"posicao":"-3380px -2341px"}]}'),
	},
	unova: {
		total: 156,
		base: jQuery.parseJSON('{"nome":"0","id":"?","pokemonj":[{"id":"494","nome":"Victini","type":["Psychic","Fire"],"posicao":"-3510px -2341px"},{"id":"495","nome":"Snivy","type":["Grass"],"posicao":"-3640px -2341px"},{"id":"496","nome":"Servine","type":["Grass"],"posicao":"-3770px -2341px"},{"id":"497","nome":"Serperior","type":["Grass"],"posicao":"-3900px -2341px"},{"id":"498","nome":"Tepig","type":["Fire"],"posicao":"-0px -2471px"},{"id":"499","nome":"Pignite","type":["Fire","Fighting"],"posicao":"-130px -2471px"},{"id":"500","nome":"Emboar","type":["Fire","Fighting"],"posicao":"-260px -2471px"},{"id":"501","nome":"Oshawott","type":["Water"],"posicao":"-390px -2471px"},{"id":"502","nome":"Dewott","type":["Water"],"posicao":"-520px -2471px"},{"id":"503","nome":"Samurott","type":["Water"],"posicao":"-650px -2471px"},{"id":"504","nome":"Patrat","type":["Normal"],"posicao":"-780px -2471px"},{"id":"505","nome":"Watchog","type":["Normal"],"posicao":"-910px -2471px"},{"id":"506","nome":"Lillipup","type":["Normal"],"posicao":"-1040px -2471px"},{"id":"507","nome":"Herdier","type":["Normal"],"posicao":"-1170px -2471px"},{"id":"508","nome":"Stoutland","type":["Normal"],"posicao":"-1300px -2471px"},{"id":"509","nome":"Purrloin","type":["Dark"],"posicao":"-1430px -2471px"},{"id":"510","nome":"Liepard","type":["Dark"],"posicao":"-1560px -2471px"},{"id":"511","nome":"Pansage","type":["Grass"],"posicao":"-1690px -2471px"},{"id":"512","nome":"Simisage","type":["Grass"],"posicao":"-1820px -2471px"},{"id":"513","nome":"Pansear","type":["Fire"],"posicao":"-1950px -2471px"},{"id":"514","nome":"Simisear","type":["Fire"],"posicao":"-2080px -2471px"},{"id":"515","nome":"Panpour","type":["Water"],"posicao":"-2210px -2471px"},{"id":"516","nome":"Simipour","type":["Water"],"posicao":"-2340px -2471px"},{"id":"517","nome":"Munna","type":["Psychic"],"posicao":"-2470px -2471px"},{"id":"518","nome":"Musharna","type":["Psychic"],"posicao":"-2600px -2471px"},{"id":"519","nome":"Pidove","type":["Normal","Flying"],"posicao":"-2730px -2471px"},{"id":"520","nome":"Tranquill","type":["Normal","Flying"],"posicao":"-2860px -2471px"},{"id":"521","nome":"Unfezant","type":["Normal","Flying"],"posicao":"-2990px -2471px"},{"id":"522","nome":"Blitzle","type":["Electric"],"posicao":"-3120px -2471px"},{"id":"523","nome":"Zebstrika","type":["Electric"],"posicao":"-3250px -2471px"},{"id":"524","nome":"Roggenrola","type":["Rock"],"posicao":"-3380px -2471px"},{"id":"525","nome":"Boldore","type":["Rock"],"posicao":"-3510px -2471px"},{"id":"526","nome":"Gigalith","type":["Rock"],"posicao":"-3640px -2471px"},{"id":"527","nome":"Woobat","type":["Psychic","Flying"],"posicao":"-3770px -2471px"},{"id":"528","nome":"Swoobat","type":["Psychic","Flying"],"posicao":"-3900px -2471px"},{"id":"529","nome":"Drilbur","type":["Ground"],"posicao":"-0px -2601px"},{"id":"530","nome":"Excadrill","type":["Ground","Steel"],"posicao":"-130px -2601px"},{"id":"531","nome":"Audino","type":["Normal"],"posicao":"-260px -2601px"},{"id":"532","nome":"Timburr","type":["Fighting"],"posicao":"-390px -2601px"},{"id":"533","nome":"Gurdurr","type":["Fighting"],"posicao":"-520px -2601px"},{"id":"534","nome":"Conkeldurr","type":["Fighting"],"posicao":"-650px -2601px"},{"id":"535","nome":"Tympole","type":["Water"],"posicao":"-780px -2601px"},{"id":"536","nome":"Palpitoad","type":["Water","Ground"],"posicao":"-910px -2601px"},{"id":"537","nome":"Seismitoad","type":["Water","Ground"],"posicao":"-1040px -2601px"},{"id":"538","nome":"Throh","type":["Fighting"],"posicao":"-1170px -2601px"},{"id":"539","nome":"Sawk","type":["Fighting"],"posicao":"-1300px -2601px"},{"id":"540","nome":"Sewaddle","type":["Bug","Grass"],"posicao":"-1430px -2601px"},{"id":"541","nome":"Swadloon","type":["Bug","Grass"],"posicao":"-1560px -2601px"},{"id":"542","nome":"Leavanny","type":["Bug","Grass"],"posicao":"-1690px -2601px"},{"id":"543","nome":"Venipede","type":["Bug","Poison"],"posicao":"-1820px -2601px"},{"id":"544","nome":"Whirlipede","type":["Bug","Poison"],"posicao":"-1950px -2601px"},{"id":"545","nome":"Scolipede","type":["Bug","Poison"],"posicao":"-2080px -2601px"},{"id":"546","nome":"Cottonee","type":["Grass","Fairy"],"posicao":"-2210px -2601px"},{"id":"547","nome":"Whimsicott","type":["Grass","Fairy"],"posicao":"-2340px -2601px"},{"id":"548","nome":"Petilil","type":["Grass"],"posicao":"-2470px -2601px"},{"id":"549","nome":"Lilligant","type":["Grass"],"posicao":"-2600px -2601px"},{"id":"550","nome":"Basculin","type":["Water"],"posicao":"-2730px -2601px"},{"id":"551","nome":"Sandile","type":["Ground","Dark"],"posicao":"-2990px -2601px"},{"id":"552","nome":"Krokorok","type":["Ground","Dark"],"posicao":"-3120px -2601px"},{"id":"553","nome":"Krookodile","type":["Ground","Dark"],"posicao":"-3250px -2601px"},{"id":"554","nome":"Darumaka","type":["Fire"],"posicao":"-3380px -2601px"},{"id":"555","nome":"Darmanitan","type":["Fire"],"posicao":"-3510px -2601px"},{"id":"556","nome":"Maractus","type":["Grass"],"posicao":"-3770px -2601px"},{"id":"557","nome":"Dwebble","type":["Bug","Rock"],"posicao":"-3900px -2601px"},{"id":"558","nome":"Crustle","type":["Bug","Rock"],"posicao":"-0px -2731px"},{"id":"559","nome":"Scraggy","type":["Dark","Fighting"],"posicao":"-130px -2731px"},{"id":"560","nome":"Scrafty","type":["Dark","Fighting"],"posicao":"-260px -2731px"},{"id":"561","nome":"Sigilyph","type":["Psychic","Flying"],"posicao":"-390px -2731px"},{"id":"562","nome":"Yamask","type":["Ghost"],"posicao":"-520px -2731px"},{"id":"563","nome":"Cofagrigus","type":["Ghost"],"posicao":"-650px -2731px"},{"id":"564","nome":"Tirtouga","type":["Water","Rock"],"posicao":"-780px -2731px"},{"id":"565","nome":"Carracosta","type":["Water","Rock"],"posicao":"-910px -2731px"},{"id":"566","nome":"Archen","type":["Rock","Flying"],"posicao":"-1040px -2731px"},{"id":"567","nome":"Archeops","type":["Rock","Flying"],"posicao":"-1170px -2731px"},{"id":"568","nome":"Trubbish","type":["Poison"],"posicao":"-1300px -2731px"},{"id":"569","nome":"Garbodor","type":["Poison"],"posicao":"-1430px -2731px"},{"id":"570","nome":"Zorua","type":["Dark"],"posicao":"-1560px -2731px"},{"id":"571","nome":"Zoroark","type":["Dark"],"posicao":"-1690px -2731px"},{"id":"572","nome":"Minccino","type":["Normal"],"posicao":"-1820px -2731px"},{"id":"573","nome":"Cinccino","type":["Normal"],"posicao":"-1950px -2731px"},{"id":"574","nome":"Gothita","type":["Psychic"],"posicao":"-2080px -2731px"},{"id":"575","nome":"Gothorita","type":["Psychic"],"posicao":"-2210px -2731px"},{"id":"576","nome":"Gothitelle","type":["Psychic"],"posicao":"-2340px -2731px"},{"id":"577","nome":"Solosis","type":["Psychic"],"posicao":"-2470px -2731px"},{"id":"578","nome":"Duosion","type":["Psychic"],"posicao":"-2600px -2731px"},{"id":"579","nome":"Reuniclus","type":["Psychic"],"posicao":"-2730px -2731px"},{"id":"580","nome":"Ducklett","type":["Water","Flying"],"posicao":"-2860px -2731px"},{"id":"581","nome":"Swanna","type":["Water","Flying"],"posicao":"-2990px -2731px"},{"id":"582","nome":"Vanillite","type":["Ice"],"posicao":"-3120px -2731px"},{"id":"583","nome":"Vanillish","type":["Ice"],"posicao":"-3250px -2731px"},{"id":"584","nome":"Vanilluxe","type":["Ice"],"posicao":"-3380px -2731px"},{"id":"585","nome":"Deerling","type":["Normal","Grass"],"posicao":"-3510px -2731px"},{"id":"586","nome":"Sawsbuck","type":["Normal","Grass"],"posicao":"-0px -2861px"},{"id":"587","nome":"Emolga","type":["Electric","Flying"],"posicao":"-520px -2861px"},{"id":"588","nome":"Karrablast","type":["Bug"],"posicao":"-650px -2861px"},{"id":"589","nome":"Escavalier","type":["Bug","Steel"],"posicao":"-780px -2861px"},{"id":"590","nome":"Foongus","type":["Grass","Poison"],"posicao":"-910px -2861px"},{"id":"591","nome":"Amoonguss","type":["Grass","Poison"],"posicao":"-1040px -2861px"},{"id":"592","nome":"Frillish","type":["Water","Ghost"],"posicao":"-1170px -2861px"},{"id":"593","nome":"Jellicent","type":["Water","Ghost"],"posicao":"-1430px -2861px"},{"id":"594","nome":"Alomomola","type":["Water"],"posicao":"-1690px -2861px"},{"id":"595","nome":"Joltik","type":["Bug","Electric"],"posicao":"-1820px -2861px"},{"id":"596","nome":"Galvantula","type":["Bug","Electric"],"posicao":"-1950px -2861px"},{"id":"597","nome":"Ferroseed","type":["Grass","Steel"],"posicao":"-2080px -2861px"},{"id":"598","nome":"Ferrothorn","type":["Grass","Steel"],"posicao":"-2210px -2861px"},{"id":"599","nome":"Klink","type":["Steel"],"posicao":"-2340px -2861px"},{"id":"600","nome":"Klang","type":["Steel"],"posicao":"-2470px -2861px"},{"id":"601","nome":"Klinklang","type":["Steel"],"posicao":"-2600px -2861px"},{"id":"602","nome":"Tynamo","type":["Electric"],"posicao":"-2730px -2861px"},{"id":"603","nome":"Eelektrik","type":["Electric"],"posicao":"-2860px -2861px"},{"id":"604","nome":"Eelektross","type":["Electric"],"posicao":"-2990px -2861px"},{"id":"605","nome":"Elgyem","type":["Psychic"],"posicao":"-3120px -2861px"},{"id":"606","nome":"Beheeyem","type":["Psychic"],"posicao":"-3250px -2861px"},{"id":"607","nome":"Litwick","type":["Ghost","Fire"],"posicao":"-3380px -2861px"},{"id":"608","nome":"Lampent","type":["Ghost","Fire"],"posicao":"-3510px -2861px"},{"id":"609","nome":"Chandelure","type":["Ghost","Fire"],"posicao":"-3640px -2861px"},{"id":"610","nome":"Axew","type":["dragon"],"posicao":"-3770px -2861px"},{"id":"611","nome":"Fraxure","type":["dragon"],"posicao":"-3900px -2861px"},{"id":"612","nome":"Haxorus","type":["dragon"],"posicao":"-0px -2991px"},{"id":"613","nome":"Cubchoo","type":["Ice"],"posicao":"-130px -2991px"},{"id":"614","nome":"Beartic","type":["Ice"],"posicao":"-260px -2991px"},{"id":"615","nome":"Cryogonal","type":["Ice"],"posicao":"-390px -2991px"},{"id":"616","nome":"Shelmet","type":["Bug"],"posicao":"-520px -2991px"},{"id":"617","nome":"Accelgor","type":["Bug"],"posicao":"-650px -2991px"},{"id":"618","nome":"Stunfisk","type":["Ground","Electric"],"posicao":"-780px -2991px"},{"id":"619","nome":"Mienfoo","type":["Fighting"],"posicao":"-910px -2991px"},{"id":"620","nome":"Mienshao","type":["Fighting"],"posicao":"-1040px -2991px"},{"id":"621","nome":"Druddigon","type":["dragon"],"posicao":"-1170px -2991px"},{"id":"622","nome":"Golett","type":["Ground","Ghost"],"posicao":"-1300px -2991px"},{"id":"623","nome":"Golurk","type":["Ground","Ghost"],"posicao":"-1430px -2991px"},{"id":"624","nome":"Pawniard","type":["Dark","Steel"],"posicao":"-1560px -2991px"},{"id":"625","nome":"Bisharp","type":["Dark","Steel"],"posicao":"-1690px -2991px"},{"id":"626","nome":"Bouffalant","type":["Normal"],"posicao":"-1820px -2991px"},{"id":"627","nome":"Rufflet","type":["Normal","Flying"],"posicao":"-1950px -2991px"},{"id":"628","nome":"Braviary","type":["Normal","Flying"],"posicao":"-2080px -2991px"},{"id":"629","nome":"Vullaby","type":["Dark","Flying"],"posicao":"-2210px -2991px"},{"id":"630","nome":"Mandibuzz","type":["Dark","Flying"],"posicao":"-2340px -2991px"},{"id":"631","nome":"Heatmor","type":["Fire"],"posicao":"-2470px -2991px"},{"id":"632","nome":"Durant","type":["Bug","Steel"],"posicao":"-2600px -2991px"},{"id":"633","nome":"Deino","type":["Dark","dragon"],"posicao":"-2730px -2991px"},{"id":"634","nome":"Zweilous","type":["Dark","dragon"],"posicao":"-2860px -2991px"},{"id":"635","nome":"Hydreigon","type":["Dark","dragon"],"posicao":"-2990px -2991px"},{"id":"636","nome":"Larvesta","type":["Bug","Fire"],"posicao":"-3120px -2991px"},{"id":"637","nome":"Volcarona","type":["Bug","Fire"],"posicao":"-3250px -2991px"},{"id":"638","nome":"Cobalion","type":["Steel","Fighting"],"posicao":"-3380px -2991px"},{"id":"639","nome":"Terrakion","type":["Rock","Fighting"],"posicao":"-3510px -2991px"},{"id":"640","nome":"Virizion","type":["Grass","Fighting"],"posicao":"-3640px -2991px"},{"id":"641","nome":"Tornadus","type":["Flying"],"posicao":"-3770px -2991px"},{"id":"642","nome":"Thundurus","type":["Electric","Flying"],"posicao":"0px -3121px"},{"id":"643","nome":"Reshiram","type":["dragon","Fire"],"posicao":"-260px -3121px"},{"id":"644","nome":"Zekrom","type":["dragon","Electric"],"posicao":"-390px -3121px"},{"id":"645","nome":"Landorus","type":["Ground","Flying"],"posicao":"-520px -3121px"},{"id":"646","nome":"Kyurem","type":["dragon","Ice"],"posicao":"-780px -3121px"},{"id":"647","nome":"Keldeo","type":["Water","Fighting"],"posicao":"-1170px -3121px"},{"id":"648","nome":"Meloetta","type":["Normal","Psychic"],"posicao":"-1430px -3121px"},{"id":"649","nome":"Genesect","type":["Bug","Steel"],"posicao":"-1560px -3121px"}]}'),
	},
	kalos: {
		total: 72,
		base: jQuery.parseJSON('{"nome":"kalos","id":"6","pokemonj":[{"id":"650","nome":"Chespin","type":["Grass"],"posicao":"-1823px -3125px"},{"id":"651","nome":"Quilladin","type":["Grass"],"posicao":"-1952px -3118px"},{"id":"652","nome":"Chesnaught","type":["Grass","Fighting"],"posicao":"-2083px -3125px"},{"id":"653","nome":"Fennekin","type":["Fire"],"posicao":"-2208px -3125px"},{"id":"654","nome":"Braixen","type":["Fire"],"posicao":"-2338px -3121px"},{"id":"655","nome":"Delphox","type":["Fire","Psychic"],"posicao":"-2467px -3125px"},{"id":"656","nome":"Froakie","type":["Water"],"posicao":"-2603px -3125px"},{"id":"657","nome":"Frogadier","type":["Water"],"posicao":"-2727px -3116px"},{"id":"658","nome":"Greninja","type":["Water","Dark"],"posicao":"-2863px -3116px"},{"id":"659","nome":"Bunnelby","type":["Normal"],"posicao":"-2984px -3116px"},{"id":"660","nome":"Diggersby","type":["Normal","Ground"],"posicao":"-3116px -3116px"},{"id":"661","nome":"Fletchling","type":["Normal","Flying"],"posicao":"-3242px -3116px"},{"id":"662","nome":"Fletchinder","type":["Fire","Flying"],"posicao":"-3381px -3116px"},{"id":"663","nome":"Talonflame","type":["Fire","Flying"],"posicao":"-3507px -3116px"},{"id":"664","nome":"Scatterbug","type":["Bug"],"posicao":"-3637px -3116px"},{"id":"665","nome":"Spewpa","type":["Bug"],"posicao":"-3763px -3116px"},{"id":"666","nome":"Vivillon","type":["Bug","Flying"],"posicao":"-3895px -3116px"},{"id":"667","nome":"Litleo","type":["Fire","Normal"],"posicao":"-128px -3250px"},{"id":"668","nome":"Pyroar","type":["Fire","Normal"],"posicao":"-253px -3250px"},{"id":"669","nome":"Flabébé","type":["Fairy"],"posicao":"-518px -3250px"},{"id":"670","nome":"Floette","type":["Fairy"],"posicao":"-650px -3250px"},{"id":"671","nome":"Florges","type":["Fairy"],"posicao":"-780px -3250px"},{"id":"672","nome":"Skiddo","type":["Grass"],"posicao":"-911px -3250px"},{"id":"673","nome":"Gogoat","type":["Grass"],"posicao":"-1038px -3250px"},{"id":"674","nome":"Pancham","type":["Fighting"],"posicao":"-1165px -3250px"},{"id":"675","nome":"Pangoro","type":["Fighting","Dark"],"posicao":"-1301px -3250px"},{"id":"676","nome":"Furfrou","type":["Normal"],"posicao":"-1427px -3250px"},{"id":"677","nome":"Espurr","type":["Psychic"],"posicao":"-1560px -3250px"},{"id":"678","nome":"Meowstic","type":["Psychic"],"posicao":"-1692px -3250px"},{"id":"679","nome":"Honedge","type":["Steel","Ghost"],"posicao":"-1947px -3250px"},{"id":"680","nome":"Doublade","type":["Steel","Ghost"],"posicao":"-2080px -3250px"},{"id":"681","nome":"Aegislash","type":["Steel","Ghost"],"posicao":"-2208px -3250px"},{"id":"682","nome":"Spritzee","type":["Fairy"],"posicao":"-2337px -3250px"},{"id":"683","nome":"Aromatisse","type":["Fairy"],"posicao":"-2464px -3250px"},{"id":"684","nome":"Swirlix","type":["Fairy"],"posicao":"-2597px -3250px"},{"id":"685","nome":"Slurpuff","type":["Fairy"],"posicao":"-2723px -3250px"},{"id":"686","nome":"Inkay","type":["Dark","Psychic"],"posicao":"-2858px -3250px"},{"id":"687","nome":"Malamar","type":["Dark","Psychic"],"posicao":"-2984px -3250px"},{"id":"688","nome":"Binacle","type":["Rock","Water"],"posicao":"-3116px -3250px"},{"id":"689","nome":"Barbaracle","type":["Rock","Water"],"posicao":"-3247px -3250px"},{"id":"690","nome":"Skrelp","type":["Poison","Water"],"posicao":"-3386px -3250px"},{"id":"691","nome":"Dragalge","type":["Poison","Dragon"],"posicao":"-3506px -3250px"},{"id":"692","nome":"Clauncher","type":["Water"],"posicao":"-3636px -3250px"},{"id":"693","nome":"Clawitzer","type":["Water"],"posicao":"-3768px -3250px"},{"id":"694","nome":"Helioptile","type":["Electric","Normal"],"posicao":"-3902px -3250px"},{"id":"695","nome":"Heliolisk","type":["Electric","Normal"],"posicao":"0px -3386px"},{"id":"696","nome":"Tyrunt","type":["Rock","Dragon"],"posicao":"-129px -3386px"},{"id":"697","nome":"Tyrantrum","type":["Rock","Dragon"],"posicao":"-255px -3386px"},{"id":"698","nome":"Amaura","type":["Rock","Ice"],"posicao":"-388px -3386px"},{"id":"699","nome":"Aurorus","type":["Rock","Ice"],"posicao":"-519px -3386px"},{"id":"700","nome":"Sylveon","type":["Fairy"],"posicao":"-649px -3386px"},{"id":"701","nome":"Hawlucha","type":["Fighting","Flying"],"posicao":"-779px -3382px"},{"id":"702","nome":"Dedenne","type":["Electric","Fairy"],"posicao":"-909px -3382px"},{"id":"703","nome":"Carbink","type":["Rock","Fairy"],"posicao":"-1039px -3382px"},{"id":"704","nome":"Goomy","type":["Dragon"],"posicao":"-1164px -3373px"},{"id":"705","nome":"Sliggoo","type":["Dragon"],"posicao":"-1296px -3373px"},{"id":"706","nome":"Goodra","type":["Dragon"],"posicao":"-1423px -3373px"},{"id":"707","nome":"Klefki","type":["Steel","Fairy"],"posicao":"-1556px -3373px"},{"id":"708","nome":"Phantump","type":["Ghost","Grass"],"posicao":"-1684px -3373px"},{"id":"709","nome":"Trevenant","type":["Ghost","Grass"],"posicao":"-1817px -3373px"},{"id":"710","nome":"Pumpkaboo","type":["Ghost","Grass"],"posicao":"-1943px -3373px"},{"id":"711","nome":"Gourgeist","type":["Ghost","Grass"],"posicao":"-2071px -3373px"},{"id":"712","nome":"Bergmite","type":["Ice"],"posicao":"-2202px -3373px"},{"id":"713","nome":"Avalugg","type":["Ice"],"posicao":"-2338px -3373px"},{"id":"714","nome":"Noibat","type":["Flying","Dragon"],"posicao":"-2464px -3373px"},{"id":"715","nome":"Noivern","type":["Flying","Dragon"],"posicao":"-2593px -3375px"},{"id":"716","nome":"Xerneas","type":["Fairy"],"posicao":"-2730px -3375px"},{"id":"717","nome":"Yveltal","type":["Dark","Flying"],"posicao":"-2859px -3375px"},{"id":"718","nome":"Zygarde","type":["Dragon","Ground"],"posicao":"-2985px -3375px"},{"id":"719","nome":"Diancie","type":["Rock","Fairy"],"posicao":"-3392px -3375px"},{"id":"720","nome":"Hoopa","type":["Psychic","Ghost"],"posicao":"-3518px -3375px"},{"id":"721","nome":"Volcanion","type":["Fire","Water"],"posicao":"-3777px -3375px"}]}'),
	},
	alola: {},
	TestGrass: {
		total: 18,
		base: jQuery.parseJSON('{"nome":"0","id":"?","pokemonj":[{"id":"1","nome":"Bulbasaur","type":["Grass","Poison"],"posicao":"-2340px -130px"},{"id":"2","nome":"Ivysaur","type":["Grass","Poison"],"posicao":"-2470px -130px"},{"id":"3","nome":"Venusaur","type":["Grass","Poison"],"posicao":"-2600px -130px"},{"id":"43","nome":"Oddish","type":["Grass","Poison"],"posicao":"-3770px -260px"},{"id":"44","nome":"Gloom","type":["Grass","Poison"],"posicao":"-3900px -260px"},{"id":"45","nome":"Vileplume","type":["Grass","Poison"],"posicao":"-0px -390px"},{"id":"46","nome":"Paras","type":["Bug","Grass"],"posicao":"-130px -390px"},{"id":"47","nome":"Parasect","type":["Bug","Grass"],"posicao":"-260px -390px"},{"id":"69","nome":"Bellsprout","type":["Grass","Poison"],"posicao":"-3120px -390px"},{"id":"70","nome":"Weepinbell","type":["Grass","Poison"],"posicao":"-3250px -390px"},{"id":"71","nome":"Victreebel","type":["Grass","Poison"],"posicao":"-3380px -390px"},{"id":"102","nome":"Exeggcute","type":["Grass","Psychic"],"posicao":"-3380px -520px"},{"id":"103","nome":"Exeggutor","type":["Grass","Psychic"],"posicao":"-3510px -520px"},{"id":"114","nome":"Tangela","type":["Grass"],"posicao":"-910px -650px"},{"id":"152","nome":"Chikorita","type":["Grass"],"posicao":"-1820px -780px"},{"id":"153","nome":"Bayleef","type":["Grass"],"posicao":"-1950px -780px"},{"id":"154","nome":"Meganium","type":["Grass"],"posicao":"-2080px -780px"},{"id":"182","nome":"Bellossom","type":["Grass"],"posicao":"-1690px -910px"}]}'),
	}

};
var dataBaseAchievements = {
	achievements0: {
		id: 0,
		name: 'Iniciante I',
		description: 'Usou a Mothim dex pelo menos 1 vez.',
		classAchievements: 'init-I',
		imagePositionAchievements: '-150px 0px',
	},
	achievements1: {
		id: 1,
		name: 'Em busca do saber',
		description: 'Concluiu o Tutorial da Mothim dex.',
		classAchievements: '',
		imagePositionAchievements: '-300px 0',
	},
	achievements2: {
		id: 2,
		name: 'Especialista em Kanto',
		description: 'Obteve uma taxa de acertos de 100% no teste de  kanto.',
		classAchievements: 'kanto-king king',
		imagePositionAchievements: '-450px 0px',
	},
	achievements3: {
		id: 3,
		name: 'Especialista em johto',
		description: 'Obteve uma taxa de acertos de 100% no teste de johto.',
		classAchievements: 'johto-king king',
		imagePositionAchievements: '-600px 0px',
	},
	achievements4: {
		id: 4,
		name: 'Especialista em Hoenn',
		description: 'Obteve uma taxa de acertos de 100% no teste de Hoenn.',
		classAchievements: 'hoenn-king king',
		imagePositionAchievements: '-750px 0px',
	},
	achievements5: {
		id: 5,
		name: 'Especialista em Sinnoh',
		description: 'Obteve uma taxa de acertos de 100% no teste de Sinnoh.',
		classAchievements: 'sinnoh-king king',
		imagePositionAchievements: '-750px 0px',
	},
	achievements6: {
		id: 6,
		name: 'Especialista em Unova',
		description: 'Obteve uma taxa de acertos de 100% no teste de Unova.',
		classAchievements: 'unova-king king',
		imagePositionAchievements: '-750px 0px',
	},
	achievements7: {
		id: 7,
		name: 'Especialista em Kalos',
		description: 'Obteve uma taxa de acertos de 100% no teste de Kalos.',
		classAchievements: 'kalos-king king',
		imagePositionAchievements: '-750px 0px',
	},
	achievements8: {
		id: 8,
		name: '',
		description: ' ',
		classAchievements: '',
		imagePositionAchievements: '',
	},
	achievements9: {
		id: 9,
		name: '',
		description: ' ',
		classAchievements: '',
		imagePositionAchievements: '',
	},
	achievements10: {
		id: 10,
		name: '',
		description: ' ',
		classAchievements: '',
		imagePositionAchievements: '',
	},
	achievements11: {
		id: 11,
		name: '',
		description: ' ',
		classAchievements: '',
		imagePositionAchievements: '',
	},
	achievements12: {
		id: 12,
		name: '',
		description: ' ',
		classAchievements: '',
		imagePositionAchievements: '',
	},
	achievements13: {
		id: 13,
		name: '',
		description: ' ',
		classAchievements: '',
		imagePositionAchievements: '',
	},
	achievements14: {
		id: 14,
		name: '',
		description: ' ',
		classAchievements: '',
		imagePositionAchievements: '',
	},
	achievements15: {
		id: 15,
		name: '',
		description: ' ',
		classAchievements: '',
		imagePositionAchievements: '',
	},
	achievements16: {
		id: 16,
		name: '',
		description: ' ',
		classAchievements: '',
		imagePositionAchievements: '',
	},
	achievements17: {
		id: 17,
		name: '',
		description: ' ',
		classAchievements: '',
		imagePositionAchievements: '',
	},
	achievements18: {
		id: 18,
		name: '',
		description: ' ',
		classAchievements: '',
		imagePositionAchievements: '',
	},
	achievements19: {
		id: 19,
		name: '',
		description: ' ',
		classAchievements: '',
		imagePositionAchievements: '',
	},
	achievements20: {
		id: 20,
		name: '',
		description: ' ',
		classAchievements: '',
		imagePositionAchievements: '',
	},
	achievements21: {
		id: 21,
		name: '',
		description: ' ',
		classAchievements: '',
		imagePositionAchievements: '',
	}

};
var achievementsComponente = {
	initAchievements: function () {
		"use strict";
		for (var prop in dataBaseAchievements) {
			var $item = '<div class="' + dataBaseAchievements[prop].classAchievements + ' item-Achievements" data-Achievements="' + dataBaseAchievements[prop].id + '" data-lock="true"></div>';
			$('.contain-itens-achievements').append($item);
		}
	},
	itemArchievemente: function (id, locked) {
		"use strict";
		var $count = 0;
		var $id = id;
		for (var prop in dataBaseAchievements) {
			if ($count === parseInt($id)) {
				if (locked === 'false') {
					$('.item-views-Achievements').css('backgroundPosition', dataBaseAchievements[prop].imagePositionAchievements);
					$('.name-achievements').text(dataBaseAchievements[prop].name);
					$('.description-achievements').text(dataBaseAchievements[prop].description);
				} else {
					$('.item-views-Achievements').css('backgroundPosition', '0 0');
					$('.name-achievements').text(dataBaseAchievements[prop].name || 'Em Breve');
					$('.description-achievements').text('???');
				}
			}
			$count++;
		}
	},
	refreshArchievement: {
		typeincrement: function (type) {
			"use strict";
			var $type = localStorage.getItem(type) || 0;
			localStorage.setItem(type, parseInt($type) + 1);
			console.log(localStorage.getItem(type));
		},
		playIncrement: function () {
			"use strict";
			var $play = localStorage.getItem('play') || 0;
			localStorage.setItem('play', parseInt($play) + 1);
			console.log(localStorage.getItem('play'));
		},
		tutorialIncrement: function () {
			"use strict";
			var $tutorial = localStorage.getItem('tutorial') || 0;
			localStorage.setItem('tutorial', parseInt($tutorial) + 1);
			console.log(localStorage.getItem('tutorial'));
		},
	},
	refreshMenuArchievement: function () {
		"use strict";
		if (typeof storage._get('arrConquistas') === 'undefined' || storage._get('arrConquistas') === null) {
			storage._set('arrConquistas', '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0');
		}
		var $arrC = storage._get('arrConquistas');
		//1 conquista jogar uma vez
		if (storage._get('playedGames') > 0) {
			if ($arrC.substring(0, 1) !== '1') {
				$arrC = storage._get('arrConquistas');
				var $newArrC = $arrC.replace($arrC.substring(0, 1), "1");
				storage._set('arrConquistas', $newArrC);
				achievementsComponente.geradorN('Iniciante I');
			}
		}
		//2 conquista tutorial 1 vez
		if (storage._get('playedtutorialGames') > 0) {
			$arrC = storage._get('arrConquistas');
			if ($arrC.substring(2, 3) !== '1') {
				var $newArrC2 = $arrC.replace($arrC.substring(2, 3), "1");
				storage._set('arrConquistas', $newArrC2);
				achievementsComponente.geradorN('Em busca do Saber');
			}
		}
		//3 conquista kanto especialista
		if (cfg.acertos === cfg.totalNow && cfg.region === 'kanto' ) {
			$arrC = storage._get('arrConquistas');
			if ($arrC.substring(4, 5) !== '1') {
				var $newArrC3 = $arrC.replace($arrC.substring(4, 5), "1");
				storage._set('arrConquistas', $newArrC3);
				achievementsComponente.geradorN('Especialista Em Kanto');
			}
		}
		//4 conquista jotho especialista
		if (cfg.region === 'johto' && cfg.acertos === cfg.totalNow) {
			$arrC = storage._get('arrConquistas');
			if ($arrC.substring(6, 7) !== '1') {
				var $newArrC4 = $arrC.replace($arrC.substring(6, 7), "1");
				storage._set('arrConquistas', $newArrC4);
				achievementsComponente.geradorN('Especialista Em Johto');
			}
		}
		//5 conquista hoenn especialista
		if (cfg.region === 'hoenn' && cfg.acertos === cfg.totalNow) {
			$arrC = storage._get('arrConquistas');
			if ($arrC.substring(8, 9) !== '1') {
				var $newArrC5 = $arrC.replace($arrC.substring(8, 9), "1");
				storage._set('arrConquistas', $newArrC5);
				achievementsComponente.geradorN('Especialista Em Hoenn');
			}
		}
		//6 conquista sinnoh especialista
		if (cfg.region === 'sinnoh' && cfg.acertos === cfg.totalNow) {
			$arrC = storage._get('arrConquistas');
			if ($arrC.substring(10, 11) !== '1') {
				var $newArrC6 = $arrC.replace($arrC.substring(10, 11), "1");
				storage._set('arrConquistas', $newArrC6);
				achievementsComponente.geradorN('Especialista Em Sinnoh');
			}
		}
		//7 conquista unova especialista
		if (cfg.region === 'unova' && cfg.acertos === cfg.totalNow) {
			$arrC = storage._get('arrConquistas');
			if ($arrC.substring(12, 13) !== '1') {
				var $newArrC7 = $arrC.replace($arrC.substring(12, 13), "1");
				storage._set('arrConquistas', $newArrC7);
				achievementsComponente.geradorN('Especialista Em Unova');
			}
		}
		//8 conquista kalos especialista
		if (cfg.region === 'kalos' && cfg.acertos === cfg.totalNow) {
			$arrC = storage._get('arrConquistas');
			if ($arrC.substring(14, 15) !== '1') {
				var $newArrC8 = $arrC.replace($arrC.substring(14, 15), "1");
				storage._set('arrConquistas', $newArrC8);
				achievementsComponente.geradorN('Especialista Em Kalos');
			}
		}
	},
	geradorN: function (t) {
		"use strict";
		var $baseN = '<div class="notification clearfix fadeInLeft" data-id="' + t + '">';
		$baseN += '<div class="new-cup col-md-2">';
		$baseN += '</div>';
		$baseN += '<div class="col-md-10">';
		$baseN += '<h5 class="notification-title">Nova Conquista Desbloqueada</h5>';
		$baseN += '<h3 class="notification-name">' + t + '</h3>';
		$baseN += '</div>';
		$baseN += '</div>';
		$('#notification').append($baseN);
		setTimeout(achievementsComponente.removeN, 3000);
	},
	removeN: function () {
		"use strict";
		$('.notification:nth-child(1)').remove();
	},
};
var AudioComponente = {
	audio: document.getElementById('AudioPlayer'),
	initAudio: function () {
		"use strict";
		if (storage.noAudio !== 'true') {
			AudioComponente.audio.play();
			if (storage.audioVolume > 0) {
				AudioComponente.audio.volume = storage.audioVolume;
			}
		} else {
			AudioComponente.audio.pause();
		}
	},
	audioPause: function () {
		"use strict";
		AudioComponente.audio.pause();
		localStorage.setItem('noAudio', true);
		$('.button-config.song-switch.on').removeClass('on').addClass('off').attr('title', 'Desligado');
		$('.s-1.on').removeClass('on').addClass('off');
	},
	audioPlay: function () {
		"use strict";
		AudioComponente.audio.play();
		localStorage.setItem('noAudio', false);
		$('.button-config.song-switch.off').removeClass('off').addClass('on').attr('title', 'Ligado');
		$('.s-1.off').removeClass('off').addClass('on');
	},
	audioVolume: function (volume) {
		"use strict";
		var $volume = volume;
		AudioComponente.audio.volume = $volume;
		localStorage.setItem('audioVolume', $volume);
		console.log($volume);
	},
};
var textComponente = {
	textName: function (name, subs) {
		"use strict";
		var text = $('html');
		for (var i = 0; i < text.length; i++) {
			text[i].innerHTML = text[i].innerHTML.split(name).join(subs);
		}
	},
};
var configComponente = {
	menuConfig: function () {
		"use strict";
		//nome user
		if (storage.namePlayerNow.length >= 4) {
			textComponente.textName('{Meu nome}', storage.namePlayerNow);
			console.log('foi null?');
		}
		//som desligado
		if (storage.noAudio === 'true') {
			$('.button-config.song-switch.on').attr('title', 'Desligado').removeClass('on').addClass('off');
			$('.s-1.on').removeClass('on').addClass('off');
		}
		//archievementes
		achievementsComponente.initAchievements();

	},

};
var canvasComponente = {
	//descontinuado até segunda ordem
	grapCanvas: function (id, percetual, cor, total) {
		"use strict";
		var canvas = document.getElementById(id);
		var ctx = canvas.getContext('2d');
		//formula ctx.arc(x, y, raio, anguloInicial, anguloFinal);#00a9bb
		// circulo 1
		ctx.clearRect(0, 0, 150, 150);
		ctx.beginPath();
		ctx.moveTo(100, 100);
		ctx.arc(100, 80, 50, Math.PI * (-0.5), Math.PI * (-0.5 + 2 * percetual / total), false);
		ctx.fillStyle = cor;
		ctx.closePath();
		ctx.fill();
		// circulo 2
		ctx.beginPath();
		ctx.arc(100, 80, 38, 0, Math.PI * 2);
		ctx.fillStyle = "white";
		ctx.closePath();
		ctx.fill();
	},
	barCanvas: function (id, atual, cor, outro, text) {
		"use strict";
		var canvas = document.getElementById(id);
		var ctx = canvas.getContext('2d');
		var width = canvas.clientWidth;
		var height = canvas.clientHeight;
		var total = parseInt(atual) + parseInt(outro);
		var p = parseInt((width + total) / 100);
		$('.title-grap-img').text('Total de partidas jogadas: ' + total);
		ctx.beginPath();
		//formula context.fillRect(x, y, width, height);
		ctx.rect(0, 50, width + total, 20);
		ctx.fillStyle = "#B5B9C0";
		ctx.closePath();
		ctx.fill();

		ctx.beginPath();
		ctx.rect(0, 50, p * (atual * p), 20);
		ctx.fillStyle = cor;
		ctx.closePath();
		ctx.fill();

		ctx.beginPath();
		ctx.font = "14px 'Fredoka One'";
		ctx.fillStyle = '#141416';
		ctx.closePath();
		ctx.textAlign = "center";
		ctx.fillText(text + atual, 150, 100);

		console.log(p * (atual * p));
		console.log('atual= ' + atual + ' total= ' + total + 'p=' + p);
	},
	bgImgcanvas: function (id, imgbg) {
		"use strict";
		var canvas = document.getElementById(id);
		var ctx = canvas.getContext('2d');
		var img = new Image();
		img.onload = function () {
			ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 400, 300);
		};
		img.src = imgbg;
	},
	cardsProfile: function (id) {
		"use strict";
		var canvas = document.querySelectorAll(id);
		var cor = ["#d32026", "#0A94D7", "#ECECF4", "#414141", "#173940", "#173940", "#173940"];
		var corComp = ["#383838", "#383838", "#CD302D", "#383838", "#383838", "#383838", "#383838"];
		var text = ["Acertos", "Erros", "Partidas Jogadas", "Tutoriais", "Pulos", "Desistencias"];
		var varStor = ["hitsTotal", "errorsTotal", "playedGames", "playedtutorialGames", "jumpsTotal", "withdrawalsTotal"];
		var numRandom = Math.floor(Math.random() * 7);
		for (var i = 0; i < canvas.length; i++) {
			var ctx = canvas[i].getContext('2d');
			var height = canvas[i].clientHeight;
			var width = canvas[i].clientWidth;
			var heightCenter = height / 2;
			ctx.clearRect(0, 0, width, height);
			ctx.beginPath();
			ctx.rect(0, 0, width, height);
			ctx.fillStyle = cor[numRandom];
			ctx.closePath();
			ctx.fill();
			//parte inferior
			ctx.beginPath();
			ctx.rect(0, heightCenter, width, heightCenter);
			ctx.fillStyle = "#ECECF4";
			ctx.closePath();
			ctx.fill();
			//linha
			ctx.beginPath();
			ctx.moveTo(0, heightCenter);
			ctx.lineTo(width, heightCenter);
			ctx.strokeStyle = corComp[numRandom];
			ctx.lineWidth = 15;
			ctx.stroke();
			ctx.closePath();

			//circulos
			//formula ctx.arc(x, y, raio, anguloInicial, anguloFinal);
			ctx.beginPath();
			ctx.arc(parseInt(width / 2), height / 2, 60, 0, Math.PI * 2);
			ctx.fillStyle = corComp[numRandom];
			ctx.closePath();
			ctx.fill();
			//circulos
			ctx.beginPath();
			ctx.arc(parseInt(width / 2), height / 2, 40, 0, Math.PI * 2);
			ctx.fillStyle = "#ECECF4";
			ctx.closePath();
			ctx.fill();
			//circulos
			ctx.beginPath();
			ctx.arc(parseInt(width / 2), height / 2, 38, 0, Math.PI * 2);
			ctx.fillStyle = "#ECECF4";
			ctx.closePath();
			ctx.fill();
			//Textos
			ctx.beginPath();
			ctx.font = "18px 'Fredoka One'";
			ctx.fillStyle = '#000';
			ctx.closePath();
			ctx.textAlign = "center";
			ctx.fillText(text[i], width / 2, height / 2 + 100);
			//textos resultados
			ctx.beginPath();
			ctx.font = "18px 'Fredoka One'";
			ctx.fillStyle = '#000';
			ctx.closePath();
			ctx.textAlign = "center";
			ctx.fillText(storage._get(varStor[i]), width / 2, height / 2 + 5);
		}
	},
};
var quizCode = {
	cromometro: function tempo() {
		"use strict";
		if (cfg.segundo < 59) {
			cfg.segundo++;
			if (cfg.segundo < 10) {
				cfg.segundo = "0" + cfg.segundo;
			}
		} else {
			if (cfg.segundo === 59 && cfg.minuto < 59) {
				cfg.segundo = 0 + "0";
				cfg.minuto++;
				if (cfg.minuto < 10) {
					cfg.minuto = "0" + cfg.minuto;
				}
			}
		}
		if (cfg.minuto === 59 && cfg.segundo === 59 && cfg.hora < 23) {
			cfg.segundo = 0 + "0";
			cfg.minuto = 0 + "0";
			cfg.hora++;
			if (cfg.hora < 10) {
				cfg.hora = "0" + cfg.hora;
			}
		} else {
			if (cfg.minuto === 59 && cfg.segundo === 59 && cfg.hora === 23) {
				cfg.segundo = 0 + "0";
				cfg.minuto = 0 + "0";
				cfg.hora = 0 + "0";
			}
		}

		$(".clock-timer").text(cfg.hora + ":" + cfg.minuto + ":" + cfg.segundo);
	},
	actionRadom: function (total) {
		"use strict";
		for (var i = 0; i < total; i++) {
			var randomInt = Math.floor(Math.random() * ((total - 0) + 0));
			if (cfg.tempObj['key_' + randomInt] === undefined) {
				cfg.tempObj['key_' + randomInt] = randomInt;
				cfg.arr.push(randomInt);
			} else {
				i--;
			}

		}
	},
	shooterData: function () {
		"use strict";
		cfg.shooter = dataBase[cfg.region];
	},
	nextPokemon: function (id) {
		"use strict";
		quizCode.exception(id);
		var $shooter = cfg.shooter;
		cfg.totalNow = $shooter.total - 1;
		console.log('Total' + cfg.totalNow + ' id=' + cfg.idNow);
		if (cfg.idNow <= cfg.totalNow || cfg.jumps <= cfg.jumpOriginal && cfg.jumpKey === true) {
			//Limpar
			$('.letter-contain,.contain-types').html('');

			//Variaveis dos pokes
			cfg.nameNow = $shooter.base.pokemonj[id].nome;
			cfg.positionId = $shooter.base.pokemonj[id].posicao;
			var $typeP = $shooter.base.pokemonj[id].type;
			//alterações
			$('.icon-pokemon').css('backgroundPosition', cfg.positionId);
			for (var i = 0; i < cfg.nameNow.length; i++) {
				$('.letter-contain').append('<div class="letter-x pulse">?</div>');
			} //criando espaços
			for (var s = 0; s < $typeP.length; s++) {
				var type = $shooter.base.pokemonj[id].type[s];
				$(".contain-types").append('<div class="' + type + ' type">' + type + '</div>');
			} //blocos types		
		} else {
			quizCode.quitPokemon();
		}

		achievementsComponente.refreshMenuArchievement();
	},
	confirmationResp: function () {
		"use strict";
		var $statusResp;
		if (cfg.idNow <= cfg.totalNow || cfg.jumpKey === true) {
			var $inputC = $('#letter-input').val().replace(/[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9-]+/g, "");
			//verificando se resp e valida
			if ($inputC !== '') {
				rotomSpeech.easterEgg($inputC);
				//verf se e correta ou errada
				if ($inputC.toUpperCase() === cfg.nameNow.toUpperCase()) {
					cfg.acertos++;
					$statusResp = 'Correto';
					rotomSpeech.respCorrect();
					var typesCount = $('.contain-types .type');
					for (var i = 0; i < typesCount.length; i++) {
						var counttypes = $('.contain-types .type').eq(i).text();
						achievementsComponente.refreshArchievement.typeincrement(counttypes);
					}
				} else {
					cfg.erros++;
					$statusResp = 'Errado';
					if (cfg.doNotKnow === false) {
						rotomSpeech.respIncorrect();
					}
					cfg.doNotKnow = false;
				}
				//amarz resp
				$('#myAnswer').append('<div class="contain-resp">' +
					'<div class="thumb-resp" style="background-position:' + cfg.positionId + ';"></div>' +
					'<div class="my-resp">' + $inputC + '</div>' +
					'<div class="correct-resp">' + cfg.nameNow + '</div>' +
					'<div class="time-resp">' + cfg.hora + ":" + cfg.minuto + ":" + cfg.segundo + '</div>' +
					'<div class="status-resp">' + $statusResp + '</div>' +
					'</div>');

				//Limpando input
				$('#letter-input').val('');

				//chamando pokémon
				if (cfg.idNow >= cfg.totalNow && cfg.jumpOriginal > 0 && cfg.jumps <= cfg.jumpOriginal - 1) {
					quizCode.jumpRun();
				} else {
					cfg.jumpKey = false;
					cfg.idNow++;
					quizCode.nextPokemon(cfg.arr[cfg.idNow]);
				}

			} else {
				rotomSpeech.nullWrite();
			}
		}
	},
	jumpPokemon: function () {
		"use strict";
		if (cfg.jumpOriginal <= 2 && cfg.jumpLocked === false) {
			cfg.jump.push(cfg.idNow);
			$('.jump-count').text(3 - cfg.jump.length);
			cfg.idNow++;
			cfg.jumpOriginal++;
			if (cfg.idNow === cfg.totalNow + 1) {
				quizCode.jumpRun();
				cfg.jumpLocked = true;
				rotomSpeech.allScpeech('Vamos aos pulados');
			} else {
				quizCode.nextPokemon(cfg.arr[cfg.idNow]);
			}
			rotomSpeech.allScpeech('Pulo realizado. O Pokémon retornará mais tarde.');
			//amazenando pulo
			if (storage._get('jumpsTotal') !== 0) {
				var totalEi = 1 + parseInt(storage._get('jumpsTotal'));
				storage._set('jumpsTotal', totalEi);
				console.log('stock -' + storage._get('jumpsTotal'));
			} else {
				storage._set('jumpsTotal', 1);
			}
			//liberando
			cfg.jumpKey = true;
		} else {
			rotomSpeech.allScpeech('Não existem mais pulos disponíveis!');
		}
	},
	jumpRun: function () {
		"use strict";
		cfg.jumpKey = true;
		quizCode.nextPokemon(cfg.arr[cfg.jump[cfg.jumps]]);
		cfg.jumps++;
	},
	scoreIconPokemon: function () {
		"use strict";
		var $arrImg = ['http://i.imgur.com/VFgxxCO.png', 'http://i.imgur.com/02N0erA.png', 'http://i.imgur.com/m0IFBTK.png', 'http://i.imgur.com/52BhC9T.png', 'http://i.imgur.com/EUJ4Zn5.png'];

		if (cfg.scoreFinal >= 9000) {
			$('.logo-dex-score').attr('src', $arrImg[0]);
			$('.star').text('✩✩✩✩✩');
			quizCode.scoreContrutor(5);

		} else if (cfg.scoreFinal >= 8500) {
			$('.logo-dex-score').attr('src', $arrImg[1]);
			$('.star').text('✩✩✩✩');
			quizCode.scoreContrutor(4);

		} else if (cfg.scoreFinal >= 7500) {
			$('.logo-dex-score').attr('src', $arrImg[2]);
			$('.star').text('✩✩✩');
			quizCode.scoreContrutor(3);

		} else if (cfg.scoreFinal >= 6500) {
			$('.logo-dex-score').attr('src', $arrImg[3]);
			$('.star').text('✩✩');
			quizCode.scoreContrutor(2);

		} else if (cfg.scoreFinal >= 5500) {
			$('.logo-dex-score').attr('src', $arrImg[4]);
			$('.star').text('✩');
			quizCode.scoreContrutor(1);

		} else if (cfg.scoreFinal <= 5500) {
			$('.logo-dex-score').attr('src', $arrImg[4]);
			$('.star').text('0');
			quizCode.scoreContrutor(0);

		}

	},
	quitPokemon: function () {
		"use strict";
		clearInterval(cfg.timer);
		scoreCode.myScore();
		quizCode.scoreIconPokemon();
		$('.s-acerto').text(cfg.acertos);
		$('.s-erro').text(cfg.erros);
		console.log(cfg.erros);
		$('.s-timer').text(cfg.hora + ":" + cfg.minuto + ":" + cfg.segundo);
		$('#loadingDex').slideToggle('slow');
		$('#rotom-dex').css('display', 'none');
		$('#my-score').css('display', 'block');
		$('#loadingDex').slideToggle('slow');
		//definindo acertos
		if (storage._get('hitsTotal') !== 0) {
			var total = parseInt(cfg.acertos) + parseInt(storage._get('hitsTotal'));
			storage._set('hitsTotal', total);
		} else {
			storage._set('hitsTotal', cfg.acertos);
		}
		//definindo erros
		if (storage._get('errosTotal') !== 0) {
			var totalE = cfg.erros + parseInt(storage._get('errorsTotal'));
			storage._set('errorsTotal', totalE);
			console.log(totalE + ' -' + cfg.erros);
		} else {
			storage._set('errorsTotal', cfg.erros);
			console.log(cfg.erros);
		}
		//definindo lilie
		if (cfg.region === 'tutorial') {
			$('.screen-tutorial-contain.score').slideToggle('slow');
			screenStart.lillieSpeech();
		}


	},
	exception: function (id) {
		"use strict";
		$('.contain-types,.icon-pokemon').removeAttr('style');

		//Tamanho da tela 267px - 2 espaços
		if (cfg.region === 'kalos') {
			if (id === 18 || id === 28 || id === 70) {
				$(".icon-pokemon").css("width", "270px");
			}
		}

		//Tamanho da tela 389px - 3 espaços
		if (cfg.region === 'tutorial') {
			if (id === 0 || id === 1) {
				$(".icon-pokemon").css("width", "405px");
			}
			if (id === 1) {
				$('.contain-types').css({
					maxWidth: '336px',
					marginBottom: 0
				});
			}
		}


	},
	scoreContrutor: function (id) {
		"use strict";
		var $arrText = ['Você definitivamente não conhece muito sobre os Pokémon...', 'Você conhece poucos Pokémon mas ainda existem muito mais!', 'Você foi muito bem, continue melhorando!', 'Você foi ótimo, conhece bastante sobre os Pokémon!', 'Você está quase lá, conhece muito sobre os Pokémon!', 'É incrível, você conhece todos os Pokémon! Parabéns!'];
		var $arrBg = ['http://cdn.bulbagarden.net/upload/8/8b/Hoopa_Surprise_Ring_Adventures_short_2.png', 'http://cdn.bulbagarden.net/upload/8/8b/Hoopa_Surprise_Ring_Adventures_short_2.png', 'http://img11.deviantart.net/3391/i/2014/354/c/b/wally_and_ralts_by_af_wishful_thinking-d8aj3oe.png', 'http://pm1.narvii.com/6207/5ee4e64a502559608eaeb75b7b8261b6c185d4e2_hq.jpg', 'http://cdn.bulbagarden.net/upload/8/8b/Hoopa_Surprise_Ring_Adventures_short_2.png', 'http://cdn.bulbagarden.net/upload/8/8b/Hoopa_Surprise_Ring_Adventures_short_2.png'];
		$('#my-score').css({
			background: 'url(' + $arrBg[id] + ') no-repeat',
			backgroundSize: 'cover',
		});
		$('.description-test').text($arrText[id]);
		console.log($arrBg[id]);
	},
};
var scoreCode = {
	myScore: function () {
		"use strict";
		var $newTotal = cfg.totalNow + 1;
		var $maxByItem = Math.floor(10000 / $newTotal);
		var $mySeg = cfg.segundo;
		var $myMin = cfg.minuto * 60;
		var $myHor = cfg.hora * 60 * 60;
		var $myTimer = Math.floor($myHor + $myMin + $mySeg / 3);
		var $myAcertos = cfg.acertos * $maxByItem;
		var $myErros = cfg.erros * $maxByItem;
		var $myFinalScore = Math.floor($myAcertos - $myTimer - $myErros);
		cfg.scoreFinal = $myFinalScore;
		if ($myFinalScore < 0) {
			$myFinalScore = 0;
		}
		$('.s-score').text($myFinalScore);
	},
	uploadShared: function () {
		"use strict";
		var $nome = localStorage.getItem('namePlayerNow');
		console.log('http://power-templates-visualizar.16mb.com/geradorimg/imgup.php?a=' + $nome + '&b=' + cfg.scoreFinal + '&c=' + cfg.acertos);
		$.ajax({
			url: "http://power-templates-visualizar.16mb.com/geradorimg/imgup.php",
			type: "post",
			data: 'a=' + $nome + '&b=' + cfg.scoreFinal + '&c=' + cfg.acertos + '&d=' + cfg.region,
			success: function (response) {
				// you will get response from your php page (what you echo or print)  
				$('.score-wait-text').text('Gerando seu link... ' + response);
				cfg.idshared = response;
				scoreCode.linkShared();
			},
			error: function (jqXHR, textStatus, errorThrown) {
				$('.score-wait-text').text(textStatus, errorThrown + ' tentando novamente...');
				scoreCode.uploadShared();
			}
		});
	},
	linkShared: function () {
		"use strict";
		$('.score-wait-text').text('Aguarde... gerando link...');
		var $url = 'https://www.facebook.com/dialog/feed?' +
			'app_id=1455694754643215' +
			'&display=popup' +
			'&picture=http://power-templates-visualizar.16mb.com/geradorimg/indexv2.php?id=' + cfg.idshared +
			'&caption=Pokémothim Apps' +
			'&name=' + encodeURIComponent('Resultado do teste ' + cfg.region + ' -' + cfg.acertos + ' Acertos | ' + cfg.erros + ' Erros - Tempo: ' + cfg.hora + ':' + cfg.minuto + ':' + cfg.segundo) +
			'&description=' + encodeURIComponent('Muito bem') +
			'&link=' + encodeURIComponent('http://www.pokemothim.net/2016/04/quem-e-esse-pokemon-v040.html') +
			'&href=' + encodeURIComponent('http://www.pokemothim.net');
		$(".button--share").attr("href", $url).css('display', 'block');
		$('.score-wait-text').text('Pronto');
	},


};
var rotomSpeech = {
	Whats: function () {
		'use strict';
		if (!cfg.whatsThePokemon) {
			setTimeout(function () {
				$('.h-title').text('Quem é esse Pokémon?');
				cfg.whatsThePokemon = false;
			}, 3500);
		}
		cfg.whatsThePokemon = true;
	},
	nullWrite: function () {
		"use strict";
		$('.h-title').text('Insira uma resposta para prosseguir.');
		rotomSpeech.Whats();
	},
	doNotKnow: function () {
		"use strict";
		$('.h-title').text('Quase! O nome correto era' + cfg.nameNow + '!');
		rotomSpeech.Whats();
	},
	respCorrect: function () {
		"use strict";
		$('.h-title').text('Reposta correta! ' + cfg.nameNow + ' registrado com sucesso');
		rotomSpeech.Whats();
	},
	respIncorrect: function () {
		"use strict";
		$('.h-title').text('Resposta incorreta, era ' + cfg.nameNow);
		rotomSpeech.Whats();
	},
	eggeastHit: function () {
		"use strict";
		$('.h-title').text('Esse nome é familiar, acho que e de um membro da pokémothim, mas você errou é o ' + cfg.nameNow);
		rotomSpeech.Whats();
	},
	allScpeech: function (speechR) {
		"use strict";
		$('.h-title').text(speechR);
		rotomSpeech.Whats();
	},
	easterEgg: function (resp) {
		"use strict";
		//não sei or eggeast
		if ((resp).toUpperCase() === ('nãosei').toUpperCase() || (resp).toUpperCase() === ('naosei').toUpperCase() || (resp).toUpperCase() === ('seinao').toUpperCase()) {
			rotomSpeech.doNotKnow();
			cfg.doNotKnow = true;
		}
		//Hit
		if ((resp).toUpperCase() === ('hitalloflame').toUpperCase()) {
			rotomSpeech.eggeastHit();
			cfg.doNotKnow = true;
		}
		//Meowth
		if ((resp).toUpperCase() === ('miau').toUpperCase() || (resp).toUpperCase() === ('gato').toUpperCase() && cfg.region === 'kanto' && cfg.nameNow === 'Meowth') {
			console.log('foi gato miau');
			rotomSpeech.allScpeech('Sim ele é um gato ele faz miau');
			cfg.doNotKnow = true;
		}
		console.log(resp);
	}
};
var action = {
	namePlayerNowClick: $(document).on('keydown', '#PlayerName', function (e) {
		'use strict';
		if (e.which === 13) {
			screenStart.namePlayerNow();
		}
	}),
	kukuiSpeechClick: $(document).on('click', '.box-text-dialog', function () {
		'use strict';
		screenStart.kukuiSpeech();
	}),
	clickMenuClick: $(document).on('click', '.item-menu-dex,.enter-quiz,.return-x', function () {
		'use strict';
		var $sectionShow = $(this).attr('data-bgMenu');
		screenMenu.clickMenu($sectionShow);
		cfg.region = $(this).attr('data-quiz');
		$('.screen-tutorial-contain').css('display', 'none');
	}),
	returnMenuClick: $(document).on('click', '.contain-menu-return,.x-select', function () {
		'use strict';
		$('.menu-return-itens').slideToggle();
		$('.contain-menu-return').toggleClass('active');
	}),
	letterBind: $(document).on('keyup', '#letter-input', function () {
		'use strict';
		var $letterSpacing = $('.letter-x').length;
		var $letterWrite = $('#letter-input').val().replace(/[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9-]+/g, "");
		for (var i = 0; i < $letterWrite.length; i++) {
			$('.letter-x').eq([i]).text($letterWrite[i]);
		}
		for (var i = $letterWrite.length; i < $letterSpacing; i++) {
			$('.letter-x').eq([i]).text('?');
		}

	}),
	startQuizClick: $(document).on('click', '#start-my-quiz', function () {
		'use strict';
		$('.screen-start-dex').css('display', 'none');
		achievementsComponente.refreshArchievement.playIncrement();
		if (cfg.region !== 'tutorial') {
			cfg.timer = setInterval(quizCode.cromometro, 983);
			//adicionando partidas jogadas
			if (localStorage.getItem('playedGames') !== null) {
				var $playedGames = localStorage.getItem('playedGames');
				localStorage.setItem('playedGames', parseInt($playedGames) + parseInt(1));
				console.log('foi 1');
			} else {
				localStorage.setItem('playedGames', '1');
			}
		} else {
			achievementsComponente.refreshArchievement.tutorialIncrement();
			cfg.tutorialActive = true;
			$('.clock-timer').addClass('expositor');
			$('.indicador').css({
				left: '48%',
				top: '2%'
			});
			$('.box-text-dialog-tutorial').text('Esse é o cronômetro do teste. Aqui ele só será iniciado quando o tutorial acabar, porém dentro do aplicativo ele será iniciado assim que você clicar no botão "Começar", como visto na tela anterior.');
			//adicionando tutorial jogados
			if (localStorage.getItem('playedtutorialGames') !== null) {
				var $playedtutorialGames = localStorage.getItem('playedtutorialGames');
				localStorage.setItem('playedtutorialGames', parseInt($playedtutorialGames) + parseInt(1));
			} else {
				localStorage.setItem('playedtutorialGames', '1');
			}
		}
		quizCode.shooterData();
		var $shooter = cfg.shooter;
		quizCode.actionRadom($shooter.total);
		quizCode.nextPokemon(cfg.arr[0]);
		achievementsComponente.refreshMenuArchievement();
		console.log(cfg.arr);
	}),
	confirmationRespClick: $(document).on('click ', '#confirm-input', function () {
		'use strict';
		console.log('foi click'); //apagar
		quizCode.confirmationResp();
	}),
	confirmationRespEnter: $(document).on('keydown', '#letter-input', function (e) {
		'use strict';
		if (e.type === "keydown" && e.which === 13) {
			console.log('foi enter'); //apagar
			quizCode.confirmationResp();
		}
	}),
	jumpClick: $(document).on('click', '#jump', function () {
		'use strict';
		quizCode.jumpPokemon();
	}),
	abdicateClick: $(document).on('click', '#abdicate', function () {
		'use strict';
		//amazenando pulo
		if (storage._get('withdrawalsTotal') !== 0) {
			var totalEc = parseInt(storage._get('withdrawalsTotal')) + 1;
			storage._set('withdrawalsTotal', totalEc);
			console.log('stock -' + storage._get('withdrawalsTotal'));
		} else {
			storage._set('withdrawalsTotal', 1);
		}
		quizCode.quitPokemon();

	}),
	myRespClick: $(document).on('click', '.score-resp', function () {
		'use strict';
		$('#myAnswer').slideToggle();
	}),
	startShareClick: $(document).on('click', '.share-score', function () {
		'use strict';
		$('.score-wait').slideToggle();
		$('.score-wait-text').text('Obtendo sua pontuação...');
		scoreCode.uploadShared();
	}),
	homeReturnClick: $(document).on('click', '.home-return', function () {
		'use strict';
		$('.screen-start-dex').show();
		$('.button--share,.score-wait').hide();
		$('.icon-pokemon').css('backgroundPosition', '0 0');
		$('.jump-count').text('3');
		var $sectionShow = 'menu-dex';
		screenMenu.clickMenu($sectionShow);
		//Cronometro
		cfg.timer = 0;
		cfg.segundo = 0 + '0';
		cfg.minuto = 0 + '0';
		cfg.hora = 0 + '0';
		//base
		cfg.shooter = ' ';
		//array
		cfg.tempObj = {};
		cfg.arr = [];
		//dados teste
		cfg.region = 0;
		cfg.nameNow = 0;
		cfg.idNow = 0;
		cfg.positionId = 0;
		cfg.totalNow = 0;
		cfg.jump = [];
		cfg.jumps = 0;
		cfg.jumpOriginal = 0;
		cfg.jumpKey = false;
		cfg.jumpLocked = false;
		//pontuação
		cfg.erros = 0;
		cfg.acertos = 0;
		cfg.scoreFinal = 0;
		cfg.idshared = 0;

	}),
	songOffClick: $(document).on('click', '.songAudio.button-config.song-switch.on', function () {
		'use strict';
		AudioComponente.audioPause();
	}),
	songOnClick: $(document).on('click', '.songAudio.button-config.song-switch.off', function () {
		'use strict';
		AudioComponente.audioPlay();
	}),
	songVolumeClick: $(document).on('click', '.song-volume', function () {
		'use strict';
		var $volume = $(this).attr('data-volume');
		AudioComponente.audioVolume($volume);
	}),
	itemArchievementeHover: $(document).on('mouseenter', '.item-Achievements', function () {
		'use strict';
		var $id = $(this).attr('data-achievements');
		var $lock = $(this).attr('data-lock');
		achievementsComponente.itemArchievemente($id, $lock);
	}),
	lillieSpeechClick: $(document).on('click', '.box-text-dialog-tutorial', function () {
		'use strict';
		if (cfg.tutorialActive) {
			screenStart.lillieSpeech();
		}
	}),
	clickTutorial: $(document).on('click', '.item-menu-dex[data-quiz=tutorial]', function () {
		"use strict";
		$('.clock-timer').text('00:00:00');
		$('.indicador').css({
			left: '48%',
			top: '44%'
		});
		$('#start-my-quiz').addClass('expositor');
		$('.box-text-dialog-tutorial').text('Bem-vindos ao tutorial a MothimDex, o teste para descobrir o quanto você sabe sobre Pokémon! Agora, vamos ensinar você como usar nosso aplicativo. Para iniciar, clique no botão "Começar". Mas atenção, ao clicar nesse botão, seu teste começará imediatamente, então certifique-se de que você realmente está pronto.');
		$('.screen-tutorial-contain').css('display', 'block');
		cfg.tutorialActive = false;
	}),
	clickPerfil: $(document).on('click', '[data-bgMenu="profile"]', function () {
		"use strict";
		screenMenu.refreshPerfil();

	}),
	clickConquistas: $(document).on('click', '[data-bgMenu="achievements"]', function () {
		"use strict";
		screenMenu.refreshConquistas();
	}),
	clickModal: $(document).on('click', '[data-toggle="modal"]', function () {
		"use strict";
		$('.modal').show();
	}),
	clickModalQuit: $(document).on('click', '.modal-screen,[data-dismiss="modal"]', function () {
		"use strict";
		$('.modal').hide();
	}),
	clickProfileAvatar: $(document).on('click', '[data-bgmenu="profile"]', function () {
		"use strict";
		$('.img-avatar ').attr('class', 'img-avatar ' + storage._get('avatar'));
	}),
	clickModalSave: $(document).on('click', '#ModalSave', function () {
		"use strict";
		var newName = $('#repairNameModal').val().replace(/[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9-]+/g, "");

		if (newName.length >= 4) {
			$('[data-bgMenu="profile"],.my-name').text(newName);
			storage._set('namePlayerNow', newName);
			$('#repairNameModal').val('');
			$('.modal').hide();
		} else {
			$('.modal-danger').slideToggle('slow').text('Nome muito curto ou contém caracteres inválidos');
			setTimeout(function () {
				$('.modal-danger').slideToggle('slow');
			}, 5000);
		}
	}),
	clickAboutButton: $(document).on('click', '.about-default', function () {
		'use strict';
		$('.collapse-About').hide();
		var idTarget = $(this).data('target');
		$(idTarget).show();
	}),
	refreshFacebook: $(document).on('click', '.about-default[data-target="#cod2"]', function () {
		'use strict';
		  //FB.XFBML.parse();
	})
};

(function inicializeDex() {
	"use strict";
var widthDisp = window.innerWidth;
var heightDisp = window.innerHeight;
  if(widthDisp >= 250){
	//inicialize
	screenStart.animationClass();
	screenStart.loadedImagem();
	if (!storage.namePlayerNow) {
		screenStart.kukuiSpeech();
		screenStart.avatar();
	} else {
		$('#kukui-welcome').css('display', 'none');
		$('#menu-dex').css('display', 'block');
		configComponente.menuConfig();

	}
	screenMenu.geratorChoice();
	var cxp1 = $('.mothimdexwrap');
	$('body').html(cxp1);
  }else{
	$('.post-body').html('<div>'+
                       '<div class="col-md-12 logo-dex"></div>'+
                       '<h4 style="text-align:center;">Minhas Configurações</h4>'+
                       '<p style="padding:3px 15px; margin:0;"><b>Plataforma: </b>'+navigator.platform +'</p>'+
                       ' <p style="padding:3px 15px; margin:0;"><b>Resolução: </b>'+window.innerWidth+' x '+window.innerHeight+
                       '<p><p style="padding:3px 15px; margin:0;"><b>Infos: </b>' + navigator.userAgent +'</p>'+
                       '<div class="alert alert-warning" style="text-align:center; margin:3px 15px;" role="alert">Estamos trabalhando para disponibilizar a MothimDex para seu dispositivo.</div>'
                       +' </br></div>');
  }
}());
