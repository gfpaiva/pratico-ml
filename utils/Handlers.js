const API = require('./API');

class Handlers {
	/**
	 * Create a default object with essential info to api response
	 * @param {Object} product Single item object
	 * @param {Object} initialCurrency Currency info object
	 * @return {Object} Item object to response
	 */
	_createDefaultItem (product, initialCurrency) {
		const { id, title, condition } = product;

		return {
			id,
			title,
			condition,
			picture: product.thumbnail, // didnt found a large image :(
			free_shipping: (product.shipping && product.shipping.free_shipping) ? true : false,
			price: {
				...initialCurrency,
				amount: product.price
			}
		};
	};

	/**
	 * Create a array with all categories found in MLAPI
	 * @param {Object} data Total api response
	 * @return {Array} All categories in a array of strings
	 */
	createCategories (data) {
		let filter = data.filters.find(filter => filter.id === 'category');

		data.categories = filter ? filter.values.map(category => category.name) : [];

		return data;
	};

	/**
	 * Iterate in all results on search MLAPI and return new default format
	 * @param {Object} data Total api response
	 * @return {Object} Total data with rewrited items
	 */
	createSearchResponseObject (data, initialCurrency) {
		let items = data.results.map(product => this._createDefaultItem(product, initialCurrency));

		data.items = items;

		return data;
	};

	/**
	 * Get single item from MLAPI and return in new default format
	 * @param {Object} data Total api response
	 * @param {Object} initialCurrency Currency info object
	 * @return {Object} New item format
	 */
	createInternalResponseObject (data, initialCurrency) {
		const { sold_quantity, description } = data;

		let item = this._createDefaultItem(data, initialCurrency);

		return {
			...item,
			sold_quantity,
			description: description.plain_text
		}
	};

	/**
	 * Get description on MLAPI and merge with item object
	 * @param {Object} result formated item
	 * @param {String} id Product id
	 * @return {Promise} Promise with merged data
	 */
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
