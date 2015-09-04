/*
 * User routes
 * - require model of user table in postgres database
 */
var user = require('../models/user.model');

exports.list = function (req, res, next) {
	// we can get the pg client from request (see middleware in app.js)
	var client = req.client; 
	
	// Query selects everything from user table
	// Remember to call .toQuery() after building your query
	// See https://github.com/brianc/node-sql for docs
	var query = user.select(user.star()).from(user).toQuery(); 

	// query database using client
	client.query(query, function (err, users) {
		if (err) {
			return next(err); // pass the error to the error handler
		}
		var userList = users.rows; // actual table data is located in .rows of returned object
		// If no error render user list
		res.render('userList', { title: 'List of users', users: userList });
	});
};

exports.add = function (req, res, next) {
	// get client from request
	var client = req.client;

	if (!req.body.email || !req.body.password) {
		return next(new Error('Invalid parameters'));
	}

	// Insert user to database (you should encrypt any user password this is just an example)
	var query = user.insert(
		user.email.value(req.body.email),
		user.password.value(req.body.password)
	).toQuery();

	client.query(query, function (err) {
		if (err) {
			return next(err);
		}
		res.redirect('/user/list');
	});
};