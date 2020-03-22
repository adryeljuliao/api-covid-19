const express = require('express');
const cors = require('cors');
const CronJob = require('cron').CronJob;

const routes = require('./routes');
const updateDataCovid = require('./bots');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.jobUpdateDataset();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }
  jobUpdateDataset() {
    const job = new CronJob('0 */10 * * * *', function() {
      const d = new Date();
      console.log('At Ten Minutes:', d);
      updateDataCovid();
    });
    job.start();
  }
  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
