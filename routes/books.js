var express = require('express');
var router = express.Router();
var dbconnection = require('../lib/db');

// get shows a page of Books (SELECT)
// post sends data to backend (INSERT)
// put updates a current record (UPDATE)
// delete deletes a current record (DELETE)

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
router.get('/add/', function(req, res, next) {
    res.render('books_new', { title: 'Books - Add New' });
});

// router.post('/add/',....)
module.exports = router;
  