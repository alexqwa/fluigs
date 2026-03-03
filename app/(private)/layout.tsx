import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import { unauthorized } from 'next/navigation'
import { getServerSession } from '../../app/actions/get-session'

import { SiteHeader } from '@/components/SiteHeader'
import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

async function Auth({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession()
  const user = session?.user

  if (!user) return unauthorized()

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SiteHeader>{children}</SiteHeader>
    </SidebarProvider>
  )
}

function AuthSkeleton() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-[radial-gradient(rgba(229,231,235,0.10)_1px,transparent_1px)] bg-size-[14px_14px]">
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
