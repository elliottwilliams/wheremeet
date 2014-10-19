var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res) {
//   res.render('index', { title: 'Express', room: req.query.id });
// });

// module.exports = router;

// require('./create');

  router.use('/', express.static('public/app'));