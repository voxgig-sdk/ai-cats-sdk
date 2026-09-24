
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AiCatsSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = AiCatsSDK.test()
    equal(testsdk instanceof AiCatsSDK, true,
      'AiCatsSDK.test() must return a client synchronously')
  })

})
