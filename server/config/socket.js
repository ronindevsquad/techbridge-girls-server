module.exports = function (server) {
	const io = require("socket.io").listen(server);

	io.sockets.on("connection", function (socket) {
		socket.on("disconnect", () => {
			socket.disconnect();
		});

		socket.on('join', data => {
			for (let i = 0; i < data.lenth; i++)
				socket.join(data[i].offer_id);
		});

		socket.on('send', data => {
			io.to(data.proposal_id).emit('sent', data);
		});

		//////////////////////////////////////////////////////
		//										SENT FROM MAKERS
		//////////////////////////////////////////////////////			
		socket.on('accept', data => {
			socket.join(data.proposal_id);
			socket.broadcast.emit('accepted', data);
		});

		// socket.on('decline', data => {
		// 	socket.broadcast.to(data.application_id).emit('declined', data);
		// });

		// socket.on('pay', data => {
		// 	socket.broadcast.to(data.application_id).emit('paid', data);
		// });

	});
}