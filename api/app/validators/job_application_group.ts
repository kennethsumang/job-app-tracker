import vine from '@vinejs/vine'

export const createJobApplicationGroupValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(100),
    description: vine.string().maxLength(255).nullable(),
  })
)

export const updateJobApplicationGroupValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(100).optional(),
    description: vine.string().maxLength(255).nullable().optional(),
  })
)
