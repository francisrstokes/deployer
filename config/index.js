'use strict';

require('dotenv').config();
const env = process.env.NODE_ENV || 'development';
module.exports = require(`./environments/${env}`);
