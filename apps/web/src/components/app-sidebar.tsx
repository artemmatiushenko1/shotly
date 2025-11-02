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
import {
  Blocks,
  CalendarRangeIcon,
  ChevronRight,
  Handshake,
  Image,
  LayoutGrid,
  LogOutIcon,
  SettingsIcon,
} from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@shotly/ui/components/avatar';
import { DropdownMenu } from '@shotly/ui/components/dropdown-menu';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth/auth-client';
import { User } from 'better-auth';
import { Separator } from '@shotly/ui/components/separator';
import { StorageUsage } from './storage-usage';

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutGrid,
  },
  {
    title: 'Portfolio',
    url: '/portfolio',
    icon: Image,
  },
  {
    title: 'Orders',
    url: '/orders',
    icon: Blocks,
  },
  {
    title: 'Calendar',
    url: '/calendar',
    icon: CalendarRangeIcon,
  },
  {
    title: 'Services',
    url: '/services',
    icon: Handshake,
  },
];

type AppSidebarProps = {
  user: User;
};

export function AppSidebar(props: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const user = props?.user;

  const getIsActiveMenuItem = (url: string) => {
    return pathname === url || (pathname.startsWith(url) && pathname !== '/');
  };

  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/auth/sign-in');
        },
      },
    });
  };

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="pt-1">
        <div className="border flex gap-3 items-center justify-center rounded-md bg-[linear-gradient(60deg,#ffd164,#f8b03d,#ee6b60,#d6487f,#a147c4,#4b63e4,#3cccc7)]">
          <Logo />
        </div>
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
                      <span className="mr-auto">{item.title}</span>
                      {getIsActiveMenuItem(item.url) && (
                        <ChevronRight className="text-fo" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <StorageUsage />
          <Separator />
          <SidebarMenuItem>
            <DropdownMenu>
              <SidebarMenuButton asChild size="lg">
                <Link href="/settings">
                  <SettingsIcon />
                  <span className="mr-auto text-sm">Settings</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton asChild size="lg" onClick={handleSignOut}>
                <Link href="/settings">
                  <LogOutIcon />
                  <span className="mr-auto text-sm">Log Out</span>
                </Link>
              </SidebarMenuButton>
              <Separator />
              <div className="flex gap-2 p-2 py-3">
                <Avatar className="h-8 w-8 rounded-md">
                  <AvatarImage src={user?.image ?? ''} alt={user?.name} />
                  <AvatarFallback className="rounded-md">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-xs leading-tight">
                  <span className="truncate font-semibold text-foreground mb-1">
                    {user?.name}
                  </span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
