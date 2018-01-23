import axios from 'axios';

const ML_API = `//localhost:3001/api`;

export const search = term => (
	axios.get(`${ML_API}/items`, {
		params: {
			q: term,
		}
	})
	.then(response => response.data)
	.catch(error => Promise.reject(error.response))
);

export const getProductById = id => (
	axios.get(`${ML_API}/items/${id}`)
	.then(response => response.data)
	.catch(error => Promise.reject(error.response))
);


