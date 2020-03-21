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

function formaterLabels(labels) {
  let labelsFormat = labels.map((item, index) => {
    if (index == labels.length - 1) {
      item = 'cases_to_1m_population';
      return item;
    }
    item = item
      .replace(',', '')
      .match(/[A-Z][a-z]+/g)
      .join(' ')
      .replace(' ', '_')
      .toLowerCase();
    return item;
  });
  return labelsFormat;
}

axios.get('https://www.worldometers.info/coronavirus/').then(response => {
  const $ = cheerio.load(response.data);
  const data = [];
  let labelsHead = [];
  $('#main_table_countries_today thead th').each(function() {
    labelsHead.push($(this).text());
  });
  labelsHead = formaterLabels(labelsHead);
  $('#main_table_countries_today tbody tr').each(function(indexRow) {
    let dataCountry = {};
    $(this)
      .find('td')
      .each(function(indexColumn) {
        key = labelsHead[indexColumn];
        dataCountry[key] = $(this)
          .text()
          .trim()
          .replace('+', '');
      });
    data.push(dataCountry);
  });
  console.log(data);
});
