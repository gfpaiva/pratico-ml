import axios from 'axios';

const ML_API = `/api`;

/**
 * Search items ML limit 4
 * @param {String} term QueryString Search Term
 * @return {Promise} Search result
 */
export const search = term => (
	axios.get(`${ML_API}/items`, {
		params: {
			q: term,
		}
	})
	.then(response => response.data)
	.catch(error => Promise.reject(error.response))
);

/**
 * Search a single item by ID
 * @param {String} id Product Id
 * @return {Promise} Search result
 */
export const getProductById = id => (
	axios.get(`${ML_API}/items/${id}`)
	.then(response => response.data)
	.catch(error => Promise.reject(error.response))
);


