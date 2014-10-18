
var express = require('express');
var router = express.Router();
var data = require('../lib/data');

/* GET home page. * /
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});*/

router.get('/', function(req, res){
	var group = data.getGroupByID("lolwat");
	if( null!==group ){
		//Do real things
	} else {
		res.render('error');
	}
});

module.exports = router;

require('./create');
