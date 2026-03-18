'use client'

import Link from 'next/link'
import { User } from 'better-auth'
import { useRouter } from 'next/navigation'
import { BadgeCheck, Bell, ChevronsUpDown, LogOut } from 'lucide-react'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
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

import { authClient } from '@/lib/auth/client'

interface NavUserProps {
  user: User
}

export function NavUser({ user }: NavUserProps) {
  const router = useRouter()

  async function handleSignOut() {
    try {
      const { error } = await authClient.signOut()

      if (error) {
        console.error(error.message || 'Algo deu errado.')
        return
      }

      router.push('/')
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
              className="data-[state=open]:bg-muted ring-offset-background focus-visible:ring-ring hover:bg-muted cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <Avatar className="h-8 w-10 rounded-lg">
                <AvatarImage src={user?.image!} alt={user.name} />
                <AvatarFallback className="rounded-lg">GRP</AvatarFallback>
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
                <Avatar className="h-8 w-10 rounded-lg">
                  <AvatarImage src={user?.image!} alt={user.name} />
                  <AvatarFallback className="rounded-lg">GRP</AvatarFallback>
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
              <DropdownMenuItem
                asChild
                className="hover:bg-muted cursor-pointer"
              >
                <Link href="/account">
                  <BadgeCheck />
                  Conta
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="hover:bg-muted cursor-pointer"
              >
                <Link href="/notifications">
                  <Bell />
                  Notificações
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="hover:bg-muted cursor-pointer"
            >
              <LogOut />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
