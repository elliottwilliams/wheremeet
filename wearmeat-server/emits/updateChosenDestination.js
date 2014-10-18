var serverData = require('../lib/data');
var picker = require('../lib/pickers');

function emitUpdateChosenDestination(io,groupId, memberId, chosenDest){
	io.to( groupId ).emit(
		'updateChosenDestination', 
		{ 
			groupId: groupId,
			chosenDestination: chosenDest
		} 
	);
}

module.exports = emitUpdateChosenDestination;
