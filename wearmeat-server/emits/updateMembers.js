var serverData = require('../lib/data');

function emitUpdateMembers(io,groupId){
  // debugger;
	io.to( groupId ).emit(
		'updateMembers',
		{
			groupId: groupId,
			members: serverData.getGroupByID(groupId).members
		}
	);
}

module.exports = emitUpdateMembers;
