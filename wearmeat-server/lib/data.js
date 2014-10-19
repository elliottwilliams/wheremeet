
/*
 * Creates and exports the Groups array
Each Group:
	id: several character string
	options: 
		type: possible options:
			"linear"
			"balanced"
	destinations: array of destinations
		id: string
		name: name
		location: location object
			longitude
			latitude
	members: array of members
		id: "unique", or at least unlikely overlap
		name: name
		location:
			longitude
			latitude
 */

var groups = [];

function createGroup( id, opts, dests ){
	return { id: id,
		options: opts,
		destinations: dests,
		members: []
	};
}
//No collision checks, but groups should be unique anyway
function addGroup( group ){
	groups.push(group);
}

function getGroupByID( id ){
	for( var i=0; i<groups.length; i++){
		if( groups[i].id === id ){
			return groups[i];
		}
	}
	return null;
}

function getMember( groupID, memberID ){
	var group = getGroupByID( groupID );
	if (!group) return null;

	for( var i=0; i<group.members.length; i++){
		if( memberID===group.members[i].id ){
			return group.members[i];
		}
	}
	return null;
}
function updateLocation( groupID, memberID, location ){
	getMember(groupID,memberID).location = location;
}
//used to both add new members and update old members
//members store their own id's
//Currently unsafe if groupID doesn't exit, needs to be checked in calling code
function addMember( groupID, member ){
	var group = getGroupByID( groupID );
	for( var i=0; i<group.members.length; i++){
		if( member.id===group.members[i].id ){
			group.members[i] = member;
			return;
		}
	}
	group.members.push( member );
}

module.exports.groups = groups;
module.exports.getGroupByID = getGroupByID;
module.exports.addMember = addMember;
module.exports.createGroup = createGroup;
module.exports.addGroup = addGroup;
module.exports.getMember = getMember;
module.exports.updateLocation = updateLocation;
