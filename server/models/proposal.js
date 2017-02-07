var Promise = require("bluebird");
var fs = require("fs");
var using = Promise.using;
var getConnection = require("../config/mysql");
var jwt = require("jsonwebtoken");
var uuid = require("uuid/v1");
var aws = require("aws-sdk");
aws.config.update({
accessKeyId: "AKIAIFF4LTNLXH75IA2A",
secretAccessKey: "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",
region: "us-west-1"
});
var s3 = new aws.S3();
var sig = require('amazon-s3-url-signer');
var bucket1 = sig.urlSigner('AKIAIFF4LTNLXH75IA2A', 'cH6vNKd7/jsdglxOrNpLm5SkMLsVRclFiuOumtrF', {
	host : 's3-us-west-1.amazonaws.com'
});
//EXAMPLE OF USING URL SIGNER TO GET URL, GIVEN THE FILE NAME
// var filename = "GETFILENAME.extension"
// var url1 = bucket1.getUrl('GET', `/testfolder/${filename}`, 'ronintestbucket', 1);
module.exports = function(jwt_key) {
	return {
		getMyProposals: function(req, callback) {
			jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, payload) {
				if (err)
					callback({status: 401, message: "Invalid token. Your session is ending, please login again."});
				else
					using(getConnection(), connection => {
						var query = "SELECT p.*, HEX(p.id) AS id, IFNULL(applications, 0) AS applications, IFNULL(leads, 0) AS leads, " +
						"COUNT(p.id) AS offers_count FROM proposals p " +
						"LEFT OUTER JOIN offers o ON o.proposal_id = p.id " +
						"LEFT OUTER JOIN (select proposal_id, COUNT(*) AS applications FROM offers WHERE status = 1) a ON a.proposal_id = p.id " +
						"LEFT OUTER JOIN (select proposal_id, COUNT(*) AS leads FROM offers WHERE status = 0) l ON l.proposal_id = p.id " +
						"WHERE p.user_id = UNHEX(?) GROUP BY p.id"
						return connection.execute(query, [payload.id]);
					})
					.spread(data => {
						callback(false, data);
					})
					.catch(err => {
						callback({status: 400, message: "Please contact an admin."});
					});
			});
		},
		getMyApplications: function(req, callback) {
			jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, payload) {
				if (err)
					callback({status: 401, message: "Invalid token. Your session is ending, please login again."});
				else
					using(getConnection(), connection => {
						var query = "SELECT *, HEX(id) AS id FROM proposals WHERE id IN (SELECT proposal_id FROM offers WHERE user_id = UNHEX(?) AND status > 0)"
						return connection.execute(query, [payload.id]);
					})
					.spread(data => {
						callback(false, data);
					})
					.catch(err => {
						callback({status: 400, message: "Please contact an admin."});
					});
			});
		},
		getPercentCompleted: function(req, callback) {
			jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, payload) {
				if (err)
					callback({status: 401, message: "Invalid token. Your session is ending, please login again."});
				else
					using(getConnection(), connection => {
						var query = "SELECT *, HEX(proposals.id) AS proposal_id, HEX(offers.user_id) AS user_id, " +
						"SUM(reports.output) " +
						"AS completed FROM proposals LEFT JOIN offers ON id = proposal_id LEFT JOIN " +
						"reports ON offers.proposal_id = reports.proposal_id AND offers.user_id = " +
						"reports.user_id WHERE (offers.user_id = UNHEX(?) OR proposals.user_id = UNHEX(?)) " +
						"AND offers.status > 1 AND proposals.status > 1 GROUP BY reports.proposal_id";
						return connection.execute(query, [payload.id, payload.id]);
					})
					.spread(data => {
						callback(false, data);
					})
					.catch(err => {
						callback({status: 400, message: "Please contact an admin."});
					});
			});
		},
		uploadfiles: function(req, callback) {
			jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, payload) {
				if (err){
					callback({status: 401, message: "Invalid token. Your session is ending, please login again."});
				} else {
					if(req.files.length<1){
						callback({status: 401, message: "No files were selected to upload."});
						return
					}
					function uploadFilesArray(index){ //upload all files using recursion because loops don't work for uploading to s3 buckets asynchronously
						if(index==undefined){
							index = 0;
						}
						if (index==req.files.length){
							return;
						}
						fs.readFile(req.files[index].path, (err, data) => {
							if(err)
								return callback({status: 401, message: "Internal error, please contact an admin."});
							var filename = req.files[index].filename
							var mimetype = req.files[index].mimetype
							s3.putObject({
								Bucket: "ronintestbucket/testfolder",
								Key: req.files[index].filename,
								Body: data,
								ContentType: req.files[index].mimetype
							}, function(err, success){
								if (err){
									return callback({status: 401, message: "Internal error, please contact an admin."});
								} else {
									fs.unlink(req.files[index].path, function(err){
										if(err){
											return callback({status: 401, message: "Internal error, please contact an admin."});
										}
									});
									uploadFilesArray(index+1)
								}
							}); //end s3 uploading file
						}); //end of fs.readfile
					}
					uploadFilesArray()
					var uploadedFileNames = []
					for(var i = 0;i<req.files.length-1;i++){ //this for loop should be temporary. A filename should only be appended to the array IF it was uploaded successfully. (elliot) could not figure out how to append items to an array within recursion
						uploadedFileNames.push({type:0, filename:req.files[i].filename})
					}
					uploadedFileNames.push({type:1, filename:req.files[req.files.length-1].filename})
					callback(false, {uploadedfiles:uploadedFileNames})
				} //end of else statement
			}); //end of jwt verify
		},
		index: function(req, callback) {
			jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, payload) {
				if (err)
					callback({status: 401, message: "Invalid token. Your session is ending, please login again."});
				else if (payload.type != 1)
					callback({status: 400, message: "Only Suppliers may view all proposals."});
				else
					using(getConnection(), connection => {
						var query = "SELECT *, HEX(id) AS id FROM proposals"
						return connection.execute(query);
					})
					.spread(data => {
						return using(getConnection(), connection => {
							if (data.length == 0)
								callback(false);
							else {
								var _data = []
								for (var i = 0; i < data.length; i++)
									_data.push(data[i].process);

								var query = "SELECT *, GROUP_CONCAT(process SEPARATOR ', ') AS processes, HEX(proposals.id) " +
								"AS id, proposals.created_at AS created_at FROM proposals LEFT JOIN proposal_processes " +
								"ON proposals.id = proposal_id WHERE proposals.status = 0 AND (audience = 0 OR process IN " +
								"(?)) GROUP BY proposals.id ORDER BY proposals.created_at DESC";
								return connection.query(query, [_data]);
							}
						});
					})
					.spread(data => {
						callback(false, data);
					})
					.catch(err => {
						callback({status: 400, message: "Please contact an admin."});
					});
			});
		},
		show: function(req, callback) {
			jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, payload) {
				if (err)
					callback({status: 401, message: "Invalid token. Your session is ending, please login again."});
				else {
					Promise.join(using(getConnection(), connection => {
						var query = "SELECT *, HEX(id) AS id, HEX(user_id) AS user_id FROM proposals LEFT JOIN files " +
						"ON id = proposal_id WHERE id = UNHEX(?)";
						return connection.execute(query, [req.params.id]);
					}), using(getConnection(), connection => {
						if (payload.type == 1) {
							var query = "SELECT * FROM offers WHERE proposal_id = UNHEX(?) " +
							"AND user_id = UNHEX(?) LIMIT 1";
							return connection.execute(query, [req.params.id, payload.id]);
						}
						else
							return [[]];
					}), (files, offer) => {
						if (files[0].length == 0 || (payload.type == 0 && payload.id != files[0][0].user_id) ||
							(payload.type == 1 && offer[0].length > 0 && offer[0][0].status < 0))
							throw {status: 400, message: "Could not find valid proposal."};
						else if (payload.type == 1 && offer[0].length == 0) {
							// Remove private files:
							for (var i = files[0].length - 1; i >= 0; i--) {
								if (files[0][i].type == 0)
									files[0].splice(i, 1);
							}
						}

						// Rename files:
						for (var i = 0; i < files[0].length; i++)
							files[0][i].filename = bucket1.getUrl('GET', `/testfolder/${files[0][i].filename}`, 'ronintestbucket', 2);

						callback(false, {files: files[0], offer: offer[0][0]});
					})
					.catch(err => {
						if (err.status)
							callback(err);
						else
							callback({status: 400, message: "Please contact an admin."});
					});
				}
			});
		},
		create: function(req, callback) {
			jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, payload) {
				if (err)
					callback({status: 401, message: "Invalid token. Your session is ending, please login again."});
				else if (payload.type != 0)
					callback({status: 400, message: "Only Makers may create proposals."});
				else if (!req.body.processes || !req.body.product || !req.body.quantity || !req.body.completion ||
				!req.body.zip || req.body.audience === null)
					callback({status: 400, message: "All form fields are required."});
				else if (req.body.quantity < 1)
					callback({status: 400, message: "You must specify a quantity of at least 1."});
				else if (req.body.audience != 0 && req.body.audience != 1)
					callback({status: 400, message: "Invalid target suppliers provided."});
				else {
					var proposal_id = uuid().replace(/\-/g, "");
					using(getConnection(), connection => {
						var data = [proposal_id, 0, req.body.product, req.body.quantity, req.body.completion,
						req.body.zip, req.body.audience, req.body.info, payload.id];
						var query = "INSERT INTO proposals SET id = UNHEX(?), status = ?, product = ?, quantity = ?, " +
						"completion = ?, zip = ?, audience = ?, info = ?, created_at = NOW(), updated_at = NOW(), " +
						"user_id = UNHEX(?)";
						return connection.query(query, data);
					})
					.then(() => {
						return Promise.join(using(getConnection(), connection => {
							var data = [];
							for (var i = 0; i < req.body.processes.length; i++)
								data.push([req.body.processes[i], `UNHEX('${proposal_id}')`, "NOW()", "NOW()"]);
							var query = "INSERT INTO proposal_processes (process, proposal_id, " +
							"created_at, updated_at) VALUES ?";
							return connection.query(query, [data]);
						}), using(getConnection(), connection => {
							var data = [];
							for (var i = 0; i < req.body.filesarray.uploadedfiles.length; i++) {
								var file = req.body.filesarray.uploadedfiles[i];
								data.push([file.filename, file.type, "NOW()", "NOW()", `UNHEX('${proposal_id}')`]);
							}
							var query = "INSERT INTO files (filename, type, created_at, updated_at, " +
							"proposal_id) VALUES ?";
							return connection.query(query, [data]);
						}), () => {
							callback(false);
						});
					})
					.catch(err => {
						callback({status: 400, message: "Please contact an admin."});
					});
				}
			});
		}
	}
};
