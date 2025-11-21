import { buttonVariants } from '@shotly/ui/components/button';
import { Logo } from '@shotly/ui/components/logo';
import { cn } from '@shotly/ui/lib/utils';
import { LayoutGridIcon, LogInIcon, LogOutIcon } from 'lucide-react';
import Link from 'next/link';
import LanguageSwitcher from './(landing)/language-switcher';
import { getTranslations } from 'next-intl/server';
import NavLinks from './nav-links';
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
import { Role } from '@/domain/user';
import { auth } from '@/lib/auth/auth';
import { headers } from 'next/headers';

type NavigationProps = {
  className?: string;
  variant?: 'contrast' | 'default';
};

async function Navigation({ className, variant = 'default' }: NavigationProps) {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  const t = await getTranslations('landing.navigation');

  return (
    <header
      className={cn(
        'flex items-center justify-between relative z-10 px-4 sm:px-6 lg:px-8 py-7 container mx-auto',
        className,
      )}
    >
      <div className="flex items-center gap-10">
        <Link href="/">
          <Logo variant={variant === 'contrast' ? 'contrast' : 'default'} />
        </Link>
        <NavLinks variant={variant} />
      </div>
      <div className="flex items-center gap-3">
        <LanguageSwitcher variant={variant} />
        {user ? (
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
                    Hi, {user.name}!
                  </p>
                  <Avatar className="rounded-full">
                    <AvatarImage src={user.image ?? ''} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </CardContent>
              </Card>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
              <div className="px-2 py-2">
                <p className="text-xs font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <DropdownMenuSeparator />
              {user.role === Role.PHOTOGRAPHER && (
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <LayoutGridIcon /> My Dashboard
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <LogOutIcon /> Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div
            className={cn(
              'p-2 rounded-full flex items-center gap-3 border border-border',
              variant === 'default'
                ? 'backdrop-blur-2xl bg-white/30 border-border/10'
                : '',
            )}
          >
            <Link
              href="/auth/sign-in"
              className={cn(
                buttonVariants({ variant: 'link' }),
                'rounded-full text-foreground items-center',
                variant === 'contrast' ? 'text-foreground' : 'text-white',
              )}
            >
              <LogInIcon /> <span>{t('signIn')}</span>
            </Link>
            <Link
              href="/auth/sign-up"
              className={cn(buttonVariants(), 'rounded-full')}
            >
              {t('signUp')}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navigation;
