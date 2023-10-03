import mysql from 'mysql2/promise';

const createConnection = async () => {
  return mysql.createConnection({
      host: 'dev-pickups-rds-mysql.cgyoo5hasxlk.us-east-1.rds.amazonaws.com',
      port:3306,
      user: 'admin',
      database: 'dev_pickups',
      password: 'M3l155412!'
    })
    // return mysql.createConnection({
    //     host: 'localhost',
    //     port:8889,
    //     user: 'root',
    //     database: 'pickups_dev',
    //     password: 'M3l155412!',
    //     socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
    //   })
}

export default createConnection;