window.addEventListener('DOMContentLoaded', () => {
	// hamburger switch classes and navbar
	const hamburger = document.querySelector('.header__hamburger');
	const navbar = document.querySelector('.header-navbar');

	hamburger.addEventListener('click', () =>{
		if(hamburger.classList.contains('header__hamburger_active')) {
			hamburger.classList.remove('header__hamburger_active');
			navbar.classList.remove('header-navbar_active');
		} else {
			hamburger.classList.add('header__hamburger_active');
			navbar.classList.add('header-navbar_active');
		}
	});
	// Search
	const searchIcon = document.querySelector('.header__loop');

	searchIcon.addEventListener('click', () => {
		if(searchIcon.classList.contains('header__loop_active')) {
			searchIcon.classList.remove('header__loop_active');
		} else {
			searchIcon.classList.add('header__loop_active');
		}
	});
});