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

	// Subilters
	// Subfilter buttons
	const allFiltersBtn = document.querySelector('#filter-all'),
		partsFiltersBtn = document.querySelector('#filter-parts'),
		markFiltersBtn = document.querySelector('#filter-mark');
	// Subfilter blocks
	const partsBlock = document.querySelector('.catalog-filters__parts'),
		markBlock = document.querySelector('.catalog-filters__mark'),
		hrBlock = document.querySelector('.catalog-filters__hr');

	// Adding event listeners
	allFiltersBtn.addEventListener('click', () => {
		allFiltersBtn.classList.add('catalog-filters-main__subfilter_active');
		partsFiltersBtn.classList.remove('catalog-filters-main__subfilter_active');
		markFiltersBtn.classList.remove('catalog-filters-main__subfilter_active');
		partsBlock.style.display = 'block';
		hrBlock.style.display = 'block';
		markBlock.style.display = 'block';
	});
	partsFiltersBtn.addEventListener('click', () => {
		allFiltersBtn.classList.remove('catalog-filters-main__subfilter_active');
		partsFiltersBtn.classList.add('catalog-filters-main__subfilter_active');
		markFiltersBtn.classList.remove('catalog-filters-main__subfilter_active');
		partsBlock.style.display = 'block';
		hrBlock.style.display = 'none';
		markBlock.style.display = 'none';
	});
	markFiltersBtn.addEventListener('click', () => {
		allFiltersBtn.classList.remove('catalog-filters-main__subfilter_active');
		partsFiltersBtn.classList.remove('catalog-filters-main__subfilter_active');
		markFiltersBtn.classList.add('catalog-filters-main__subfilter_active');
		partsBlock.style.display = 'none';
		hrBlock.style.display = 'none';
		markBlock.style.display = 'block';
	});
});