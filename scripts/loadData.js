import {getData} from './getData.js'

const wishList = ['idd005', 'idd032', 'idd033', 'idd095'];
const cartList = [
	{
		id: 'idd015',
		count: 3
	},
	{
		id: 'idd045',
		count: 1
	},
	{
		id: 'idd055',
		count: 2
	},
	{
		id: 'idd025',
		count: 3
	}
];

export const loadData = () => {
	if (location.search){
		const search = decodeURI(location.search).split('=');
		const prop = search[0].slice(1);
		const value = search[1];

		if(prop === 's'){
			getData.search(value, (data) => console.dir({search: data}))
		} else if(prop === 'wishlist'){
			getData.wishList(wishList, (data) => console.dir({wishList: data}));
		} else if(prop === 'cat' || prop === 'subcat'){
			getData.category(prop, value, (data) => console.dir({category: data}))
		}
	}
	if(location.hash){
		getData.item(location.hash.substring(1), (data) => console.log(data))
	}

	if (location.pathname.includes('cart')){
		getData.cart(cartList, (data) => console.log(data));
	}

};