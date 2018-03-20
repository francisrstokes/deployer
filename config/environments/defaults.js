'use strict';

const bunyan = require('bunyan');

module.exports = {
  api: {
    port: process.env.PORT || 3000
  },
  logger: bunyan.createLogger({name: `Deployer`}),
  DOCKER_USERNAME: process.env.DOCKER_USERNAME,
  DOCKER_PASSWORD: process.env.DOCKER_PASSWORD
};
