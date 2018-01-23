const axios = require('axios');

const ML_API = "https://api.mercadolibre.com";

const API = {
	getCurrency: symbol => (
		axios.get(`${ML_API}/currencies/ARS`)
		.then(response => response.data)
		.then(currency => ({
				currency: currency.symbol,
				decimals: currency.decimal_places
			}))
		.catch(error => error.response)
	),

	search: q => (
		axios.get(`${ML_API}/sites/MLA/search`, {
			params: {
				q,
				limit: 4
			}
		})
		.then(response => response.data)
		.catch(error => error.response)
	),

	searchById: id => (
		axios.get(`${ML_API}/items/${id}`)
		.then(response => response.data)
		.catch(error => error.response)
	),

	getItemDescriptionById: id => (
		axios.get(`${ML_API}/items/${id}/description`)
		.then(response => response.data)
		.catch(error => error.response)
	)
};

module.exports = API;