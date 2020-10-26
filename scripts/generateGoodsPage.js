import {getData} from "./getData.js";

const COUNTER = 5;
//'idd005', 'idd032', 'idd033', 'idd095'
const wishList = [];

export const generateGoodsPage = () => {
	const mainHeader = document.querySelector('.main-header');
	const goodsList = document.querySelector('.goods-list');

	const generateCards = (data) => {
		goodsList.textContent = '';
		if(!data.length){
			const goods = document.querySelector('.goods');
			goods.textContent = location.search === '?wishlist' ?
					'Список желаний пуст' :
					'К сожалению по вашему запросу ничего не найдено';
			return;
		}

		data.forEach(item => {
			const {name: itemName, price, description, id, img: image, count} = item;
			// https://www.ikea.com/ru/ru/images/products/fabler-byorn-myagkaya-igrushka-bezhevyy__0710165_PE727396_S5.JPG
			// https://www.ikea.com/ru/ru/images/products/fabler-byorn-myagkaya-igrushka-bezhevyy__0876876_PE611263_S5.JPG
			goodsList.insertAdjacentHTML('afterbegin', `
				<li class="goods-list__item">
					<a class="goods-item__link" href="card.html#${id}">
						<article class="goods-item">
							<div class="goods-item__img">
								<img src=${image[0]}
									 ${image[1] ? `data-second-image=${image[1]}`: ''}>
							</div>
							${COUNTER < count ? `<p class="goods-item__new">Новинка</p>` : ''}
							${!count ? `<p class="goods-item__new">Нет в наличии</p>` : ''}
							<h3 class="goods-item__header">${itemName}</h3>
							<p class="goods-item__description">${description}</p>
							<p class="goods-item__price">
								<span class="goods-item__price-value">${price}</span>
								<span class="goods-item__currency"> ₽</span>
							</p>
							${count ? `<button class="btn btn-add-card" aria-label="Добавить в корзину" 
								data-idd="${id}"></button>` : ''}
						</article>
					</a>
				</li>
			`)
		})
	}

	if (location.pathname.includes('goods') && location.search){
		const search = decodeURI(location.search).split('=');
		const prop = search[0].slice(1);
		const value = search[1];

		if(prop === 's'){
			getData.search(value, generateCards)
			mainHeader.textContent = `Поиск ${value}`
		} else if(prop === 'wishlist'){
			getData.wishList(wishList, generateCards);
			mainHeader.textContent = `Желания`
		} else if(prop === 'cat' || prop === 'subcat'){
			getData.category(prop, value, generateCards)
			mainHeader.textContent = `категория ${value}`
		}
	}
}
