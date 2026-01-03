import React from 'react'
import { Container, Paper, Stack, Title } from '@mantine/core'

interface Props {
  children: React.ReactNode
  header: string
}

const AuthLayout: React.FC<Props> = ({ children, header }) => {
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
            {header}
          </Title>
          {children}
        </Stack>
      </Paper>
    </Container>
  )
}

export default AuthLayout;
