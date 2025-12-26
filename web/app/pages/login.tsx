import { Container, Paper, Stack, Title } from '@mantine/core'

import LoginFormComponent from '~/components/auth/LoginForm/LoginFormComponent'

export function meta() {
  return [
    { title: 'Login' },
    { name: 'description', content: 'Login to Job App Tracker' },
  ]
}

export default function Login() {
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
            Login
          </Title>
          <LoginFormComponent />
        </Stack>
      </Paper>
    </Container>
  )
}
