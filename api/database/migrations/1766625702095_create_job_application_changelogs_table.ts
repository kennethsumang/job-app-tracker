import { BaseSchema } from '@adonisjs/lucid/schema'

export default class JobApplicationChangelog extends BaseSchema {
  protected tableName = 'job_application_changelogs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table
        .uuid('job_application_id')
        .notNullable()
        .references('id')
        .inTable('job_applications')
        .onDelete('CASCADE')
      table.enum('action', ['created', 'updated', 'deleted']).notNullable()
      table.string('field').nullable()
      table.text('value_before').nullable()
      table.text('value_after').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
