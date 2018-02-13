'use strict';

const {api: {port}, logger} = require('./config');
const app = require('./app');
app.listen(port, () => {
  logger.info({port}, `Deployer started`);
});
