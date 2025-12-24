import type { HttpContext } from '@adonisjs/core/http'
import JobApplicationGroup from '#models/job_application'
import { fetchJobApplicationsValidator } from '#validators/job_application'

export default class JobApplicationsController {
  /**
   * Display a list of resource
   */
  async index({ auth, response, request }: HttpContext) {
    if (!auth.isAuthenticated) {
      return response.unauthorized({
        error: 'You must be logged in to access this resource',
      })
    }

    const query = request.qs()
    const validated = await fetchJobApplicationsValidator.validate(query)
    const page = validated.page || 1
    const limit = validated.limit || 10

    const jobApplications = await JobApplicationGroup.query()
      .select('*')
      .if(query.jobApplicationGroupId, (qb) => {
        qb.where('job_application_group_id', query.jobApplicationGroupId)
      })
      .if(query.status, (qb) => {
        qb.where('status', query.status)
      })
      .if(query.searchText, (qb) => {
        qb.where((subQuery) => {
          subQuery
            .where('company_name', 'like', `%${query.searchText}%`)
            .orWhere('position', 'like', `%${query.searchText}%`)
            .orWhere('requirements', 'like', `%${query.searchText}%`)
            .orWhere('responsibilities', 'like', `%${query.searchText}%`)
            .orWhere('notes', 'like', `%${query.searchText}%`)
        })
      })
      .if(query.workSetup, (qb) => {
        qb.where('work_setup', query.workSetup)
      })
      .paginate(page, limit)

    return jobApplications
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}