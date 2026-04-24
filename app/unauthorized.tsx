'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Unauthorized() {
  return (
    <main className="bg-ring/15 flex min-h-svh w-full items-center justify-center px-4 text-center">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">401 - Não Autorizado</h1>
          <p className="text-muted-foreground">
            Por favor faça autenticação para continuar
          </p>
        </div>
        <Button asChild variant={'default'} className="cursor-pointer">
          <Link href="/">
            <span>Voltar para o login</span>
          </Link>
        </Button>
      </div>
    </main>
  )
}
