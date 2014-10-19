// var io = require('../io');

var serverData = require('../lib/data');
var emitDest = require('../emits/updateChosenDestination');

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
			
			//Pick the (possibly new) best dest and send it off
			var group = serverData.getGroupByID(data.groupId)
			var idealDest = serverData.pickSumDistance( 
				group.destinations,
				group.members
			);
			emitDest(io, data.groupId, idealDest);
			
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
