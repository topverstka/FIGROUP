
// Служебные переменные
const d = document;
const body = d.querySelector('body');

// Служебные функции

function find(selector) {
	return d.querySelector(selector)
}

function findAll(selectors) {
	return d.querySelectorAll(selectors)
}

function bodyLock(con) {
    if (con === true) {
        body.classList.add('_lock');
    } else if (con === false) {
        body.classList.remove('_lock');
    } else if (con === undefined) {
		if (!body.classList.contains('_lock')) {
			body.classList.add('_lock');
		}
		else {
			body.classList.remove('_lock')
		}
	} else {
		console.error('Неопределенный аргумент у функции bodyLock()')
	}
}

// Мобильное меню
menu()
function menu() {
	const burger = find('.burger')
	const menu = find('.menu');
	
	// Высота меню
	window.addEventListener('resize', () => {
		const headerHeight = find('.header').clientHeight

		if (window.innerWidth <= 768) {
			menu.style.paddingTop = headerHeight + 'px'
		}
		else {
			menu.style.paddingTop = 0
		}
	})

	burger.addEventListener('click', (e) => {
		burger.classList.toggle('burger_close')
		menu.classList.toggle('_show')
		bodyLock()
	})
}

const advantagesSlider = new Swiper('.advantages__slider', {
	// slidesPerView: 1.33, // Кол-во показываемых слайдов
	spaceBetween: 16,
	centeredSlides: true,
	// autoHeight: true,
	// slidesPerView: 'auto',
	// loop: true, // Бесконечный слайдер
	// freeMode: true, // Слайдеры не зафиксированны

	breakpoints: {
		1200: {
			slidesPerView: 'auto',
		},
		700: {
			slidesPerView: 1.1,
		},
		0: {
			slidesPerView: 1.08,
			spaceBetween: 8,
			centeredSlides: false,
		}
	},

	// navigation: {
	// 	nextEl: '.swiper__arrow-next',
	// 	prevEl: '.swiper__arrow-prev',
	// }
});

const teamSlider = new Swiper('.team-slider', {
	loop: true,

	breakpoints: {
		600: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		0: {
			slidesPerView: 1,
			spaceBetween: 30,
			centeredSlides: false,
		}
	},

	navigation: {
		nextEl: '.team-slider__next',
		prevEl: '.team-slider__prev',
	}
});







// TODO: ЗАКОНЧИЛ ЗДЕСЬ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// // Ленивая загрузка изображений
// [].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
// 	img.setAttribute('src', img.getAttribute('data-src'));
// 	img.onload = function() {
// 		img.removeAttribute('data-src');
// 	};
// });


// // Куки
// function setCookie(c_name,value,exdays){
//     var exdate=new Date();
//     exdate.setDate(exdate.getDate() + exdays);
//     var c_value = escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString()) + "; path=/";
//     document.cookie=c_name + "=" + c_value;
// }

// function getMyCookie(name) {
//     var c = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
//         if (c) return c[2];
//     	else return "";
// }


// // Слайдер с контрольными точками (Используется библиотека swiper: https://swiperjs.com/)
// var swiper = new Swiper('.swiper-slider', {
// 	slidesPerView: 1,
// 	spaceBetween: 10,
// 	loop: false,
// 	// init: false,
// 	pagination: {
// 		el: '.testimonials-swiper-pagination',
// 		clickable: true,
// 	},
// 	navigation: {
// 		nextEl: '.testimonials-swiper-next',
// 		prevEl: '.testimonials-swiper-prev',
// 	},
// 	breakpoints: {
// 		670: {
// 			slidesPerView: 2,
// 			spaceBetween: 20,
// 		},
// 		992: {
// 			slidesPerView: 3,
// 			spaceBetween: 20,
// 		},
// 		1300: {
// 			slidesPerView: 4,
// 			spaceBetween: 20,
// 		},
// 	}
// });


// // Галлерея с модальным окном (Используется библиотека LightGallary: https://www.lightgalleryjs.com/) 
// lightGallery(document.querySelector('.lightgallery'));


// // Скрипт для раздела FAQ - "Частозадаваемые вопросы"
// function findFaq(){
// 	let faqBoxes = document.querySelectorAll('.faq-box')
// 	for(i = 0; i <= faqBoxes.length-1; i++){
// 		faqBoxes[i].addEventListener('click', function(e) {
// 			e.preventDefault();
// 			if(this.classList.contains('active')){
// 				this.classList.remove('active');
// 			}else{
// 				let activeElem = this.closest('.faq').querySelector('.faq-box.active');
// 				if(activeElem){
// 					activeElem.classList.remove('active');
// 				}
// 				this.classList.add('active');
// 			}
// 		});
// 	}
// }
// findFaq();


// // AOS анимации инициализация (https://michalsnik.github.io/aos/)
// AOS.init();
