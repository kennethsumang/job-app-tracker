import { request } from '~/libs/request.library'
import type { LoginCredentials, RegisterForm } from '~/types/auth';

/**
 * Authentication Service
 */
export default class AuthService {
  /**
   * Login user with given credentials
   * @param   {LoginCredentials} credentials
   * @returns {Promise<any>}
   */
  async login(credentials: LoginCredentials) {
    return request('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
  }

  /**
   * Register a new user
   * @param   {RegisterForm} data
   * @returns {Promise<any>}
   */
  async register(data: RegisterForm) {
    return request('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }
}
