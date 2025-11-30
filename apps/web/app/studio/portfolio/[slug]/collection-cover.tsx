'use client';

import ImagePlaceholder from '../../../_components/image-placeholder';
import Image from 'next/image';
import React from 'react';
import { useTranslations } from 'next-intl';

type CollectionCoverProps = {
  coverImageUrl?: string | null;
  children: React.ReactNode;
};

const CollectionCover = (props: CollectionCoverProps) => {
  const { coverImageUrl, children } = props;

  const t = useTranslations('portfolio.collectionDetails.cover');

  return (
    <div className="w-full h-60 relative">
      {coverImageUrl ? (
        <Image
          className="w-full h-full object-cover rounded-md border"
          src={coverImageUrl}
          width={400}
          height={200}
          // quality={100}
          alt={t('alt')}
        />
      ) : (
        <ImagePlaceholder className="dark:bg-card" />
      )}
      {React.Children.only(children)}
    </div>
  );
};

export { CollectionCover };
