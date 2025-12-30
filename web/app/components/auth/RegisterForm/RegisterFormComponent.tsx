import React from 'react'
import { Button, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useMutation } from '@tanstack/react-query'

import type { RegisterForm } from '~/types/auth'
import { request } from '~/libs/request.library'

export default function RegisterFormComponent() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : 'Invalid email address',
      retypePassword: (value, values) =>
        value === values.password ? null : 'Passwords do not match',
    },
  })

  const mutation = useMutation({
    mutationFn: (data: RegisterForm) => {
      return request('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      })
    },
    onSuccess: (data) => {
      // Handle successful registration
      console.log('Registration successful:', data)
    },
    onError: (error) => {
      // Handle registration error
      console.error('Registration failed:', error)
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
      <TextInput
        label="Name"
        placeholder="Your full name"
        required
        {...form.getInputProps('name')}
      />
      <TextInput
        label="Email Address"
        placeholder="Your email address"
        required
        {...form.getInputProps('email')}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        required
        {...form.getInputProps('password')}
      />
      <PasswordInput
        label="Retype Password"
        placeholder="Retype your password"
        required
        {...form.getInputProps('retypePassword')}
      />
      <Button type="submit" mt="md">
        Register
      </Button>
    </form>
  )
}
