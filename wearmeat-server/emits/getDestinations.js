var serverData = require('../lib/data');

function emitGetDestinations(io,groupId){
	io.to( groupId ).emit(
		'getDestinations', 
		{ 
			groupId: groupId,
			destinations: serverData.getGroupByID(groupId).destinations
		} 
	);
}

module.exports = emitGetDestinations;
