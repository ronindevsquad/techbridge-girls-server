var Promise = require('bluebird');
var using = Promise.using;
var mysql = require('mysql2/promise');
var SqlString = require('mysql/lib/protocol/SqlString');

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

using(getConnection(), function(connection) {
	// console.log(connection)
	// console.log(promise)
	// connection.query("SELECT * FROM users", function(err, data) {
	// 	if (err) {
	// 	}
	// 	else {
	// 		// console.log(data)
	// 		return data
	// 	}
	// })

	// return new Promise(function(resolve, reject) {
	// 	connection.query("SELECT *, HEX(id) FROM users", function(err, data) {
	// 		if (err)
	// 			reject(err);
	// 		else
	// 			resolve([err, data])
	// 	});
	// })
	// var ar = [];
	// for (var i = 0; i < 2; i++) {
	// 	ar.push(new Promise(function(resolve, reject) {
	// 		connection.query("INSERT INTO users SET id = UNHEX(REPLACE(UUID(), '-', '')), \
	// 			created_at = NOW()", function(err, data) {
	// 			if (err)
	// 				reject(err);
	// 			else
	// 				resolve(data)
	// 		});
	// 	}))
	// }
	// return ar;


	return Promise.join(new Promise(function(resolve, reject) {
		connection.query("INSERT INTO users SET id = UNHEX(REPLACE(UUID(), '-', '')), \
			created_at = NOW()", function(err, data) {
				if (err)
					reject(err);
				else
					resolve(data)
			});
	}), new Promise(function(resolve, reject) {
		connection.query("INSERT INTO users SET id = UNHEX(REPLACE(UUID(), '-', '')), \
			created_at = NOW()", function(err, data) {
				if (err)
					reject(err);
				else
					resolve(data)
			});
	}), function(one, two) {
		// console.log("one: ", one)
		// console.log("two: ", two)
		return new Promise(function(resolve, reject) {
			connection.query("SELECT * FROM userss ORDER BY created_at DESC LIMIT 2 ", function(err, data) {
				if (err)
					reject("err");
				else
					resolve(data)
			});
		})
	// .then(function(data) {
	// 	console.log("data is: ", data)
	// })
	// .catch(function(e) {
	// 	console.log("found error: ", e)
	// })
	})

})
.catch(function(err) {
	console.log("err:", err)
})

// connection.connect(function(err) {
// 	if (err)
// 		console.error('error connecting: ' + err.stack);
// 	else
// 		console.log('connected as id ' + connection.threadId);
// });

// connection.connect().then(function(conn) {
// 	console.log(conn)
// })

// connection.query("INSERT INTO users SET ?", 
// 	{id: "UNHEX(REPLACE(UUID(), '-', ''))", created_at: "NOW()"}, function(err, data) {
// 	console.log(err)
// 	console.log(data)

// 	connection.execute("SELECT *, HEX(id) AS id FROM users", function(err, data) {
// 		console.log(data)
// 	})
// })

module.exports = getConnection;