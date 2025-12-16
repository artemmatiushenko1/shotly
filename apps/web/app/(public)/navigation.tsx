import { LogInIcon } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Role } from '@/entities/models/user';
import { auth } from '@/infrastructure/services/auth/auth';

import { buttonVariants } from '@shotly/ui/components/button';
import { Logo } from '@shotly/ui/components/logo';
import { cn } from '@shotly/ui/lib/utils';

import LanguageSwitcher from './(landing)/language-switcher';
import NavLinks from './nav-links';
import ProfileMenu from './profile-menu';

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
          <ProfileMenu
            profileImageUrl={user.image ?? ''}
            name={user.name}
            email={user.email}
            role={user.role as Role}
            variant={variant}
          />
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
