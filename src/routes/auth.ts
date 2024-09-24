import express, { Express, NextFunction, Request, Response, Router } from 'express'
import { authService } from '../services'

interface IAuthRoute {
    router(app: Express): Router
    login(req: Request, res: Response, next: NextFunction): any
}

export class AuthRoute implements IAuthRoute {
    constructor() {
        console.log("AuthRoute initialized")
    }

    router(app: Express): Router {
        const router = express.Router()

        app.post('/auth/login', this.login)

        return router
    }

    async login(req: Request, res: Response, _next: NextFunction): Promise<any> {
        let response = await authService.login({
            'username': req.body.username,
            'password': req.body.password
        })
        response.send(res)
    }
}