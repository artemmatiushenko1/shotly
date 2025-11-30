'use client';

import { useId } from 'react';
import Image from 'next/image';
import { buttonVariants } from '@shotly/ui/components/button';
import { ImageIcon } from 'lucide-react';
import { useImagePreview } from '@/lib/images/use-image-preview';
import { cn } from '@shotly/ui/lib/utils';
import ImagePlaceholder from '../image-placeholder';
import { useTranslations } from 'next-intl';

type CoverUploadProps = {
  existingImageUrl?: string | null;
  name: string;
  error?: string;
};

function CoverUpload(props: CoverUploadProps) {
  const { existingImageUrl = null, name, error } = props;

  const inputId = useId();
  const t = useTranslations('settings.coverUpload');

  const { displayImageUrl, fileInputRef, handleFileChange, sizeError } =
    useImagePreview({
      existingImageUrl,
      maxSize: 2 * 1024 * 1024, // 2MB
    });

  return (
    <div className="h-48">
      <ImagePlaceholder
        className={cn(
          'p-8',
          displayImageUrl && 'border-transparent',
          error && 'outline-destructive',
        )}
      >
        {displayImageUrl && (
          <Image
            src={displayImageUrl}
            alt={t('alt')}
            fill
            className="object-cover"
            priority
          />
        )}

        <div className="absolute bottom-4 right-4 flex gap-3">
          <label
            htmlFor={inputId}
            className={cn(
              buttonVariants({ variant: 'secondary', size: 'sm' }),
              'bg-white/90 hover:bg-white cursor-pointer inline-flex items-center',
            )}
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            {displayImageUrl ? t('changeButton') : t('editButton')}
          </label>
        </div>

        <input
          ref={fileInputRef}
          id={inputId}
          name={name}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          className="hidden"
          onChange={handleFileChange}
        />
      </ImagePlaceholder>
      {(error || sizeError) && (
        <p className="text-sm text-destructive mt-2">{error || sizeError}</p>
      )}
    </div>
  );
}

export default CoverUpload;
