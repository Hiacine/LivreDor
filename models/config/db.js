let mysql = require('mysql2');

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Pall,Mall',
    database : 'tutoriels'
  });

connection.connect();

module.exports = connection