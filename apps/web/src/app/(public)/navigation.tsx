import { buttonVariants } from '@shotly/ui/components/button';
import { Logo } from '@shotly/ui/components/logo';
import { cn } from '@shotly/ui/lib/utils';
import {
  ChevronDownIcon,
  LayoutGridIcon,
  LogInIcon,
  LogOutIcon,
} from 'lucide-react';
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
  DropdownMenuTrigger,
} from '@shotly/ui/components/dropdown-menu';
import { Role } from '@/domain/user';
import { auth } from '@/lib/auth/auth';
import { headers } from 'next/headers';

async function Navigation() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  const t = await getTranslations('landing.navigation');

  return (
    <header className="flex items-center justify-between relative z-10 px-4 sm:px-6 lg:px-8 py-7 container mx-auto">
      <div className="flex items-center gap-10">
        <Link href="/">
          <Logo variant="contrast" />
        </Link>
        <NavLinks />
      </div>
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Card className="rounded-full p-2">
                <CardContent className="flex items-center gap-3 px-2">
                  <Avatar className="rounded-full">
                    <AvatarImage src={user.image ?? ''} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-medium">{user.name}</p>
                  <ChevronDownIcon className="w-4 h-4" />
                </CardContent>
              </Card>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
              {user.role === Role.PHOTOGRAPHER && (
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <LayoutGridIcon /> Photographer Dashboard
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <LogOutIcon /> Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="backdrop-blur-2xl bg-white/70 p-2 rounded-full flex items-center gap-3 border border-gray-200">
            <Link
              href="/auth/sign-in"
              className={cn(
                buttonVariants({ variant: 'link' }),
                'rounded-full text-foreground items-center',
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
