var Promise = require('bluebird');
var using = Promise.using;
var mysql = require('mysql2/promise');
var SqlString = require('mysql2/node_modules/sqlstring');

function queryFormat(sql, values, timeZone) {
	sql = SqlString.format(sql, values, false, timeZone);
	sql = sql.replace(/'NOW\(\)'/g, "NOW()");
	sql = sql.replace(/'UNHEX\(REPLACE\(UUID\(\), \\'-\\', \\'\\'\)\)'/g, "UNHEX(REPLACE(UUID(), '-', ''))");
	sql = sql.replace(/'UNHEX/g, "UNHEX");
	sql = sql.replace(/\\'\)'/g, "')");
	sql = sql.replace(/\\/g, "");
	return sql;
};

var pool = mysql.createPool({
	host: 'localhost',
	port: '8889',
	user: 'root',
	password: 'root',
	database: 'evergreendb',
	queryFormat : queryFormat,
	Promise: Promise
});

function getConnection() {
	return pool.getConnection().disposer(function(connection) {
		connection.release();
	});
}

module.exports = getConnection;
