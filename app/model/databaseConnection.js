const mysql = require('promise-mysql')

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONN_LIMIT
})

function getSqlConnection() {
    return pool.getConnection().disposer((connection) => {
        pool.releaseConnection(connection)
    })
}

module.exports.getConnection = getSqlConnection