'use client'

import { useRouter } from 'next/navigation'

import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'

export default function Unauthorized() {
  const router = useRouter()

  async function RevokeSessions() {
    await authClient.revokeSessions()
    router.push('/')
  }

  return (
    <main className="bg-ring/15 flex min-h-svh w-full items-center justify-center px-4 text-center">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">401 - Não Autorizado</h1>
          <p className="text-muted-foreground">
            Por favor faça autenticação para continuar
          </p>
        </div>
        <div>
          <Button
            variant={'default'}
            onClick={RevokeSessions}
            className="cursor-pointer"
          >
            <span>Voltar para o login</span>
          </Button>
        </div>
      </div>
    </main>
  )
}
