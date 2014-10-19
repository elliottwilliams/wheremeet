// var io = require('../io');

var data = require('../lib/data');
var updateMem = require('../emits/updateMembers.js');
var getDests = require('../emits/getDestinations.js');

module.exports = function(socket, io) {

	socket.on('join', function(msg, fn) {
		//do whatever
		//data object model:
		// {
		//   clientId: client id
		//   name: uhhh name
		//   room: same as groupID
		// }
		console.log(msg.name + ' tryed to join in room ' + msg.groupId, msg);

		if( data.getGroupByID(msg.groupId)!==null ){

			console.log('group found')

			var member = {
				id: msg.clientId,
				name: msg.name,
				location: null
			} //member's location field is null to start
			//you MUST check when displaying based on location
			data.addMember( msg.groupId, member );

			socket.join( msg.groupId );

			//Get the destinations, only for the joining person's socket
			getDests(socket,msg.groupId);

			//Broadcast member update to everyone else
			updateMem(io,msg.groupId);


			fn( {groupId: msg.groupId} );//send acknowledgement function
		} else {

			console.log( 'join unsuccesfull' );
			fn( {error: 'Group ID '+msg.groupId+' not found'} );

		}
	});

}
