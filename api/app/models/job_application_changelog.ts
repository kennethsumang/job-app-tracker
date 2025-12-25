import { DateTime } from 'luxon'
import { column } from '@adonisjs/lucid/orm'
import UuidBaseModel from './uuid_base.js'

export default class JobApplicationChangelog extends UuidBaseModel {
  @column()
  declare jobApplicationId: string

  @column()
  declare field: string

  @column()
  declare action: 'created' | 'updated' | 'deleted'

  @column()
  declare valueBefore: string | null

  @column()
  declare valueAfter: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}