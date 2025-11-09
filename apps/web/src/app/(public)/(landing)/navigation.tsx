'use client';

import { buttonVariants } from '@shotly/ui/components/button';
import { Logo } from '@shotly/ui/components/logo';
import { cn } from '@shotly/ui/lib/utils';
import { LogInIcon } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './language-switcher';

function Navigation() {
  const t = useTranslations('landing.navigation');

  return (
    <header className="flex items-center px-10 justify-between relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-10">
        <Logo variant="contrast" />
        <nav className="space-x-3 p-2 rounded-full">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: 'link' }),
              'text-foreground underline',
            )}
          >
            {t('home')}
          </Link>
          <Link
            href="/photographers"
            className={cn(
              buttonVariants({ variant: 'link' }),
              'text-foreground',
            )}
          >
            {t('photographers')}
          </Link>
          <Link
            href="/about-us"
            className={cn(
              buttonVariants({ variant: 'link' }),
              'text-foreground',
            )}
          >
            {t('aboutUs')}
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
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
      </div>
    </header>
  );
}

export default Navigation;
