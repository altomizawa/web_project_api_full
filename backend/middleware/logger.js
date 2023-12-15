const winston = require ('winston');
const expressWinston = require('express-winston');

//CREATING REQUEST LOGGER
const requestLogger = expressWinston.logger({
    transports: [
        new winston.transports.File({filename: 'request.log'}),
    ],
    format: winston.format.json(),
});


//CREATING ERROR LOGGER
const errorLogger = expressWinston.errorLogger({
    transports: [
        new winston.transport.File({filename: 'error.log'}),
    ],
    format: winston.format.json(),
});

module.exports = {
    requestLogger,
    errorLogger,
};