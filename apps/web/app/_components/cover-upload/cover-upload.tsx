'use client';

import { useId } from 'react';
import { buttonVariants } from '@shotly/ui/components/button';
import { ImageIcon } from 'lucide-react';
import { useImagePreview } from './use-image-preview';
import { cn } from '@shotly/ui/lib/utils';
import { useTranslations } from 'next-intl';
import { uploadTmpCoverImage } from './actions';
import ImageDisplay from './image-display';
import { clientEnv } from '@/env/client';
import { mbToBytes } from '@/lib/files/utils';
import { MimeType } from '@/lib/files/enums';

type CoverUploadProps = {
  existingImageUrl?: string;
  name: string;
  error?: string;
};

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
    uploadAction: uploadTmpCoverImage,
    allowedMimeTypes: [
      MimeType.JPEG,
      MimeType.JPG,
      MimeType.PNG,
      MimeType.WEBP,
    ],
  });

  return (
    <div>
      <div
        className={cn(
          'h-50 relative overflow-hidden rounded-xl border-1 border-transparent',
          sizeError && 'border-1 border-destructive',
        )}
      >
        <ImageDisplay
          alt={t('alt')}
          isLoading={isUploading}
          key={displayImageUrl}
          imageUrl={displayImageUrl ?? undefined}
          maxSizeMb={clientEnv.NEXT_PUBLIC_MAX_PROFILE_COVER_IMAGE_SIZE_MB}
          allowedExtensions={[
            MimeType.JPG,
            MimeType.JPEG,
            MimeType.PNG,
            MimeType.WEBP,
          ].map((mimeType) => mimeType.split('/').pop()?.toUpperCase() ?? '')}
        />
        {!isUploading && (
          <div className="absolute bottom-4 right-4 flex gap-3">
            <label
              htmlFor={fileInputId}
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'sm' }),
                'bg-white/90 hover:bg-white cursor-pointer inline-flex items-center',
              )}
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              {displayImageUrl ? t('changeButton') : t('chooseButton')}
            </label>
          </div>
        )}
        <input
          ref={fileInputRef}
          id={fileInputId}
          type="file"
          // accept="image/jpeg,image/jpg,image/png,image/webp"
          className="hidden"
          onChange={handleFileChange}
        />
        <input
          className="hidden"
          type="hidden"
          id={imageUrlInputId}
          name={name}
          value={displayImageUrl ?? ''}
        />
      </div>
      {(error || sizeError) && (
        <p className="text-sm text-destructive mt-2">{error || sizeError}</p>
      )}
    </div>
  );
}

export default CoverUpload;
