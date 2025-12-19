'use client';

import { CalendarIcon, ImagesIcon, TagIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { VisibilityStatus } from '@/entities/models/common';

import { formatDate } from '@shotly/ui/lib/date';

import { IconWithText } from '../../../_components/icon-with-text';
import { VisibilityBadge } from '../../../_components/visibility-badge';

type CollectionMetadataProps = {
  name: string;
  description: string;
  photosCount: number;
  shootDate: Date;
  categoryName: string;
  status: VisibilityStatus;
};

const CollectionMetadata = (props: CollectionMetadataProps) => {
  const { name, description, photosCount, shootDate, categoryName, status } =
    props;
  const t = useTranslations('portfolio.collectionDetails.metadata');
  const locale = useLocale();

  return (
    <div className="flex justify-between items-start px-3">
      <div>
        <h3 className=" font-bold text-2xl mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="flex space-x-4 text-muted-foreground mb-3">
          <IconWithText
            icon={ImagesIcon}
            text={t('assetsCount', { count: photosCount })}
          />
          <IconWithText
            icon={CalendarIcon}
            text={formatDate(shootDate, locale)}
          />
          <IconWithText icon={TagIcon} text={categoryName} />
        </div>
      </div>
      <VisibilityBadge isPublic={status === VisibilityStatus.PUBLIC} />
    </div>
  );
};

export { CollectionMetadata };
