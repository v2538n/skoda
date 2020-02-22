															var menu_selector = "#scrollfix .nav"

															function onScroll() {
																var scroll_top = $(document).scrollTop();
																$(menu_selector + " a").each(function() {
																	var hash = $(this).attr("href");
																	var target = $(hash);
																	if (target.position().top - 70 <= scroll_top && target.position().top - 70 + target.outerHeight() > scroll_top) {
																		$(menu_selector + " a.active").removeClass("active");
																		$(this).addClass("active");
																	} else {
																		$(this).removeClass("active");
																	}
																});
															}


															function closeMenu() {
																$('div.burger').removeClass('open');
																$('.nav').removeClass('open');
																$('div.x').removeClass('rotate45').addClass('rotate30');
																$('div.z').removeClass('rotate135').addClass('rotate150');

																setTimeout(function() {
																	$('div.x').removeClass('rotate30');
																	$('div.z').removeClass('rotate150');
																}, 50);
																setTimeout(function() {
																	$('div.y').show();
																	$('div.x, div.y, div.z').removeClass('collapse');
																}, 70);
															}

															function screenSize() {
																var w = window,
																	d = document,
																	e = d.documentElement,
																	g = d.getElementsByTagName('body')[0],
																	x = w.innerWidth || e.clientWidth || g.clientWidth,
																	y = w.innerHeight || e.clientHeight || g.clientHeight;
																return {
																	x: x,
																	y: y
																}
															}

															// Функция преобразования номера в формат +7 (000) 000-00-00
															function phoneLocal(phone) {
																return phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
															}

															// Компонент шаблона вставки телефоннного номера везде (кастомный тег <my-phone>)
															Vue.component('my-phone', {
																template: '<span class="phone call_phone_1"><a href="tel:' + sets.phone + '" title="Позвонить по ' + phoneLocal(sets.phone) + '">' + phoneLocal(sets.phone) + '</a></span>'
															})

															Vue.directive('input-mask', {
																bind: function(el, obj, vModel) {
																	$(el).inputmask();
																}
															})

															// Шаблон Яндекс-метрики (конец скрипта)
															new Vue({
																el: '#ya-metrika',
																data: {
																	ya_metrika: sets.ya_metrika
																},
																template: '<noscript v-if="ya_metrika != 0"><div><img src="https://mc.yandex.ru/watch/' + sets.ya_metrika + '" style="position:absolute; left:-9999px;" alt="" /></div></noscript>'
															})

															new Vue({
																el: '#app',
																data: {
																	data: sets,
																	phoneSended: 'not',
																	inputtedPhone: '',
																	inputtedName: '',
																	inputtedEmail: '',
																	placeholderPhone: '',
																	placeholderName: '',
																	placeholderEmail: '',
																	popupIsOpen: false,
																	workingHours: false,
																	popupAgreement: false,
																	popupRegistr: false,
																	popupCall: false,
																	pageType: 'desktop',
																	carType: 'all',
																	carPicked: 0,
																	carPickedName: 'picanto',
																},
																methods: {
																	//Вкладки авто
																	changeModel: function(model, key) {
																		if (model !== this.carPickedName) {
																			this.carPickedName = model;
																			this.carPicked = key;
																			$('.tabs .car_tab').removeClass('active')
																			$('.tabs .car_tab:eq(' + key + ')').addClass('active')
																			for (var i = this.data.cars[key].models.length - 1; i >= 0; i--) {
																				this.data.cars[key].models[i]
																				$('.card:eq(' + i + ') p.colorName span.no-wrap').text(this.colorName(this.data.cars[key].models[i].colors[0]))
																			}

																		}
																	},
																	//Название Цвета
																	colorName: function(colorId) {
																		for (var i = 0; i < this.data.colors.length; i++) {
																			if (this.data.colors[i].id === colorId) return this.data.colors[i].name;
																		}
																	},
																	colorCode: function(colorId) {
																		for (var i = 0; i < this.data.colors.length; i++) {
																			if (this.data.colors[i].id === colorId) return this.data.colors[i].code;
																		}
																	},
																	//Цвета авто
																	changeColor: function(carName, modelKey, colorName, color, index, carKey) {
																		$('.card:eq(' + modelKey + ') img.imageCar').attr('src', 'img/cars/colors/' + this.data.cars[carKey].id + '/' + this.data.cars[carKey].models[modelKey].colors[index] + this.data.cars[carKey].models[modelKey].gt + '.jpg');
																		$('.card:eq(' + modelKey + ') p.colorName span.no-wrap').text(colorName)
																		console.log(carName, modelKey, colorName, color, index, carKey)
																	},
																	//Переключение слайда по ссылке
																	slideTo: function(slided) {
																		$('#slider').flickity('selectCell', '#' + slided, false, true);
																		// Снимем focus с кликнутого элемента
																		document.activeElement.blur();
																		closeMenu();
																	},
																	//Скрипт плавного перехода к нужному блоку
																	scrollTo: function(link) {
																		//Скрипт плавного перехода к нужному блоку
																		//узнаем высоту от начала страницы до блока на который ссылается якорь
																		var top = this.getCoords(document.getElementById(link)).top;
																		var head = $('#header').height();
																		//анимируем переход на расстояние - top за 1500 мс
																		$('body,html').animate({
																			scrollTop: top - 70
																		}, 300);
																		// Снимем focus с кликнутого элемента
																		document.activeElement.blur();
																		this.closeMenu();

																	},
																	// Устаревший метод получения координат элемента в документе, не конфликтует с трубкой CallKeeper на моб. устр-вах
																	getCoords: function(elem) {
																		var top = 0,
																			left = 0;

																		while (elem) {
																			top = top + parseInt(elem.offsetTop);
																			left = left + parseInt(elem.offsetLeft);
																			elem = elem.offsetParent;
																		}

																		return {
																			top: top,
																			left: left
																		};
																	},
																	minimum: function(array, parameter) {
																		var min = 99999999;
																		$.each(array, function(key, data) {
																			$.each(data, function(index, value) {
																				if (index == parameter && value < min) {
																					min = value;
																				}
																			});
																		});
																		return min;
																	},
																	// Находим максимальное из чисел
																	maximum: function(array, parameter) {
																		var max = Number(array[0][parameter]);
																		$.each(array, function(key, data) {
																			$.each(data, function(index, value) {
																				if (index == parameter && Number(value) > max) {
																					max = Number(value);
																				}
																			});
																		});
																		return max;
																	},
																	// Добавляем пробелы в разряды чисел
																	localeNumber: function(number) {
																		output = Number(number);
																		return output.toLocaleString();
																	},
																	openPopup: function(type) {
																		this.ios();
																		if (type === 'agreement') {
																			this.popupAgreement = true;
																		}
																		if (type === 'registr') {
																			this.popupRegistr = true;
																		}
																		if (type === 'Call') {
																			this.popupCall = true;
																		}
																		this.popupIsOpen = true;

																		$('#popup').css('overflow', 'hidden')
																		if (type !== 'agreement') {

																			setTimeout(function() {
																				$('input[type="tel"]').focus()
																			}, 500)

																			document.body.style.overflow = 'hidden';
																			document.ontouchmove = function(e) {
																				e.preventDefault();
																			};


																			//Цель отправки заявки
																			if (sets.ya_metrika !== 0 && this.phoneSended === 'not') {
																				// Fix для режима инкогнито Mozilla
																				if (window['yaCounter' + this.data.ya_metrika] !== undefined) {
																					window['yaCounter' + sets.ya_metrika].reachGoal('lead');
																				}
																			}
																		}
																		var popupBody = document.getElementById('popup');
																		var self = this;
																		popupBody.addEventListener('mouseup', function(e) {
																			if (e.target === popupBody) {
																				self.closePopup();
																			}
																		});
																	},
																	closePopup: function() {
																		this.popupIsOpen = false;
																		this.popupAgreement = false;
																		this.popupCall = false;
																		this.popupRegistr = false;
																		var popupBody = document.getElementById('popup');
																		document.body.style.overflow = 'inherit';
																		document.ontouchmove = function(e) {
																			return true;
																		};
																		var el = document.getElementsByTagName('html')[0];
																		el.classList.remove('ios');
																		el = document.getElementsByTagName('body')[0];
																		el.classList.remove('ios');
																		this.phoneSended = 'not';
																	},
																	ios: function() {
																		// Проверка на iOS
																		var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
																		if (iOS == true) {
																			var el = document.getElementsByTagName('html')[0];
																			el.className += " ios";
																			el = document.getElementsByTagName('body')[0];
																			el.className += " ios";
																		}
																	},
																	toggleMenu: function() {
																		if ($('div.burger').hasClass('open')) {
																			this.closeMenu();
																		} else {
																			this.openMenu();
																		}
																	},
																	openMenu: function() {
																		$('div.burger').addClass('open');
																		$('.nav').addClass('open');
																		$('div.x, div.y, div.z').addClass('collapse');

																		setTimeout(function() {
																			$('div.y').hide();
																			$('div.x').addClass('rotate30');
																			$('div.z').addClass('rotate150');
																		}, 70);
																		setTimeout(function() {
																			$('div.x').addClass('rotate45');
																			$('div.z').addClass('rotate135');
																		}, 120);
																	},
																	closeMenu: function() {
																		$('div.burger').removeClass('open');
																		$('.nav').removeClass('open');
																		$('div.x').removeClass('rotate45').addClass('rotate30');
																		$('div.z').removeClass('rotate135').addClass('rotate150');

																		setTimeout(function() {
																			$('div.x').removeClass('rotate30');
																			$('div.z').removeClass('rotate150');
																		}, 50);
																		setTimeout(function() {
																			$('div.y').show();
																			$('div.x, div.y, div.z').removeClass('collapse');
																		}, 70);
																	},
																	//Метод отправки формы
																	sendForm: function() {
																		$('.circle-loader').removeClass('checking');

																		//console.log(this.inputtedPhone);


																		var phoneCheck = this.checkForm(this.inputtedPhone);
																		//console.log(phoneCheck);

																		if (phoneCheck['check'] != false) {
																			this.placeholderPhone = '+7 (___) ___-__-__';
																			this.phoneSended = 'sending';
																			//Цель отправки заявки
																			if (this.data.ya_metrika != 0) {
																				// Fix для режима инкогнито Mozilla
																				if (window['yaCounter' + this.data.ya_metrika] !== undefined) {
																					window['yaCounter' + this.data.ya_metrika].reachGoal('final_lead');
																				}
																			}

																			//Цель Google Analytics
																			// ga('send', 'event', 'form', 'send');

																			var phone = phoneCheck['number'];
																			//console.log('phone to cbh: ' + phone);

																			// Автозвонок CallBackHunter
																			// try {
																			// 	CBHCore.api.sendCall({
																			// 		phone: phone,
																			// 		call_asap: 1
																			// 	});
																			// } catch (e) {
																			// 	CBHCore.helpers.logError('CATCH JS ERROR: ' + e.name + '; ' + e.message);
																			// }
																			var carSelect = $('#select-car').val();

																			var fd = new FormData();
																			if (carSelect != '') {
																				fd.append('carSelect', carSelect);
																			}
																			fd.append('phone', phoneCheck['number']);
																			fd.append('name', this.inputtedName);
																			if (this.inputtedEmail != undefined && this.inputtedEmail != '') {
																				fd.append('email', this.inputtedEmail);
																				console.log(this.inputtedEmail)
																			}
																			fd.append('email_title', this.data.email_title);
																			fd.append('email_addresses', this.data.email_addresses);
																			fd.append('call_value', window.call_value);

																			var self = this;
																			$.ajax({
																				type: "POST",
																				url: "send.php",
																				data: fd,
																				processData: false,
																				contentType: false,
																				dataType: "json",
																				complete: function(msg) {
																					// Скроем клавиатуру на мобильном устройстве
																					document.activeElement.blur();

																					setTimeout(function() {
																						if (!self.popupIsOpen) {
																							self.openPopup('Call');
																						}
																						self.phoneSended = 'sended';
																					}, 3000);
																					// self.phoneSended = 'sended';
																				}
																			});
																		} else {
																			this.placeholderPhone = '';
																			this.inputtedPhone = '';
																			$('input[type="tel"]').each(function() {
																				//$(this).val('');
																				$(this).parent().find('p.placholder_text').addClass('red');
																				// $(this).addClass('redput');
																			});
																		}
																		return false;
																	},
																	checkForm: function(phone) {

																		var checker = true;

																		console.log(phone);
																		if (phone.substring(0, 1) != '+') {
																			phone = '+7' + phone;
																		}

																		console.log(phone);

																		var checkResult = phoneNumberParser(phone);

																		console.log(checkResult['parsingResult']);
																		//console.log(checkResult['errorDescription']);
																		//console.log(checkResult['isPossibleNumber']);
																		//console.log(checkResult['isValidNumber']);
																		//console.log(checkResult['eFormat']);


																		if (checkResult['parsingResult'] == 'error' || checkResult['isPossibleNumber'] == false || checkResult['isValidNumber'] == false || checkResult['eFormat'] == 'invalid') {
																			// $form.find("input[name='phone']").addClass("redput");
																			// $form.find("input[name='phone']").val("");
																			// $form.find("input[name='phone']").attr("placeholder", "Укажите Ваш телефон");
																			// $form.find("input[name='phone']").closest('#popup').removeClass("flipInY");
																			// $form.find("input[name='phone']").closest('#popup').addClass("shake");
																			// setTimeout(function() {
																			// 	$form.find("input[name='phone']").closest('#popup').removeClass("shake");
																			// }, 3000);
																			checker = false;
																			var errorData = new FormData();
																			errorData.append('inputtedData', phone);
																			errorData.append('email_title', sets.email_title);
																			errorData.append('parsingResult', checkResult['parsingResult']);
																			errorData.append('errorDescription', checkResult['errorDescription']);
																			errorData.append('isPossibleNumber', checkResult['isPossibleNumber']);
																			errorData.append('notPossibleReason', checkResult['notPossibleReason']);
																			errorData.append('isValidNumber', checkResult['isValidNumber']);
																			errorData.append('eFormat', checkResult['eFormat']);
																			// Высылаем письмо о результате теста только, если что-то ввели, а не просто нажали кнопку
																			if (checkResult['parsingResult'] != 'error') {
																				$.ajax({
																					type: "POST",
																					url: "send_wrong_number.php",
																					data: errorData,
																					processData: false,
																					contentType: false,
																					dataType: "json",
																					complete: function() {
																						//console.log('Письмо об ошибке отправлено успешно');
																					}
																				});
																			}
																		} else {
																			$("input[name='phone']").removeClass("red");
																		}

																		if (checker != true) {
																			return {
																				'check': false
																			}
																		} else {
																			return {
																				'check': true,
																				'number': checkResult['eFormat']
																			}
																		}
																	}
																},
																computed: {
																	maxBenefit: function() {
																		var benefits = [];
																		for (var i = 0; i < this.data.cars.length; i++) {
																			benefits.push(this.maximum(this.data.cars[i].models, 'benefit'));
																		}
																		var max = benefits[0];
																		for (i = 1; i < benefits.length; ++i) {
																			if (benefits[i] > max) max = benefits[i];
																		}
																		return max;
																	},
																	minPrice: function() {
																		var prices = [];
																		for (var i = 0; i < this.data.cars.length; i++) {
																			prices.push(this.minimum(this.data.cars[i].models, 'price'));
																		}
																		var min = prices[0];
																		for (i = 1; i < prices.length; ++i) {
																			if (prices[i] < min) min = prices[i];
																		}
																		return min;
																	},
																	year: function() {
																		var currentDate = new Date();
																		return (currentDate.getFullYear());
																	},
																	month: function() {
																		var currentDate = new Date();
																		return sets.months[currentDate.getMonth()];
																	},
																	month_2: function() {
																		var currentDate = new Date();
																		return sets.months_2[currentDate.getMonth()];
																	},
																	lastday: function() {
																		var t = new Date();
																		var l = new Date(t.getFullYear(), t.getMonth() + 1, 0);
																		return l.getDate();
																	},
																	// Размер экрана
																	screenSize: function() {
																		var w = window,
																			d = document,
																			e = d.documentElement,
																			g = d.getElementsByTagName('body')[0],
																			x = w.innerWidth || e.clientWidth || g.clientWidth,
																			y = w.innerHeight || e.clientHeight || g.clientHeight;
																		return {
																			x: x,
																			y: y
																		}
																	}
																},
																created: function() {
																	// Узнаем текущий час дня для текста с благодарностью
																	var h = new Date().getHours();
																	if (h >= this.data.time_work_from && h <= this.data.time_work_to) {
																		this.workingHours = true;
																	}

																	// Возьмём GET-параметры страницы в глобальный массив params (будет доступен из любой функции)
																	var strGET = window.location.search.replace('?', '');
																	window.params = window
																		.location
																		.search
																		.replace('?', '')
																		.split('&')
																		.reduce(
																			function(p, e) {
																				var a = e.split('=');
																				p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
																				return p;
																			}, {}
																		);

																	var self = this;
																	// Определим тип страницы
																	switch (window.params['type']) {
																		case 'desktop':
																			self.pageType = 'desktop';
																			break;
																		case 'night':
																			self.pageType = 'night';
																			break;
																		case 'mobile':
																			self.pageType = 'mobile';
																			break;
																	}
																},
																mounted: function() {
																	if (this.pageType === 'desktop') {
																		//Скрипты для desktop
																		var self = this;
																		$('.tabs .car_tab:first-child').addClass('active');

																		$(document).scroll(function() {
																			var top = self.getCoords(document.getElementById('cars')).top;
																			if ($(window).scrollTop() >= top) {
																				$('#scrollfix').addClass('active')
																			} else {
																				$('#scrollfix').removeClass('active')

																			}
																		})
																		//Автоматическое переключение пунктов меню при прокрутке страницы
																		// $(document).on("scroll", onScroll);
																		//Центр карты
																		var centerMap = {
																			lat: 59.833569,
																			lng: 30.426718
																		};

																		//Центр карты на мобилке
																		if (screenSize().x < 760) {
																			var centerMap = {
																				lat: 59.833569,
																				lng: 30.426718
																			};
																		}

																		//Инициализация карты
																		initMap();
																		//Google map
																		function initMap() {
																			var uluru = {
																				lat: 59.828569,
																				lng: 30.426718
																			};
																			var markerImage = './img/icons/pin.svg';
																			var map = new google.maps.Map(document.getElementById('map'), {
																				zoom: 15,
																				center: centerMap,
																				scrollwheel: false,
																				disableDefaultUI: true
																			});
																			var marker = new google.maps.Marker({
																				position: uluru,
																				map: map,
																				icon: {
																					url: markerImage,
																					scaledSize: new google.maps.Size(30, 48)
																				}

																			});
																			$.getJSON("./libs/map-style_colored.json", function(data) {
																				map.setOptions({
																					styles: data
																				});
																			});
																		}

																		//Инициализация wowjs
																		wow = new WOW({
																			boxClass: 'wow',
																			animateClass: 'animated',
																			offset: 50,
																			mobile: false,
																			live: true
																		});
																		wow.init();

																		var $credit_slider = $('.slider_credit').flickity({
																			pageDots: false,
																			draggable: true,
																			content: true,
																			resize: true,
																			percentPosition: false,
																			wrapAround: true,
																			on: {
																				change: function(index) {

																				},
																				ready: function() {

																				}
																			}
																		})

																		var $tabs_slider = $('#cars .tabs').flickity({
																			pageDots: false,
																			draggable: true,
																			content: true,
																			resize: true,
																			percentPosition: false,
																			wrapAround: true,
																			on: {
																				change: function(index) {
																					$('#cars .tabs').flickity('reloadCells')
																					$('#cars .tabs').flickity('resize')
																					setTimeout(function() {
																						$('#desktop #cars .tabs .car_tab.is-selected').trigger('click')
																					}, 100)

																				},
																				ready: function() {
																					$('#cars .tabs').flickity('reloadCells')
																					$('#cars .tabs').flickity('resize')
																				}
																			}
																		})
																		setTimeout(function() {
																			$('#cars .tabs').flickity('reloadCells')
																			$('#cars .tabs').flickity('resize')
																			$('.slider_credit').flickity('reloadCells')
																			$('.slider_credit').flickity('resize')
																		}, 100)

																		$('.car_tab').click(function() {
																			var index = $(this).index();
																			$('#desktop #cars .tabs').flickity('selectCell', index)
																		})
																		var $main_slider = $('.slider_main').flickity({
																			pageDots: true,
																			draggable: true,
																			content: true,
																			resize: true,
																			percentPosition: false,
																			wrapAround: true,
																		})


																		$(window).resize(function() {

																			$('#cars .tabs').flickity('reloadCells')
																			$('#cars .tabs').flickity('resize')
																		})

																		// Автоматизируем создание якорных ссылок через GET-запрос формата /?parameter=value
																		if (params['car'] != undefined) {
																			for (var i = 0; i < sets.cars.length; i++) {
																				if (params['car'] == sets.cars[i].id) {
																					if (screenSize().x > 996) {
																						$('div[data-model="' + params['car'] + '"]').trigger('click');
																					} else {
																						$('#desktop #cars .tabs').flickity('selectCell', 'div[data-model="' + params['car'] + '"]')
																					}
																					var top = this.getCoords(document.getElementById('cars')).top;
																					//анимируем переход на расстояние - top за 1500 мс
																					$('body,html').animate({
																						scrollTop: top - 70
																					}, 300);
																				}
																			}
																		}

																	} else if (this.pageType === 'mobile') {
																		var $slider = $('#slider').flickity({
																			pageDots: false,
																			draggable: true,
																			content: true,
																			contain: true,
																			resize: true,
																			percentPosition: false,
																			wrapAround: true,
																		})
																		if (params['model'] != undefined) {
																			for (var i = 0; i < sets.cars.length; i++) {
																				if (params['model'] == sets.cars[i].id) {
																					$('#slider').flickity('selectCell', '#' + params['model'], false, true);
																					break
																				}
																			}
																		}


																	}

																	$('.slideToggle').click(function() {
																		$('.toggleBlock').slideToggle()
																	})

																	// Анимация валидации номера по мере его ввода
																	$('form input[type="tel"]').keyup(function() {
																		var vInput = this.value;
																		$('.circle-loader').addClass('checking');
																		if (vInput.indexOf("_") != -1) {
																			$('.checkmark').removeClass('checked');
																			$('.circle-loader').removeClass('load-complete');
																			$('.circle-loader').removeClass('wrong');
																			$('form .btn').removeClass('right');
																		} else {
																			var checkResult = phoneNumberParser(vInput);
																			if (checkResult['parsingResult'] == 'error' || checkResult['isPossibleNumber'] == false || checkResult['isValidNumber'] == false || checkResult['eFormat'] == 'invalid') {
																				$('.circle-loader').addClass('load-complete');
																				$('.checkmark').removeClass('checked');
																				$('.circle-loader').addClass('wrong');
																				$('form .btn').removeClass('right');
																				$('.circle-loader.wrong').click(function() {
																					$(this).parent().find('input').val('');
																					document.activeElement.blur();
																					$(this).parent().find('input').focus();
																				});
																			} else {
																				$('.circle-loader').addClass('load-complete');
																				$('.checkmark').addClass('checked');
																				$('.circle-loader').removeClass('wrong');
																				$('form .btn').addClass('right');
																				$("input[name='phone']").removeClass("redput");
																			}
																		}
																	});
																	$('form .phone').focusout(function() {
																		$('.circle-loader').removeClass('checking');
																	});


																	$('form input').on('focusout', function() {
																		if ($(this).val() === "") {
																			$(this).parent('.input-block').removeClass('active')
																		}
																	});
																	$('form input').on('focus', function() {
																		if ($(this).parent('.input-block').hasClass('active')) {

																		} else {
																			$(this).parent('.input-block').addClass('active')
																		}
																	});
																}
															})