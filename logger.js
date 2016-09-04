const winston = require('winston');
const logglyToken = require('./credentials/loggly.json').token;
require('winston-loggly-bulk');
 
 winston.add(winston.transports.Loggly, {
       token: logglyToken,
       subdomain: "yangwei",
       tags: ["Winston-NodeJS"],
       json:true
 });

const logger = process.env.NODE_ENV === 'production' ?
  winston :
  console;

exports.logger = logger;
