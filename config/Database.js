const mysql = require('mysql2')

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

pool.getConnection((error, connection) => {
    if(error) {
        console.log(error)
    } else {
        console.log("Database Connection Succesfully")
    }
})

module.exports = pool.promise()