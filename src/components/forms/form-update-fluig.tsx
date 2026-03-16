'use client'

import z from 'zod'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { ptBR } from 'react-day-picker/locale'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDownIcon, Loader2 } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { FieldGroup, Field, FieldError } from '@/components/ui/field'
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from '@/components/ui/popover'
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from '@/components/ui/select'
import {
  Drawer,
  DrawerTitle,
  DrawerHeader,
  DrawerFooter,
  DrawerTrigger,
  DrawerContent,
  DrawerDescription,
} from '@/components/ui/drawer'

import { useIsMobile } from '@/hooks/use-mobile'
import { useProductAutoFill } from '@/hooks/use-product-autofill'

const fluigSchema = z.object({
  date: z.date(),
  code: z.string().min(1, 'Código é obrigatório.'),
  product: z.string().min(1, 'Produto é obrigatório.'),
  quantity: z.string().min(1, 'Quantidade é obrigatório.'),
  nFluig: z.number().min(1, 'Número do fluig é obrigatório.'),
  cost: z.string().min(1, 'Custo do produto é obrigatório.'),
  status: z.enum(['Approved', 'Pending', 'Not_Approved']),
})

type FluigSchema = z.infer<typeof fluigSchema>
type FluigInput = Omit<FluigSchema, 'date'> & { date: Date | string }

interface FormUpdateFluigProps {
  defaultValues: FluigInput
  onSubmit: (data: FluigSchema) => Promise<void>
}

