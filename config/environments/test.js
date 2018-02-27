'use strict';
const bunyan = require('bunyan');

const defaults = require('./defaults');

defaults.logger.level(bunyan.FATAL + 1);

module.exports = Object.assign({}, defaults, {
  trustedToken: 'trustedToken',
  script: 'test.sh'
});
