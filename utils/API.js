const axios = require('axios');

const ML_API = "https://api.mercadolibre.com";

const API = {
	/**
	 * Get currency info (symbol, decimals)
	 * @param {String} symbol formated item
	 * @return {Promise} currency info (symbol, decimals)
	 */
	getCurrency: symbol => (
		axios.get(`${ML_API}/currencies/${symbol}`)
		.then(response => response.data)
		.then(currency => ({
				currency: currency.symbol,
				decimals: currency.decimal_places
			}))
			.catch(error => Promise.reject(error.response))
	),

	/**
	 * Search items ML limit 4
	 * @param {String} q QueryString Search Term
	 * @return {Promise} Search result
	 */
	search: q => (
		axios.get(`${ML_API}/sites/MLA/search`, {
			params: {
				q,
				limit: 4
			}
		})
		.then(response => response.data)
		.catch(error => Promise.reject(error.response))
	),

	/**
	 * Search a single item by ID
	 * @param {String} id Product Id
	 * @return {Promise} Search result
	 */
	searchById: id => (
		axios.get(`${ML_API}/items/${id}`)
		.then(response => response.data)
		.catch(error => Promise.reject(error.response))
	),

	/**
	 * Search item desciption text by product ID
	 * @param {String} id Product Id
	 * @return {Promise} Search result
	 */
	getItemDescriptionById: id => (
		axios.get(`${ML_API}/items/${id}/description`)
		.then(response => response.data)
		.catch(error => Promise.reject(error.response))
	)
};

module.exports = API;
