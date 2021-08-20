var express = require('express');
var logger = require('morgan');
var cors = require('cors')

const debugLog = require('debug')('express');

var indexRouter = require('./routes/index');

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

app.use('/', indexRouter);

module.exports = app;

