// This is the base for a new TS app file - REPLACE_ME with description of file

import winston from 'winston';

export const l = winston.createLogger({
    level: 'silly', // log all messages, including 'debug', 'verbose', 'info', 'warn', and 'error'
    format: winston.format.simple(), // log in a simple format
    defaultMeta: { service: 'REPLACE_ME' }, // default metadata
    transports: [
        new winston.transports.Console(), // log all levels to the console
    ],
});

l.info("Hello world!");