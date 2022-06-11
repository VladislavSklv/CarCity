window.addEventListener('DOMContentLoaded', () => {
	const cardsContainer = document.querySelector('.card__wrapper'),
		allFilters = document.querySelectorAll('.catalog-filters__filter');

	getCards();

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
	async function getCards(){
		const response = await fetch('./js/cards.json');
		const cardsArray = await response.json();
		
		renderCards(cardsArray);
	}

	let missedCards = [];
	let cardClassNum;
	function renderCards(cardsArray){
		checki: for(let i = 0; i < cardsArray.length; i++){
			cardClassNum = 'card_5';

			if(window.matchMedia('(max-width: 1401px)').matches && !window.matchMedia('(max-width: 878px)').matches){
				cardClassNum = 'card_4';
				if(i >= 12){
					missedCards.push(cardsArray[i]);
					continue checki;
				}
			}
			if(window.matchMedia('(max-width: 878px)').matches && !window.matchMedia('(max-width: 530px)').matches){
				cardClassNum = 'card_3';
				if(i >= 18){
					missedCards.push(cardsArray[i]);
					continue checki;
				}
			}
			if(window.matchMedia('(max-width: 530px)').matches){
				cardClassNum = 'card_2';
				if(i >= 4){
					missedCards.push(cardsArray[i]);
					continue checki;
				}
			}
			if(!window.matchMedia('(max-width: 1401px)').matches){
				cardClassNum = 'card_5';
				if(i >= 20){
					missedCards.push(cardsArray[i]);
					continue checki;
				}
			}
			render(cardClassNum, cardsArray[i].imgSrc, cardsArray[i].title, cardsArray[i].text);
		}
	}

	function render(num, imgSrc, title, text){
		const cardHTML = `<!-- Item -->
						<div class="card ${num}">
							<div class="card__img">
								<img src="img/items/${imgSrc}" alt="image">
							</div>
							<div class="card__info">
								<div class="card__title">${title}</div>
								<div class="card__text">${text}</div>
							</div>
						</div>
						<!--// Item -->`

		cardsContainer.insertAdjacentHTML('beforeend', cardHTML);
	}
	
	async function filterCards(){
		let allChosenFilters = document.querySelectorAll('.catalog__chosen-filter');
		let filteredCards = [];
		let allCards = document.querySelectorAll('.card');
		missedCards = [];

		allCards.forEach(card => {
			card.remove();
		});

		const response = await fetch('./js/cards.json');
		const cardsArray = await response.json();

		cardsArray.forEach(card => {
			allChosenFilters.forEach(filter => {
				card.text.split(', ').forEach(word => {
					if(word.toLowerCase() == filter.dataset.filter.toLowerCase()) filteredCards.push(card);
				});
			});
		});

		filteredCards = filteredCards.filter((element, index) => {
			return filteredCards.indexOf(element) === index;
		});

		missedCards = [];

		if(window.matchMedia('(max-width: 1401px)').matches && !window.matchMedia('(max-width: 878px)').matches){
			catalogWrapper.style.paddingBottom = '168px';
		} else if(window.matchMedia('(max-width: 878px)').matches && !window.matchMedia('(max-width: 530px)').matches){
			catalogWrapper.style.paddingBottom = '150px';
		} else if(window.matchMedia('(max-width: 530px)').matches){
			catalogWrapper.style.paddingBottom = '77px';
		} else {
			catalogWrapper.style.paddingBottom = '174px';
		}

		checki: for(let i = 0; i < filteredCards.length; i++){

			if(cardClassNum == 'card_4'){
				if(i >= 12){
					missedCards.push(filteredCards[i]);
					continue checki;
				}
			}else if(cardClassNum == 'card_3'){
				if((window.matchMedia('(max-width: 1401px)').matches && !window.matchMedia('(max-width: 878px)').matches) || !window.matchMedia('(max-width: 1401px)').matches){
					if(i >= 6){
						missedCards.push(filteredCards[i]);
						continue checki;
					}
				} else if(window.matchMedia('(max-width: 878px)').matches && !window.matchMedia('(max-width: 530px)').matches){
					if(i >= 18){
						missedCards.push(filteredCards[i]);
						continue checki;
					}
				}
			}else if(cardClassNum == 'card_2'){
				if(!window.matchMedia('(max-width: 1401px)').matches){
					if(i >= 6){
						missedCards.push(filteredCards[i]);
						continue checki;
					}
				} else if(window.matchMedia('(max-width: 1401px)').matches && !window.matchMedia('(max-width: 878px)').matches || window.matchMedia('(max-width: 530px)').matches){
					if(i >= 4){
						missedCards.push(filteredCards[i]);
						continue checki;
					}
				} else if(window.matchMedia('(max-width: 878px)').matches && !window.matchMedia('(max-width: 530px)').matches){
					if(i >= 8){
						missedCards.push(filteredCards[i]);
						continue checki;
					}
				}
			}else if(cardClassNum == 'card_5'){
				if(i >= 20){
					missedCards.push(filteredCards[i]);
					continue checki;
				}
			}

			render(cardClassNum, filteredCards[i].imgSrc, filteredCards[i].title, filteredCards[i].text);
		}

		allChosenFilters = document.querySelectorAll('.catalog__chosen-filter');
		if(allChosenFilters.length == 0){
			renderCards(cardsArray);
		}
		showMoreBtn.style.display = 'block';
	}
	function renderChosenFilters(){
		const chosenFilterHTML = `<div data-filter="${chosenFilter.dataset.filter}" class="catalog__chosen-filter fadein">${chosenFilter.innerText} <span class="cross">✖</span></div>`;
		if(!chosenFilters.find(i => i === chosenFilterHTML)){
			chosenFiltersBlock.insertAdjacentHTML('beforeend', chosenFilterHTML);
			chosenFilters.push(chosenFilterHTML);
		}
			
		// Removing chosen filters
		const chosenFiltersCrosses = document.querySelectorAll('.cross');

		chosenFiltersCrosses.forEach(cross => {
			cross.addEventListener('click', () => {
				chosenFilters = chosenFilters.filter(i => i != `<div data-filter="${cross.parentNode.dataset.filter}" class="catalog__chosen-filter fadein">${cross.parentNode.innerHTML}</div>`);
				allFilters.forEach(filter => {
					if(filter.dataset.filter == cross.parentNode.dataset.filter){
						filter.classList.remove('catalog-filters__filter_active');
					}
				});
				cross.parentNode.classList.add('fadeout');
				setTimeout(() => {
					cross.parentNode.remove();
					filterCards();
				}, 499);
			});
			cross.removeEventListener('click', () => {
				chosenFilters = chosenFilters.filter(i => i != `<div data-filter="${cross.parentNode.dataset.filter}" class="catalog__chosen-filter fadein">${cross.parentNode.innerHTML}</div>`);
				allFilters.forEach(filter => {
					if(filter.dataset.filter == cross.parentNode.dataset.filter){
						filter.classList.remove('catalog-filters__filter_active');
					}
				});
				cross.parentNode.classList.add('fadeout');
				setTimeout(() => {
					cross.parentNode.remove();
					filterCards();
				}, 499);
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
			// Rendering filtered cards
			filterCards();
		}
	});

	// More info modal
	const moreInfoBtn = document.querySelector('.js-more-info'),
		modalOpacity = document.querySelector('.modal-opacity'),
		modalCenter = document.querySelector('.modal-center');


	moreInfoBtn.addEventListener('click', () => {
		modalOpacity.style.display = 'block';
		modalCenter.style.display = 'block';
		removeClasses([modalOpacity, modalCenter], ['fadeout', 'fadeout']);
		addClasses([modalOpacity, modalCenter], ['fadein', 'fadein']);
		modalOpacity.style.opacity = '1';
		modalCenter.style.opacity = '1';
	});

	modalOpacity.addEventListener('click', () => {
		removeClasses([modalOpacity, modalCenter], ['fadein', 'fadein']);
		addClasses([modalOpacity, modalCenter], ['fadeout', 'fadeout']);
		setTimeout(() => {
			modalOpacity.style.opacity = '0';
			modalCenter.style.opacity = '0';
			modalOpacity.style.display = 'none';
			modalCenter.style.display = 'none';
		}, 490 )
	});

	// Show more cards button
	const showMoreBtn = document.querySelector('.button_show-more');
	const catalogWrapper = document.querySelector('.catalog__wrapper');

	showMoreBtn.addEventListener('click', () => {
		let cardCounter = 0;
		while(cardCounter < 10 && missedCards.length != 0){
			render(cardClassNum, missedCards[0].imgSrc, missedCards[0].title, missedCards[0].text);
			missedCards.shift();
			cardCounter++;
		}

		if(missedCards.length == 0) {
			showMoreBtn.style.display = 'none';
			catalogWrapper.style.paddingBottom = 0;
		}
	});	

	// Changing number of showed cards on page
	const counterNumbersBlock = document.querySelector('.catalog-counter__menu'),
		counterNumbers = document.querySelectorAll('.catalog-counter__number');

	counterNumbersBlock.addEventListener('click', event => {
		if(event.target.innerText == 2){
			cardClassNum = 'card_2';
			counterNumbers.forEach(num => num.classList.remove('catalog-counter__number_active'));
			event.target.classList.add('catalog-counter__number_active');
			removeClasses([itemsCounter], ['catalog-counter__text_active']);
			filterCards();
		} else if(event.target.innerText == 3) {
			cardClassNum = 'card_3';
			counterNumbers.forEach(num => num.classList.remove('catalog-counter__number_active'));
			event.target.classList.add('catalog-counter__number_active');
			removeClasses([itemsCounter], ['catalog-counter__text_active']);
			filterCards();
		} else if(event.target.innerText == 4) {
			cardClassNum = 'card_4';
			counterNumbers.forEach(num => num.classList.remove('catalog-counter__number_active'));
			event.target.classList.add('catalog-counter__number_active');
			removeClasses([itemsCounter], ['catalog-counter__text_active']);
			filterCards();
		} else if(event.target.innerText == 5) {
			cardClassNum = 'card_5';
			counterNumbers.forEach(num => num.classList.remove('catalog-counter__number_active'));
			event.target.classList.add('catalog-counter__number_active');
			removeClasses([itemsCounter], ['catalog-counter__text_active']);
			filterCards();
		}
	});
});