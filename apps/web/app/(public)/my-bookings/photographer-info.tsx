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

type PhotorgapherInfoProps = {
  id: string;
  name: string;
  profileImageUrl?: string | null;
};

function PhotorgapherInfo({
  id,
  name,
  profileImageUrl,
}: PhotorgapherInfoProps) {
  const t = useTranslations('myBookings.photographerInfo');

  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1">{t('label')}</p>
      <Link
        target="_blank"
        href={`/photographers/${id}`}
        className="flex items-center gap-2"
      >
        <Avatar className="rounded-full">
          <AvatarImage src={profileImageUrl ?? undefined} />
          <AvatarFallback>
            <UserIcon className="size-4" />
          </AvatarFallback>
        </Avatar>
        <p className="text-sm font-bold">{name}</p>
        <ArrowUpRightIcon className="size-4 text-muted-foreground" />
      </Link>
    </div>
  );
}

export default PhotorgapherInfo;
