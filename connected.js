var mysql = require('mysql');
var con   = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_movie"
});

module.exports = con;