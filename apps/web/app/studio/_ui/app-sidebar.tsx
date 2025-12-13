'use client';

import { User } from 'better-auth';
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
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { StorageUsage } from '@/entities/models/user';
import { authClient } from '@/infrastructure/services/auth/auth-client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@shotly/ui/components/avatar';
import { Badge } from '@shotly/ui/components/badge';
import { Logo } from '@shotly/ui/components/logo';
import { Separator } from '@shotly/ui/components/separator';
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

import { StorageUsageInfo } from './storage-usage-info';

type AppSidebarProps = {
  user: User;
  storageUsage: StorageUsage;
};

export function AppSidebar(props: AppSidebarProps) {
  const { user, storageUsage } = props;

  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('sidebar');

  const items = [
    {
      title: t('menu.dashboard'),
      url: '/studio/dashboard',
      icon: LayoutGrid,
    },
    {
      title: t('menu.portfolio'),
      url: '/studio/portfolio',
      icon: Image,
    },
    {
      title: t('menu.orders'),
      url: '/studio/orders',
      icon: Blocks,
    },
    {
      title: t('menu.services'),
      url: '/studio/services',
      icon: Handshake,
    },
    {
      title: t('menu.calendar'),
      url: '/studio/calendar',
      icon: CalendarRangeIcon,
      disabled: true,
      extra: <Badge variant="secondary">{t('comingSoon')}</Badge>,
    },
  ];

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
        <div className="flex gap-3 items-center justify-center rounded-md bg-[linear-gradient(60deg,#ffd164,#f8b03d,#ee6b60,#d6487f,#a147c4,#4b63e4,#3cccc7)]">
          <Logo className="h-18" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('menuLabel')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    disabled={item.disabled}
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
                      {item.extra}
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
        <StorageUsageInfo storageUsage={storageUsage} />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              isActive={getIsActiveMenuItem('/studio/settings')}
            >
              <Link href="/studio/settings">
                <SettingsIcon />
                <span className="mr-auto text-sm">{t('settings')}</span>
                {getIsActiveMenuItem('/studio/settings') && (
                  <ChevronRight className="text-fo" />
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" onClick={handleSignOut}>
              <span>
                <LogOutIcon />
                <span className="mr-auto text-sm">{t('logOut')}</span>
              </span>
            </SidebarMenuButton>
            <Separator className="my-2" />
            <div className="flex gap-2 p-2 py-3">
              <Avatar className="h-8 w-8 rounded-md">
                <AvatarImage src={user.image ?? ''} alt={user.name} />
                <AvatarFallback className="rounded-md">
                  {user.name}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-xs leading-tight">
                <span className="truncate font-semibold text-foreground mb-1">
                  {user.name}
                </span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
