const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

const { BASEURL } = require('../utils/Constants');

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

async function updateDataCovid() {
  const data = [];
  await axios.get(BASEURL).then(response => {
    const $ = cheerio.load(response.data);
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
  });
  fs.writeFileSync('../dataset/dataCovid.json', JSON.stringify(data));
}

module.exports = updateDataCovid();
