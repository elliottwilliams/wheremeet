// var io = require('../io');

var data = require('../lib/data');

module.exports = function(socket, io) {

	socket.on('join', function(data) {
		//do whatever
		//data object model:
		// {
		//   clientId: client id
		//   name: uhhh name
		//   room: same as groupID
		// }
		console.log(data.name + ' join in room ' + data.room, data);

		var member = {
			ID: data.clientId,
			name: data.name,
			location: null
		} //member's location field is null to start
		//you MUST check when displaying based on location
		data.addMember( data.room, member );
		
		socket.join(data.room);
		
		io.to(data.room).emit('joined', data);
	});

}
