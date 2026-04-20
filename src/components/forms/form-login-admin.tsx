'use client'

import { ChevronRight } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { IconLoader } from '@tabler/icons-react'

import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent,
  CardDescription,
} from '@/components/ui/card'
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
  FieldContent,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useFormLoginAdmin } from '@/hooks/use-form-login'

export default function FormLoginAdmin() {
  const { error, form, onSubmit } = useFormLoginAdmin()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground text-3xl font-bold">
          Admin
        </CardTitle>
        <CardDescription>
          Insira seus dados abaixo para se autenticar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-admin" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="flex-col!">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel className="text-muted-foreground text-sm font-normal">
                      E-mail
                    </FieldLabel>
                    <Input
                      value={field.value}
                      onChange={field.onChange}
                      className="border-border min-w-full border aria-invalid:border-red-400"
                      placeholder="Digite seu e-mail"
                    />
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
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel className="text-muted-foreground text-sm font-normal">
                      Senha
                    </FieldLabel>
                    <Input
                      type="password"
                      value={field.value}
                      onChange={field.onChange}
                      className="border-border min-w-full border aria-invalid:border-red-400"
                      placeholder="Digite sua senha"
                    />
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
        <Button
          type="submit"
          variant={'default'}
          form="form-rhf-admin"
          disabled={form.formState.isSubmitting}
          className="group/button group relative inline-flex min-h-12 w-full flex-1 overflow-hidden px-6 py-3 text-base font-semibold whitespace-nowrap transition-all select-none hover:cursor-pointer lg:min-w-fit"
        >
          {form.formState.isSubmitting && (
            <IconLoader className="text-primary-foreground animate-spin" />
          )}
          {!form.formState.isSubmitting && (
            <span className="text-primary-foreground mx-3.5 transition-all duration-400 group-hover:mx-0 group-hover:mr-6.5">
              Entrar
            </span>
          )}

          <div className="absolute top-1/2 right-12 -translate-y-1/2 opacity-0 transition-all duration-300 ease-in-out group-hover:right-4 group-hover:opacity-100">
            <ChevronRight size={24} className="text-primary-foreground" />
          </div>
        </Button>
      </CardFooter>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </Card>
  )
}
