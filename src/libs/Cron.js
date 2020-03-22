const CronJob = require('cron').CronJob;

const { updateCoronaJob } = require('../config/cron');
const updateDataCovid = require('../bots');

class Cron {
  init() {
    const job = new CronJob(updateCoronaJob, () => {
      const d = new Date();
      console.log('At Ten Minutes:', d);
      updateDataCovid();
    });
    job.start();
  }
}

module.exports = new Cron();
