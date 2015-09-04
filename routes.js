app = module.parent.exports.app;

/*
 * Include controllers
 */
var site = require('./controllers/site');
var user = require('./controllers/user');

// Main site routes
app.get('/', site.index);
app.get('/about', site.about);
app.get('/error', site.error);

// User routes
app.get('/user/list', user.list);
app.post('/user/add', user.add);