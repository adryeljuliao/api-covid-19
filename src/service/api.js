const axios = require('axios');
const { BASEURL } = require('../constants');

const apiAxios = axios.create({
  baseURL: BASEURL
});

module.exports = apiAxios;
