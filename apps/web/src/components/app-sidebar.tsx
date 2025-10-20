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
  ChevronsUpDown,
  Handshake,
  Image,
  LayoutGrid,
} from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@shotly/ui/components/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shotly/ui/components/dropdown-menu';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
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
        <div className="flex gap-3 items-center justify-center rounded-md bg-gradient-to-r from-primary to-[#005DDB]">
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
              <DropdownMenuTrigger asChild className="h-13">
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
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
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
