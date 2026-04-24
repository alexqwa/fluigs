import { Suspense } from 'react'
import { IconLoader } from '@tabler/icons-react'
import { unauthorized, forbidden } from 'next/navigation'

import { getServerSession } from '@/actions/auth/session'

import { SidebarProvider } from '@/components/ui/sidebar'
import { SiteHeader } from '@/components/layout/header/site-header'
import { AppSidebar } from '@/components/layout/sidebar/app-sidebar'

const data = [
  {
    title: 'Dados',
    url: '/admin/upload',
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
  const user = session?.user

  if (!user) return unauthorized()
  if (user.role !== 'admin') return forbidden()

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
