'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import {
  SidebarMenu,
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
} from 'components/ui/sidebar'

export function NavMain({
  items,
}: {
  items: {
    url: string
    title: string
    icon: string
  }[]
}) {
  const location = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-muted-foreground text-xs">
        Principal
      </SidebarGroupLabel>
      <SidebarMenu className="group/side-item">
        {items.map((item, i) => {
          const isActive = location === item.url

          return (
            <SidebarMenuItem key={i}>
              <SidebarMenuButton
                asChild
                className={clsx(
                  'hover:bg-muted last:group-[side-item]:hidden',
                  {
                    ['bg-muted']: isActive,
                  }
                )}
              >
                <Link href={item.url}>
                  <DynamicIcon
                    name={item.icon as IconName}
                    className={clsx('text-muted-foreground', {
                      ['text-foreground!']: isActive,
                    })}
                  />
                  <span
                    className={clsx('text-muted-foreground text-sm', {
                      ['text-foreground!']: isActive,
                    })}
                  >
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
