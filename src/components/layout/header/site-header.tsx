'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import { useIsMobile } from '@/hooks/use-mobile'

const data = [
  {
    title: 'Dashboard',
    url: '/dashboard',
  },
  {
    title: 'Relatórios',
    url: '/reports',
  },
  {
    title: 'Notificações',
    url: '/notifications',
  },
  {
    title: 'Minha conta',
    url: '/account',
  },
  {
    title: 'Custos',
    url: '/costs',
  },
]

export function SiteHeader({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isMobile = useIsMobile()
  const pathname = usePathname()

  const pageTitle = data.find((item) => item.url === pathname)

  return (
    <SidebarInset>
      <header className="border-border bg-card fixed z-30 flex h-16 w-full shrink-0 items-center gap-2 border-b px-4">
        {isMobile && (
          <>
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </>
        )}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="md:block">
              <Link
                href="/dashboard"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Principal
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{pageTitle?.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="inset-0 flex flex-1 flex-col px-6 pt-24 pb-10 md:px-10">
        {children}
      </div>
    </SidebarInset>
  )
}
