const winston = require('winston');

var tools = require("./tools.js");

var logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: './logs/info.log', level: 'info' }),
      new winston.transports.Console()
    ],
  })

function log(content) {
    logger.log('info', tools.getCurrentDateTime() + ": " + content);
    
}

module.exports = { log };