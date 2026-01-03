import RegisterFormComponent from '../components/RegisterForm/RegisterFormComponent'
import AuthLayout from '../layout/AuthLayout'

export function meta() {
  return [
    { title: 'Register' },
    { name: 'description', content: 'Register for Job App Tracker' },
  ]
}

export default function Register() {
  return (
    <AuthLayout header="Register">
      <RegisterFormComponent />
    </AuthLayout>
  )
}
