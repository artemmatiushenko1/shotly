'use client';

import { CalendarIcon, LayoutGridIcon, LogOutIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Role } from '@/entities/models/user';
import { authClient } from '@/infrastructure/services/auth/auth-client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@shotly/ui/components/avatar';
import { Card, CardContent } from '@shotly/ui/components/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@shotly/ui/components/dropdown-menu';
import { cn } from '@shotly/ui/lib/utils';

type ProfileMenuProps = {
  variant?: 'default' | 'contrast';
  profileImageUrl: string;
  name: string;
  email: string;
  role: Role;
};

function ProfileMenu({
  profileImageUrl,
  name,
  email,
  role,
  variant = 'default',
}: ProfileMenuProps) {
  const t = useTranslations('landing.navigation');
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Card
          className={cn(
            'rounded-full p-2 shadow-none',
            variant === 'default'
              ? 'backdrop-blur-2xl bg-white/30 border border-border/10'
              : '',
          )}
        >
          <CardContent className="flex items-center gap-3 px-2">
            <p
              className={cn(
                'text-sm font-medium',
                variant === 'contrast' ? 'text-foreground' : 'text-white',
              )}
            >
              {t('greeting', { name })}
            </p>
            <Avatar className="rounded-full">
              <AvatarImage src={profileImageUrl} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
          </CardContent>
        </Card>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
        <div className="px-2 py-2">
          <p className="text-xs font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{email}</p>
        </div>
        <DropdownMenuSeparator />
        {role === Role.PHOTOGRAPHER && (
          <DropdownMenuItem asChild>
            <Link href="/studio/dashboard">
              <LayoutGridIcon /> {t('photographerStudio')}
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link href="/my-bookings">
            <CalendarIcon /> {t('myBookings')}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon /> {t('logOut')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileMenu;
