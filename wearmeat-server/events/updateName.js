var serverData = require('../lib/data');
var emitUpdateMembers = require('../emits/updateMembers');

//socket = req, io = res
module.exports = function(socket, io) {

	socket.on('updateName', function(data) {
		//do whatever
		//data object model:
		// {
		//   clientId: client id
		//   name: uhhh name
		//   room: same as groupID
		// }
		console.log(data.clientId + ' updated name to ' + data.name + ' in room ' + data.groupId);

		if( serverData.getMember(data.groupId, data.clientId) !== null ){
			serverData.updateName(data.groupId, data.clientId, data.name);
			emitUpdateMembers(io, data.groupId);

		} else {
			console.log( 'nonexistent member tried to update his/her name' );
		}

		var members = serverData.getGroupByID( data.groupId ).members;
		emitUpdateMembers(io, data.groupId);

	});

}
