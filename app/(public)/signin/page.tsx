'use client'

import Link from 'next/link'
import { Mail, ChevronRight } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { REGEXP_ONLY_DIGITS } from 'input-otp'

import data from './data.json'

export default function SignIn() {
  return (
    <div className="bg-background absolute inset-0 h-full w-full bg-[radial-gradient(rgba(229,231,235,0.10)_1px,transparent_1px)] bg-size-[14px_14px]">
      <div className="flex h-svh flex-1 items-center justify-center px-4 md:px-0">
        <div className="bg-card border-border relative w-full max-w-120 overflow-hidden rounded-3xl border p-6 md:p-12">
          <div className="z-10 flex flex-col">
            <h1 className="mb-10 text-3xl font-bold">Autenticação</h1>
            <Select>
              <SelectTrigger className="bg-muted border-border w-full cursor-pointer border">
                <SelectValue placeholder="Selecionar Filial" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border border">
                <SelectGroup>
                  <SelectLabel>Selecionar Filial</SelectLabel>
                  {data
                    .sort((a, b) => a.id - b.id)
                    .map((item) => {
                      const formatSubsidiary = (subsidiary: string) => {
                        return subsidiary
                          .toLowerCase()
                          .split(' ')
                          .map((word) => {
                            if (word.length === 2 && isNaN(Number(word))) {
                              return word.toUpperCase()
                            }
                            if (!isNaN(Number(word))) {
                              return word
                            }
                            return word.charAt(0).toUpperCase() + word.slice(1)
                          })
                          .join(' ')
                      }

                      return (
                        <SelectItem
                          key={item.id}
                          value={item.id.toString()}
                          className="hover:bg-muted cursor-pointer text-sm"
                        >
                          Filial {item.id} - {formatSubsidiary(item.subsidiary)}
                        </SelectItem>
                      )
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <button className="bg-muted border-border mt-6 mb-6 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border transition-all hover:brightness-125">
              <Mail size={24} className="text-foreground" />
              <span className="text-foreground text-sm font-semibold">
                Enviar código para o e-mail
              </span>
            </button>
            <div className="flex flex-col gap-2">
              <span className="text-muted-foreground text-sm">
                Código enviado por e-mail
              </span>
              <InputOTP
                id="digits-only"
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
              >
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:bg-muted *:data-[slot=input-otp-slot]:border-border w-full font-semibold *:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:flex-1 *:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator className="mx-2" />
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:bg-muted *:data-[slot=input-otp-slot]:border-border w-full font-semibold *:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:flex-1 *:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <button
              type="submit"
              className="group/button bg-foreground group text-background relative mt-6 inline-flex h-12 w-full flex-1 items-center justify-center gap-2 overflow-hidden rounded-lg px-6 py-3 text-base font-semibold whitespace-nowrap transition-all select-none hover:cursor-pointer lg:min-w-fit"
            >
              <span className="mx-3.5 transition-all duration-400 group-hover:mx-0 group-hover:mr-6.5">
                Entrar
              </span>
              <div className="absolute top-1/2 right-12 -translate-y-1/2 opacity-0 transition-all duration-300 ease-in-out group-hover:right-4 group-hover:opacity-100">
                <ChevronRight size={24} className="text-black" />
              </div>
            </button>
            <Link
              href="/dashboard"
              className="text-muted-foreground mx-auto mt-3 w-fit text-sm hover:underline"
            >
              Reenviar código?
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
