
/*
 * Creates and exports the Groups array
Each Group:
	ID: several character string
	destinations: array of destinations
		ID: string
		name: name
		locations: location object
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

function getGroupByID( id ){
	for( var i=0; i<groups.length; i++){
		if( groups[i].ID === id ){
			return groups[i];
		}
	}
	return NULL;
}

//No protection against null pointer exceptions, 
//	allows you to catch errors
function addMember( groupID, member ){
	getGroupByID( groupID ).push( member );
}

module.exports.groups = groups;
module.exports.getGroupByID = getGroupByID;
module.exports.addMember = addMember;

