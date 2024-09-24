import assert from 'assert'
import { describe, it } from 'mocha'
import { ApiResponse } from './response'
import { ERROR } from './errors'
// import { getMockReq, getMockRes } from '@jest-mock/express'

describe('API Response', () => {
    it('check success response', () => {
        const apiresponse = ApiResponse.success(200, 'OK', {
            'id': 1001,
            'name': 'Jane Doe'
        })
        const expect = new ApiResponse(200, 'OK', {
            'id': 1001,
            'name': 'Jane Doe'
        }, {})
        assert.deepStrictEqual(apiresponse, expect)
    })
    it('check error response', () => {
        const apiresponse = ApiResponse.error(400, ERROR.WRONG_USERNAME_OR_PASSWORD, {})
        const expect = new ApiResponse(400, ERROR.WRONG_USERNAME_OR_PASSWORD, {}, {})
        assert.deepStrictEqual(apiresponse, expect)
    })
    it('check error response with values', () => {
        const apiresponse = ApiResponse.error(400, 'Input Validation Error', {
            'username': 'Username is required',
            'password': 'Password is at least 8 digits'
        })
        const expect = new ApiResponse(400, 'Input Validation Error', {}, {
            'username': 'Username is required',
            'password': 'Password is at least 8 digits'
        })
        assert.deepStrictEqual(apiresponse, expect)
    })
})