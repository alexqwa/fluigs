'use client'

import z from 'zod'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { ptBR } from 'react-day-picker/locale'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Label } from 'components/ui/label'
import { Button } from 'components/ui/button'
import { Calendar } from 'components/ui/calendar'
import { FieldGroup, Field } from 'components/ui/field'
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover'
import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from 'components/ui/dialog'
import { Input } from 'components/ui/input'
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from 'components/ui/select'

import { createFluig } from 'actions/fluig/create-fluig'

const fluigSchema = z.object({
  date: z.date(),
  code: z.number().min(1, 'Código obrigatório'),
  product: z.string().min(1, 'Produto obrigatório'),
  quantity: z.number().min(1, 'Quantidade obrigatória'),
  nFluig: z.number().min(1, 'Número de fluig obrigatório'),
  status: z.enum(['Approved', 'Pending', 'Not_Approved']),
})

type FluigSchema = z.infer<typeof fluigSchema>

export function FormCreateFluig() {
  const [open, setOpen] = useState(false)
  const form = useForm<FluigSchema>({
    resolver: zodResolver(fluigSchema),
  })

  async function onSubmit(data: FluigSchema) {
    await createFluig(data)
    setOpen(false)
    form.reset()
  }

  useEffect(() => {
    if (!open) {
      form.reset()
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="cursor-pointer text-sm font-medium transition-all hover:brightness-125"
        >
          Adicionar fluig
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border w-full border p-0! sm:max-w-sm lg:max-w-lg">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 p-6">
            <DialogHeader>
              <DialogTitle>Adicionar fluig</DialogTitle>
              <DialogDescription>
                Insira todos os detalhes para criação do fluig
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label>Código</Label>
                <Input
                  type="number"
                  placeholder="Código"
                  {...form.register('code', { valueAsNumber: true })}
                  className="border-border bg-muted no-spinner border"
                />
              </Field>
              <Field>
                <Label>Produto</Label>
                <Input
                  placeholder="Produto"
                  {...form.register('product')}
                  className="border-border bg-muted trucate border"
                />
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field>
                <Label>Quantidade</Label>
                <Input
                  type="number"
                  placeholder="Quantidade (KG)"
                  {...form.register('quantity', { valueAsNumber: true })}
                  className="no-spinner border-border bg-muted border"
                />
              </Field>
              <Field>
                <Label>N Fluig</Label>
                <Input
                  type="number"
                  placeholder="Número do fluig"
                  {...form.register('nFluig', { valueAsNumber: true })}
                  className="border-border no-spinner bg-muted border"
                />
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
                    <Select
                      defaultValue={field.value}
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
              className="cursor-pointer transition-all hover:brightness-125"
            >
              Adicionar fluig
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
