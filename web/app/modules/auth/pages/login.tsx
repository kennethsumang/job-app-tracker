import LoginFormComponent from '../components/LoginForm/LoginFormComponent'
import AuthLayout from '../layout/AuthLayout'

export function meta() {
  return [
    { title: 'Login' },
    { name: 'description', content: 'Login to Job App Tracker' },
  ]
}

export default function Login() {
  return (
    <AuthLayout header="Login">
      <LoginFormComponent />
    </AuthLayout>
  )
}
