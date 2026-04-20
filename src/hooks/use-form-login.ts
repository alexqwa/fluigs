import z from 'zod'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { authClient } from '@/lib/auth-client'

const signInSchema = z.object({
  value: z.string().min(4, 'Insira uma filial válida.'),
  email: z.email('Insira um endereço de e-mail válido.'),
  name: z
    .string()
    .min(4, 'O nome da loja deve ter pelo menos 4 caracteres.')
    .max(32, 'O nome da loja deve ter no máximo 32 caracteres.'),
  otp: z
    .string()
    .length(6, 'O código de verificação deve ter pelo menos 6 caracteres.'),
})

const signInSchemaAdmin = z.object({
  email: z.email('Digite um e-mail válido.'),
  password: z.string().min(8, 'A senha deve conter pelo menos 8 caracteres.'),
})

type SignInSchema = z.infer<typeof signInSchema>
type SignInSchemaAdmin = z.infer<typeof signInSchemaAdmin>

export function useFormLogin() {
  const router = useRouter()
  const [cooldown, setCooldown] = useState(0)
  const [codeHasSend, setCodeHasSend] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: { name: '', email: '', value: '', otp: '' },
  })

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000)
    return () => clearInterval(timer)
  }, [cooldown])

  async function sendCode() {
    setError(null)

    const isValid = await form.trigger(['email', 'value'])
    if (!isValid) {
      setCodeHasSend(false)
      return
    }

    setCodeHasSend(true)
    setCooldown(30)

    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email: form.getValues('email'),
      type: 'sign-in',
    })

    if (error) {
      setError(error.message!)
      setCodeHasSend(false)
      return
    }
  }

  async function onSubmit({ email, otp }: SignInSchema) {
    setError(null)
    const { error } = await authClient.signIn.emailOtp({ email, otp })

    if (error) {
      setError(error.message || 'Algo deu errado.')
      return
    }

    router.replace('/dashboard')
    router.refresh()
    reset()
  }

  function reset() {
    setCodeHasSend(false)
    setCooldown(0)
    setError(null)
    form.reset()
  }

  return {
    form,
    error,
    reset,
    cooldown,
    sendCode,
    onSubmit,
    codeHasSend,
  }
}

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
      const { error } = await authClient.signIn.email({ email, password })

      if (error) {
        setError(error.message || 'Algo deu errado.')
        return
      }

      router.replace('/admin/dashboard')
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
