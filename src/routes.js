const { Router } = require('express');

const CountryController = require('./controllers/CountryController');
const routes = new Router();

routes.get('/allCountries', (request, response) => {
  return response.json({ msg: 'ok Pedro humilde' });
});

routes.get('/allData', (req, res) => {
  return res.json(dataset);
});

routes.get('/countries', CountryController.show);

module.exports = routes;
