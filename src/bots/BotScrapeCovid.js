const cheerio = require('cheerio');
const axios = require('axios');
const request = require('request');

request(
  'https://www.worldometers.info/coronavirus/',
  (error, response, html) => {
    if (!error && response.statusCode == 200) {
      console.log(html);
    }
  }
);

// axios.get('https://www.worldometers.info/coronavirus/').then(response => {
// const $ = cheerio.load(response.data);
// const data = [];
// $('#main_table_countries_today thead th').each(function() {
//   data.push($(this).text());
//   console.log($(this).text());
// });
// console.log(data);
//   console.log(response.data);
// });
