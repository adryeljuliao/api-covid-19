const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const apiAxios = require('../service/api');
const dateControlDataset = require('../dataset/timestamp.json');

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
  const { timestamp } = dateControlDataset;
  const data = [];
  const dateCurrent = new Date();
  const fullYearCurrent = `${dateCurrent.getFullYear()}`;
  const monthCurrent = `${String(dateCurrent.getMonth() + 1).padStart(2, '0')}`;
  const dayCurrent = `${String(dateCurrent.getDate()).padStart(2, '0')}`;

  const dateControl = new Date(timestamp);
  if (dateControl.getDate() != dateCurrent.getDate()) {

    const fullYear = `${dateControl.getFullYear()}`;
    const month = `${String(dateControl.getMonth() + 1).padStart(2, '0')}`;
    
    const nameDir = `dataset_${fullYear}${month}`;

    const newDir = `src/dataset/${nameDir}`;
    shell.mkdir(`${newDir}`);
    shell.mv('src/dataset/datasetcovid*.json', `${newDir}`);
    fs.writeFileSync(
      path.join(__dirname, '..', `dataset/timestamp.json`),
      JSON.stringify({ timestamp: dateCurrent.getTime() })
    );
  }
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
        dataCountry['timestamp_at'] = dateCurrent.getTime();
        data.push(dataCountry);
      });
    })
    .catch(error => {
      console.log(error);
    });

  fs.writeFileSync(
    path.join(
      __dirname,
      '..',
      `dataset/datasetcovid_${fullYearCurrent}${monthCurrent}${dayCurrent}.json`
    ),
    JSON.stringify(data)
  );

  fs.writeFileSync(
    path.join(__dirname, '..', `dataset/covidapi.json`),
    JSON.stringify(data)
  );
}

updateDataCovid();
