import JobApplicationGroup from '#models/job_application_group'
import {
  createJobApplicationGroupValidator,
  updateJobApplicationGroupValidator,
} from '#validators/job_application_group'
import type { HttpContext } from '@adonisjs/core/http'

export default class JobApplicationGroupsController {
  /**
   * Display a list of resource
   */
  async index({ request, auth, response }: HttpContext) {
    if (!auth.isAuthenticated) {
      return response.unauthorized({
        error: 'You must be logged in to access this resource',
      })
    }

    const page = Number.parseInt(request.qs().page || '1', 10)
    const limit = Number.parseInt(request.qs().limit || '10', 10)
    const user = auth.user!
    const jobApplicationGroups = await JobApplicationGroup.query()
      .select('*')
      .whereHas('user', (query) => {
        return query.where('id', user.id)
      })
      .paginate(page, limit)

    return jobApplicationGroups
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth, response }: HttpContext) {
    if (!auth.isAuthenticated) {
      return response.unauthorized({
        error: 'You must be logged in to access this resource',
      })
    }

    const body = request.body()
    const data = await createJobApplicationGroupValidator.validate(body)
    const jobApplicationGroup = await JobApplicationGroup.create({
      ...data,
      userId: auth.user!.id,
    })
    return {
      data: jobApplicationGroup,
    }
  }

  /**
   * Show individual record
   */
  async show({ params, auth, response }: HttpContext) {
    if (!auth.isAuthenticated) {
      return response.unauthorized({
        error: 'You must be logged in to access this resource',
      })
    }

    const id = params.id
    const userId = auth.user!.id
    const jobApplicationGroup = await JobApplicationGroup.query()
      .select('*')
      .where('id', id)
      .where('userId', userId)
      .firstOrFail()

    return {
      data: jobApplicationGroup,
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, auth, response }: HttpContext) {
    if (!auth.isAuthenticated) {
      return response.unauthorized({
        error: 'You must be logged in to access this resource',
      })
    }

    const id = params.id
    const userId = auth.user!.id
    await JobApplicationGroup.query().where('id', id).where('userId', userId).firstOrFail()

    const body = request.body()
    const data = await updateJobApplicationGroupValidator.validate(body)
    await JobApplicationGroup.query()
      .where('id', id)
      .update({ ...data })

    const updatedGroup = await JobApplicationGroup.query()
      .select('*')
      .where('id', id)
      .where('userId', userId)
      .firstOrFail()

    return {
      data: updatedGroup,
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, auth, response }: HttpContext) {
    if (!auth.isAuthenticated) {
      return response.unauthorized({
        error: 'You must be logged in to access this resource',
      })
    }

    const id = params.id
    const userId = auth.user!.id
    const jobApplicationGroup = await JobApplicationGroup.query()
      .where('id', id)
      .where('userId', userId)
      .firstOrFail()

    await jobApplicationGroup.delete()
    return response.noContent()
  }
}
