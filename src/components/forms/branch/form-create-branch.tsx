'use client'

import z from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Loader, Store } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
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
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog'

import { UserInputSchema, FluigInputSchema } from '@/generated/zod/schemas'

const userSchema = UserInputSchema.omit({
  id: true,
  role: true,
  image: true,
  banned: true,
  accounts: true,
  sessions: true,
  banReason: true,
  updatedAt: true,
  createdAt: true,
  banExpires: true,
  emailVerified: true,
}).extend({
  branch: z.number().min(4, 'Filial deve conter 4 dígitos.'),
  name: z.string().min(1, 'Nome da filial é obrigatório.'),
  email: z.email('Digite um e-mail válido.'),
  fluigs: FluigInputSchema.omit({
    user: true,
    userId: true,
  }).optional(),
})

type UserSchema = z.infer<typeof userSchema>

type FormCreateBranchProps = {
  onSubmit: (data: UserSchema) => void
}

export function FormCreateBranch({ onSubmit }: FormCreateBranchProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      branch: Number(''),
      name: '',
      email: '',
    },
  })

  function handleSubmit(data: UserSchema) {
    onSubmit(data)
    setOpen(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'default'} className="w-full cursor-pointer md:w-fit">
          <Store />
          Cadastrar loja
        </Button>
      </DialogTrigger>
      <DialogContent className="border-border w-full overflow-hidden border p-0! sm:max-w-sm lg:max-w-lg">
        <form
          onSubmit={form.handleSubmit(handleSubmit, (errors) =>
            console.log(errors)
          )}
        >
          <div className="space-y-4 p-6">
            <DialogHeader>
              <DialogTitle>Cadastrar Loja</DialogTitle>
              <DialogDescription>
                Insira todos os detalhes para criação da loja
              </DialogDescription>
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
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader size={24} className="animate-spin" />
              )}
              {!form.formState.isSubmitting && 'Fazer cadastro'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
