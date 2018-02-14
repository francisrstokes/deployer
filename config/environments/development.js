'use strict';

const defaults = require('./defaults');

module.exports = {
  ...defaults,
  trustedToken: 'trustedToken',
  script: `deploy.sh`
};
