var express = require('express');
var logger = require('morgan');
var cors = require('cors')

const debugLog = require('debug')('express');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

let company;
let project;
let user;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dev', {useNewUrlParser: true, useUnifiedTopology: true});
debugLog('connect');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    debugLog('database connected');

company = require('../../shared/mongoose/models/company')(db);
project = require('../../shared/mongoose/models/project')(db);
user = require('../../shared/mongoose/models/user')(db);
});
app.use((req, res, next) => {
    debugLog('attaching db');
    req.db = {};
    req.db['company'] = company;
    req.db['project'] = project;
    req.db['user'] = user;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

