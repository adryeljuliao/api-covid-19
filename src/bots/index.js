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
  const fullYear = `${dateCurrent.getFullYear()}`;
  const month = `${String(dateCurrent.getMonth() + 1).padStart(2, '0')}`;
  const day = `${String(dateCurrent.getDate()).padStart(2, '0')}`;
  const hour = `${String(dateCurrent.getHours()).padStart(2, '0')}h`;

  const dateControl = new Date(timestamp);

  if (dateControl.getDate() != dateCurrent.getDate()) {
    const nameDir = `dataset_${fullYear}_${month}_${day}`;

    const newDir = `src/dataset/${nameDir}`;
    shell.mkdir(`${newDir}`);
    shell.mv('src/dataset/datasetcovid*.json', `${newDir}`);
    fs.writeFileSync(
      path.join(__dirname, '..', `dataset/date_current.json`),
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
        dataCountry['timestamp_at'] = dateCurrent;
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
      `dataset/datasetcovid_${fullYear}_${month}_${day}_${hour}.json`
    ),
    JSON.stringify(data)
  );

  fs.writeFileSync(
    path.join(__dirname, '..', `dataset/covidapi.json`),
    JSON.stringify(data)
  );
}

updateDataCovid();
