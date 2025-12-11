'use client';

import { ImageIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useId } from 'react';

import { clientEnv } from '@/env/client';
import { MimeType } from '@/utils/files/enums';
import { mbToBytes } from '@/utils/files/utils';

import { buttonVariants } from '@shotly/ui/components/button';
import { cn } from '@shotly/ui/lib/utils';

import { uploadTmpCoverImageAction } from './actions';
import ImageDisplay from './image-display';
import { useImagePreview } from './use-image-preview';

type CoverUploadProps = {
  existingImageUrl?: string;
  name: string;
  error?: string;
};

const allowedMimeTypes = [
  MimeType.JPEG,
  MimeType.JPG,
  MimeType.PNG,
  MimeType.WEBP,
];

function CoverUpload(props: CoverUploadProps) {
  const { existingImageUrl = null, name, error } = props;

  const imageUrlInputId = useId();
  const fileInputId = useId();

  const t = useTranslations('settings.coverUpload');

  const {
    displayImageUrl,
    fileInputRef,
    handleFileChange,
    sizeError,
    isUploading,
  } = useImagePreview({
    existingImageUrl,
    maxSize: mbToBytes(clientEnv.NEXT_PUBLIC_MAX_PROFILE_COVER_IMAGE_SIZE_MB),
    uploadAction: uploadTmpCoverImageAction,
    allowedMimeTypes,
  });

  const hasError = Boolean(error || sizeError);

  return (
    <div>
      <div
        className={cn(
          'h-50 relative overflow-hidden rounded-xl border-1 border-transparent',
          hasError && 'border-1 border-destructive',
        )}
      >
        <ImageDisplay
          alt={t('alt')}
          isLoading={isUploading}
          key={displayImageUrl}
          imageUrl={displayImageUrl ?? undefined}
          maxSizeMb={clientEnv.NEXT_PUBLIC_MAX_PROFILE_COVER_IMAGE_SIZE_MB}
          allowedExtensions={allowedMimeTypes.map(
            (mimeType) => mimeType.split('/').pop()?.toUpperCase() ?? '',
          )}
        />
        {!isUploading && (
          <div className="absolute bottom-4 right-4 flex gap-3">
            <label
              htmlFor={fileInputId}
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'sm' }),
                'cursor-pointer inline-flex items-center bg-background hover:bg-background/80',
              )}
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              {displayImageUrl ? t('changeButton') : t('chooseButton')}
            </label>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          id={fileInputId}
          accept={allowedMimeTypes.join(',')}
          className="hidden"
          onChange={handleFileChange}
        />
        <input
          required
          name={name}
          className="hidden"
          type="hidden"
          id={imageUrlInputId}
          value={displayImageUrl ?? ''}
        />
      </div>
      {hasError && (
        <p className="text-sm text-destructive mt-2">{error || sizeError}</p>
      )}
    </div>
  );
}

export default CoverUpload;
