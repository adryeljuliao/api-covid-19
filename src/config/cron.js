// ┌─────────────── second (opcional)
// │ ┌───────────── minute (0 - 59)
// │ │ ┌───────────── hour (0 - 23)
// │ │ │ ┌───────────── day of the month (1 - 31)
// │ │ │ │ ┌───────────── month (1 - 12)
// │ │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday;
// │ │ │ │ │ │                                   7 is also Sunday on some systems)
// │ │ │ │ │ │
// │ │ │ │ │ │
// * * * * * * command to execute

module.exports = {
  updateCoronaJob: '*/30 * * * * *'
};
