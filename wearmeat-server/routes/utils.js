
//Not sure how this should work yet
function createMember( req ){
	var memberId = Math.floor( 1000000*Math.random() );
	var member = { ID: memberId,
			name: "creator",
			location: { longitude:20.021,
				latitude:20.011 }
	};
	return member;
}
	

module.exports.createMember = createMember;
