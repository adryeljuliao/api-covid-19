const dataset = require('../dataset/covid.json');

module.exports = {
  async show(req, res) {
    const { country } = req.query;
    if (!country) {
      return res.status(400).send('Query param COUNTRY is required');
    }
    const data = dataset.filter(item =>
      item.country_other.toLowerCase().includes(country.toLowerCase())
    )[0];

    return res.json(data);
  }
};
