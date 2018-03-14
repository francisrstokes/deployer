'use strict';

const defaults = require('./defaults');

module.exports = Object.assign({}, defaults, {
  trustedToken: process.env.TRUSTED_TOKEN
});
