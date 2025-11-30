'use client';

import { buttonVariants } from '@shotly/ui/components/button';
import { cn } from '@shotly/ui/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

type NavLinksProps = {
  variant?: 'contrast' | 'default';
};

function NavLinks({ variant = 'default' }: NavLinksProps) {
  const pathname = usePathname();
  const t = useTranslations('landing.navigation');

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={cn(
        'space-x-3 p-2 rounded-full ',
        variant === 'contrast'
          ? ''
          : 'backdrop-blur-2xl bg-white/30 border border-border/10',
      )}
    >
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'link' }),
          variant === 'contrast' ? 'text-foreground' : 'text-white',
          isActive('/') && 'underline',
        )}
      >
        {t('home')}
      </Link>
      <Link
        href="/search"
        className={cn(
          buttonVariants({ variant: 'link' }),
          variant === 'contrast' ? 'text-foreground' : 'text-white',
          isActive('/search') && 'underline',
        )}
      >
        {t('photographers')}
      </Link>
      <Link
        href="/about-us"
        className={cn(
          buttonVariants({ variant: 'link' }),
          variant === 'contrast' ? 'text-foreground' : 'text-white',
          isActive('/about-us') && 'underline',
        )}
      >
        {t('aboutUs')}
      </Link>
    </nav>
  );
}

export default NavLinks;
