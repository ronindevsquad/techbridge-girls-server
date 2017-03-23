module.exports = function(server) {
	const io = require("socket.io").listen(server);

	io.sockets.on("connection", function(socket) {			
		socket.on('subscribe', function(proposal_id) {
			socket.join(proposal_id);
		});

		socket.on('send', function(data) {
			io.to(data.proposal_id).emit('sent', data);
		});

		socket.on("logout", function() {
			socket.disconnect();
		});

		//////////////////////////////////////////////////////
		//										SENT FROM TRUCKERS
		//////////////////////////////////////////////////////		
		// socket.on('apply', function(data) {
		// 	socket.join(data.application_id);
		// 	socket.broadcast.emit('applied', data);
		// });

		// socket.on('cancel', function(data) {
		// 	socket.broadcast.to(data.application_id).emit('cancelled', data);
		// });

		// socket.on('forfeit', function(data) {
		// 	socket.broadcast.to(data.application_id).emit('forfeitted', data);
		// });

		// socket.on('payLeadFee', function(data) {
		// 	console.log("in connect", data)
		// 	socket.broadcast.to(data.application_id).emit('paidLeadFee', data);
		// });

		// socket.on('invoice', function(data) {
		// 	socket.broadcast.to(data.application_id).emit('invoiced', data);
		// });
		
		//////////////////////////////////////////////////////
		//										SENT FROM MAKERS
		//////////////////////////////////////////////////////			
		socket.on('accept', function(data) {
			socket.join(data.proposal_id)
			socket.broadcast.emit('accepted', data);
		});		
		
		// socket.on('decline', function(data) {
		// 	socket.broadcast.to(data.application_id).emit('declined', data);
		// });

		// socket.on('pay', function(data) {
		// 	socket.broadcast.to(data.application_id).emit('paid', data);
		// });

	});
}