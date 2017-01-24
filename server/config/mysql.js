var Promise = require('bluebird');
var using = Promise.using;
var mysql = require('mysql2/promise');
var SqlString = require('mysql2/node_modules/sqlstring');

function queryFormat(sql, values, timeZone) {
	console.log(sql)
	sql = SqlString.format(sql, values, false, timeZone);
	sql = sql.replace(/'NOW\(\)'/g, "NOW()");
	sql = sql.replace(/'UNHEX\(REPLACE\(UUID\(\), \\'-\\', \\'\\'\)\)'/g, "UNHEX(REPLACE(UUID(), '-', ''))");
	sql = sql.replace(/'UNHEX/g, "UNHEX");
	sql = sql.replace(/\\'\)'/g, "')");
	sql = sql.replace(/\\/g, "");
	console.log(sql)
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

// using(getConnection(), function(connection) {
// 	var data = {id: "UNHEX(REPLACE(UUID(), '-', ''))"}
// 	return connection.query("SELECT * FROM users WHERE ?", data);
// })
// .spread(function(data) {
// 	console.log("data is: ",data[0])
// })
// .catch(err => {
// 	console.log("err is ", err)
// })

module.exports = getConnection;