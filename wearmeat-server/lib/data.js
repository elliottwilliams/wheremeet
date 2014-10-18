
/*
 * Creates and exports the Groups array
Each Group:
	ID: several character string
	options: things that we will implement LATER
	destinations: array of destinations
		ID: string
		name: name
		location: location object
			longitude
			latitude
	members: array of members
		ID: "unique", or at least unlikely overlap
		name: name
		location:
			longitude
			latitude
 */

var groups = [];

function createGroup( id, opts, dests ){
	return { ID: id,
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
		if( groups[i].ID === id ){
			return groups[i];
		}
	}
	return null;
}

//used to both add new members and update old members
//members store their own id's
function addMember( groupID, member ){
	var group = getGroupByID( groupID );
	for( var i=0; i<group.members.length; i++){
		if( member.ID===group.members[i].ID ){
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
