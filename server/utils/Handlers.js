const API = require('./API');

class Handlers {
	_createDefaultItem (product, initialCurrency) {
		const { id, title, condition } = product;

		return {
			id,
			title,
			condition,
			picture: product.thumbnail,
			free_shipping: (product.shipping && product.shipping.free_shipping) ? true : false,
			price: {
				...initialCurrency,
				amount: product.price
			}
		};
	};

	createCategories (data) {
		let filter = data.filters.find(filter => filter.id === 'category');

		data.categories = filter ? filter.values.map(category => category.name) : [];

		return data;
	};

	createSearchResponseObject (data, initialCurrency) {
		let items = data.results.map(product => this._createDefaultItem(product, initialCurrency));

		data.items = items;

		return data;
	};

	createInternalResponseObject (data, initialCurrency) {
		const { sold_quantity, description } = data;

		let item = this._createDefaultItem(data, initialCurrency);

		return {
			...item,
			sold_quantity,
			description: description.plain_text
		}
	};

	mergeItemAndDescription (result, id) {
		return API.getItemDescriptionById(id)
		.then(description => ({
			...result,
			description
		}))
		.catch(error => error.response)
	};
};

module.exports = new Handlers();
