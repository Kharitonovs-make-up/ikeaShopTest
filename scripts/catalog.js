import {getData} from "./getData.js";
import {generateSubCatalog} from "./generateSubCatalog.js";

export const catalog = () => {
	// принимаем ф-ию для обновления subcatalog
	const updateSubCatalog = generateSubCatalog();
	const btnBurger = document.querySelector('.btn-burger'),
			catalog = document.querySelector('.catalog'),
			subCatalog = document.querySelector('.subcatalog'),
			subCatalogHeader = document.querySelector('.subcatalog-header');
			//btnReturn = document.querySelector('.btn-return');

	const overlay = document.createElement('div');
	overlay.classList.add('overlay');
	document.body.append(overlay);

	const openMenu = () => {
		catalog.classList.add('open');
		overlay.classList.add('active');
	}

	const closeMenu = () => {
		closeSubMenu();
		catalog.classList.remove('open');
		overlay.classList.remove('active');
	}

	const handlerCatalog = (event) => {
		event.preventDefault();
		const target = event.target;
		const itemList = target.closest('.catalog-list__item');
		if(itemList){
			getData.subCatalog(itemList.textContent, (data) => {
				// заполняем сабкаталог из БД
				updateSubCatalog(itemList.textContent, data);
				subCatalog.classList.add('subopen');
			})
		}
		if(event.target.closest('.btn-close')){
			closeMenu()
		}
	}

	const closeSubMenu = () => {
		subCatalog.classList.remove('subopen');
	}

	btnBurger.addEventListener('click', openMenu);
	// btnClose.addEventListener('click', closeMenu);
	overlay.addEventListener('click', closeMenu);
	catalog.addEventListener('click', handlerCatalog);
	// btnReturn.addEventListener('click', closeSubMenu);
	subCatalog.addEventListener('click', event => {
		const btnReturn = event.target.closest('.btn-return');
		if(btnReturn){
			closeSubMenu();
		}
	})
	document.addEventListener('keydown', (event) => {
		if(event.code === 'Escape'){
			closeMenu();
		}
	})
}