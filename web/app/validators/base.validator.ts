import { object } from 'yup'

export default class BaseValidator {
  schema = object({})

  async validate<T>(data: Record<string, unknown>): Promise<T> {
    // validate data against the schema then return null if no errors or array of error messages
    const validatedData = await this.schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    })
    return validatedData as T
  }
}
