import {getData} from "./getData.js";
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
				btnAddWishList = document.querySelector('.btn-add-wishlist');

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
	};

	if(location.hash && location.pathname.includes('card')){
		getData.item(location.hash.substring(1), renderCard)
	}
}