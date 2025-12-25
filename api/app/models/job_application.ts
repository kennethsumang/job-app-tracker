import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { column, belongsTo, afterCreate, afterUpdate, hasMany } from '@adonisjs/lucid/orm'
import UuidBaseModel from './uuid_base.js'
import JobApplicationGroup from './job_application_group.js'
import JobApplicationChangelog from './job_application_changelog.js'

export default class JobApplication extends UuidBaseModel {
  @column()
  declare jobApplicationGroupId: string

  @column()
  declare companyName: string

  @column()
  declare position: string

  @column()
  declare requirements: string

  @column()
  declare responsibilities: string

  @column()
  declare status:
    | 'draft'
    | 'submitted'
    | 'under_review'
    | 'shortlisted'
    | 'interview_scheduled'
    | 'interviewed'
    | 'offered'
    | 'accepted'
    | 'rejected'
    | 'withdrawn'

  @column()
  declare workSetup: 'remote' | 'on_site' | 'hybrid'

  @column()
  declare expectedSalary: number | null

  @column()
  declare coverLetter: string | null

  @column()
  declare resume: string | null

  @column()
  declare source: string | null

  @column()
  declare notes: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null

  @belongsTo(() => JobApplicationGroup)
  declare jobApplicationGroup: BelongsTo<typeof JobApplicationGroup>

  @hasMany(() => JobApplicationChangelog)
  declare changelogs: HasMany<typeof JobApplicationChangelog>

  @afterCreate()
  public static async logCreateInChangelog(model: JobApplication) {
    JobApplicationChangelog.create({
      jobApplicationId: model.id,
      action: 'created',
    })
  }

  @afterUpdate()
  public static async logUpdateInChangelog(model: JobApplication) {
    const dirtyKeys = Object.keys(model.$dirty) as (keyof JobApplication)[]
    // if there is deletedAt in dirty keys, skip logging other fields
    if (dirtyKeys.includes('deletedAt')) {
      JobApplicationChangelog.create({
        jobApplicationId: model.id,
        action: 'deleted',
      })
      return
    }

    for (const field of Object.keys(model.$dirty) as (keyof JobApplication)[]) {
      const valueBefore = model.$original[field]
      const valueAfter = model[field]
      JobApplicationChangelog.create({
        jobApplicationId: model.id,
        action: 'updated',
        field: field,
        valueBefore: valueBefore?.toString() ?? null,
        valueAfter: valueAfter?.toString() ?? null,
      })
    }
  }
}
