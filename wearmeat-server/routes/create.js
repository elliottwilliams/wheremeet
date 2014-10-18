var express = require('express');
var router = express.Router();
var data = require('../lib/data');

/* GET home page.
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
}); */

router.get('/', function(req, res) {
	res.render('create');
});

router.post('/', function(req, res){
	//horrible code incomming
	var groupId = ""+Math.floor( 1000000*Math.random() );
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

	var newGroup = data.createGroup( groupId, dests );
	data.addGroup( newGroup );

	var memberId = Math.floor( 1000000*Math.random() );
	//absolutely terrible
	var member = { ID: memberId,
			name: "creator",
			location: { longitude:20.021,
				latitude:20.011 }
	};
	data.addMember( groupId, member);

	//redirect to new page
	res.redirect( "/"+groupId );

	console.log(data.groups);
});

module.exports = router;
