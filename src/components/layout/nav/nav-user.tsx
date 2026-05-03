'use client'

import Link from 'next/link'
import { User } from 'better-auth'
import { useRouter } from 'next/navigation'
import { LogOut, ChevronsUpDown } from 'lucide-react'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'

import { authClient } from '@/lib/auth-client'

interface NavUserProps {
  user: User
  navMain: {
    title: string
    url: string
    icon: string
  }[]
}

export function NavUser({ user, navMain }: NavUserProps) {
  const router = useRouter()

  async function handleSignOut() {
    try {
      const { error } = await authClient.signOut()

      if (error) {
        console.error(error.message || 'Algo deu errado.')
        return
      }

      router.replace('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-ring/15 ring-offset-background focus-visible:ring-ring hover:bg-ring/15 cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {user.name.toUpperCase().charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="text-foreground truncate text-sm font-medium">
                  {user.name}
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>
              <ChevronsUpDown className="text-muted-foreground ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-card border-border/50 w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    {user.name.toUpperCase().charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="text-foreground truncate text-sm font-medium">
                    {user.name}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {navMain.map((item, i) => (
                <DropdownMenuItem key={i} asChild className="cursor-pointer">
                  <Link href={item.url}>
                    <DynamicIcon
                      size={24}
                      name={item.icon as IconName}
                      className="text-primary"
                    />
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="cursor-pointer"
            >
              <LogOut className="text-primary" size={24} />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
