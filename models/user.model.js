/*
 * Example model
 * - uses node-sql (https://github.com/brianc/node-sql) for models and query building
 */
var sql = require('sql');
sql.setDialect('postgres');

var user = sql.define({
	name: 'user',
	columns: ['email','password']
});

module.exports = user; // export table model