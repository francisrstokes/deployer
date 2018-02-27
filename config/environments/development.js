'use strict';

const defaults = require('./defaults');

module.exports = Object.assign({}, defaults, {
  trustedToken: 'trustedToken',
  script: `deploy.sh`
});
