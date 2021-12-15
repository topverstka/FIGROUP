'use strict'
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

// Удаляет у всех элементов items класс itemClass
function removeAll(items,itemClass) {   
    if (typeof items == 'string') {
      items = document.querySelectorAll(items)
    }
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      item.classList.remove(itemClass)
    }
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

// Расстояния между элементом и верхней границей страницы 
// function offsetPage(elem) {
//     var rect = elem.getBoundingClientRect(),
//     scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
//     scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
// }

// Добавление иконки у обязательный для заполнения инпутов
formInputRequiredLabel()
function formInputRequiredLabel() {
    const inputElems = findAll('.form-elem__area._required')
    for (let i = 0; i < inputElems.length; i++) {
        const input = inputElems[i];
        const parent = input.parentNode
        const span = document.createElement('span')

        span.classList.add('form-elem__required')
        span.innerText = '*'
        
        parent.append(span)
    }
}

// Анимация иллюстрации на главном экране
animIllMain()
function animIllMain() {
    if (find('.anim-ill')) {
		$(function () {
			if (window.innerWidth > 768) {
				$('.js-tilt').tilt()
			}
		});
    }
}

// Анимация при скролле на главной странице
// animScrollMainPage()
function animScrollMainPage() {
    const slider = find('.advantages')
    // const 

    window.addEventListener('scroll', e => {
        const sliderBottomWindow = slider.getBoundingClientRect().top - window.innerHeight + slider.clientHeight
        const sliderTopWindow = slider.getBoundingClientRect().top

        if (sliderTopWindow >= 0 && sliderBottomWindow <= 0) {

            // if ()
            console.log('ok')
        }
    })
}

// class Timeliner {
//     constructor(node, keyframes) {
//         this.node = node;
//         this.keyframes = keyframes
//         this.keyframesTimeline = keyframes.map(val => val.progress)
//         setKeyframeStyles(this.node, keyframes[0])
//     }

//     draw = (progress) => {
//         const curProgress = progress * 100
//         const nearestFrameIndex = findNearestFrame(this.keyframesTimeline, curProgress)
//         const leftFrame = this.keyframes[nearestFrameIndex]
//         const rightFrame = this.keyframes[nearestFrameIndex + 1]
//         this.drawStylesTick(curProgress, leftFrame, rightFrame)
//     }
// }

// function drawStylesTick(progress, leftFrame, rightFrame) {
//     const leftFrameStyles = getStylesOnly(leftFrame)
// }

// let last_known_scroll_position = 0;
// let ticking = false;

// function doSomething(scroll_pos) {
//   // Делаем что-нибудь с позицией скролла
//   console.log(scroll_pos)
// }

// window.addEventListener('scroll', function(e) {
//   last_known_scroll_position = window.scrollY;
//   let i = 0

//     const interval = setInterval(() => {
//         doSomething(last_known_scroll_position);
//         i++

//         if (i == 100) {
//             clearInterval(interval)

//         }
//     }, 0);

//   if (!ticking) {
//     window.requestAnimationFrame(function() {
//       doSomething(i);
//       ticking = false;
//     });


//     ticking = true;
//   }
// });

// function isScrolledIntoView(el) {
//     var elemTop = el.getBoundingClientRect().top,
//         elemBottom = el.getBoundingClientRect().bottom,
//         isVisible = (elemTop >= 0) && ((elemBottom + 240) <= window.innerHeight);

//     // console.log(elemTop, elemBottom, window.innerHeight)
//     return isVisible;
// }

// Валидация формы
function validationForm() {
    const name = find('#user_name')
    const phone = find('#user_phone')
    const email = find('#user_email')

    let con = true

    for (let i = 0; i < [name, phone, email].length; i++) {
        const elem = [name, phone, email][i];
        const elemValue = elem.value.trim()

        if (elemValue === '') {
            elem.classList.add('_error')
            con = false
        } else {
            elem.classList.remove('_error')
            con = true
        }
    }

    return con
}

