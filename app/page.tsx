'use client'

import 'dotenv/config'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ChevronRight, Check } from 'lucide-react'
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
  InputOTP,
  InputOTPSlot,
  InputOTPGroup,
  InputOTPSeparator,
} from '@/components/ui/input-otp'
import { REGEXP_ONLY_DIGITS } from 'input-otp'

import data from '@/hooks/data.json'
import { authClient } from '@/lib/auth-client'

export default function Home() {
  const router = useRouter()

  const [otp, setOtp] = useState('')
  const [codeHasSend, setCodeHasSend] = useState(false)
  const [selectedEmail, setSelectedEmail] = useState('')
  const [selectedFilial, setSelectedFilial] = useState<number>()
  const [selectedSubsidiary, setSelectedSubsidiary] = useState('')

  function resetFields() {
    setOtp('')
    setSelectedEmail('')
    setCodeHasSend(false)
  }

  async function sendEmail() {
    if (!selectedEmail) return

    setCodeHasSend(true)

    const response = await authClient.emailOtp.sendVerificationOtp({
      email: selectedEmail,
      type: 'sign-in',
    })
  }

  async function verifyCode() {
    if (!selectedEmail) return

    const response = await authClient.signIn.emailOtp({
      email: selectedEmail,
      otp: otp,
    })
    if (response.data) {
      router.push('/dashboard')
      resetFields()
    } else {
      alert('Código inválido.')
    }
  }

  return (
    <div className="bg-card absolute inset-0 h-full w-full bg-[radial-gradient(rgba(229,231,235,0.10)_1px,transparent_1px)] bg-size-[14px_14px]">
      <div className="flex h-svh flex-1 items-center justify-center px-4 md:px-0">
        <div className="bg-card border-border relative w-full max-w-120 overflow-hidden rounded-lg border p-6 md:p-10">
          <div className="z-10 flex flex-col">
            <h1 className="mb-10 text-3xl font-bold">Autenticação</h1>
            <Select
              value={selectedEmail}
              disabled={codeHasSend}
              onValueChange={(value) => {
                const filial = data.branches.find(
                  (item) => item.email === value
                )
                setSelectedEmail(value)
                setSelectedFilial(filial?.id)
                setSelectedSubsidiary(filial?.subsidiary!)
              }}
            >
              <SelectTrigger className="bg-muted border-border w-full cursor-pointer border">
                <SelectValue placeholder="Selecionar Filial" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border border">
                <SelectGroup>
                  <SelectLabel>Selecionar Filial</SelectLabel>
                  {data.branches
                    .sort((a, b) => a.id - b.id)
                    .map((item) => (
                      <SelectItem
                        key={item.id}
                        value={item.email}
                        className="hover:bg-muted cursor-pointer text-sm"
                      >
                        Filial {item.id} - {item.subsidiary}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={sendEmail}
              disabled={!selectedEmail || codeHasSend}
              className="bg-muted border-border mt-6 mb-6 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border transition-all hover:brightness-125"
            >
              <AnimatePresence mode="wait">
                {!codeHasSend ? (
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
                    key="loading"
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
            <AnimatePresence>
              {codeHasSend && (
                <motion.div
                  initial={{ y: 40, opacity: 0, filter: 'blur(6px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: 40, opacity: 0, filter: 'blur(6px)' }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="flex flex-col gap-2"
                >
                  <span className="text-muted-foreground text-sm">
                    Código enviado por e-mail
                  </span>

                  <InputOTP
                    value={otp}
                    maxLength={6}
                    id="digits-only"
                    pattern={REGEXP_ONLY_DIGITS}
                    onChange={(value) => setOtp(value)}
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
                </motion.div>
              )}
            </AnimatePresence>
            <Button
              variant="outline"
              onClick={verifyCode}
              disabled={!codeHasSend}
              className="group/button bg-foreground group text-background relative mt-6 inline-flex h-12 w-full flex-1 items-center justify-center gap-2 overflow-hidden rounded-lg px-6 py-3 text-base font-semibold whitespace-nowrap transition-all select-none hover:cursor-pointer lg:min-w-fit"
            >
              <span className="mx-3.5 transition-all duration-400 group-hover:mx-0 group-hover:mr-6.5">
                Entrar
              </span>
              <div className="absolute top-1/2 right-12 -translate-y-1/2 opacity-0 transition-all duration-300 ease-in-out group-hover:right-4 group-hover:opacity-100">
                <ChevronRight size={24} className="text-black" />
              </div>
            </Button>
            <Button
              variant="link"
              onClick={resetFields}
              className="text-muted-foreground mx-auto mt-3 w-fit cursor-pointer text-sm"
            >
              Reenviar código?
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
