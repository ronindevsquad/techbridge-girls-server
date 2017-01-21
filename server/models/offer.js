var connection = require('../config/mysql');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var jwt_key = fs.readFileSync('keys/jwt', 'utf8');

module.exports = {
	getAcceptedOffers: function(req, callback) {
		jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, payload) {
			if (err)
				callback({status: 401, message: "Invalid token. Your session is ending, please login again."});
			else {
				var query = "SELECT *, HEX(proposal_id) AS proposal_id FROM offers LEFT JOIN proposals ON \
				offers.proposal_id = proposals.id WHERE (HEX(offers.user_id) = ? OR HEX(proposals.user_id) = ?) \
				AND offers.status > 0";
				connection.query(query, [payload.id, payload.id], function(err, data) {
					if (err)
						callback({status: 400, message: "Please contact an admin."});
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
		// 			callback({status: 400, message: "Please contact an admin."})
		// 		else
		// 			callback(false, data)
		// 	})
		// });
	},
	// show: function(req, callback) {
	// 	jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, data) {
	// 		if (err)
	// 			callback({status: 401, message: "Invalid token. Your session is ending, please login again."});
	// 		else {		
	// 			var query = "SELECT *, HEX(id) AS id FROM proposals WHERE HEX(id) = ? AND status = 0 LIMIT 1";
	// 			connection.query(query, req.params.id, function(err, data) {
	// 				if (err)
	// 					callback({status: 400, message: "Please contact an admin."});
	// 				else if (data.length == 0)
	// 					callback({status: 400, message: `Not able to fetch valid proposal.`});
	// 				else
	// 					callback(false, data[0]);
	// 			});
	// 		}
	// 	});
	// },	
	create: function(req, callback) {
		jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, payload) {
			if (err) {
				callback({status: 401, message: "Invalid token. Your session is ending, please login again."});
				return;
			}

			// Validate materials:
			for (var i = 0; i < req.body.materials.length; i++) {
				var material = req.body.materials[i];
				if (!material.material || material.weight === undefined || material.cost === undefined ||  
					material.weight < 0 || material.cost < 0) {
					callback({status: 400, message: "Invalid field(s) for materials provided."});
					return;
				}
			}
			
			// Validate machines:
			for (var i = 0; i < req.body.machines.length; i++) {
				var machine = req.body.machines[i];
				if (!machine.labor || machine.time === undefined || machine.rate === undefined || 
					machine.yield === undefined || machine.count === undefined || machine.time < 1 || 
					machine.rate < 0.01 || machine.yield < 0.01 || machine.count < 1) {
					callback({status: 400, message: "Invalid field(s) for machines provided."});
					return;
				}
			}

			// Validate manuals:
			for (var i = 0; i < req.body.manuals.length; i++) {
				var manual = req.body.manuals[i];
				if (!manual.labor || manual.time === undefined || manual.rate === undefined || 
					manual.yield === undefined || manual.count === undefined || manual.time < 1 || 
					manual.rate < 0.01 || manual.yield < 0.01 || manual.count < 1) {
					callback({status: 400, message: "Invalid field(s) for machines provided."});
					return;
				}
			}

			if (!req.body.proposal_id || req.body.sga === undefined || req.body.profit === undefined || 
			req.body.overhead === undefined || req.body.total === undefined || req.body.sga < 0 || 
			req.body.profit < 0 || req.body.overhead < 0 || req.body.total < 0)
				callback({status: 400, message: "All form fields are required."});
			else {
				// new Promise(function(resolve, reject) {
				// 	var data = {
				// 		status: 0,
				// 		sga: req.body.sga,
				// 		profit: req.body.profit,
				// 		overhead: req.body.overhead,
				// 		total: req.body.total,
				// 		created_at: "NOW()",
				// 		updated_at: "NOW()",
				// 		proposal_id: `UNHEX('${req.body.proposal_id}')`,
				// 		user_id: `UNHEX('${payload.id}')`
				// 	}
				// 	connection.query("INSERT INTO offers SET ?", data, function(err) {
				// 		if (err)
				// 			return reject(err);
				// 		return resolve();
				// 	});
				// }).then()
			}

			// 	connection.query("INSERT INTO offers SET ?", data, function(err) {
			// 		if (err)
			// 			callback({status: 400, message: "Please contact an admin."});
			// 		else {
			// 			var data = {
			// 				id: "UNHEX(REPLACE(UUID(), '-', ''))",
			// 				material: req.body.material,
			// 				material_cost: req.body.material_cost,
			// 				unit_cost: req.body.unit_cost,
			// 				created_at: "NOW()",
			// 				updated_at: "NOW()",
			// 				proposal_id: `UNHEX('${req.body.proposal_id}')`,
			// 				user_id: `UNHEX('${payload.id}')`
			// 			}
			// 			connection.query("INSERT INTO materials SET ?", data, function(err) {
			// 				if (err)
			// 					callback({status: 400, message: "Please contact an admin."});
			// 				else {
			// 					var data = {
			// 						id: "UNHEX(REPLACE(UUID(), '-', ''))",
			// 						machine: req.body.machine,
			// 						cycle_time: req.body.cycle_time,
			// 						yield: req.body.yield,
			// 						rate: req.body.rate,
			// 						laborers: req.body.laborers,
			// 						created_at: "NOW()",
			// 						updated_at: "NOW()",
			// 						proposal_id: `UNHEX('${req.body.proposal_id}')`,
			// 						user_id: `UNHEX('${payload.id}')`
			// 					}
			// 					connection.query("INSERT INTO machines SET ?", data, function(err) {
			// 						if (err)
			// 							callback({status: 400, message: "Please contact an admin."});
			// 						else {
			// 							callback(false);
			// 						}
			// 					});
			// 				}
			// 			});
			// 		}
			// 	})	
			// }
		});
	},
	// update: function(req, callback) {
	// 	jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, payload) {
	// 		if (err)
	// 			callback({status: 401, message: "Invalid token. Your session is ending, please login again."});
	// 		else {
	// 			var data = {
	// 				amount: req.body.amount,
	// 				completion_date: req.body.completion_date,
	// 				description: req.body.description,
	// 				pickup_only: req.body.pickup_only,
	// 				address: req.body.address,
	// 				city: req.body.city,
	// 				zip: req.body.zip
	// 			}
	// 			var query = "UPDATE offers SET ?, updated_at = NOW() WHERE HEX(id) = ? AND HEX(contractor_id) = ? LIMIT 1";
	// 			connection.query(query, [data, req.params.id, payload.id], function(err, data) {
	// 				if (err)
	// 					callback({status: 400, message: "Please contact an admin."});
	// 				else
	// 					callback(false);
	// 			});
	// 		}
	// 	});
	// },
	// delete: function(req, callback) {
	// 	jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, payload) {
	// 		if (err)
	// 			callback({status: 401, message: "Invalid token. Your session is ending, please login again."});
	// 		else
	// 			var query = "DELETE FROM offers WHERE HEX(id) = ? AND HEX(contractor_id) = ? LIMIT 1";
	// 			connection.query(query, [req.params.id, payload.id], function(err) {
	// 				if (err)
	// 					callback({status: 400, message: "Please contact an admin."});
	// 				else
	// 					callback(false);
	// 			});
	// 	});
	// }
};
