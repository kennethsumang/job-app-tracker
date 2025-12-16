import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid'

export default class UuidBaseModel extends BaseModel {
  @beforeCreate()
  static generateId(model: any) {
    model.id = v4()
  }

  @column({
    isPrimary: true,
    serialize: (value) => value,
  })
  declare id: string
}
