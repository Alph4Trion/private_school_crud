var express = require('express');
var router = express.Router();
var dbconnection = require('../lib/db');



/* GET home page. */
// URL: http://localhost:3000/courses/
// list - SELECT
router.get('/list/:message?', function(req, res, next) {
    const query = "SELECT * FROM courses";
    var fullUrl = req.protocol + '://' + req.get('host') + req.baseUrl;
    // console.log("outside" + req.params.message);
    dbconnection.query(query, function(err, rows) {
        // console.log("inside" + req.params.message);
        if(err) {
            res.render('courses', { title: 'Courses - ERROR', courses: '', message: req.params.message });
        } else {
            res.render('courses', { title: 'Courses', courses:rows, message: req.params.message, url: fullUrl });
        }
    });
});

module.exports = router;