// Отправка формы
sumbitForm()
function sumbitForm() {
    const form = find('.modal__form')

    form.addEventListener('submit', async e => {
        const modal = find('.modal._show')
        const btnSend = form.querySelector('[type=submit]')

        e.preventDefault()
        
        let con = validationForm()

        if (con === true) {
            const formData = new FormData()
            const action = form.getAttribute('action')

            btnSend.classList.add('send-preloader')
    
            let response = await fetch(action, {
                method: 'POST',
                body: formData
            })
            
            // settimeout здесь для того, чтобы показать работу отправки формы. В дальнейшем это нужно убрать
            setTimeout(() => {
                if (response.ok) {
                    console.log('Successful')
                    form.reset()
    
                    modal.classList.remove('_show')
                    find('#send-done').classList.add('_show')
                    btnSend.classList.remove('send-preloader')
                }
                else {
                    console.log('Error')
                    form.reset()
    
                    modal.classList.remove('_show')
                    find('#send-error').classList.add('_show')
                    btnSend.classList.remove('send-preloader')
                }
            }, 2000)

        }
    })
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

// Горизонтальный скролл у слайдера с преимуществами
// (function() {
//     const slider = find('.advantages__wrapper')
//     const main = find('.main__body')
//     const slideElems = slider.querySelectorAll('.advantages__slide')
//     let z = slider.scrollLeft
    
//     window.addEventListener('resize', () => {
//         setMarginSlides()
//     })
    
//     if (window.innerWidth > 768) scroll()
//     function scroll() {
//         function scrollHorizontally(e) {
//             const multiplied = (e.shiftKey) ? 240 : 120
//             const slideWidth = (slider.scrollWidth - window.innerWidth) / slideElems.length
//             // console.log(slideWidth)
//             e = window.event || e
//             var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))
//             let scrollSlideCon = true
//             // slider.scrollLeft -= (delta * multiplied)

//             if (scrollSlideCon === true) {
//                 console.log(scrollSlideCon)
//                 scrollSlideCon = false
//                 let scrollInterval = setInterval(() => {
//                     if (slider.scrollLeft < slideWidth) {
//                         slider.scrollLeft += 5
//                         console.log(slider.scrollLeft, slideWidth)
//                     }
//                     else {
//                         clearInterval(scrollInterval)
//                         scrollSlideCon = true
//                         console.log('else')
//                     }
//                 }, 10)
//             }

//             e.preventDefault()
//             if (z != slider.scrollLeft) {
//                 z = slider.scrollLeft
//             }
//         }
//         if (slider.addEventListener) {
//             // IE9, Chrome, Safari, Opera
//             slider.addEventListener('mousewheel', scrollHorizontally, false)
//             // Firefox
//             slider.addEventListener('DOMMouseScroll', scrollHorizontally, false)
//         } else {
//             // IE 6/7/8
//             slider.attachEvent('onmousewheel', scrollHorizontally)
//         }
//     }
    
//     // Отступы по бокам у слайдера с преимуществами
//     setMarginSlides()
//     function setMarginSlides() {
//         // Первый слайдер
//         slideElems[0].style.marginLeft = main.getBoundingClientRect().left + 'px'
//         // Второй слайдер
//         slideElems[slideElems.length - 1].style.marginRight = main.getBoundingClientRect().left + 'px'
//     }
// })()

const advantagesSlider = new Swiper('.advantages__slider', {
	// slidesPerView: 1.33, // Кол-во показываемых слайдов
	// spaceBetween: 16,
	// centeredSlides: true,
	// autoHeight: true,
	// slidesPerView: 'auto',
	// loop: true, // Бесконечный слайдер
	// freeMode: true, // Слайдеры не зафиксированны
    loop: false,
    speed: 1000,
    grabCursor: false,

    mousewheel: true,
    mousewheel: {
        releaseOnEdges: true,
      },
    keyboard: {
      enabled: true,
    },

	breakpoints: {
		1200: {
			slidesPerView: 1,
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
// advantagesSlider.mousewheel.disable()
// console.log(advantagesSlider)
// advantagesSlider.on('scroll', (swiper, e) => {
//     console.log(swiper, e)
//     window.addEventListener('mousewheel', resetScroll)

//     function resetScroll(e) {
//         e.preventDefault()
//         console.log(e)
//     }
//     setTimeout(() => {
//         window.removeEventListener('mousewheel', resetScroll)
//     }, 1000)
// })
// advantagesSlider.on('slideChange', (swiper, e) => {
//     console.log(swiper, e)
// })

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

// Функции для модальных окон
modal()
function modal() {
    // Открытие модального окна, если в url указан его id
    openModalHash()
    function openModalHash() {
        if (window.location.hash) {
            const hash = window.location.hash.substring(1)
            const modal = document.querySelector(`.modal#${hash}`)
    
            if (modal) {
                modal.classList.add('_show');
                bodyLock(true)
                closeWhenClickingOnBg(`#${hash} .modal__content`, modal);
            }
        }
    }
    
    // Закрытие модальных окон при клике по крестику
    closeModalWhenClickingOnCross()
    function closeModalWhenClickingOnCross() {
        const modalElems = document.querySelectorAll('.modal')
        for (let i = 0; i < modalElems.length; i++) {
            const modal = modalElems[i];
            const closeThisModal = modal.querySelector('.modal__close')
    
            closeThisModal.addEventListener('click', () => {
                modal.classList.remove('_show')
                bodyLock(false)
                resetHash()
            })
        }
    }
    
    // Закрытие модальных окон при нажатии по клавише ESC
    closeModalWhenClickingOnESC()
    function closeModalWhenClickingOnESC() {
        const modalElems = document.querySelectorAll('.modal')
        for (let i = 0; i < modalElems.length; i++) {
            const modal = modalElems[i];
    
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    modal.classList.remove('_show')
                    bodyLock(false)
                    resetHash()
                }
            })
        }
    }
    
    // Сброс id модального окна в url
    function resetHash() {
        const windowTop = window.pageYOffset
        window.location.hash = ''
        window.scrollTo(0, windowTop)
    }
    
    // Открытие модальных окон
    openModal()
    function openModal() {
        const btnsOpenModal = document.querySelectorAll('[data-modal-open]');
    
        for (let i = 0; i < btnsOpenModal.length; i++) {
            const btn = btnsOpenModal[i];
    
            btn.addEventListener('click', (e) => {
                const dataBtn = btn.dataset.modalOpen;
                const modalThatOpens = document.querySelector(`#${dataBtn}`)
    
                btn.classList.add('modal-show');
                modalThatOpens.classList.add('_show');
                bodyLock(true)
                closeWhenClickingOnBg(`#${dataBtn} .modal__content`, modalThatOpens);
                window.location.hash = dataBtn
            });
        }
    }
    
    // Закрытие модального окна при клике по заднему фону
    function closeWhenClickingOnBg(itemArray, itemParent, classShow = '_show') {
        document.addEventListener('click', (e) => {
            let itemElems = document.querySelectorAll(itemArray)
    
            for (let i = 0; i < itemElems.length; i++) {
                const item = itemElems[i];
    
                const target = e.target,
                    itsItem = target == item || item.contains(target),
                    itemIsShow = item.classList.contains(classShow);
    
                if (itemParent) {
                    const itsItemParent = target == itemParent || itemParent.contains(target),
                        itemParentIsShow = itemParent.classList.contains(classShow);
    
                    if (!itsItem && itsItemParent && itemParentIsShow) {
                        itemParent.classList.remove(classShow);
    
                        if (body.classList.contains('_lock')) {
                            bodyLock(false)
                        }
    
                        if (window.location.hash === '#' + itemParent.getAttribute('id')) {
                            resetHash()
                        }
                    }
                } else {
                    if (!itsItem && itemIsShow) {
                        item.classList.remove(classShow);
                        if (body.classList.contains('_lock')) {
                            bodyLock(false)
                        }
    
                        if (window.location.hash === '#' + itemParent.getAttribute('id')) {
                            resetHash()
                        }
                    }
                }
    
            }
        })
    }
}

// Табы в разделе категорий
tabsCatSection()
function tabsCatSection() {
    const tabElems = findAll('.cat-section__choice-chips')
    // const cardElems = findAll('.cat-section__cat-card')
    
    for (let i = 0; i < tabElems.length; i++) {
        const tab = tabElems[i];
        
        tab.addEventListener('click', () => {
            showCardsCatSection(tab)
            activeTabCatSection(tab)
        })
    }
}

function showCardsCatSection(tab) {
    const dataAttr = tab.dataset.tabCat
    const cardElems = findAll('.cat-section__cat-card')
    const cardParent = cardElems[0].parentNode
    const cardShowElems = findAll(`[data-card-cat=${dataAttr}]`)
    
    // Присваиваем активный класс карточке
    removeAll(cardElems, '_show')
    
    for (let i = 0; i < cardShowElems.length; i++) {
        const cardShow = cardShowElems[i];
        
        cardShow.classList.add('_show')

        // Перемещаем карточку наверх списка
        if (i === 0) {
            cardParent.prepend(cardShow)
        }
        else {
            cardParent.insertBefore(cardShow, cardShowElems[0].nextSibling)
        }
    }
}

// Активируем выбранный таб
function activeTabCatSection(tab) {
    const tabElems = findAll('.cat-section__choice-chips')
    removeAll(tabElems, '_active')

    tab.classList.add('_active')
}

// Показываем больше карточек при клике по "Показать еще"
if (find('.cat-section__cat-card')) {
    showMoreCatSection()
}
function showMoreCatSection() {
    const btn = find('.cat-section__more')
    const cardShowElems = findAll('.cat-section__cat-card._show')
    const cardParent = cardShowElems[0].parentNode

    btn.addEventListener('click', () => {

        if (btn.dataset.moreCat === 'show_more') {
            for (let i = 0; i < cardShowElems.length; i++) {
                const cardShow = cardShowElems[i];
                
                if (i > 2) {
                    cardShow.classList.add('_show')
                    // cardShow.style.display = 'block'
                }
                cardParent.classList.add('show-more_active')
                btn.dataset.moreCat = 'hide_more'
                btn.innerText = 'Скрыть'
            }
        } 
        else if (btn.dataset.moreCat === 'hide_more') {
            for (let i = 0; i < cardShowElems.length; i++) {
                const cardShow = cardShowElems[i];
                
                if (i > 2) {
                    cardShow.classList.remove('_show')
                    // cardShow.style.display = 'none'
                }
                cardParent.classList.remove('show-more_active')
                btn.dataset.moreCat = 'show_more'
                btn.innerText = 'Показать еще'
            }
        }

        // for (let i = 0; i < cardShowElems.length; i++) {
        //     const cardShow = cardShowElems[i];
            
        //     // if (btn.classList.contains('_show')) {
        //     //     if (i > 2) {
        //     //         cardShow.style.display = 'block'
        //     //     }
        //     //     console.log('_show')
        //     //     btn.classList.remove('_show')
        //     //     btn.classList.add('_hide')
        //     //     btn.innerText = 'Скрыть'
        //     // }
            
        //     // if (btn.classList.contains('_hide')) {
        //     //     if (i > 2) {
        //     //         cardShow.style.display = 'none'
        //     //     }
        //     //     console.log('_hide')
        //     //     btn.classList.remove('_hide')
        //     //     btn.classList.add('_show')
        //     //     btn.innerText = 'Показать еще'
        //     // }
        // }
    })
}

// Показываем кнопку "Показать еще" если кол-во карточек больше 3
function showBtnMoreCatSection() {
    const btn = find('.cat-section__more')
    const cardShowElems = findAll('.cat-section__cat-card._show')

    if (cardShowElems.length > 3) {
        btn.classList.add('_show')
    }
    else {
        btn.classList.remove('_show')
    }
}