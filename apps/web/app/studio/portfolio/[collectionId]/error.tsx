'use client';

import { FrownIcon } from 'lucide-react';
import Link from 'next/link';

import { NotFoundError } from '@/entities/errors/common';

import { buttonVariants } from '@shotly/ui/components/button';

type ErrorProps = {
  error: Error & { digest?: string };
};

function Error({ error }: ErrorProps) {
  const getText = () => {
    if (error.digest === NotFoundError.DIGEST) {
      return {
        icon: <FrownIcon className="w-10 h-10" />,
        title: 'Collection not found',
        description: 'The collection you are looking for does not exist.',
      };
    }

    return {
      icon: <FrownIcon className="w-10 h-10" />,
      title: 'Error',
      description: 'An error occurred while loading the collection.',
    };
  };

  const text = getText();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-4 mb-4">
        {text.icon}
      </div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">{text.title}</h1>
        <p className="text-sm text-muted-foreground max-w-lg">
          {text.description}
        </p>
      </div>
      <Link
        href="/studio/portfolio"
        className={buttonVariants({ variant: 'default' })}
      >
        Go back to portfolio
      </Link>
    </div>
  );
}

export default Error;
