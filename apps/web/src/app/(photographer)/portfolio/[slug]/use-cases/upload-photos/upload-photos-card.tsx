'use client';

import { Card } from '@shotly/ui/components/card';
import { UploadIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

type UploadPhotosCardProps = {
  onClick?: () => void;
};

const UploadPhotosCard = ({ onClick }: UploadPhotosCardProps) => {
  const t = useTranslations('portfolio.collectionDetails.uploadPhotos');

  return (
    <Card
      onClick={onClick}
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border-2 border-dashed border-accent hover:border-primary h-48 p-0 shadow-none"
    >
      <div className="relative h-48 flex flex-col items-center justify-center hover:bg-primary/5 transition-colors">
        <UploadIcon className="size-8 mb-2 text-muted-foreground" />
        <p className="text-sm font-medium text-muted-foreground">
          {t('title')}
        </p>
        <p className="text-xs text-center text-muted-foreground mt-1">
          {t('description')}
        </p>
      </div>
    </Card>
  );
};

export { UploadPhotosCard };
