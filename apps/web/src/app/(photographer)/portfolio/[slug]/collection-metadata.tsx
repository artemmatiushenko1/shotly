'use client';

import { IconWithText } from '@/components/icon-with-text';
import { CalendarIcon, ImagesIcon, TagIcon } from 'lucide-react';
import { VisibilityBadge } from '../../ui/visibility-badge';
import { VisibilityStatus } from '@/domain/common';
import { formatDateWithOrdinal } from '@/utils/date-formatting';
import { useTranslations } from 'next-intl';

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
            text={formatDateWithOrdinal(shootDate)}
          />
          <IconWithText icon={TagIcon} text={categoryName} />
        </div>
      </div>
      <VisibilityBadge isPublic={status === VisibilityStatus.PUBLIC} />
    </div>
  );
};

export { CollectionMetadata };
