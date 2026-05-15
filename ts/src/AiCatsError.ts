
import { Context } from './Context'


class AiCatsError extends Error {

  isAiCatsError = true

  sdk = 'AiCats'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  AiCatsError
}

