import assert from 'assert'
import { describe, it } from 'mocha'
import { ERROR } from './errors'

describe('Error Message', () => {
    it('message harus sesuai', () => {
        assert.equal(ERROR.WRONG_USERNAME_OR_PASSWORD, 'Username atau Password salah')
    })
})