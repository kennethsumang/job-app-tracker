import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import { errors } from '@adonisjs/core'
import { registerValidator, loginValidator } from '#validators/auth'
import User from '#models/user'
import _ from 'lodash'

export default class AuthController {
  async register({ request }: HttpContext) {
    const body = request.body()
    const data = await registerValidator.validate(body)
    const user = await User.create(data)
    return {
      data: _.omit(user.toJSON(), ['password']),
    }
  }

  async login({ request }: HttpContext) {
    const body = request.body()
    const data = await loginValidator.validate(body)
    const user = await User.query().where('email', data.email).firstOrFail()
    const isPasswordValid = await hash.verify(user.password, data.password)
    if (!isPasswordValid) {
      throw errors.E_HTTP_EXCEPTION.invoke({ error: 'Invalid credentials' }, 401)
    }
    const accessToken = await User.accessTokens.create(user)
    return {
      data: { ..._.omit(user.toJSON(), ['password']) },
      token: accessToken.value!.release(),
    }
  }
}
