import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'job_applications'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table
        .uuid('job_application_group_id')
        .notNullable()
        .references('id')
        .inTable('job_application_groups')
        .onDelete('CASCADE')
      table.string('company_name').notNullable()
      table.string('position').notNullable()
      table.text('requirements').defaultTo('')
      table.text('responsibilities').defaultTo('')
      table
        .enum('status', [
          'draft',
          'submitted',
          'under_review',
          'shortlisted',
          'interview_scheduled',
          'interviewed',
          'offered',
          'accepted',
          'rejected',
          'withdrawn',
        ])
        .defaultTo('draft')
      table.enum('work_setup', ['remote', 'on_site', 'hybrid']).defaultTo('on_site')
      table.float('expected_salary').nullable()
      table.text('cover_letter').nullable()
      table.text('resume').nullable()
      table.string('source', 100).nullable()
      table.text('notes').defaultTo('')

      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
