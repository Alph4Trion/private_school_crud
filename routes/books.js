var express = require('express');
var router = express.Router();
var dbconnection = require('../lib/db');

// get shows a page of Books (SELECT) R
// post sends data to backend (INSERT) C 
// put updates a current record (UPDATE) U 
// delete deletes a current record (DELETE) D

/* GET home page. */
// URL: http://localhost:3000/books/
router.get('/list/:message?', function(req, res, next) {
    const query = "SELECT * FROM books";
    console.log(req.query);
    // console.log("outside" + req.params.message);
    dbconnection.query(query, function(err, rows) {
        // console.log("inside" + req.params.message);
        if(err) {
            res.render('books', { title: 'Books - ERROR', books: '', message: req.params.message });
        } else {
            res.render('books', { title: 'Books', books:rows, message: req.params.message });
        }
    });
});

// http://localhost:3000/books/add
// shows the actual form for the model book in order to
// collect data from the  client and send them to the backend
router.get('/add/', function(req, res, next) {
    res.render('books_new', { title: 'Books - Add New', message:'' });
});

router.post('/add', function(req, res, next) {
    const query = "INSERT INTO `books`(`title`, `author`) VALUES('"+ req.body.title + "', '" + req.body.author + "')";
    // console.log(query);
    dbconnection.query(query, function(err, status) {
        // NOT OK - Error!!!
        if(err) {
            res.render("books_new", { title: 'Books - Add New', message: "Error inserting data to the database!" });
        } 
        // All OK!!!
        else {
            //res.render("books", { title: 'Books', books: '', message: "All ok!!!" });
            // res.render("books", {});
            res.redirect('/books/list/All OK!!!');
        }
        
    });
});


module.exports = router;
  