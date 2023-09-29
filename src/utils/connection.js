import mysql from 'mysql2/promise'

const createConnection = async () => {
    return mysql.createConnection({
        host: 'localhost',
        port:8889,
        user: 'root',
        database: 'pickups_dev',
        password: 'M3l155412!',
        socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
      })
}

export default createConnection;