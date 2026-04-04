import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
} from '@/components/ui/sidebar'

import data from '@/hooks/data.json'
import { getServerSession } from '@/actions/auth/session'

import { NavMain } from '@/components/layout/nav/nav-main'
import { NavUser } from '@/components/layout/nav/nav-user'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export async function AppSidebar() {
  const session = await getServerSession()
  const user = session?.user

  if (!user) return null

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-0">
          <div className="bg-muted flex items-center gap-2 rounded-lg px-2 py-1.5 text-left">
            <Avatar className="h-8 w-10 rounded-lg">
              <AvatarFallback className="bg-card rounded-lg">
                {user.name.toUpperCase().slice(0, 3)}
              </AvatarFallback>
            </Avatar>
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
