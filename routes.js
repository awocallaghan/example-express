app = module.parent.exports.app;

/*
 * Include controllers
 */
var site = require('./controllers/site');

// Main site routes
app.get('/', site.index);
app.get('/about', site.about);
