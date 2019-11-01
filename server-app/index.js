const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const appConfig = require('./config/appConfig');
const route = require('./app/routes/sudokuRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else { next(); }
});

// set route
route.setRouter(app);

// Server error handler
let serverErrorHandler = (error) => {
    throw error;
};
// server listening handler
let serverListeningHandler = () => {
    console.log('Port ' + appConfig.port + ' is ready...!');
};
// application specific logging, throwing an error
let processRejectionHandler = (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
};

// start server
const server = app.listen(appConfig.port);
server.on('error', serverErrorHandler);
server.on('listening', serverListeningHandler);
process.on('unhandledRejection', processRejectionHandler);

module.exports = app;
