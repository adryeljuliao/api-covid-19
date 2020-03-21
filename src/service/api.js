const axios = require('axios');
const { BASEURL } = require('../utils/Constants');

const apiAxios = axios.create({
  baseURL: BASEURL
});

module.exports = apiAxios;
