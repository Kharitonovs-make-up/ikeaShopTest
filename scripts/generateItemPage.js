import {getData} from "./getData.js";
import userData from "./userData.js";
const COUNTER = 5;

export const generateItemPage = () => {
	const renderCard = ({ category, count, description, id, img: image, name: itemName, price, subcategory }) => {
		const goodImages = document.querySelector('.good-images'),
				goodItemNew = document.querySelector('.good-item__new'),
				goodItemHeader = document.querySelector('.good-item__header'),
				goodItemDescription = document.querySelector('.good-item__description'),
				goodItemEmpty = document.querySelector('.good-item__empty'),
				goodItemPriceValue = document.querySelector('.good-item__price-value'),
				btnGood = document.querySelector('.btn-good'),
				btnAddWishList = document.querySelector('.btn-add-wishlist'),
				breadcrumbLink = document.querySelectorAll('.breadcrumb__link');

		breadcrumbLink[0].textContent = category;
		breadcrumbLink[0].href = `goods.html?cat=${category}`
		breadcrumbLink[1].textContent = subcategory;
		breadcrumbLink[1].href = `goods.html?cat=${subcategory}`
		breadcrumbLink[2].textContent = itemName;

		goodImages.textContent = '';
		// goodItemNew
		goodItemHeader.textContent = itemName;
		goodItemDescription.textContent = description;
		goodItemPriceValue.textContent = price;
		btnGood.dataset.idd = id;
		btnAddWishList.dataset.idd = id;
		image.forEach(item => {
			goodImages.insertAdjacentHTML('afterbegin', `
				<div class="good-image__item">
					<img src="${item}" alt="${name} - ${description}">
				</div>
			`)
		})

		if(count >= COUNTER){
			goodItemNew.style.display = 'block'
		} else if(!count) {
			goodItemEmpty.style.display = 'block'
			btnGood.style.display = 'none'
		}

		const checkWishList = () => {
			if(userData.wishList.includes(id)){
				btnAddWishList.classList.add('contains-wishlist');
			} else {
				btnAddWishList.classList.remove('contains-wishlist');
			}
		}

		btnAddWishList.addEventListener('click', () => {
			userData.wishList = id;
			checkWishList();
		})

		btnGood.addEventListener('click', () => {
			userData.cartList = id;
		})
		checkWishList();
	};

	if(location.hash && location.pathname.includes('card')){
		getData.item(location.hash.substring(1), renderCard)
	}
}