var mysql = require('mysql');
var SqlString = require('mysql/lib/protocol/SqlString');

var connection = mysql.createConnection({
	host: 'localhost',
	port: '8889',
	user: 'root',
	password: 'root',
	database: 'evergreendb'
});

connection.config.queryFormat = function(sql, values, timeZone) {
	sql = SqlString.format(sql, values, false, timeZone);
	sql = sql.replace(/'NOW\(\)'/g, "NOW()");
	sql = sql.replace(/'UNHEX\(REPLACE\(UUID\(\), \\'-\\', \\'\\'\)\)'/g, "UNHEX(REPLACE(UUID(), '-', ''))");
	sql = sql.replace(/'UNHEX/g, "UNHEX");
	sql = sql.replace(/\\'\)'/g, "')");
	sql = sql.replace(/\\/g, "");
	console.log("this:", sql)
	return sql;
};

connection.connect(function(err) {
	if (err)
		console.error('error connecting: ' + err.stack);
	else
		console.log('connected as id ' + connection.threadId);
});

module.exports = connection;