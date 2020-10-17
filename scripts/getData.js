const PARAM = {
	cat: 'category',
	subcat: 'subcategory',
	search: ['name', 'description', 'category', 'subcategory']
};

export const getData = {
	url: 'database/database.json',
	get(process){
		fetch(this.url)
				.then((response) => response.json())
				.then(process)
				.catch((err) => console.log(err))
	},
	wishList(list, callback){
		this.get((data) => {
			let result = data.filter((item) => list.includes(item.id));
			callback(result);
		})
	},
	item(value, callback){
		this.get((data) => {
			let result = data.find((item) => item.id === value);
			callback(result);
		})
	},
	cart(cartList, callback){
		this.get((data) => {
			let result = data.filter(item => cartList
					.some(obj => obj.id === item.id));
			callback(result);
		})
	},
	category(prop, value, callback){
		this.get((data) => {
			const result = data.filter((item) =>
					item[PARAM[prop]].toLowerCase() === value.toLowerCase());
			callback(result);
		})
	},
	search(value, callback){
		this.get((data) => {
			const result = data.filter((item) => {
				for(const prop in item){
					if(PARAM.search.includes(prop) &&
							item[prop].toLowerCase().includes(value.toLowerCase())){
						return true;
					}
				}
			});
			callback(result);
		})
	},
	catalog(callback){
		this.get((data) => {
			const result = data.reduce((arr, {category}) => {
				if(!arr.includes(category)){
					arr.push(category);
				}
				return arr;
			}, [])
			callback(result);
		});
	},
	subCatalog(value, callback) {
		this.get((data) => {
			const result = data.filter((item) => item.category === value)
					.reduce((arr, item) => {
						if(!arr.includes(item.subcategory)){
							arr.push(item.subcategory)
						}
						return arr;
					}, []);
			callback(result);
		})
	}
};

