import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('pages/home.tsx'),
  route('auth/login', './pages/login.tsx'),
  route('auth/register', './pages/register.tsx'),
] satisfies RouteConfig
