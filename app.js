const debug = require('debug')('auth:server');
const express = require('express');
const logger = require('morgan');
const cors = require('cors')

const debugLog = require('debug')('express');

var indexRouter = require('./routes/index');
const http = require("http");

var app = express();
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    debugLog('attaching db');
    next();
});



app.use('/api', indexRouter);

/* GET home page. */
app.get('/', function(req, res, next) {
    res.status(200);
    res.json({ping: 'ponging!!'});
});

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */


let server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

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



module.exports = app;

