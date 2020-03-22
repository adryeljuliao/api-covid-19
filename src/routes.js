const { Router } = require('express');

const routes = new Router();

const CountryController = require('./controllers/CountryController');

routes.get('/allData', (req, res) => {
  return res.json(dataset);
});

routes.get('/countries', CountryController.show);

module.exports = routes;
