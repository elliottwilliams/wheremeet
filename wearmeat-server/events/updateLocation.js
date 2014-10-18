// var io = require('../io');

var serverData = require('../lib/data');

module.exports = function(socket, io) {

	socket.on('updateLocation', function(data) {
		//do whatever
		//data object model:
		// {
		//   clientId: client id
		//   name: uhhh name
		//   room: same as groupID
		// }
		console.log(data.name + 'updated location in room ' + data.groupId, data.location);
		
		if( serverData.getMember(data.groupId, data.clientId)!==null ){
			serverData.updateLocation( data.groupId, data.clientId, data.location );
		} else {
			console.log( 'nonexistent member tried to update his location' );
		}
		
		var members = serverData.getGroupByID( data.groupId ).members;
		io.to(data.room).emit('membersUpdated', {
			groupId: data.groupId,
			members: members
		} );
	});

}
