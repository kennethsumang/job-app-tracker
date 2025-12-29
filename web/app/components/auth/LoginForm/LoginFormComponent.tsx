import React from 'react'
import { Button, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useMutation } from '@tanstack/react-query'

import type { LoginCredentials } from '~/types/auth'
import { request } from '~/libs/request.library'

export default function LoginFormComponent() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : 'Invalid email address',
    },
  })

  const mutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => {
      return request('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })
    },
    onSuccess: (data) => {
      // Handle successful login
      console.log('Login successful:', data)
    },
    onError: (error) => {
      // Handle login error
      console.error('Login failed:', error)
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
      <TextInput
        label="Email Address"
        placeholder="you@example.com"
        required
        {...form.getInputProps('email')}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        required
        {...form.getInputProps('password')}
      />
      <Button type="submit" fullWidth mt="md">
        Login
      </Button>
    </form>
  )
}
