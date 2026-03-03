import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Unauthorized() {
  return (
    <main className="flex min-h-svh w-full items-center justify-center bg-[radial-gradient(rgba(229,231,235,0.10)_1px,transparent_1px)] bg-size-[14px_14px] px-4 text-center">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">401 - Não Autorizado</h1>
          <p className="text-muted-foreground">
            Por favor faça autenticação para continuar
          </p>
        </div>
        <div>
          <Button asChild>
            <Link href="/">Voltar para o login</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
