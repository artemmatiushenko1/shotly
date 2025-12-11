'use client';
import { Trash2, Upload } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { clientEnv } from '@/env/client';
import { MimeType } from '@/utils/files/enums';
import { mbToBytes } from '@/utils/files/utils';

import { Button, buttonVariants } from '@shotly/ui/components/button';
import { cn } from '@shotly/ui/lib/utils';

import { useImagePreview } from '../../../_components/cover-upload/use-image-preview';
import { uploadTmpProfileImage } from './actions';
import { ProfileImagePlaceholder } from './profile-image-placeholder';

type ProfileImageUploadProps = {
  existingImageUrl?: string | null;
  inputName: string;
  inputId: string;
  error?: string;
  onDeleteExisting?: () => void;
};

export function ProfileImageUpload({
  existingImageUrl,
  inputName,
  inputId,
  error,
  onDeleteExisting,
}: ProfileImageUploadProps) {
  const t = useTranslations('settings.profile.fields.profileImageUpload');

  const {
    displayImageUrl,
    selectedPreviewUrl,
    fileInputRef,
    handleFileChange,
    clearSelectedPreview,
    sizeError,
  } = useImagePreview({
    existingImageUrl,
    maxSize: mbToBytes(clientEnv.NEXT_PUBLIC_MAX_PROFILE_IMAGE_SIZE_MB),
    uploadAction: uploadTmpProfileImage,
  });

  const handleRemove = () => {
    if (selectedPreviewUrl) {
      clearSelectedPreview();
    } else if (existingImageUrl && onDeleteExisting) {
      onDeleteExisting();
    }
  };

  return (
    <div className="flex items-start gap-6">
      {displayImageUrl ? (
        <div className="relative h-24 w-24 overflow-hidden rounded-xl border">
          <Image
            fill
            src={displayImageUrl}
            alt={t('alt')}
            className="object-cover"
          />
        </div>
      ) : (
        <ProfileImagePlaceholder />
      )}
      <div className="flex flex-col gap-2">
        <label
          htmlFor={inputId}
          className={cn(
            buttonVariants({ variant: 'outline', size: 'sm' }),
            'cursor-pointer',
          )}
        >
          <Upload className="mr-2 h-4 w-4" />
          {t('uploadButton')}
        </label>
        <input
          ref={fileInputRef}
          id={inputId}
          name={inputName}
          type="file"
          accept={[
            MimeType.JPEG,
            MimeType.JPG,
            MimeType.PNG,
            MimeType.WEBP,
          ].join(',')}
          className="hidden"
          onChange={handleFileChange}
        />
        {displayImageUrl && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={handleRemove}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {selectedPreviewUrl ? t('removeSelected') : t('deleteCurrent')}
          </Button>
        )}
        {(error || sizeError) && (
          <p className="text-sm text-destructive">{error || sizeError}</p>
        )}
      </div>
    </div>
  );
}
