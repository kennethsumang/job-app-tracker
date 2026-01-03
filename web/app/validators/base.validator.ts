import * as yup from 'yup'

/**
 * Custom Validation Exception
 * Thrown when validation fails with an array of error messages
 */
export class ValidationException extends Error {
  public errors: string[]

  constructor(errors: string[]) {
    super('Validation failed')
    this.name = 'ValidationException'
    this.errors = errors
  }
}

/**
 * Base Validator Class
 * Provides validation functionality using yup schema
 */
export class BaseValidator {
  /**
   * Schema to be overridden by child classes
   * This should be a yup schema object for validation
   */
  protected static schema: yup.Schema = yup.object().shape({})

  /**
   * Validates data against the schema
   * @param data - The data to validate (type: unknown)
   * @returns null if validation passes
   * @throws ValidationException if validation fails with array of error messages
   */
  static async validate(data: unknown): Promise<null> {
    try {
      await this.schema.validate(data, { abortEarly: false })
      return null
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorMessages = error.inner.map((err) => err.message)
        throw new ValidationException(errorMessages)
      }
      throw error
    }
  }
}
