const { Router } = require('express');

const routes = new Router();

routes.get('/allCountries', (request, response) => {
  return response.json({ msg: 'ok' });
});

module.exports = routes;
