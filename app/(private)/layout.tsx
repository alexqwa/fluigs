import { unauthorized } from 'next/navigation'
import { getServerSession } from '@/lib/get-session'

import { SiteHeader } from '@/components/SiteHeader'
import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

export default async function PrivateLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
