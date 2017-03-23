const Promise = require('bluebird');
const using = Promise.using;
const mysql = require('mysql2/promise');
const SqlString = require('mysql2/node_modules/sqlstring');

// function queryFormat(sql, values, timeZone) {
// 	console.log(sql)
// 	sql = SqlString.format(sql, values, false, timeZone);
// 	sql = sql.replace(/'NOW\(\)'/g, "NOW()")
// 	.replace(/'UNHEX\(REPLACE\(UUID\(\), \\'-\\', \\'\\'\)\)'/g, "UNHEX(REPLACE(UUID(), '-', ''))")
// 	.replace(/'UNHEX/g, "UNHEX")
// 	.replace(/\\'\)'/g, "')")
// 	.replace(/\\/g, "");
// 	console.log(sql)
// 	return sql;
// };

const pool = mysql.createPool({
	host: 'localhost',
	port: '8889',
	user: 'root',
	password: 'root',
	database: 'evergreendb',
	// queryFormat : queryFormat,
	Promise: Promise
});

function getConnection() {
	return pool.getConnection().disposer(function(connection) {
		connection.release();
	});
}

module.exports = getConnection;
