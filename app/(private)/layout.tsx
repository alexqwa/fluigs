import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { SiteHeader } from '@/components/SiteHeader'

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
