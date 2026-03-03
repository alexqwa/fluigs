import { Suspense } from 'react'
import { unauthorized } from 'next/navigation'
import { getServerSession } from '../../app/actions/get-session'

import { SiteHeader } from '@/components/SiteHeader'
import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { SidebarSkeleton } from '@/components/sidebar-skeleton'

async function Sidebar() {
  const session = await getServerSession()
  const user = session?.user

  if (!user) return unauthorized()

  return <AppSidebar user={user} />
}

export default async function PrivateLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
      <SiteHeader>{children}</SiteHeader>
    </SidebarProvider>
  )
}
