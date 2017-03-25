const mysql = require('mysql2/promise');
const password = require('../../keys').mysqlPassword;
const Promise = require('bluebird');
const SqlString = require('mysql2/node_modules/sqlstring');

const using = Promise.using;

function queryFormat(sql, values, timeZone) {
	console.log(sql)
	sql = SqlString.format(sql, values, false, timeZone);
	sql = sql.replace(/'NOW\(\)'/g, "NOW()")
	.replace(/'UNHEX\(REPLACE\(UUID\(\), \\'-\\', \\'\\'\)\)'/g, "UNHEX(REPLACE(UUID(), '-', ''))")
	.replace(/'UNHEX/g, "UNHEX")
	.replace(/\\'\)'/g, "')")
	.replace(/\\/g, "");
	console.log(sql)
	return sql;
};

const pool = mysql.createPool({
	host: 'ronin-rds.crolk7yi2hmw.us-west-1.rds.amazonaws.com',
	port: '3306',
	user: 'root',
	password: password,
	database: 'anvyldb',
	queryFormat : queryFormat,
	Promise: Promise
});

function getConnection() {
	return pool.getConnection().disposer(function(connection) {
		connection.release();
	});
}

module.exports = getConnection;
