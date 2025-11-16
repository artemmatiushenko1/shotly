'use client';

import { IconWithText } from '@/components/icon-with-text';
import { Card, CardContent } from '@shotly/ui/components/card';
import { CalendarIcon, ImagesIcon } from 'lucide-react';
import Image from 'next/image';
import { VisibilityBadge } from '../../../ui/visibility-badge';
import ImagePlaceholder from '@/components/image-placeholder';
import { useTranslations } from 'next-intl';

type CollectionCardProps = {
  isPublic?: boolean;
  title: string;
  description: string;
  imagesCount: number;
  createdAt: string;
  coverSrc: string;
};

function CollectionCard(props: CollectionCardProps) {
  const {
    isPublic = false,
    title,
    description,
    imagesCount,
    createdAt,
    coverSrc,
  } = props;

  const t = useTranslations('portfolio.collectionCard');

  return (
    <Card className="bg-muted/20 rounded-xl shadow-none overflow-hidden p-0 gap-0 cursor-pointer hover:bg-accent/50">
      <div className="relative">
        <div className="p-2">
          {coverSrc ? (
            <Image
              width={200}
              height={300}
              src={coverSrc}
              alt={title}
              quality={75}
              className="object-cover w-full h-48 rounded-md"
            />
          ) : (
            <ImagePlaceholder className="w-full h-48 rounded-md" alt={title} />
          )}
        </div>
        <VisibilityBadge
          isPublic={isPublic}
          className="absolute top-4 left-4"
        />
      </div>
      <CardContent className="p-3">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="overflow-hidden">
              <h3 className="text-lg font-semibold text-foreground truncate">
                {title}
              </h3>
              <p className="text-muted-foreground text-sm truncate">
                {description}
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-6 text-xs text-gray-600">
            <IconWithText
              icon={ImagesIcon}
              text={t('imagesCount', { count: imagesCount })}
            />
            <IconWithText icon={CalendarIcon} text={createdAt} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CollectionCard;
