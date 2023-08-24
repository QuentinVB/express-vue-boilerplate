#!/usr/bin/env node

/**
 * Module dependencies.
 */
const http = require('http');
const debug = require('debug')();

const app = require('./app');
const normalizePort = require('./middleware/httpPortNormaliser');
const onError = require('./middleware/httpErrorHandler');

const port = normalizePort(process.env.PORTSERVER || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
const adress = server?.address()?.address ?? "localhost";
console.log(`Server started on ${adress}:${port}, with ${process.env.NODE_ENV} mode`)
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + port;
    debug('Listening on ' + bind);
}
