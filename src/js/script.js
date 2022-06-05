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
	function renderChosenFilters(){
		const chosenFilterHTML = `<div class="catalog__chosen-filter fadein">${chosenFilter.innerText} <span class="cross">✖</span></div>`;
		if(!chosenFilters.find(i => i === chosenFilterHTML)){
			chosenFiltersBlock.insertAdjacentHTML('beforeend', chosenFilterHTML);
			chosenFilters.push(chosenFilterHTML);
		}
			
		// Removing chosen filters
		const chosenFiltersCrosses = document.querySelectorAll('.cross');

		chosenFiltersCrosses.forEach(cross => {
			cross.addEventListener('click', () => {
				chosenFilters = chosenFilters.filter(i => i != `<div class="catalog__chosen-filter fadein">${cross.parentNode.innerHTML}</div>`);
				cross.parentNode.classList.add('fadeout');
				setTimeout(() => {cross.parentNode.remove()}, 499);
			});
			cross.removeEventListener('click', () => {
				chosenFilters = chosenFilters.filter(i => i != `<div class="catalog__chosen-filter fadein">${cross.parentNode.innerHTML}</div>`);
				cross.parentNode.classList.add('fadeout');
				setTimeout(() => {cross.parentNode.remove()}, 499);
			});
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
		hrBlock = document.querySelector('.catalog-filters__hr'),
		chosenSubfilter = document.querySelector('.catalog__chosen-subfilter');
	let subCross = document.querySelector('.js-sub-cross');

	// Adding event listeners on filters section
	mainSubfiltersBlock.addEventListener('click', event => {
		let itemsToRemove, classesToRemove, itemsToAdd, classesToAdd;
		switch(event.target){
			case allFiltersBtn:
				itemsToRemove = [partsFiltersBtn, markFiltersBtn, categoriesMenu, mainSubfiltersBlock, chosenSubfilter];
				classesToRemove = ['catalog-filters-main__subfilter_active', 'catalog-filters-main__subfilter_active', 'catalog-filters__category_active', 'catalog-filters-main_active', 'fadein'];
				itemsToAdd = [allFiltersBtn, partsBlock, markBlock, hrBlock, chosenSubfilter];
				classesToAdd = ['catalog-filters-main__subfilter_active', "catalog-filters__parts_active", "catalog-filters__mark_active", "catalog-filters__hr_active", 'fadeout'];
				removeClasses(itemsToRemove, classesToRemove);
				addClasses(itemsToAdd, classesToAdd);
				if(!window.matchMedia("(max-width: 530px)").matches){
					setTimeout(() => {
						chosenSubfilter.style.display = 'none';
					}, 499);
				} else {
					chosenSubfilterBlock.innerText = allFiltersBtn.innerText;
				}
				break;
			case partsFiltersBtn:
				itemsToRemove = [allFiltersBtn, markFiltersBtn, categoriesMenu, mainSubfiltersBlock, markBlock, hrBlock, chosenSubfilter];
				classesToRemove = ['catalog-filters-main__subfilter_active', 'catalog-filters-main__subfilter_active', 'catalog-filters__category_active', 'catalog-filters-main_active', "catalog-filters__mark_active", "catalog-filters__hr_active", 'fadeout'];
				itemsToAdd = [partsFiltersBtn, partsBlock];
				classesToAdd = ['catalog-filters-main__subfilter_active', "catalog-filters__parts_active"];
				removeClasses(itemsToRemove, classesToRemove);
				addClasses(itemsToAdd, classesToAdd);
				if(!window.matchMedia("(max-width: 530px)").matches){
					chosenSubfilter.innerHTML = 'Запчасти и расходники <span class="sub-cross js-sub-cross">✖</span>';
					chosenSubfilter.style.display = 'inline-block';
				} else{
					chosenSubfilterBlock.innerText = partsFiltersBtn.innerText;
				}
				break;
			case markFiltersBtn:
				itemsToRemove = [allFiltersBtn, partsFiltersBtn, categoriesMenu, mainSubfiltersBlock, partsBlock, hrBlock, chosenSubfilter];
				classesToRemove = ['catalog-filters-main__subfilter_active', 'catalog-filters-main__subfilter_active', 'catalog-filters__category_active', 'catalog-filters-main_active', "catalog-filters__parts_active", "catalog-filters__hr_active", 'fadeout'];
				itemsToAdd = [markFiltersBtn, markBlock];
				classesToAdd = ['catalog-filters-main__subfilter_active', "catalog-filters__mark_active"];
				removeClasses(itemsToRemove, classesToRemove);
				addClasses(itemsToAdd, classesToAdd);
				if(!window.matchMedia("(max-width: 530px)").matches){
					chosenSubfilter.innerHTML = 'Марка автомобиля <span class="sub-cross js-sub-cross">✖</span>';
					chosenSubfilter.style.display = 'inline-block';
				} else{
					chosenSubfilterBlock.innerText = markFiltersBtn.innerText;
				}
				break;
		}
		subCross = document.querySelector('.js-sub-cross');
		subCross.addEventListener('click', () => {
			subCross.parentNode.classList.add('fadeout');
			setTimeout(() => {
				subCross.parentNode.style.display = 'none';
			}, 499);
			removeClasses([partsFiltersBtn, markFiltersBtn, categoriesMenu, mainSubfiltersBlock], ['catalog-filters-main__subfilter_active', 'catalog-filters-main__subfilter_active', 'catalog-filters__category_active', 'catalog-filters-main_active']);
			addClasses([allFiltersBtn, partsBlock, markBlock, hrBlock], ['catalog-filters-main__subfilter_active', "catalog-filters__parts_active", "catalog-filters__mark_active", "catalog-filters__hr_active"]);
		});
	});
	subCross.addEventListener('click', () => {
		subCross.parentNode.classList.add('fadeout');
		setTimeout(() => {
			subCross.parentNode.style.display = 'none';
		}, 499);
		removeClasses([partsFiltersBtn, markFiltersBtn, categoriesMenu, mainSubfiltersBlock], ['catalog-filters-main__subfilter_active', 'catalog-filters-main__subfilter_active', 'catalog-filters__category_active', 'catalog-filters-main_active']);
		addClasses([allFiltersBtn, partsBlock, markBlock, hrBlock], ['catalog-filters-main__subfilter_active', "catalog-filters__parts_active", "catalog-filters__mark_active", "catalog-filters__hr_active"]);
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

	// Items/Cards count
	const itemsCounter = document.querySelector('.catalog-counter__text');

	itemsCounter.addEventListener('click', () => {
		if(!itemsCounter.classList.contains('catalog-counter__text_active')) addClasses([itemsCounter], ['catalog-counter__text_active']);
		else removeClasses([itemsCounter], ['catalog-counter__text_active']);
	});

	// Adding chosen filters
	const chosenFiltersBlock = document.querySelector('.catalog__chosen-filters'),
		allFiltersBlock = document.querySelector('.catalog-filters__block');
	let chosenFilters = [];
	let chosenFilter;

	allFiltersBlock.addEventListener('click', event => {
		if(event.target.classList.contains('catalog-filters__filter')){
			chosenFilter = event.target;
			event.target.classList.add('catalog-filters__filter_active');
			renderChosenFilters();
		}
	});
});