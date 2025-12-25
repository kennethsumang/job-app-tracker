import type { HttpContext } from '@adonisjs/core/http'
import JobApplicationGroup from '#models/job_application'
import {
  fetchJobApplicationsValidator,
  JobApplicationStatus,
  JobApplicationWorkSetup,
} from '#validators/job_application'
import JobApplication from '#models/job_application'

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
      .whereNull('deleted_at')
      .paginate(page, limit)

    return jobApplications
  }

  /**
   * Handle form submission for the create action
   */
  async store({ auth, request, response }: HttpContext) {
    if (!auth.isAuthenticated) {
      return response.unauthorized({
        error: 'You must be logged in to access this resource',
      })
    }

    const body = request.body()
    const data = await fetchJobApplicationsValidator.validate(body)
    const jobApplication = await JobApplicationGroup.create({
      ...data,
      status: data.status as JobApplicationStatus,
      workSetup: data.workSetup as JobApplicationWorkSetup,
    })
    return {
      data: jobApplication,
    }
  }

  /**
   * Show individual record
   */
  async show({ auth, params, response }: HttpContext) {
    if (!auth.isAuthenticated) {
      return response.unauthorized({
        error: 'You must be logged in to access this resource',
      })
    }

    const id = params.id
    const userId = auth.user!.id
    const jobApplication = await JobApplication.query()
      .select('*')
      .where('id', id)
      .whereHas('jobApplicationGroup', (qb) => {
        qb.where('userId', userId)
      })
      .firstOrFail()

    return {
      data: jobApplication,
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ auth, request, params, response }: HttpContext) {
    if (!auth.isAuthenticated) {
      return response.unauthorized({
        error: 'You must be logged in to access this resource',
      })
    }

    const id = params.id
    const userId = auth.user!.id
    await JobApplicationGroup.query()
      .where('id', id)
      .whereHas('jobApplicationGroup', (qb) => {
        qb.where('userId', userId)
      })
      .firstOrFail()
    const body = request.body()
    const data = await fetchJobApplicationsValidator.validate(body)

    await JobApplication.query()
      .where('id', id)
      .update({ ...data })

    const updatedJobApplication = await JobApplication.query()
      .select('*')
      .where('id', id)
      .firstOrFail()

    return {
      data: updatedJobApplication,
    }
  }

  /**
   * Delete record (soft delete)
   */
  async destroy({ auth, params, response }: HttpContext) {
    if (!auth.isAuthenticated) {
      return response.unauthorized({
        error: 'You must be logged in to access this resource',
      })
    }

    const id = params.id
    const userId = auth.user!.id
    await JobApplication.query()
      .where('id', id)
      .whereHas('jobApplicationGroup', (qb) => {
        qb.where('userId', userId)
      })
      .firstOrFail()

    await JobApplication.query().where('id', id).update({ deletedAt: new Date() })
    return response.noContent()
  }
}
