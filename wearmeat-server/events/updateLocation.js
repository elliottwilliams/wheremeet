// var io = require('../io');

var data = require('../lib/data');

module.exports = function(socket, io) {

	socket.on('updateLocation', function(data) {
		//do whatever
		//data object model:
		// {
		//   clientId: client id
		//   name: uhhh name
		//   room: same as groupID
		// }
		console.log(data.name + 'updated location in room ' + data.room, data.location);
		
		if( data.getMember(data.groupId, data.clientId)!==null ){
			data.updateLocation( data.groupId, data.clientId, data.location );
		} else {
			console.log( 'nonexistent member tried to update his location' );
		}
		
		socket.join(data.room);
		
		io.to(data.room).emit('membersUpdated', data);
	});

}
