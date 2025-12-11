'use client';
import { Trash2, Upload } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useId } from 'react';

import { clientEnv } from '@/env/client';
import { MimeType } from '@/utils/files/enums';
import { mbToBytes } from '@/utils/files/utils';

import { Button, buttonVariants } from '@shotly/ui/components/button';
import { cn } from '@shotly/ui/lib/utils';

import { useImagePreview } from '../../../_components/cover-upload/use-image-preview';
import { uploadTmpProfileImage } from './profile-form.actions';
import { ProfileImagePlaceholder } from './profile-image-placeholder';

type ProfileImageUploadProps = {
  existingImageUrl?: string | null;
  inputName: string;
  inputId: string;
  error?: string;
};

export function ProfileImageUpload({
  existingImageUrl,
  inputName,
  inputId,
  error,
}: ProfileImageUploadProps) {
  const t = useTranslations('settings.profile.fields.profileImageUpload');

  const fileInputId = useId();

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
          htmlFor={fileInputId}
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
          id={fileInputId}
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
        <input
          type="hidden"
          id={inputId}
          name={inputName}
          value={selectedPreviewUrl ?? existingImageUrl ?? ''}
        />
        {selectedPreviewUrl && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={handleRemove}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {t('removeSelected')}
          </Button>
        )}
        {(error || sizeError) && (
          <p className="text-sm text-destructive">{error || sizeError}</p>
        )}
      </div>
    </div>
  );
}
