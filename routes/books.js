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
router.get('/delete/:id', function(req, res, next) {
    var query = "DELETE FROM `books` WHERE `id` = ?";
    const bookId = req.params.id;
    dbconnection.execute(query, [bookId], function(err, result, fields) {
        if(err) {

        } else {
            res.redirect('/books/list/Book with id ' + bookId + " is deleted!");        
        }
    });
});

// UPDATE
// show form with data
router.get('/edit/:id', function(req, res, next) {
    const bookId = req.params.id;
    var query = "SELECT * FROM `books` WHERE `id` = ?";
    dbconnection.execute(query, [bookId], function(err, result, fields) {
        console.log(result[0]);
        let book = new Book(result[0].id, result[0].title, result[0].author);
        console.log(book);
        res.render('books_edit', { title: 'Books - Edit', message:'',  book: book});
    });
});

// UPDATE 
// call router.post('/update/)
router.post('/update', function(req, res, next) {
    let book = new Book(req.body.id, req.body.title, req.body.author);
    const query = "UPDATE `books` SET `title` = ?, `author` = ? WHERE `id` = ?;";
    dbconnection.execute(query, [book.title, book.author, book.id], function(err, status) {
        if(err) {
            res.render('books_edit', { title: 'Books - Edit', message:'Update failed! Check the values again!',  book: book});
        } else {
            res.redirect('/books/list/Book with id ' + book.id + " is updated!");
        }
    });
});

module.exports = router;
  