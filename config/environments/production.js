'use strict';

const defaults = require('./defaults');

module.exports = {
  ...defaults,
  trustedToken: process.env.TRUSTED_TOKEN,
  script: `deploy.sh`
};
