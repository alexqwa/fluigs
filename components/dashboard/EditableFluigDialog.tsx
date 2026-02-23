import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { FieldGroup, Field } from '../ui/field'
import { useIsMobile } from '@/hooks/use-mobile'
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from '../ui/dialog'
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from '../ui/select'
import {
  Drawer,
  DrawerTitle,
  DrawerClose,
  DrawerHeader,
  DrawerFooter,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
} from '../ui/drawer'

interface DataItem {
  id: number
  code: string
  date: string
  cost: string
  nFluig: string
  status: string
  product: string
  quantity: string
}

export function EditableFluigDialog({ item }: { item: DataItem }) {
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
                Mostrando os detalhes do fluig, faça alterações caso necessário
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
                    <Label htmlFor="quantity">Quantidade (KG)</Label>
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
                      defaultValue={item.date}
                      className="border-border bg-muted border text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
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
                          value="Aprovado"
                          className="hover:bg-muted cursor-pointer text-sm"
                        >
                          Aprovado
                        </SelectItem>
                        <SelectItem
                          value="Aguardando"
                          className="hover:bg-muted cursor-pointer text-sm"
                        >
                          Aguardando
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="cost">Custo</Label>
                  <Input
                    id="cost"
                    defaultValue={item.cost}
                    className="border-border bg-muted border text-sm"
                  />
                </div>
              </form>
            </div>
            <DrawerFooter>
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
              <Button
                variant="link"
                className="text-foreground w-fit px-0 text-left"
              >
                {item.product}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border w-full border sm:max-w-sm lg:max-w-xl">
              <DialogHeader>
                <DialogTitle>Detalhes do Fluig</DialogTitle>
                <DialogDescription>
                  Mostrando os detalhes do fluig, faça alterações caso
                  necessário
                </DialogDescription>
              </DialogHeader>
              <FieldGroup className="mt-4">
                <Field>
                  <Label htmlFor="fieldgroup-code">Código</Label>
                  <Input
                    id="fieldgroup-code"
                    defaultValue={item.code}
                    className="border-border bg-muted border"
                  />
                </Field>
                <Field>
                  <Label htmlFor="fieldgroup-product">Produto</Label>
                  <Input
                    id="fieldgroup-product"
                    defaultValue={item.product}
                    className="border-border bg-muted truncate border"
                    disabled
                  />
                </Field>
                <Field>
                  <Label htmlFor="fieldgroup-quantity">Quantidade</Label>
                  <Input
                    id="fieldgroup-quantity"
                    defaultValue={item.quantity}
                    className="border-border bg-muted border"
                  />
                </Field>
              </FieldGroup>
              <FieldGroup>
                <Field>
                  <Label htmlFor="fieldgroup-fluig">N Fluig</Label>
                  <Input
                    id="fieldgroup-fluig"
                    defaultValue={item.nFluig}
                    className="border-border bg-muted border"
                  />
                </Field>
                <Field>
                  <Label htmlFor="fieldgroup-date">Data</Label>
                  <Input
                    id="fieldgroup-date"
                    defaultValue={item.date}
                    className="border-border bg-muted border"
                  />
                </Field>
                <Field>
                  <Label htmlFor="fieldgroup-status">Status</Label>
                  <Select defaultValue={item.status}>
                    <SelectTrigger
                      id="status"
                      className="bg-muted border-border h-9 w-full cursor-pointer border"
                    >
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border border">
                      <SelectItem
                        value="Aprovado"
                        className="hover:bg-muted cursor-pointer text-sm"
                      >
                        Aprovado
                      </SelectItem>
                      <SelectItem
                        value="Aguardando"
                        className="hover:bg-muted cursor-pointer text-sm"
                      >
                        Aguardando
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </FieldGroup>
              <FieldGroup className="flex items-end">
                <Field>
                  <Label htmlFor="fieldgroup-cost">Custo Total</Label>
                  <Input
                    id="fieldgroup-cost"
                    defaultValue={item.cost}
                    className="border-border bg-muted border"
                  />
                </Field>
                <Field>
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="bg-card border-border hover:bg-muted/30 cursor-pointer border transition-all"
                    >
                      Cancelar
                    </Button>
                  </DialogClose>
                </Field>
                <Field>
                  <Button
                    type="submit"
                    className="cursor-pointer transition-all hover:brightness-125"
                  >
                    Salvar alterações
                  </Button>
                </Field>
              </FieldGroup>
            </DialogContent>
          </form>
        </Dialog>
      )}
    </>
  )
}
