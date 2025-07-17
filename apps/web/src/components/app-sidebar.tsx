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
  BriefcaseBusiness,
  ChevronRight,
  ChevronsUpDown,
  Handshake,
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
  const router = useRouter();

  const { data } = authClient.useSession();
  const user = data?.user;

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
    <Sidebar>
      <SidebarHeader>
        <div className="flex gap-3 items-center justify-center rounded-md bg-gradient-to-r from-[#CE36E5] to-[#721E7F]">
          <Logo />
          {/* <div className="flex text-sm flex-col">
            <span className="text-xs">Welcome to </span>
            <span>Shotly</span>
          </div> */}
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
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="h-13">
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-md">
                    <AvatarImage src={user?.image ?? ''} alt={user?.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
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
