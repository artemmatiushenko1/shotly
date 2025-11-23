'use client';
import Image from 'next/image';
import { Upload, Trash2 } from 'lucide-react';
import { Button, buttonVariants } from '@shotly/ui/components/button';
import { cn } from '@shotly/ui/lib/utils';
import { ProfileImagePlaceholder } from './profile-image-placeholder';
import { useImagePreview } from '@/lib/images/use-image-preview';
import { useTranslations } from 'next-intl';

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
    maxSize: 1 * 1024 * 1024, // 1MB
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
          accept="image/jpeg,image/jpg,image/png,image/webp"
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
