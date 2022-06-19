import mysql from 'mysql'

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: process.env.DB_NAME || 'bookcar',
  port: 3306
})

connection.connect(function (err) {
  if (err) throw err
  console.log('Database connected!')
})

module.exports = connection
