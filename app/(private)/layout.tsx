import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import { AppSidebar } from '@/components/sidebar/AppSidebar'
import { SiteHeader } from '@/components/sidebar/SiteHeader'

export default function PrivateLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SiteHeader>{children}</SiteHeader>
      </SidebarProvider>
    </>
  )
}
