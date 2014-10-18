// var io = require('../io');

var data = require('../lib/data');

module.exports = function(socket, io) {

	socket.on('join', function(msg) {
		//do whatever
		//data object model:
		// {
		//   clientId: client id
		//   name: uhhh name
		//   room: same as groupID
		// }
		console.log(msg.name + ' join in room ' + msg.groupId, msg);

		var member = {
			ID: msg.clientId,
			name: msg.name,
			location: null
		} //member's location field is null to start
		//you MUST check when displaying based on location
		data.addMember( msg.groupId, member );
		
		socket.join( msg.groupId );
		socket.emit('joined', data);
	});

}
