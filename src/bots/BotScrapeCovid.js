const cheerio = require('cheerio');
const axios = require('axios');
const request = require('request');

// request(
//   'https://www.worldometers.info/coronavirus/',
//   (error, response, html) => {
//     if (!error && response.statusCode == 200) {
//       console.log(html);
//     }
//   }
// );

axios.get('https://www.worldometers.info/coronavirus/').then(response => {
  const $ = cheerio.load(response.data);
  const data = [];
  const labelsHead = [];
  $('#main_table_countries_today thead th').each(function() {
    labelsHead.push(
      $(this)
        .text()
        .toLowerCase()
        .replace(',', '')
        .replace(/( |\/){1,}/g, '')
        .trim()
    );
  });

  $('#main_table_countries_today tbody tr').each(function(indexRow) {
    let dataCountry = {};
    $(this)
      .find('td')
      .each(function(indexColumn) {
        key = labelsHead[indexColumn];
        dataCountry[key] = $(this)
          .text()
          .trim();
      });
    data.push(dataCountry);
  });
  console.log(data);
});
