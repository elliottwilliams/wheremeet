var express = require('express');
var router = express.Router();
var data = require('../lib/data');
var diningCourts = require('../public/diningCourts.json');

router.get('/', function(req, res) {
	res.render('create', {diningCourts: diningCourts});
});

router.post('/', function(req, res){
	var groupId = createGroupId();
	var newGroup = data.createGroup( groupId,
		buildOptions(req),
		buildDests(req)  );
	data.addGroup( newGroup );

	//redirect to new page
	//The first member will be added then
	res.redirect( "/#/map?groupId="+groupId );

	console.log(data.groups);
});

//Several helper/extensibility functions
function createGroupId(){
	var groupId = ""+Math.floor( 1000000*Math.random() );
	return groupId;
}
//Currently only works with one dining courts json file
//Hard to extend beyond (purdue) dining courts
function buildDests( req ){
	var dests = [];
	var j=0;
	for( var i=0; i<diningCourts.length; i++){
		if( req.body[diningCourts[i].name] ){
			dests[j]=diningCourts[i];
			j++;
		}
	}
	return dests;
}
function buildOptions( req ){
	return {
		type: req.body.decisionAlgorithm
	};
}

module.exports = router;

