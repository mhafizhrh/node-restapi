import mysql, { Pool, PoolOptions } from 'mysql2/promise'

export class MysqlConnection {
    static connect(): Pool {
        const options: PoolOptions = {
            host: process.env.MYSQL_HOST,
            port: parseInt(process.env.MYSQL_PORT || ''),
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASS,
            database: process.env.MYSQL_DB,
        }

        const connection = mysql.createPool(options)

        console.log('Connected to mysql')

        return connection
    }
}