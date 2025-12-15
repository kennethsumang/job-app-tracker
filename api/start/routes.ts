/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const AuthController = () => import('#controllers/auth_controller')
const JobApplicationGroupsController = () =>
  import('#controllers/job_application_groups_controller')
const JobApplicationsController = () => import('#controllers/job_applications_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])
  })
  .prefix('/auth')

router
  .group(() => {
    router.resource('job-application-groups', JobApplicationGroupsController).apiOnly()
    router.resource('job-applications', JobApplicationsController).apiOnly()
  })
  .use(middleware.auth())
