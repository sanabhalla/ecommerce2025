require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
  
  connection.query('SELECT * FROM product_categories', (err, results) => {
    if (err) {
      console.error('Query error:', err);
    } else {
      console.log('Query results:', results);
    }
    connection.end();
  });
});