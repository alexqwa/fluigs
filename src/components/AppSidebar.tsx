import React from 'react'
import { User } from 'better-auth'
import { FilePenLine } from 'lucide-react'

import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
} from '@/components/ui/sidebar'

import data from 'hooks/data.json'

import { NavMain } from 'components/NavMain'
import { NavUser } from 'components/NavUser'

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User
}

export async function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="p-0">
          <div className="bg-muted flex items-center gap-2 rounded-lg px-2 py-1.5 text-left">
            <div className="bg-card flex size-8 items-center justify-center rounded-lg">
              <FilePenLine size={18} className="text-foreground" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="text-foreground truncate text-xs font-medium">
                {user.name}
              </span>
              <span className="text-muted-foreground truncate text-xs">
                Controle de Fluigs
              </span>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
