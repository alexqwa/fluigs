import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'

import AuthLayout from '@/components/auth-layout'

export default function PrivateLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={<PrivateLayoutSkeleton />}>
      <AuthLayout>{children}</AuthLayout>
    </Suspense>
  )
}

function PrivateLayoutSkeleton() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-[radial-gradient(rgba(229,231,235,0.10)_1px,transparent_1px)] bg-size-[14px_14px]">
      <div className="text-muted-foreground flex items-center gap-3 text-sm">
        <Loader2 className="text-muted-foreground animate-spin" />
        Carregando...
      </div>
    </div>
  )
}
