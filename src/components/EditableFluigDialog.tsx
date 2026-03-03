import dayjs from 'dayjs'
import { useIsMobile } from '@/hooks/use-mobile'
import { FluigProps } from '../../app/actions/get-fluigs'

import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { FieldGroup, Field } from './ui/field'
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from './ui/dialog'
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from './ui/select'
import {
  Drawer,
  DrawerTitle,
  DrawerHeader,
  DrawerFooter,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
} from './ui/drawer'

export function EditableFluigDialog({ item }: { item: FluigProps }) {
  const isMobile = useIsMobile()

  return (
    <>
      {isMobile ? (
        <Drawer direction="bottom">
          <DrawerTrigger asChild>
            <Button
              variant="link"
              className="text-foreground w-fit px-0 text-left"
            >
              {item.product}
            </Button>
          </DrawerTrigger>
          <DrawerContent className="border-border border-t">
            <DrawerHeader className="gap-1">
              <DrawerTitle>Detalhes do Fluig</DrawerTitle>
              <DrawerDescription>
                Mostrando os detalhes do Fluig
              </DrawerDescription>
            </DrawerHeader>
            <div className="overflow-y-auto px-4 text-sm">
              <form className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="code">Codigo</Label>
                    <Input
                      id="code"
                      defaultValue={item.code}
                      className="border-border bg-muted border text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="title">Produto</Label>
                    <Input
                      id="title"
                      defaultValue={item.product}
                      className="border-border trucate bg-muted border text-sm"
                      disabled
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="quantity">Quantidade</Label>
                    <Input
                      id="quantity"
                      defaultValue={item.quantity}
                      className="border-border bg-muted border text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="nFluig">N Fluig</Label>
                    <Input
                      id="nFluig"
                      defaultValue={item.nFluig}
                      className="border-border bg-muted border text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="date">Data</Label>
                    <Input
                      id="date"
                      defaultValue={dayjs(item.date).format('DD/MM/YYYY')}
                      className="border-border bg-muted border text-sm"
                    />
                  </div>
                  <div className="mb-4 flex flex-col gap-3">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue="pending">
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
                  </div>
                </div>
              </form>
            </div>
            <DrawerFooter className="bg-muted">
              <Button className="cursor-pointer text-sm font-medium hover:brightness-125">
                Salvar alterações
              </Button>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="bg-card border-border hover:bg-muted/30 cursor-pointer border transition-all"
                >
                  Cancelar
                </Button>
              </DialogClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button className="px-0!" variant="link">
                {item.product}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border w-full border p-0! sm:max-w-sm lg:max-w-lg">
              <div className="p-6">
                <DialogHeader>
                  <DialogTitle>Detalhes do Fluig</DialogTitle>
                  <DialogDescription>
                    Mostrando os detalhes do Fluig
                  </DialogDescription>
                </DialogHeader>
                <FieldGroup className="mt-6">
                  <Field>
                    <Label htmlFor="code">Código</Label>
                    <Input
                      id="code"
                      defaultValue={item.code}
                      className="border-border bg-muted border"
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="product">Produto</Label>
                    <Input
                      id="product"
                      defaultValue={item.product}
                      className="border-border bg-muted trucate border"
                      disabled
                    />
                  </Field>
                </FieldGroup>
                <FieldGroup className="mt-6">
                  <Field>
                    <Label htmlFor="quantity">Quantidade</Label>
                    <Input
                      id="quantity"
                      defaultValue={item.quantity}
                      className="border-border bg-muted border"
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="nfluig">N Fluig</Label>
                    <Input
                      id="nfluig"
                      defaultValue={item.nFluig}
                      className="border-border bg-muted border"
                    />
                  </Field>
                </FieldGroup>
                <FieldGroup className="mt-6">
                  <Field>
                    <Label htmlFor="date">Data</Label>
                    <Input
                      id="date"
                      defaultValue={dayjs(item.date).format('DD/MM/YYYY')}
                      className="border-border bg-muted border"
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue={item.status}>
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
                </FieldGroup>
              </div>
              <DialogFooter className="bg-muted p-4">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="bg-card border-border hover:bg-muted/30 cursor-pointer border transition-all"
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="cursor-pointer transition-all hover:brightness-125"
                >
                  Salvar alterações
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      )}
    </>
  )
}
