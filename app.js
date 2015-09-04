var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var compression = require('compression');

// Create application using express
var app = module.exports = express();

// Check environment and get relevant config
// Environment will default to development if not present
var env = (process.env.NODE_ENV || "development");
var config = require('./config/config')[env];

/* 
 * Connect to database
 * - We're using postgresql (pg on npm)
 */
var pg = require('pg');
var conString = "postgres://" + config.DatabaseConfig.user + ":" + config.DatabaseConfig.password + "@" + config.DatabaseConfig.host + "/" + config.DatabaseConfig.name;
var client = new pg.Client(conString);
client.connect(function (err) {
	if (err) {
		return console.error('Error connecting to postgres database', err);
	}
});
// Middleware to add database client to request object
// Access the database client at req.client on any request
app.use(function (req, res, next) {
	req.client = client;
	next();
});

// Configure app
app.set('views', path.join(__dirname, 'views')); // views are kept in /views folder
app.set('view engine', 'jade'); // and use jade template engine
app.use(logger('dev')); // use morgan as a logger
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.secret));
app.use(cookieSession({
  name: 'session',
  secret: config.secret,
  cookie: {
    maxAge: 365 * 24 * 60 * 60 * 1000
  }
}));
app.use(express.static(__dirname + '/public')); // all images/stylesheets/javascript files kept in /public folder
app.use(compression()); // use gzip compression for speed

var server = app.listen(config.port, function() {
  console.log("\n\nSERVER STARTED\nExpress server listening on port " + config.port);
}).on('error', function (err) {
  console.error("Error starting server:" + err);
});

/*
 * Handle website routes here
 */
module.exports.app = app; // export express app for routes
var routes = require('./routes'); // all application routes kept in routes.js

// Error handling after routes
// 404 error
app.use(function (req, res, next) {
  res.status(404).render('error', {
    title:  '404 - Page not found',
    message: 'Sorry the page you requested could not be found!'
  });
});
// Any other error
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).render('error', {
    title: '500 - Something went wrong',
    message: err.message
  });
});
