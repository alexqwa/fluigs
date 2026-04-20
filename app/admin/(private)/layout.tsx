import { Suspense } from 'react'
import { unauthorized } from 'next/navigation'
import { IconLoader } from '@tabler/icons-react'

import { getServerSession } from '@/actions/auth/session'

import { SidebarProvider } from '@/components/ui/sidebar'
import { SiteHeader } from '@/components/layout/header/site-header'
import { AppSidebar } from '@/components/layout/sidebar/app-sidebar'

const data = [
  {
    title: 'Dados',
    url: '/admin/data',
    icon: 'database-zap',
  },
  {
    title: 'Lojas',
    url: '/admin/stores',
    icon: 'store',
  },
  {
    title: 'Configurações',
    url: '/admin/settings',
    icon: 'settings',
  },
]

async function Sidebar({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession()

  if (!session?.user) return unauthorized()

  return (
    <SidebarProvider>
      <AppSidebar user={session.user} navMain={data} />
      <SiteHeader navMain={data}>{children}</SiteHeader>
    </SidebarProvider>
  )
}

function AuthSkeleton() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <div className="flex items-center gap-3">
        <IconLoader className="text-primary animate-spin" />
        <span className="text-primary text-sm font-medium">Carregando...</span>
      </div>
    </div>
  )
}

export default async function PrivateLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={<AuthSkeleton />}>
      <Sidebar>{children}</Sidebar>
    </Suspense>
  )
}
