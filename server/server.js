require('dotenv').config();

const express = require('express'),
	app = express(),
	server = require('http').Server(app),
	api = express.Router(),
	axios = require('axios'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	API = require('./utils/API'),
	Handlers = require('./utils/Handlers');

app.use(bodyParser.json());
app.use(cors());

const ML_API = "https://api.mercadolibre.com";
const CURRENCY = process.env.CURRENCY || 'ARS';

let initialObject = {
		author: {
			name: 'Guilherme',
			lastname: 'Paiva'
		}
	},
	initialCurrency = {};

// GET CURRENCY FORMAT
API.getCurrency(CURRENCY).then(currency => initialCurrency = currency);

api.route('/items')
	.get((req, res) => {
		if(!req.query.q) res.status(400).json({error: 'Miss query q param'});

		API.search(req.query.q)
		.then(data => {
			if(!data.results || data.results <= 0) res.status(404).json({error: 'No results'});

			return data;
		})
		.then(Handlers.createCategories)
		.then(data => Handlers.createSearchResponseObject(data, initialCurrency))
		.then(({ items, categories }) => ({
			...initialObject,
			items,
			categories
		}))
		.then(final => res.json(final))
		.catch(error => res.status(error.status).json({error: error.data}));
	});


api.route('/items/:id')
	.get((req, res) => {
		let item = {};

		API.searchById(req.params.id)
		.then(result => Handlers.mergeItemAndDescription(result, req.params.id))
		.then(productWithDescription => Handlers.createInternalResponseObject(productWithDescription, initialCurrency))
		.then(item => ({
			...initialObject,
			item,
		}))
		.then(final => res.json(final))
		.catch(error => res.status(error.status).json({error: error.data}));
	});


app.use('/api', api);

server.listen(process.env.PORT || 3001, () => {
	console.log(`running on ${process.env.PORT || 3001}`);
});
