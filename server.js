var mysql = require('mysql');
// eslint-disable-next-line no-unused-vars
var conn = mysql.createConnection({
    host: "localhost",
  port: "3307",
  user: "root",
  password: "admin1234"
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  con.query(...)
  con.end(function(err) {
    if (err) throw err;
    console.log("Closed!");
  });