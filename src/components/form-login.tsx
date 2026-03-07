'use client'

import z from 'zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { useForm, Controller } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronRight, Loader2, Mail } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { authClient } from '@/lib/auth-client'
import { sendOTPEmail } from '@/actions/send-otp-email'

import { Button } from './ui/button'
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from '@/components/ui/select'
import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from './ui/card'
import {
  InputOTP,
  InputOTPSlot,
  InputOTPGroup,
  InputOTPSeparator,
} from '@/components/ui/input-otp'
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldContent,
} from '@/components/ui/field'

import data from '@/hooks/data.json'

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

export function LoginForm() {
  const router = useRouter()
  const [codeHasSend, setCodeHasSend] = useState(false)
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    reset,
    control,
    trigger,
    setValue,
    getValues,
    formState,
    handleSubmit,
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      name: '',
      email: '',
      value: '',
      otp: '',
    },
  })

  async function sendEmailOTPVerification() {
    const isValid = await trigger('value')

    if (!isValid) return

    setIsSendingCode(true)
    setError(null)

    try {
      const { email, name } = getValues()

      // Opção 1: Usando Server Action com Resend diretamente
      const result = await sendOTPEmail({
        email,
        storeName: name,
      })

      if (!result.success) {
        setError(result.error || 'Erro ao enviar código')
        setIsSendingCode(false)
        return
      }

      // Opção 2: Usando better-auth (mantido como alternativa)
      // const { data, error } = await authClient.emailOtp.sendVerificationOtp({
      //   email,
      //   type: 'sign-in',
      // })

      setCodeHasSend(true)
    } catch (error) {
      console.error(error)
      setError('Erro ao enviar código de verificação')
    } finally {
      setIsSendingCode(false)
    }
  }

  async function onSubmit({ email, otp }: SignInSchema) {
    setError(null)

    try {
      const { error } = await authClient.signIn.emailOtp({
        email,
        otp,
      })

      if (error) {
        setError(error?.message! || 'Algo deu errado.')
        return
      }

      router.push('/dashboard')
      ResetFields()
    } catch (error: any) {
      console.error('Erro ao verificar OTP:', error)
      setError(
        error?.message ||
          'Erro inesperado ao validar o código. Tente novamente.'
      )
    }
  }

  function ResetFields() {
    setCodeHasSend(false)
    reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground text-3xl font-bold">
          Autenticação
        </CardTitle>
        <CardDescription>
          Insira seus dados abaixo para se autenticar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-select" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="flex-col! gap-6!">
            <Controller
              name="value"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel className="text-muted-foreground text-sm font-normal">
                      Filial
                    </FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value)

                        const selected = data.stores.find(
                          (store) => store.value === value
                        )

                        if (selected) {
                          setValue('email', selected.email)
                          setValue('name', selected.label)
                        }
                      }}
                      disabled={codeHasSend}
                    >
                      <SelectTrigger
                        id="form-rhf-select-store"
                        aria-invalid={fieldState.invalid}
                        className="bg-muted border-border min-w-full cursor-pointer border aria-[invalid=true]:border-red-400"
                      >
                        <SelectValue placeholder="Selecionar Filial" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border border">
                        <SelectGroup>
                          <SelectLabel>Selecionar Filial</SelectLabel>
                          {data.stores
                            .sort((a, b) => Number(a.value) - Number(b.value))
                            .map((store) => (
                              <SelectItem
                                key={store.value}
                                value={store.value}
                                className="hover:bg-muted cursor-pointer text-sm"
                              >
                                Filial {store.value} - {store.label}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError
                        className="text-red-400"
                        errors={[fieldState.error]}
                      />
                    )}
                    {error && (
                      <p className="text-sm text-red-400">{error}</p>
                    )}
                    <Button
                      variant="outline"
                      disabled={codeHasSend || isSendingCode}
                      onClick={sendEmailOTPVerification}
                      className="bg-muted border-border flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border transition-all hover:brightness-125"
                    >
                      <AnimatePresence mode="wait">
                        {isSendingCode ? (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-2"
                          >
                            <Loader2
                              size={22}
                              className="text-foreground animate-spin"
                            />
                            <span className="text-foreground text-sm font-semibold">
                              Enviando código...
                            </span>
                          </motion.div>
                        ) : !codeHasSend ? (
                          <motion.div
                            key="send"
                            initial={{ x: 0, opacity: 1 }}
                            exit={{ x: 60, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-2"
                          >
                            <Mail size={22} className="text-foreground" />
                            <span className="text-foreground text-sm font-semibold">
                              Enviar código para o e-mail
                            </span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="success"
                            initial={{ x: -60, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 60, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-2"
                          >
                            <Check size={22} className="text-foreground" />
                            <span className="text-foreground text-sm font-semibold">
                              Código enviado com sucesso
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Button>
                  </FieldContent>
                </Field>
              )}
            />
            <Controller
              name="otp"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel className="text-muted-foreground text-sm font-normal">
                      Código enviado por e-mail
                    </FieldLabel>
                    <InputOTP
                      maxLength={6}
                      id="digits-only"
                      value={field.value}
                      onChange={field.onChange}
                      pattern={REGEXP_ONLY_DIGITS}
                    >
                      <InputOTPGroup className="*:data-[slot=input-otp-slot]:bg-muted *:data-[slot=input-otp-slot]:border-border w-full font-semibold *:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:flex-1 *:data-[slot=input-otp-slot]:text-xl *:data-[slot=input-otp-slot]:aria-[invalid=true]:ring-2 *:data-[slot=input-otp-slot]:aria-[invalid=true]:ring-red-400!">
                        <InputOTPSlot
                          index={0}
                          aria-invalid={fieldState.invalid}
                        />
                        <InputOTPSlot
                          index={1}
                          aria-invalid={fieldState.invalid}
                        />
                        <InputOTPSlot
                          index={2}
                          aria-invalid={fieldState.invalid}
                        />
                      </InputOTPGroup>

                      <InputOTPSeparator className="mx-2" />

                      <InputOTPGroup className="*:data-[slot=input-otp-slot]:bg-muted *:data-[slot=input-otp-slot]:border-border w-full font-semibold *:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:flex-1 *:data-[slot=input-otp-slot]:text-xl *:data-[slot=input-otp-slot]:aria-[invalid=true]:ring-2 *:data-[slot=input-otp-slot]:aria-[invalid=true]:ring-red-400!">
                        <InputOTPSlot
                          aria-invalid={fieldState.invalid}
                          index={3}
                        />
                        <InputOTPSlot
                          index={4}
                          aria-invalid={fieldState.invalid}
                        />
                        <InputOTPSlot
                          index={5}
                          aria-invalid={fieldState.invalid}
                        />
                      </InputOTPGroup>
                    </InputOTP>
                    {fieldState.invalid && (
                      <FieldError
                        className="text-red-400"
                        errors={[fieldState.error]}
                      />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <div className="flex w-full flex-col items-center">
          <Button
            type="submit"
            form="form-rhf-select"
            disabled={formState.isSubmitting}
            className="group/button bg-foreground group text-background relative inline-flex h-12 w-full flex-1 items-center justify-center gap-2 overflow-hidden rounded-lg px-6 py-3 text-base font-semibold whitespace-nowrap transition-all select-none hover:cursor-pointer lg:min-w-fit"
          >
            {formState.isSubmitting && (
              <Loader2 className="size-4 animate-spin" />
            )}
            {!formState.isSubmitting && (
              <span className="mx-3.5 transition-all duration-400 group-hover:mx-0 group-hover:mr-6.5">
                Entrar
              </span>
            )}
            <div className="absolute top-1/2 right-12 -translate-y-1/2 opacity-0 transition-all duration-300 ease-in-out group-hover:right-4 group-hover:opacity-100">
              <ChevronRight size={24} className="text-black" />
            </div>
          </Button>
          <Button
            variant="link"
            onClick={ResetFields}
            className="text-muted-foreground mx-auto mt-3 w-fit cursor-pointer text-sm"
          >
            Reenviar código?
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