export function FormUpdateFluig({
  onSubmit,
  defaultValues,
}: FormUpdateFluigProps) {
  const isMobile = useIsMobile()
  const { getProduct } = useProductAutoFill()
  const [open, setOpen] = useState(false)

  const form = useForm<FluigSchema>({
    resolver: zodResolver(fluigSchema),
    defaultValues: {
      ...defaultValues,
      date: new Date(defaultValues.date),
    },
  })

  async function handleSubmit(data: FluigSchema) {
    await onSubmit(data)
    setOpen(false)
    form.reset()
  }

  useEffect(() => {
    form.reset({
      ...defaultValues,
      date: new Date(defaultValues.date),
    })
  }, [defaultValues, form])

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen} direction="bottom">
        <DrawerTrigger asChild>
          <Button
            variant="link"
            className="text-foreground w-fit px-0 text-left"
          >
            {defaultValues.product}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="border-border bg-card border-t p-0!">
          <form
            onSubmit={form.handleSubmit(handleSubmit, (errors) =>
              console.log(errors)
            )}
          >
            <div className="space-y-4 px-6 pb-6">
              <DrawerHeader>
                <DrawerTitle>Detalhes do Fluig</DrawerTitle>
                <DrawerDescription>
                  Mostrando os detalhes do Fluig
                </DrawerDescription>
              </DrawerHeader>
              <FieldGroup className="flex-row">
                <Field>
                  <Label>Código</Label>
                  <Input
                    placeholder="Código"
                    {...form.register('code')}
                    aria-invalid={form.getFieldState('code').invalid}
                    className="border-border bg-muted no-spinner border aria-invalid:border-red-400"
                    onChange={(e) => {
                      const code = e.target.value.replaceAll(/[^0-9]/g, '')

                      form.setValue('code', code)

                      const product = getProduct(code)

                      if (!product) {
                        form.setValue('product', '')
                        form.setValue('cost', '')
                        return
                      }

                      form.setValue('product', product.product, {
                        shouldDirty: true,
                      })
                      form.setValue('cost', product.cost, { shouldDirty: true })
                    }}
                  />
                  {form.getFieldState('code').invalid && (
                    <FieldError
                      className="text-red-400"
                      errors={[form.getFieldState('code').error]}
                    />
                  )}
                </Field>
                <Field>
                  <Label>Produto</Label>
                  <Input
                    readOnly
                    {...form.register('product')}
                    placeholder="Digite o código para buscar"
                    aria-invalid={form.getFieldState('product').invalid}
                    className="border-border bg-muted trucate border aria-invalid:border-red-400"
                  />
                  {form.getFieldState('product').invalid && (
                    <FieldError
                      className="text-red-400"
                      errors={[form.getFieldState('product').error]}
                    />
                  )}
                </Field>
              </FieldGroup>
              <FieldGroup className="flex-row">
                <Field>
                  <Label htmlFor="quantity">Quantidade</Label>
                  <Input
                    {...form.register('quantity')}
                    placeholder="Quantidade (KG ou UN)"
                    aria-invalid={form.getFieldState('quantity').invalid}
                    className="no-spinner border-border bg-muted border aria-invalid:border-red-400"
                    onChange={(e) => {
                      let value = e.target.value.replace(/[^0-9.,]/g, '')

                      const parts = value.split(/[.,]/)

                      if (parts.length > 2) {
                        value = parts[0] + '.' + parts.slice(1).join('')
                      }

                      form.setValue('quantity', value, {
                        shouldDirty: true,
                      })
                    }}
                  />
                  {form.getFieldState('quantity').invalid && (
                    <FieldError
                      className="text-red-400"
                      errors={[form.getFieldState('quantity').error]}
                    />
                  )}
                </Field>
                <Field>
                  <Label>N Fluig</Label>
                  <Input
                    type="number"
                    placeholder="Número do fluig"
                    aria-invalid={form.getFieldState('nFluig').invalid}
                    {...form.register('nFluig', { valueAsNumber: true })}
                    className="border-border no-spinner bg-muted border aria-invalid:border-red-400"
                  />
                  {form.getFieldState('nFluig').invalid && (
                    <FieldError
                      className="text-red-400"
                      errors={[form.getFieldState('nFluig').error]}
                    />
                  )}
                </Field>
              </FieldGroup>
              <FieldGroup className="flex-row">
                <Controller
                  name="date"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <Label>Data</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="data-[empty=true]:text-muted-foreground border-border bg-muted cursor-pointer justify-between border text-left font-normal"
                          >
                            {field.value ? (
                              dayjs(field.value).format('DD/MM/YYYY')
                            ) : (
                              <span className="text-muted-foreground text-sm">
                                Definir data
                              </span>
                            )}
                            <ChevronDownIcon className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="bg-card border-border w-auto border p-0"
                          align="start"
                        >
                          <Calendar
                            required
                            mode="single"
                            locale={ptBR}
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>
                    </Field>
                  )}
                />
                <Controller
                  name="status"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <Label>Status</Label>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="status"
                          className="bg-muted border-border h-9 w-full cursor-pointer border"
                        >
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border border">
                          <SelectItem
                            value="Approved"
                            className="hover:bg-muted cursor-pointer text-sm"
                          >
                            Aprovado
                          </SelectItem>
                          <SelectItem
                            value="Pending"
                            className="hover:bg-muted cursor-pointer text-sm"
                          >
                            Aguardando
                          </SelectItem>
                          <SelectItem
                            value="Not_Approved"
                            className="hover:bg-muted cursor-pointer text-sm"
                          >
                            Não Aprovado
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                />
              </FieldGroup>
              <Field>
                <Label>Custo</Label>
                <Input
                  readOnly
                  {...form.register('cost')}
                  placeholder="Digite o código para buscar"
                  aria-invalid={form.getFieldState('cost').invalid}
                  className="border-border no-spinner bg-muted border aria-invalid:border-red-400"
                />
                {form.getFieldState('cost').invalid && (
                  <FieldError
                    className="text-red-400"
                    errors={[form.getFieldState('cost').error]}
                  />
                )}
              </Field>
            </div>
            <DrawerFooter className="bg-muted">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="flex min-w-36 cursor-pointer items-center justify-center transition-all hover:brightness-125"
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="size-4 animate-spin" />
                )}
                {!form.formState.isSubmitting && 'Salvar alterações'}
              </Button>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  onClick={() => form.reset()}
                  className="bg-card border-border hover:bg-muted/30 cursor-pointer border transition-all"
                >
                  Cancelar
                </Button>
              </DialogClose>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer px-0!" variant="link">
          {defaultValues.product}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border w-full border p-0! sm:max-w-sm lg:max-w-lg">
        <form
          onSubmit={form.handleSubmit(handleSubmit, (errors) =>
            console.log(errors)
          )}
        >
          <div className="space-y-4 p-6">
            <DialogHeader>
              <DialogTitle>Detalhes do Fluig</DialogTitle>
              <DialogDescription>
                Mostrando os detalhes do Fluig
              </DialogDescription>
            </DialogHeader>
            <FieldGroup className="mt-6">
              <Field>
                <Label>Código</Label>
                <Input
                  placeholder="Código"
                  {...form.register('code')}
                  aria-invalid={form.getFieldState('code').invalid}
                  className="border-border bg-muted no-spinner border aria-invalid:border-red-400"
                  onChange={(e) => {
                    const code = e.target.value.replaceAll(/[^0-9]/g, '')

                    form.setValue('code', code)

                    const product = getProduct(code)

                    if (!product) {
                      form.setValue('product', '')
                      form.setValue('cost', '')
                      return
                    }

                    form.setValue('product', product.product, {
                      shouldDirty: true,
                    })
                    form.setValue('cost', product.cost, { shouldDirty: true })
                  }}
                />
                {form.getFieldState('code').invalid && (
                  <FieldError
                    className="text-red-400"
                    errors={[form.getFieldState('code').error]}
                  />
                )}
              </Field>
              <Field>
                <Label>Produto</Label>
                <Input
                  readOnly
                  {...form.register('product')}
                  placeholder="Digite o código para buscar"
                  aria-invalid={form.getFieldState('product').invalid}
                  className="border-border bg-muted trucate border aria-invalid:border-red-400"
                />
                {form.getFieldState('product').invalid && (
                  <FieldError
                    className="text-red-400"
                    errors={[form.getFieldState('product').error]}
                  />
                )}
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field>
                <Label htmlFor="quantity">Quantidade</Label>
                <Input
                  {...form.register('quantity')}
                  placeholder="Quantidade (KG ou UN)"
                  aria-invalid={form.getFieldState('quantity').invalid}
                  className="no-spinner border-border bg-muted border aria-invalid:border-red-400"
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9.,]/g, '')

                    const parts = value.split(/[.,]/)

                    if (parts.length > 2) {
                      value = parts[0] + '.' + parts.slice(1).join('')
                    }

                    form.setValue('quantity', value, {
                      shouldDirty: true,
                    })
                  }}
                />
                {form.getFieldState('quantity').invalid && (
                  <FieldError
                    className="text-red-400"
                    errors={[form.getFieldState('quantity').error]}
                  />
                )}
              </Field>
              <Field>
                <Label>N Fluig</Label>
                <Input
                  type="number"
                  placeholder="Número do fluig"
                  aria-invalid={form.getFieldState('nFluig').invalid}
                  {...form.register('nFluig', { valueAsNumber: true })}
                  className="border-border no-spinner bg-muted border aria-invalid:border-red-400"
                />
                {form.getFieldState('nFluig').invalid && (
                  <FieldError
                    className="text-red-400"
                    errors={[form.getFieldState('nFluig').error]}
                  />
                )}
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Controller
                name="date"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <Label>Data</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="data-[empty=true]:text-muted-foreground border-border bg-muted cursor-pointer justify-between border text-left font-normal"
                        >
                          {field.value ? (
                            dayjs(field.value).format('DD/MM/YYYY')
                          ) : (
                            <span className="text-muted-foreground text-sm">
                              Definir data
                            </span>
                          )}
                          <ChevronDownIcon className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="bg-card border-border w-auto border p-0"
                        align="start"
                      >
                        <Calendar
                          required
                          mode="single"
                          locale={ptBR}
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                  </Field>
                )}
              />
              <Controller
                name="status"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <Label>Status</Label>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="status"
                        className="bg-muted border-border h-9 w-full cursor-pointer border"
                      >
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border border">
                        <SelectItem
                          value="Approved"
                          className="hover:bg-muted cursor-pointer text-sm"
                        >
                          Aprovado
                        </SelectItem>
                        <SelectItem
                          value="Pending"
                          className="hover:bg-muted cursor-pointer text-sm"
                        >
                          Aguardando
                        </SelectItem>
                        <SelectItem
                          value="Not_Approved"
                          className="hover:bg-muted cursor-pointer text-sm"
                        >
                          Não Aprovado
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </FieldGroup>
            <Field>
              <Label>Custo</Label>
              <Input
                readOnly
                {...form.register('cost')}
                placeholder="Digite o código para buscar"
                aria-invalid={form.getFieldState('cost').invalid}
                className="border-border no-spinner bg-muted border aria-invalid:border-red-400"
              />
              {form.getFieldState('cost').invalid && (
                <FieldError
                  className="text-red-400"
                  errors={[form.getFieldState('cost').error]}
                />
              )}
            </Field>
          </div>
          <DialogFooter className="bg-muted p-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={() => form.reset()}
                className="bg-card border-border hover:bg-muted/30 cursor-pointer border transition-all"
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={!form.formState.isDirty || form.formState.isSubmitting}
              className="flex min-w-36 cursor-pointer items-center justify-center transition-all hover:brightness-125"
            >
              {form.formState.isSubmitting && (
                <Loader2 className="size-4 animate-spin" />
              )}
              {!form.formState.isSubmitting && 'Salvar alterações'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
