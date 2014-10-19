

//	 ________________________________________
//	/ Love this black cami dress. It says: I \
//	| wander the world without joy, without  |
//	| hope, without pain; I am but the       |
//	| remains of despair                     |
//	\ --@kimkierkegaardashian                /
//	 ----------------------------------------
//	        \   ^__^
//	         \  (oo)\_______
//	            (__)\       )\/\
//	                ||----w |
//	                ||     ||

/*
 * Helper and Extensibility functions
 *
 */
function getLong (loc){
	return loc.longitude;
}
function getLat (loc){
	return loc.latitude;
}

function toRad( deg ){
	return deg * Math.PI / 180;
}
function distance( loc1, loc2 ){
	var R = 3963.1676;
	var lat1 = toRad( getLat(loc1) );
	var lat2 = toRad( getLat(loc2) );
	var dLat = lat1 - lat2;
	var dLong = toRad( getLong(loc1)-getLong(loc2) );
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            	Math.cos(lat1) * Math.cos(lat2) *
		Math.sin(dLong/2) * Math.sin(dLong/2);
	var c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a) );
	return c*R;

}


/*
 * Actual picker functions
 *
 */

//Assumes destinations is nonempty
//min process exploits limits of Number, might want to revise
function pickSumDistance( destinations, members ){
	var minDest = destinations[0];
	var minDist = Number.MAX_VALUE;
	for( var destI=0; destI<destinations.length; destI++ ){
		var sumDists = 0;
		for( var memI=0; memI < members.length; memI++){

			if (members[memI].location != null) {
				sumDists += distance( destinations[destI].location,
						members[memI].location );
			}

		}
		if( sumDists<minDist ){
			minDist = sumDists;
			minDest = destinations[destI];
		}
	}
	return minDest;
}

module.exports.pickSumDistance = pickSumDistance;

/*console.log( distance( {latitude:10,longitude:20},
	{latitude:20,longitude:25} ) ); * /
var dests = [
	{ name:'Wiley',
		location:{ longitude:20.000,
			latitude:20.000}
	},
	{ name:'Windsor',
		location: {longitude:20.020,
			latitude:20.010}
	}
]
var members = [
	{ id: "lol",
		name: "Joey",
		location:{ longitude:20.0001,
			latitude:20.005 }
	},
	{ id: "lol2",
		name: "Big Mike",
		location:{ longitude:20.019,
			latitude:20.011 }
	}
]
console.log( pickSumDistance(dests, members) ); */

//debugger;

