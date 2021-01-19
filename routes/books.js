var express = require('express');
var router = express.Router();
var dbconnection = require('../lib/db');

/* GET home page. */
// URL: http://localhost:3000/books/
router.get('/', function(req, res, next) {
    const query = "SELECT * FROM books";
    dbconnection.query(query, function(err, rows) {
        if(err) {
            res.render('books', { title: 'Books - ERROR', books: '' });
        } else {
            res.render('books', { title: 'Books', books:rows });
        }
    });
});

// http://localhost:3000/books/add
  
module.exports = router;
  