import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path: path.resolve(__dirname, '..', '.env')})
import express, { Request, Response } from 'express'
import { authRoute } from './routes'
import bodyParser from 'body-parser'
import { ApiResponse } from './models/response'
import { INTERNAL_SERVER_ERROR } from 'http-status'
const app = express()
const port = 3000

app.use(bodyParser.json())

authRoute.router(app)

app.use((err: any, _req: Request, res: Response, next: any) => {
    if (res.headersSent) {
        return next(err)
    }
    ApiResponse.error(INTERNAL_SERVER_ERROR, 'Internal Server Error', []).send(res)
})

const server = app.listen(port, () => {
    console.log(`Service started on port ${port}`)
})

// Handle Uncaught Exceptions
process.on('uncaughtException', (err: Error) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    // process.exit(1); // Optionally, restart the process
});

// Handle Unhandled Rejections
process.on('unhandledRejection', (reason: any, _promise: Promise<any>) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(reason);
    // server.close(() => {
    //     process.exit(1); // Optionally, restart the process
    // });
});