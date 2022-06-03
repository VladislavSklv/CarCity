window.addEventListener('DOMContentLoaded', () => {

	function addClasses(items, classes){
		items.forEach((item, i) => {
			item.classList.add(classes[i]);
		});
	}
	function removeClasses(items, classes){
		items.forEach((item, i) => {
			item.classList.remove(classes[i]);
		});
	}

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
	// Subfilter buttons and blocks
	const allFiltersBtn = document.querySelector('#filter-all'),
		partsFiltersBtn = document.querySelector('#filter-parts'),
		markFiltersBtn = document.querySelector('#filter-mark'),
		mainSubfiltersBlock = document.querySelector('.catalog-filters-main'),
		chosenSubfilterBlock = document.querySelector('.catalog-filters__chosen-subfilter'),
		partsBlock = document.querySelector('.catalog-filters__parts'),
		markBlock = document.querySelector('.catalog-filters__mark'),
		hrBlock = document.querySelector('.catalog-filters__hr');

	// Adding event listeners
	mainSubfiltersBlock.addEventListener('click', event => {
		let itemsToRemove, classesToRemove, itemsToAdd, classesToAdd;
		switch(event.target){
			case allFiltersBtn:
				itemsToRemove = [partsFiltersBtn, markFiltersBtn, categoriesMenu, mainSubfiltersBlock],
				classesToRemove = ['catalog-filters-main__subfilter_active', 'catalog-filters-main__subfilter_active', 'catalog-filters__category_active', 'catalog-filters-main_active'],
				itemsToAdd = [allFiltersBtn, partsBlock, markBlock, hrBlock],
				classesToAdd = ['catalog-filters-main__subfilter_active', "catalog-filters__parts_active", "catalog-filters__mark_active", "catalog-filters__hr_active"];
				removeClasses(itemsToRemove, classesToRemove);
				addClasses(itemsToAdd, classesToAdd);
				chosenSubfilterBlock.innerText = allFiltersBtn.innerText;
				break;
			case partsFiltersBtn:
				itemsToRemove = [allFiltersBtn, markFiltersBtn, categoriesMenu, mainSubfiltersBlock, markBlock, hrBlock],
				classesToRemove = ['catalog-filters-main__subfilter_active', 'catalog-filters-main__subfilter_active', 'catalog-filters__category_active', 'catalog-filters-main_active', "catalog-filters__mark_active", "catalog-filters__hr_active"],
				itemsToAdd = [partsFiltersBtn, partsBlock],
				classesToAdd = ['catalog-filters-main__subfilter_active', "catalog-filters__parts_active"];
				removeClasses(itemsToRemove, classesToRemove);
				addClasses(itemsToAdd, classesToAdd);
				chosenSubfilterBlock.innerText = partsFiltersBtn.innerText;
				break;
			case markFiltersBtn:
				itemsToRemove = [allFiltersBtn, partsFiltersBtn, categoriesMenu, mainSubfiltersBlock, partsBlock, hrBlock],
				classesToRemove = ['catalog-filters-main__subfilter_active', 'catalog-filters-main__subfilter_active', 'catalog-filters__category_active', 'catalog-filters-main_active', "catalog-filters__parts_active", "catalog-filters__hr_active"],
				itemsToAdd = [markFiltersBtn, markBlock],
				classesToAdd = ['catalog-filters-main__subfilter_active', "catalog-filters__mark_active"];
				removeClasses(itemsToRemove, classesToRemove);
				addClasses(itemsToAdd, classesToAdd);
				chosenSubfilterBlock.innerText = markFiltersBtn.innerText;
				break;
		}
	});

	// Category menu
	const categoriesMenu = document.querySelector('.catalog-filters__category');

	categoriesMenu.addEventListener('click', () =>{
		if(!categoriesMenu.classList.contains('catalog-filters__category_active')){
			categoriesMenu.classList.add('catalog-filters__category_active');
			mainSubfiltersBlock.classList.add('catalog-filters-main_active');
		} else {
			categoriesMenu.classList.remove('catalog-filters__category_active');
			mainSubfiltersBlock.classList.remove('catalog-filters-main_active');
		}
	});
});