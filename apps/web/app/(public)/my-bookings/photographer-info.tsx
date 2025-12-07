'use client';

import { ArrowUpRightIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@shotly/ui/components/avatar';

function PhotorgapherInfo() {
  const t = useTranslations('myBookings.photographerInfo');

  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1">{t('label')}</p>
      <Link
        href="/photographers/1234567890"
        target="_blank"
        className="flex items-center gap-2"
      >
        <Avatar className="rounded-full">
          <AvatarImage src="http://localhost:3000/uploads/profiles/25ba4d29420de7b50037144b33bbba0f.jpg" />
          <AvatarFallback>
            <UserIcon className="size-4" />
          </AvatarFallback>
        </Avatar>
        <p className="text-sm font-bold">Артем Матюшенко</p>
        <ArrowUpRightIcon className="size-4 text-muted-foreground" />
      </Link>
    </div>
  );
}

export default PhotorgapherInfo;
