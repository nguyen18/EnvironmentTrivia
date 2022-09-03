const car = document.querySelector('.car');
const slider = document.querySelector('.slider');
const logo = document.querySelector('#logo');
const burger = document.querySelector('.burger');
const headline = document.querySelector('.headline');


const tl = new TimelineMax();

tl.fromTo(car, 1, { height: "0%" }, { height: '80%', ease: Power2.easeInOut })
	.fromTo(
		car, 1.2, { width: "100 %" }, { width: '80%', ease: Power2.easeInOut }
	)
	.fromTo(slider, 1.2, { x: "-100%" }, { x: '0%' }, "-=1.2")
	.fromTo(logo, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5")
	.fromTo(burger, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5")
	.fromTo(headline, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5");