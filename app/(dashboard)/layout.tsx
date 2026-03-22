import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import { getUser } from '@/actions/auth/user'
import { unauthorized } from 'next/navigation'

import { SidebarProvider } from '@/components/ui/sidebar'
import { SiteHeader } from '@/components/layout/header/site-header'
import { AppSidebar } from '@/components/layout/sidebar/app-sidebar'

async function Auth({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await getUser()

  if (!user) return unauthorized()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SiteHeader>{children}</SiteHeader>
    </SidebarProvider>
  )
}

function AuthSkeleton() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <div className="text-muted-foreground flex items-center gap-3 text-sm">
        <Loader2 className="text-muted-foreground animate-spin" />
        Carregando...
      </div>
    </div>
  )
}

export default async function PrivateLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={<AuthSkeleton />}>
      <Auth>{children}</Auth>
    </Suspense>
  )
}
