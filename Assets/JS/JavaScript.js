let activeIndex = 0
let limit = 0
let disabled = false
let $stage
let $controls
let canvas = false
const SPIN_FORWARD_CLASS = 'js-spin-fwd'
const SPIN_BACKWARD_CLASS = 'js-spin-bwd'
const DISABLE_TRANSITIONS_CLASS = 'js-transitions-disabled'
const SPIN_DUR = 1000
const appendControls = () => {
	$controls = $('.tabs3d-control').children()
	$controls.eq(activeIndex).addClass('active')
}
const setIndexes = () => {
	$('.spinner').children().each((i, el) => {
		if (i == 0) {
			$(el).addClass('js-active');
		}
        $(el).attr('data-index', i)
		$('.tabs3d-control').append('<a style="background-color: ' + $(el).attr('data-bg') + '" href="#tab" data-index="' +i+ '">' + $(el).attr('data-menu') + '</a>');
        limit++
	})
}
const duplicateSpinner = () => {
	const $el = $('.spinner').parent()
	const html = $('.spinner').parent().html()
	$el.append(html)
	$('.spinner').last().addClass('spinner-right')
	$('.spinner-right').removeClass('spinner-left')
}
const paintFaces = () => {
	$('.spinner-face').each((i, el) => {
        $(el).children().css('background', $(el).attr('data-bg'))
	})
}
const prepareDom = () => {
	setIndexes()
	paintFaces()
	duplicateSpinner()
	appendControls()
}
const spin = (inc = 1) => {
	if (disabled) return
	if (!inc) return
	activeIndex += inc
	disabled = true
	if (activeIndex >= limit) {
        activeIndex = 0
	}
	if (activeIndex < 0) {
        activeIndex = (limit - 1)
	}
	const $activeEls = $('.spinner-face.js-active')
	const $nextEls = $('.spinner-face[data-index=' + activeIndex + ']')
	$nextEls.addClass('js-next')
	if (inc > 0) {
		$stage.addClass(SPIN_FORWARD_CLASS)
		} else {
		$stage.addClass(SPIN_BACKWARD_CLASS)
	}
	$controls.removeClass('active')
	$controls.eq(activeIndex).addClass('active')
	setTimeout(() => {
		spinCallback(inc)
	}, SPIN_DUR, inc)
}
const spinCallback = (inc) => {
	$('.js-active').removeClass('js-active')
	$('.js-next').removeClass('js-next').addClass('js-active')
	$stage
	.addClass(DISABLE_TRANSITIONS_CLASS)
	.removeClass(SPIN_FORWARD_CLASS)
	.removeClass(SPIN_BACKWARD_CLASS)
	$('.js-active').each((i, el) => {
		const $el = $(el)
		$el.prependTo($el.parent())
	})
	setTimeout(() => {
		$stage.removeClass(DISABLE_TRANSITIONS_CLASS)
		disabled = false
	}, 100)
}
const attachListeners = () => {
	document.onkeyup = (e) => {
		switch (e.keyCode) {
            case 38:
			spin(-1)
			break
            case 40:
			spin(1)
			break
		}
	}
	$controls.on('click', (e) => {
		e.preventDefault()
		if (disabled) return
		const $el = $(e.target)
		const toIndex = parseInt($el.attr('data-index'), 10)
		spin(toIndex - activeIndex)
	})
}
const assignEls = () => {
	$stage = $('.tabs3d-stage')
}
const init = () => {
	assignEls()
	prepareDom()
	attachListeners()
}
$(() => {
	init();
});	

var swiper = new Swiper('.blog-slider', {
	effect: 'fade',
	loop: true,
	mousewheel: {
        invert: false,
	},
	autoHeight: true,
	pagination: {
        el: '.blog-slider__pagination',
        clickable: true,
	}
});