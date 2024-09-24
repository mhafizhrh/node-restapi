import { QueryResult, RowDataPacket } from 'mysql2/promise'
import { mysqlConnection } from '../database'

export interface IAuthRepository {
    getUserByUsername(username: string): any
} 

export class AuthRepository implements IAuthRepository {
    constructor() {
        console.log("AuthRepository initialized")
    }

    async getUserByUsername(username: string): Promise<RowDataPacket[]> {
        const [user] = await mysqlConnection.query<RowDataPacket[]>('SELECT * FROM users WHERE username = ?', [username])
        return user
    }
}