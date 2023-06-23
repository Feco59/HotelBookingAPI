import mysql from 'mysql'

const pool= mysql.createPool({
    connectionLimit: 2,
    host: process.env.MYSQL_HOST,
})
