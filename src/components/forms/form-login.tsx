'use client'

import { Controller } from 'react-hook-form'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronRight, Loader2, Mail } from 'lucide-react'

import { Button } from '@/components/ui/button'
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
} from '../ui/card'
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
import { useFormLogin } from '@/hooks/use-form-login'

export function FormLogin() {
  const { form, error, reset, sendCode, cooldown, onSubmit, codeHasSend } =
    useFormLogin()

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
        <form id="form-rhf-select" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="flex-col! gap-6!">
            <Controller
              name="value"
              control={form.control}
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
                          form.setValue('email', selected.email)
                          form.setValue('name', selected.label)
                        }
                      }}
                      disabled={codeHasSend}
                    >
                      <SelectTrigger
                        id="form-rhf-select-store"
                        aria-invalid={fieldState.invalid}
                        className="bg-muted border-border min-w-full cursor-pointer border aria-invalid:border-red-400"
                      >
                        <SelectValue placeholder="Selecionar Filial" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-card border-border border">
                        <SelectGroup>
                          <SelectLabel>Selecionar Filial</SelectLabel>
                          {data.stores
                            .sort((a, b) => Number(a.value) - Number(b.value))
                            .map((store) => (
                              <SelectItem key={store.value} value={store.value}>
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
                    <Button
                      onClick={sendCode}
                      variant={'default'}
                      disabled={codeHasSend || cooldown > 0}
                      className="h-12 cursor-pointer"
                    >
                      <AnimatePresence mode="wait">
                        {!codeHasSend ? (
                          <motion.div
                            key="send"
                            initial={{ x: 0, opacity: 1 }}
                            exit={{ x: 60, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-3"
                          >
                            <Mail className="text-primary-foreground" />
                            <span className="text-primary-foreground text-sm font-medium">
                              Enviar código para o e-mail
                            </span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="loading"
                            initial={{ x: -60, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 60, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-3"
                          >
                            <Check className="text-primary-foreground" />
                            <span className="text-primary-foreground text-sm font-medium">
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
              control={form.control}
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
                      <InputOTPGroup className="*:data-[slot=input-otp-slot]:bg-muted *:data-[slot=input-otp-slot]:border-border w-full font-semibold *:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:flex-1 *:data-[slot=input-otp-slot]:text-xl *:data-[slot=input-otp-slot]:aria-invalid:ring-2 *:data-[slot=input-otp-slot]:aria-invalid:ring-red-400!">
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

                      <InputOTPGroup className="*:data-[slot=input-otp-slot]:bg-muted *:data-[slot=input-otp-slot]:border-border w-full font-semibold *:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:flex-1 *:data-[slot=input-otp-slot]:text-xl *:data-[slot=input-otp-slot]:aria-invalid:ring-2 *:data-[slot=input-otp-slot]:aria-invalid:ring-red-400!">
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
            variant={'default'}
            form="form-rhf-select"
            disabled={form.formState.isSubmitting}
            className="group/button group relative inline-flex min-h-12 w-full flex-1 overflow-hidden px-6 py-3 text-base font-semibold whitespace-nowrap transition-all select-none hover:cursor-pointer lg:min-w-fit"
          >
            {form.formState.isSubmitting && (
              <div className="relative">
                <Loader2 className="text-primary-foreground absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2 animate-spin" />
                <Loader2 className="text-primary-foreground absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 scale-x-[-1] transform animate-spin" />
              </div>
            )}
            {!form.formState.isSubmitting && (
              <span className="mx-3.5 transition-all duration-400 group-hover:mx-0 group-hover:mr-6.5">
                Entrar
              </span>
            )}
            <div className="absolute top-1/2 right-12 -translate-y-1/2 opacity-0 transition-all duration-300 ease-in-out group-hover:right-4 group-hover:opacity-100">
              <ChevronRight size={24} className="text-primary-foreground" />
            </div>
          </Button>
          <Button
            variant="link"
            onClick={reset}
            disabled={cooldown > 0}
            className="text-muted-foreground mx-auto mt-3 w-fit cursor-pointer text-sm"
          >
            {cooldown > 0 ? `Reenviar em ${cooldown}s` : 'Reenviar código?'}
          </Button>
        </div>
      </CardFooter>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </Card>
  )
}
