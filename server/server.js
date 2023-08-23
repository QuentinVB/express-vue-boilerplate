#!/usr/bin/env node

/**
 * Module dependencies.
 */
require('dotenv').config();

const app = require('./app');
const debug = require('debug')();
const http = require('http');
const normalizePort = require('./middleware/httpPortNormaliser');
const onError = require('./middleware/httpErrorHandler');

const port = normalizePort(process.env.PORTSERVER || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
//server.on('error', onError);
//server.on('listening', onListening);



/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
