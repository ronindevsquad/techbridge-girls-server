var connection = require('../config/mysql');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var jwt_key = fs.readFileSync('keys/jwt', 'utf8');

module.exports = {
	getAcceptedOffers: function() {
		jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else {
				var query = "SELECT *, HEX(id) AS id FROM offers WHERE user_id = ? AND status = 1";
				connection.query(query, data.id, function(err, data) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else
						callback(false, data);
				});
			}
		});
	},
	index: function(callback) {
		// FOR NOW, THIS IS THE SIMULATED JSON RESPONSE
		var sampleResponse = {
			proposals:[
				{
					item: "Proposal for Hats",
					quantity: 90,
					accepted_offer:{
						name: "gogo",
						reports:[
							{
								units: 4,
								status: 1
							}, // end of single report
							{
								units: 13,
								status: 1
							}, // end of single report
							{
								units: 20,
								status: 1
							}, // end of single report
							{
								units: 10,
								status: 1
							}, // end of single report
							{
								units: 20,
								status: 1
							}, // end of single report
							{
								units: 5,
								status: 1
							}, // end of single report
							{
								units: 13,
								status: 1
							}, // end of single report
							{
								units: 0,
								status: 0
							}, // end of single report
							{
								units: 0,
								status: 0
							}, // end of single report
							{
								units: 0,
								status: 0
							}, // end of single report
							{
								units: 0,
								status: 0
							}, // end of single report
						] // end of array of reports for offer
					}// end of offer
				}, // end of single proposal
				{
					item: "Proposal for cars",
					quantity: 500,
					accepted_offer:{
						name: "mercedes",
						reports:[
							{
								units: 0,
								status: 1
							}, // end of single report
							{
								units: 3,
								status: 1
							}, // end of single report
							{
								units: 9,
								status: 1
							}, // end of single report
							{
								units: 11,
								status: 1
							}, // end of single report
							{
								units: 8,
								status: 0
							}, // end of single report
							{
								units: 20,
								status: 0
							}, // end of single report
							{
								units: 22,
								status: 0
							}, // end of single report
							{
								units: 60,
								status: 0
							}, // end of single report
						] // end of array of reports for offer
					}// end of offer
				}, // end of single proposal
				{
					item: "Proposal for toys",
					quantity: 20,
					accepted_offer:{
						name: "mercedes",
						reports:[
							{
								units: 0,
								status: 1
							}, // end of single report
							{
								units: 3,
								status: 1
							}, // end of single report
							{
								units: 2,
								status: 1
							}, // end of single report
							{
								units: 1,
								status: 1
							}, // end of single report
							{
								units: 3,
								status: 1
							}, // end of single report
							{
								units: 2,
								status: 1
							}, // end of single report
							{
								units: 1,
								status: 1
							}, // end of single report
							{
								units: 6,
								status: 1
							}, // end of single report
						] // end of array of reports for offer
					}// end of offer
				}, // end of single proposal
			] // end of proposals array
		}// end of response object
		callback(false, sampleResponse)
		// jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, data) {
		// 	var query = "SELECT *, HEX(id) AS id FROM offers WHERE ?";
		// 	connection.query(query, {id:data.id}, function(err, data) {
		// 		if (err)
		// 			callback({errors: {database: {message: "Please contact an admin."}}})
		// 		else
		// 			callback(false, data)
		// 	})
		// });
	},
	// show: function(req, callback) {
	// 	jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, data) {
	// 		if (err)
	// 			callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
	// 		else {		
	// 			var query = "SELECT *, HEX(id) AS id FROM proposals WHERE HEX(id) = ? AND status = 0 LIMIT 1";
	// 			connection.query(query, req.params.id, function(err, data) {
	// 				if (err)
	// 					callback({errors: {database: {message: `Database error: ${err.code}.`}}});
	// 				else if (data.length == 0)
	// 					callback({errors: {data: {message: `Not able to fetch valid proposal.`}}});
	// 				else
	// 					callback(false, data[0]);
	// 			});
	// 		}
	// 	});
	// },	
	create: function(req, callback) {
		jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else if (!req.body.proposal_id || !req.body.material || !req.body.material_cost || !req.body.unit_cost || 
			!req.body.machine || !req.body.cycle_time || !req.body.yield || !req.body.rate || !req.body.laborers || 
			!req.body.sga || !req.body.profit || !req.body.overhead || !req.body.total )
				callback({errors: {form: {message: "All form fields are required."}}});
			else {
				var _data = {
					status: 0,
					sga: req.body.sga,
					profit: req.body.profit,
					overhead: req.body.overhead,
					total: req.body.total,
					created_at: "NOW()",
					updated_at: "NOW()",
					proposal_id: `UNHEX('${req.body.proposal_id}')`,
					user_id: `UNHEX('${data.id}')`
				}
				connection.query("INSERT INTO offers SET ?", _data, function(err) {
					if (err)
						callback({errors: {database: {message: `Database error: ${err.code}.`}}});
					else {
						var _data = {
							id: "UNHEX(REPLACE(UUID(), '-', ''))",
							material: req.body.material,
							material_cost: req.body.material_cost,
							unit_cost: req.body.unit_cost,
							created_at: "NOW()",
							updated_at: "NOW()",
							proposal_id: `UNHEX('${req.body.proposal_id}')`,
							user_id: `UNHEX('${data.id}')`
						}
						connection.query("INSERT INTO materials SET ?", _data, function(err) {
							if (err)
								callback({errors: {database: {message: "Please contact an admin."}}});
							else {
								var _data = {
									id: "UNHEX(REPLACE(UUID(), '-', ''))",
									machine: req.body.machine,
									cycle_time: req.body.cycle_time,
									yield: req.body.yield,
									rate: req.body.rate,
									laborers: req.body.laborers,
									created_at: "NOW()",
									updated_at: "NOW()",
									proposal_id: `UNHEX('${req.body.proposal_id}')`,
									user_id: `UNHEX('${data.id}')`
								}
								connection.query("INSERT INTO machines SET ?", _data, function(err) {
									if (err)
										callback({errors: {database: {message: "Please contact an admin."}}});
									else {
										callback(false);
									}
								});
							}
						});
					}
				})	
			}
		});
	},
	// update: function(req, callback) {
	// 	jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, data) {
	// 		if (err)
	// 			callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
	// 		else {
	// 			var _data = {
	// 				amount: req.body.amount,
	// 				completion_date: req.body.completion_date,
	// 				description: req.body.description,
	// 				pickup_only: req.body.pickup_only,
	// 				address: req.body.address,
	// 				city: req.body.city,
	// 				zip: req.body.zip
	// 			}
	// 			var query = "UPDATE offers SET ?, updated_at = NOW() WHERE HEX(id) = ? AND HEX(contractor_id) = ? LIMIT 1";
	// 			connection.query(query, [_data, req.params.id, data.id], function(err, data) {
	// 				if (err)
	// 					callback({errors: {database: {message: `Database error: ${err.code}.`}}});
	// 				else
	// 					callback(false);
	// 			});
	// 		}
	// 	});
	// },
	// delete: function(req, callback) {
	// 	jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, data) {
	// 		if (err)
	// 			callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
	// 		else
	// 			var query = "DELETE FROM offers WHERE HEX(id) = ? AND HEX(contractor_id) = ? LIMIT 1";
	// 			connection.query(query, [req.params.id, data.id], function(err) {
	// 				if (err)
	// 					callback({errors: {database: {message: `Database error: ${err.code}.`}}});
	// 				else
	// 					callback(false);
	// 			});
	// 	});
	// }
};
