var express = require('express');
var router = express.Router();
var dbconnection = require('../lib/db');
var Trainer = require('../models/trainer');



/* GET home page. */
// URL: http://localhost:3000/trainers/
// list - SELECT
router.get('/list/:message?', function(req, res, next) {
    const query = "SELECT * FROM trainers";
    var fullUrl = req.protocol + '://' + req.get('host') + req.baseUrl;
    // console.log("outside" + req.params.message);
    dbconnection.query(query, function(err, rows) {
        // console.log("inside" + req.params.message);
        if(err) {
            res.render('trainers', { title: 'Trainers - ERROR', trainers: '', message: req.params.message });
        } else {
            res.render('trainers', { title: 'Trainers', trainers:rows, message: req.params.message, url: fullUrl });
        }
    });
});

// http://localhost:3000/trainers/add
// shows the actual form for the model book in order to
// collect data from the  client and send them to the backend
// form ADD - INSERT
router.get('/add/', function(req, res, next) {
    res.render('trainers_new', { title: 'Trainers - Add New', message:'' });
});

// Actual INSERT
router.post('/add', function(req, res, next) {
    let trainer = new Trainer(undefined, req.body.first_name, req.body.last_name, req.body.subject);
    const query = `INSERT INTO trainers(first_name, last_name, subject) VALUES('${trainer.first_name}', '${trainer.last_name}', '${trainer.subject}');`;
    dbconnection.query(query, function(err, status) {
        // NOT OK - Error!!!
        if(err) {
            res.render("trainers_new", { title: 'Trainers - Add New', message: "Error inserting data to the database!" });
        } 
        // All OK!!!
        else {
            //res.render("trainers", { title: 'Trainers', trainers: '', message: "All ok!!!" });
            // res.render("trainers", {});
            res.redirect('/trainers/list/All OK!!!');
        }
        
    });
});


// fix delete with invalid id
// DELETE
// http://localhost:3000/trainers/delete/1 <---- we delete the record with id = 1
router.get('/delete/:id', function(req, res, next) {
    var query = "DELETE FROM `trainers` WHERE `id` = ?";
    const trainerId = req.params.id;
    dbconnection.execute(query, [trainerId], function(err, result, fields) {
        if(err) {

        } else {
            res.redirect('/trainers/list/Trainer with id ' + trainerId + " is deleted!");        
        }
    });
});

// fix edit with invalid id
// UPDATE
// show form with data
router.get('/edit/:id', function(req, res, next) {
    const trainerId = req.params.id;
    var query = "SELECT * FROM `trainers` WHERE `id` = ?";
    dbconnection.execute(query, [trainerId], function(err, result, fields) {
        console.log(result[0]);
        let trainer = new Trainer(result[0].id, result[0].first_name, result[0].last_name, result[0].subject);
        console.log(trainer);
        res.render('trainers_edit', { title: 'Trainers - Edit', message:'',  trainer: trainer});
    });
});

// UPDATE 
// call router.post('/update/)
router.post('/update', function(req, res, next) {
    let trainer = new Trainer(req.body.id, req.body.first_name, req.body.last_name, req.body.subject);
    const query = "UPDATE `trainers` SET `first_name` = ?, `last_name` = ?, `subject` = ? WHERE `id` = ?;";
    dbconnection.execute(query, [trainer.first_name, trainer.last_name, trainer.subject, trainer.id], function(err, status) {
        if(err) {
            res.render('trainers_edit', { title: 'Trainers - Edit', message:'Update failed! Check the values again!',  trainer: trainer});
        } else {
            res.redirect('/trainers/list/Trainer with id ' + trainer.id + " is updated!");
        }
    });
});

module.exports = router;
  