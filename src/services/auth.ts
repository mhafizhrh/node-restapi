import httpStatus, { BAD_REQUEST, OK } from 'http-status'
import { ApiResponse } from '../models/response'
import { AuthLogin } from '../models/service'
import { authRepository } from '../repo'
import bcrypt from 'bcrypt'
import { ERROR } from '../models/errors'

export interface IAuthService {
    login(creds: AuthLogin): any
} 

export class AuthService implements IAuthService {
    constructor() {
        console.log("AuthService initialized")
    }
    
    async login(creds: AuthLogin): Promise<any> {
        const user = await authRepository.getUserByUsername(creds.username)
        if (user.length <= 0) {
            return ApiResponse.error(BAD_REQUEST, ERROR.WRONG_USERNAME_OR_PASSWORD, {})
        }
        if (!bcrypt.compareSync(creds.password, user[0].password)) {
            return ApiResponse.error(BAD_REQUEST, ERROR.WRONG_USERNAME_OR_PASSWORD, {})
        }
        return ApiResponse.success(OK, httpStatus[OK], {
            id: user[0].id,
            odoo_ref_id: user[0].id,
            name: user[0].name,
            username: user[0].username,
            email: user[0].email,
        })
    }
}