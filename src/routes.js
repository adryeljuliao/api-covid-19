const { Router } = require('express');

const routes = new Router();

const CountryController = require('./controllers/CountryController');

routes.get('/countries', CountryController.index);
routes.get('/countries', CountryController.show);

module.exports = routes;
