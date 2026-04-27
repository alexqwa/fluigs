'use client'

import z from 'zod'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from '@/components/ui/field'
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog'

import { UserInputSchema } from '@/generated/zod/schemas'

const userInputSchema = UserInputSchema.omit({
  role: true,
  image: true,
  banned: true,
  sessions: true,
  accounts: true,
  banReason: true,
  createdAt: true,
  updatedAt: true,
  banExpires: true,
  emailVerified: true,
})

type UserInputSchema = z.infer<typeof userInputSchema>

type FormUpdateBranchProps = {
  open: boolean
  defaultValues?: UserInputSchema | null
  onSubmit: (data: UserInputSchema) => void
  onOpenChange: (open: boolean) => void
}

export function FormUpdateBranch({
  open,
  onSubmit,
  onOpenChange,
  defaultValues,
}: FormUpdateBranchProps) {
  const form = useForm<UserInputSchema>({
    resolver: zodResolver(userInputSchema),
    defaultValues: defaultValues
      ? {
          ...defaultValues,
        }
      : undefined,
  })

  useEffect(() => {
    if (!defaultValues) return

    form.reset({
      ...defaultValues,
    })
  }, [defaultValues, form])

  function handleSubmit(data: UserInputSchema) {
    onSubmit(data)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border w-full overflow-hidden border p-0! sm:max-w-sm lg:max-w-lg">
        <form
          onSubmit={form.handleSubmit(handleSubmit, (errors) =>
            console.log(errors)
          )}
        >
          <div className="space-y-4 p-6">
            <DialogHeader>
              <DialogTitle>Detalhes da Loja</DialogTitle>
              <DialogDescription>Mostrando detalhes da Loja</DialogDescription>
            </DialogHeader>
            <FieldGroup className="mt-6">
              <Field>
                <FieldLabel htmlFor="branch">Filial</FieldLabel>
                <Input
                  id="branch"
                  type="number"
                  placeholder="Número da filial"
                  aria-invalid={form.getFieldState('branch').invalid}
                  {...form.register('branch', { valueAsNumber: true })}
                  className="border-border bg-muted no-spinner trucate border aria-invalid:border-red-400"
                />
                {form.getFieldState('branch').invalid && (
                  <FieldError
                    className="text-red-400"
                    errors={[form.getFieldState('branch').error]}
                  />
                )}
              </Field>
              <Field>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Nome da loja"
                  {...form.register('name')}
                  aria-invalid={form.getFieldState('name').invalid}
                  className="border-border bg-muted trucate border aria-invalid:border-red-400"
                />
                {form.getFieldState('name').invalid && (
                  <FieldError
                    className="text-red-400"
                    errors={[form.getFieldState('name').error]}
                  />
                )}
              </Field>
            </FieldGroup>
            <Field className="max-w-full!">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                {...form.register('email')}
                placeholder="E-mail da gerência"
                aria-invalid={form.getFieldState('email').invalid}
                className="border-border bg-muted trucate max-w-full! border aria-invalid:border-red-400"
              />
              {form.getFieldState('email').invalid && (
                <FieldError
                  className="text-red-400"
                  errors={[form.getFieldState('email').error]}
                />
              )}
            </Field>
          </div>
          <DialogFooter className="bg-ring/15 px-6 py-5">
            <DialogClose asChild>
              <Button
                variant={'outline'}
                onClick={() => form.reset()}
                className="cursor-pointer"
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant={'default'}
              className="cursor-pointer md:w-40"
              disabled={!form.formState.isDirty || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader size={24} className="animate-spin" />
              )}
              {!form.formState.isSubmitting && 'Salvar alterações'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
