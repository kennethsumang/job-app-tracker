import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { column, belongsTo } from '@adonisjs/lucid/orm'
import UuidBaseModel from './uuid_base.js'
import JobApplicationGroup from './job_application_group.js'

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

  @belongsTo(() => JobApplicationGroup)
  declare jobApplicationGroup: BelongsTo<typeof JobApplicationGroup>
}
