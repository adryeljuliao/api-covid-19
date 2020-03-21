const cheerio = require('cheerio');
const fs = require('fs');

const apiAxios = require('../service/api');

function formatLabels(labels) {
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

async function updateDataCovid() {
  const data = [];
  await apiAxios
    .get('/')
    .then(response => {
      const $ = cheerio.load(response.data);
      let labelsHead = [];
      $('#main_table_countries_today thead th').each(function() {
        labelsHead.push($(this).text());
      });

      labelsHead = formatLabels(labelsHead);

      $('#main_table_countries_today tbody tr').each(function() {
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
    })
    .catch(error => {
      console.log(error);
    });
  fs.writeFileSync('../dataset/covid.json', JSON.stringify(data));
}

updateDataCovid();