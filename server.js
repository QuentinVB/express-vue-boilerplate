#!/usr/bin/env node

/**
 * Module dependencies.
 */
require('dotenv').config();

const app = require('./server/app');
const debug = require('debug')();
const http = require('http');
const normalizePort = require('./server/middleware/httpPortNormaliser');
const onError = require('./server/middleware/httpErrorHandler');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);



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
