'use client';

import { Logo } from '@shotly/ui/components/logo';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@shotly/ui/components/sidebar';
import { BriefcaseBusiness, Handshake, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  {
    title: 'Overview',
    url: '/dashboard',
    icon: LayoutGrid,
  },
  {
    title: 'Portfolio',
    url: '/portfolio',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Services',
    url: '/services',
    icon: Handshake,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  const getIsActiveMenuItem = (url: string) => {
    return pathname === url || (pathname.startsWith(url) && pathname !== '/');
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={getIsActiveMenuItem(item.url)}
                    asChild
                    size="lg"
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
