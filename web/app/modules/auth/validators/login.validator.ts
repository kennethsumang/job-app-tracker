import * as yup from 'yup'

import { BaseValidator } from '~/validators/base.validator'

export default class LoginValidator extends BaseValidator {
  protected static schema = yup.object({
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 5 characters long')
      .required('Password is required'),
  })
}
