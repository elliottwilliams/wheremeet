var serverData = require('../lib/data');

function emitGetDestinations(socket,groupId){
  // debugger;
	socket.emit(
		'getDestinations',
		{
			groupId: groupId,
			destinations: serverData.getGroupByID(groupId).destinations
		}
	);
}

module.exports = emitGetDestinations;
