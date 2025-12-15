import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { column, belongsTo } from '@adonisjs/lucid/orm'
import User from './user.js'
import UuidBaseModel from './uuid_base.js'

export default class JobApplicationGroup extends UuidBaseModel {
  @column()
  declare userId: number

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
