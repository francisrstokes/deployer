'use strict';

const bunyan = require('bunyan');

module.exports = {
  api: {
    port: process.env.PORT || 3000
  },
  logger: bunyan.createLogger({name: `Moonshot Deployer`})
};
