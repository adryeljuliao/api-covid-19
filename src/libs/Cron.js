const CronJob = require('cron').CronJob;
const shell = require('shelljs');

const { updateCoronaJob } = require('../config/cron');
const updateDataCovid = require('../bots');

class Cron {
  init() {
    const job = new CronJob(updateCoronaJob, async () => {
      const d = new Date();
      console.log('At Ten Minutes:', d);
      // await updateDataCovid();
      shell.exec('git add .');
      shell.exec('git status');
      shell.exec('git commit -m "Auto update dataset"');
      shell.exec('git push');
    });
    job.start();
  }
}

module.exports = new Cron();
