'use client';

import { buttonVariants } from '@shotly/ui/components/button';
import { cn } from '@shotly/ui/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

function NavLinks() {
  const pathname = usePathname();
  const t = useTranslations('landing.navigation');

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="space-x-3 p-2 rounded-full">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'link' }),
          'text-foreground',
          isActive('/') && 'underline',
        )}
      >
        {t('home')}
      </Link>
      <Link
        href="/photographers"
        className={cn(
          buttonVariants({ variant: 'link' }),
          'text-foreground',
          isActive('/photographers') && 'underline',
        )}
      >
        {t('photographers')}
      </Link>
      <Link
        href="/about-us"
        className={cn(
          buttonVariants({ variant: 'link' }),
          'text-foreground',
          isActive('/about-us') && 'underline',
        )}
      >
        {t('aboutUs')}
      </Link>
    </nav>
  );
}

export default NavLinks;
