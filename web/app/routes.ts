import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('./modules/auth/pages/login.tsx'),
  route('/register', './modules/auth/pages/register.tsx'),
] satisfies RouteConfig
