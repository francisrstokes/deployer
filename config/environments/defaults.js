'use strict';

const bunyan = require('bunyan');

module.exports = {
  api: {
    port: process.env.PORT || 3000
  },
  logger: bunyan.createLogger({name: `Deployer`}),
  DOCKER_USERNAME: process.env.DOCKER_USERNAME,
  DOCKER_PASSWORD: process.env.DOCKER_PASSWORD,
  AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID
};
