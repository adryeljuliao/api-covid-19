const { Router } = require('express');

const routes = new Router();

const CountryController = require('./controllers/CountryController');

routes.get('/', CountryController.index);
routes.get('/countries', CountryController.index);
routes.get('/countries/:country', CountryController.show);

module.exports = routes;
