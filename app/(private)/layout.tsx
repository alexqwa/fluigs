import { SidebarProvider } from '@/components/ui/sidebar'

import { SiteHeader } from '@/components/SiteHeader'
import { AppSidebar } from '@/components/AppSidebar'

export default function PrivateLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SiteHeader>{children}</SiteHeader>
    </SidebarProvider>
  )
}
