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
import { ThemeToggle } from '@/components/data-display/theme-toggle'

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
]

export function SiteHeader({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isMobile = useIsMobile()
  const pathname = usePathname()

  const pageTitle = data.find((item) => item.url === pathname)

  return (
    <SidebarInset>
      <header className="border-border bg-card sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          {isMobile && (
            <>
              <SidebarTrigger />
              <Separator
                orientation="vertical"
                className="mr-2 ml-1 data-[orientation=vertical]:h-4"
              />
            </>
          )}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Principal
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{pageTitle?.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <ThemeToggle />
      </header>
      <div className="inset-0 flex flex-1 flex-col px-6 py-10 md:px-10">
        {children}
      </div>
    </SidebarInset>
  )
}
