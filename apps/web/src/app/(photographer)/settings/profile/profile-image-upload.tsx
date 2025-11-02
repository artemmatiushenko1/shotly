'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Upload, Trash2 } from 'lucide-react';
import { Button, buttonVariants } from '@shotly/ui/components/button';
import { cn } from '@shotly/ui/lib/utils';
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
  const [selectedImagePreview, setSelectedImagePreview] = useState<
    string | null
  >(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (selectedImagePreview) {
        URL.revokeObjectURL(selectedImagePreview);
      }
    };
  }, [selectedImagePreview]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (selectedImagePreview) {
        URL.revokeObjectURL(selectedImagePreview);
      }
      const previewUrl = URL.createObjectURL(file);
      setSelectedImagePreview(previewUrl);
    }
  };

  const handleRemove = () => {
    if (selectedImagePreview) {
      URL.revokeObjectURL(selectedImagePreview);
      setSelectedImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else if (existingImageUrl && onDeleteExisting) {
      onDeleteExisting();
    }
  };

  const displayImage = selectedImagePreview || existingImageUrl;

  return (
    <div className="flex items-start gap-6">
      {displayImage ? (
        <div className="relative h-24 w-24 overflow-hidden rounded-xl border">
          <Image
            fill
            src={displayImage}
            alt="Profile preview"
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
          Upload new image
        </label>
        <input
          ref={fileInputRef}
          id={inputId}
          name={inputName}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          className="hidden"
          onChange={handleImageSelect}
        />
        {displayImage && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={handleRemove}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {selectedImagePreview ? 'Remove selected' : 'Delete current image'}
          </Button>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    </div>
  );
}
