var mysql2 = require("mysql2");

var connection = mysql2.createConnection({
    host:'localhost',
    user:'cb12ptjs',
    password:'cb12ptjs',
    database:'private_school',
    port:3306
});

// why this Connected is showing by the time we run the project!
connection.connect(function(error) {
    if(error) {
        console.log(error);
    } else {
        console.log("Connected!");
    }
});

module.exports = connection;