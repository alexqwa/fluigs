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

type SignInSchema = z.infer<typeof signInSchema>

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
    setCodeHasSend(true)
    setCooldown(30)

    const isValid = await form.trigger(['email', 'value'])
    if (!isValid) {
      setCodeHasSend(false)
      return
    }

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

    router.push('/dashboard')
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
