'use strict';

const defaults = require('./defaults');

module.exports = Object.assign({
  trustedToken: process.env.TRUSTED_TOKEN,
  script: `deploy.sh`
}, defaults);
