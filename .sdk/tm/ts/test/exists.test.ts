
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AiCatsSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await AiCatsSDK.test()
    equal(null !== testsdk, true)
  })

})
