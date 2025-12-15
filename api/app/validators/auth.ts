import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(100),
    email: vine.string().email().unique({ table: 'users', column: 'email' }),
    password: vine.string().minLength(5),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(5),
  })
)
