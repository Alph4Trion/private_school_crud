var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  // const {x} = 
  res.render('index', { title: 'Express', title2: 'CB12 PT JavaScript' });
});

module.exports = router;
