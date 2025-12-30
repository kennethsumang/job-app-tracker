import { Container, Paper, Stack, Title } from '@mantine/core'

import RegisterFormComponent from '~/components/auth/RegisterForm/RegisterFormComponent'

export function meta() {
  return [
    { title: 'Register' },
    { name: 'description', content: 'Register for Job App Tracker' },
  ]
}

export default function Register() {
  return (
    <Container
      size="md"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper withBorder p={{ base: 24, md: 32 }} radius="md" w="100%" maw={500}>
        <Stack gap="lg">
          <Title order={1} size="h2">
            Register
          </Title>
          <RegisterFormComponent />
        </Stack>
      </Paper>
    </Container>
  )
}
