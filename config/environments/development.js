'use strict';

const defaults = require('./defaults');

module.exports = Object.assign({
  trustedToken: 'trustedToken',
  script: `deploy.sh`
}, defaults);
