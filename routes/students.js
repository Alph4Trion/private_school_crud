var express = require('express');
var router = express.Router();
var dbconnection = require('../lib/db');
var Student = require('../models/student');



/* GET home page. */
// URL: http://localhost:3000/students/
// list - SELECT
router.get('/list/:message?', function(req, res, next) {
    const query = "SELECT * FROM students";
    var fullUrl = req.protocol + '://' + req.get('host') + req.baseUrl;
    // console.log("outside" + req.params.message);
    dbconnection.query(query, function(err, rows) {
        // console.log("inside" + req.params.message);
        if(err) {
            res.render('students', { title: 'Students - ERROR', students: '', message: req.params.message });
        } else {
            res.render('students', { title: 'Students', students:rows, message: req.params.message, url: fullUrl });
        }
    });
});

// http://localhost:3000/students/add
// shows the actual form for the model book in order to
// collect data from the  client and send them to the backend
// form ADD - INSERT
router.get('/add/', function(req, res, next) {
    res.render('students_new', { title: 'Students - Add New', message:'' });
});

// Actual INSERT
router.post('/add', function(req, res, next) {
    let student = new Student(undefined, req.body.first_name, req.body.last_name, req.body.date_of_birth, req.body.tuition_fees);
    const query = `INSERT INTO students(first_name, last_name, date_of_birth, tuition_fees) VALUES('${student.first_name}', '${student.last_name}', '${student.date_of_birth}', '${student.tuition_fees}');`;
    dbconnection.query(query, function(err, status) {
        // NOT OK - Error!!!
        if(err) {
            res.render("students_new", { title: 'Students - Add New', message: "Error inserting data to the database!" });
        } 
        // All OK!!!
        else {
            //res.render("students", { title: 'Students', students: '', message: "All ok!!!" });
            // res.render("students", {});
            res.redirect('/students/list/All OK!!!');
        }
        
    });
});


// fix delete with invalid id
// DELETE
// http://localhost:3000/students/delete/1 <---- we delete the record with id = 1
router.get('/delete/:id', function(req, res, next) {
    var query = "DELETE FROM `students` WHERE `id` = ?";
    const studentId = req.params.id;
    dbconnection.execute(query, [studentId], function(err, result, fields) {
        if(err) {

        } else {
            res.redirect('/students/list/Student with id ' + studentId + " is deleted!");        
        }
    });
});

// fix edit with invalid id
// UPDATE
// show form with data
router.get('/edit/:id', function(req, res, next) {
    const studentId = req.params.id;
    var query = "SELECT * FROM `students` WHERE `id` = ?";
    dbconnection.execute(query, [studentId], function(err, result, fields) {
        console.log(result[0]);
        let student = new Student(result[0].id, result[0].first_name, result[0].last_name, result[0].date_of_birth, result[0].tuition_fees, result[0].created_at, result[0].updated_at);
        console.log(student);
        res.render('students_edit', { title: 'Students - Edit', message:'',  student: student});
    });
});

// UPDATE 
// call router.post('/update/)
router.post('/update', function(req, res, next) {
    let student = new Student(req.body.id, req.body.first_name, req.body.last_name, req.body.date_of_birth, req.body.tuition_fees);
    const query = "UPDATE `students` SET `first_name` = ?, `last_name` = ?, `date_of_birth` = ?, `tuition_fees`=?, `created_at` = ?, `updated_at`=? WHERE `id` = ?;";
    dbconnection.execute(query, [student.first_name, student.last_name, student.date_of_birth, student.tuition_fees, student.created_at, student.updated_at, student.id], function(err, status) {
        if(err) {
            res.render('students_edit', { title: 'Students - Edit', message:'Update failed! Check the values again!',  student: student});
        } else {
            res.redirect('/students/list/Student with id ' + student.id + " is updated!");
        }
    });
});

module.exports = router;
  