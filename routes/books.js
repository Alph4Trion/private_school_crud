var express = require('express');
var router = express.Router();

/* GET home page. */
// URL: http://localhost:3000/books/
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Books' });
});
  
module.exports = router;
  