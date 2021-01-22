var express = require('express');
var router = express.Router();
var dbconnection = require('../lib/db');
var Book = require('../models/book');

// get shows a page of Books (SELECT) R
// post sends data to backend (INSERT) C 
// put updates a current record (UPDATE) U 
// delete deletes a current record (DELETE) D

/* GET home page. */
// URL: http://localhost:3000/books/
// list - SELECT
router.get('/list/:message?', function(req, res, next) {
    const query = "SELECT * FROM books";
    var fullUrl = req.protocol + '://' + req.get('host') + req.baseUrl;
    console.log(req.query);
    // console.log("outside" + req.params.message);
    dbconnection.query(query, function(err, rows) {
        // console.log("inside" + req.params.message);
        if(err) {
            res.render('books', { title: 'Books - ERROR', books: '', message: req.params.message });
        } else {
            res.render('books', { title: 'Books', books:rows, message: req.params.message, url: fullUrl });
        }
    });
});

// http://localhost:3000/books/add
// shows the actual form for the model book in order to
// collect data from the  client and send them to the backend
// form ADD - INSERT
router.get('/add/', function(req, res, next) {
    res.render('books_new', { title: 'Books - Add New', message:'' });
});

// Actual INSERT
router.post('/add', function(req, res, next) {
    let book = new Book(undefined, req.body.title, req.body.author);
    const query = "INSERT INTO `books`(`title`, `author`) VALUES('"+ book.title + "', '" + book.author + "')";
    const query2 = `INSERT INTO books(title, author) VALUES('${book.title}', '${book.author}');`;
    console.log("q"); console.log(query);
    console.log("q2"); console.log(query2);
    dbconnection.query(query2, function(err, status) {
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

// DELETE
// http://localhost:3000/books/delete/1 <---- we delete the record with id = 1

// UPDATE

module.exports = router;
  