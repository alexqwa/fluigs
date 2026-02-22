'use client'
import { FilePenLine } from 'lucide-react'
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
} from '@/components/ui/sidebar'

import data from '@/hooks/data.json'
import { NavMain } from '@/components/sidebar/NavMain'
import { NavUser } from '@/components/sidebar/NavUser'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="bg-muted flex items-center gap-2 rounded-lg p-2">
          <div className="bg-background flex size-8 items-center justify-center rounded-lg">
            <FilePenLine size={18} className="text-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-foreground text-xs font-semibold">
              Luís Eduardo Magalhães
            </span>
            <span className="text-muted-foreground text-xs">
              Controle de Fluigs
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
