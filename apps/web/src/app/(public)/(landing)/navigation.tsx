import { buttonVariants } from '@shotly/ui/components/button';
import { Logo } from '@shotly/ui/components/logo';
import { cn } from '@shotly/ui/lib/utils';
import { LogInIcon } from 'lucide-react';
import Link from 'next/link';

function Navigation() {
  return (
    <header className="flex items-center px-10 justify-between relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Logo variant="contrast" />
      <nav className="pl-25 space-x-3 p-2 rounded-full">
        <Link
          href=""
          className={cn(
            buttonVariants({ variant: 'link' }),
            'text-foreground underline',
          )}
        >
          Home
        </Link>
        <Link
          href=""
          className={cn(buttonVariants({ variant: 'link' }), 'text-foreground')}
        >
          Photographers
        </Link>
        <Link
          href=""
          className={cn(buttonVariants({ variant: 'link' }), 'text-foreground')}
        >
          About Us
        </Link>
      </nav>
      <div className="backdrop-blur-2xl bg-white/30 p-2 rounded-full flex items-center border border-gray-200">
        <Link
          href="/auth/sign-in"
          className={cn(
            buttonVariants({ variant: 'link' }),
            'rounded-full text-foreground items-center',
          )}
        >
          <LogInIcon /> <span>Sign In</span>
        </Link>
        <Link
          href="/auth/sign-up"
          className={cn(buttonVariants(), 'rounded-full')}
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
}

export default Navigation;
