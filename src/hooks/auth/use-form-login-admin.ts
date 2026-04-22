import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { zodResolver } from '@hookform/resolvers/zod'

import { SignInSchemaAdmin, signInSchemaAdmin } from '@/hooks/auth/schemas'

export function useFormLoginAdmin() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const form = useForm<SignInSchemaAdmin>({
    resolver: zodResolver(signInSchemaAdmin),
    defaultValues: { email: '', password: '' },
  })

  async function onSubmit({ email, password }: SignInSchemaAdmin) {
    setError(null)

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      })

      if (error) {
        setError(error.message || 'Algo deu errado.')
        return
      }

      router.replace('/admin/data')
      router.refresh()
      reset()
    } catch (error) {
      console.log(error, 'Algo deu errado!')
    }
  }

  function reset() {
    setError(null)
    form.reset()
  }

  return {
    form,
    error,
    reset,
    onSubmit,
  }
}
