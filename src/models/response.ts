import { Response } from "express"

export interface ResponseData {
    code: number
    message: string 
    data: any 
    errors: any
}

export class ApiResponse {
    private code: number
    private message: string
    private data: any
    private errors: any

    constructor(code: number, message: string, data: any, errors: any) {
        this.code = code 
        this.message = message
        this.data = data
        this.errors = errors
    }

    static success(code: number, message: string, data: any) {
        const res = new ApiResponse(code, message, data, {})
        return res
    }

    static error(code: number, message: string, error: any) {
        const res = new ApiResponse(code, message, {}, error)
        return res
    }

    send(res: Response) {
        const data: ResponseData = {
            code: this.code,
            message: this.message,
            data: this.data,
            errors: this.errors
        }
        res.status(this.code).send(data)
    }
}