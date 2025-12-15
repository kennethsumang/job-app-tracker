import { DateTime } from 'luxon'
import { column } from '@adonisjs/lucid/orm'
import UuidBaseModel from './uuid_base.js'

export default class JobApplication extends UuidBaseModel {
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
