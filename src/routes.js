const dataset = require('./dataset/covid.json');
const { Router } = require('express');

const routes = new Router();

routes.get('/allCountries', (request, response) => {
  return response.json({ msg: 'ok Pedro humilde' });
});

routes.get('/allData', (req, res) => {
  return res.json(dataset);
})

routes.get('/countries', (req, res) => {
  const {country} = req.query
  
  const data = dataset.filter( (item) => 
    country.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
        ==
    item.country_other.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
  )

  return res.json(data)
})

module.exports = routes;
