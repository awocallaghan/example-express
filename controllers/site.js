/*
 * Example of basic website routes
 * - Renders the eaample jade templates and also throws an example error
 */

// Render index page example
exports.index = function (req, res) {
  res.render('index', {
    title: 'Example Express website'
  });
};

// Render about page example
exports.about = function (req, res) {
  res.render('about', {
    title: 'About page'
  });
};

// Throw an example error
exports.error = function (req, res, next) {
	var err = new Error("This an example error");
	next(err);
};