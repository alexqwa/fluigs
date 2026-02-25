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
} from './ui/breadcrumb'

import data from '@/hooks/data.json'
import { useIsMobile } from '@/hooks/use-mobile'

export function SiteHeader({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isMobile = useIsMobile()
  const pathname = usePathname()

  const pageTitle = data.navMain.find((item) => item.url === pathname)

  return (
    <SidebarInset>
      <header className="border-border bg-card fixed z-9998 flex h-16 w-full shrink-0 items-center gap-2 border-b px-4">
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
      <div className="inset-0 flex flex-1 flex-col bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[20px_20px] px-6 pt-24 pb-10 md:px-10">
        {children}
      </div>
    </SidebarInset>
  )
}
