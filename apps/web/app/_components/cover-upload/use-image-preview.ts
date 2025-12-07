import { useCallback, useMemo, useRef, useState } from 'react';

import { MimeType } from '@/lib/files/enums';
import { UploadResult } from '@/lib/images/image-storage.interface';

import { uploadTmpCoverImage } from './actions';

export type UseImagePreviewOptions = {
  existingImageUrl?: string | null;
  maxSize?: number;
  allowedMimeTypes?: MimeType[];
  uploadAction: (file: File) => Promise<UploadResult>;
};

export type UseImagePreviewResult = {
  displayImageUrl: string | null;
  selectedPreviewUrl: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  sizeError: string | null;
  isUploading: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearSelectedPreview: () => void;
};

export function useImagePreview(
  options: UseImagePreviewOptions,
): UseImagePreviewResult {
  const { existingImageUrl = null, maxSize, allowedMimeTypes } = options;

  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState<string | null>(
    null,
  );
  const [isUploading, setIsUploading] = useState(false);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File) => {
    setIsUploading(true);
    const uploadResult = await uploadTmpCoverImage(file);
    setIsUploading(false);
    return uploadResult;
  }, []);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) {
        setSizeError(null);
        return;
      }

      if (
        allowedMimeTypes &&
        !allowedMimeTypes.includes(file.type as MimeType)
      ) {
        setSizeError(
          `Invalid file type. Allowed types: ${allowedMimeTypes?.join(', ')}`,
        );
        return;
      }

      if (maxSize && file.size > maxSize) {
        const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);

        setSizeError(`Image must be less than ${maxSizeMB}MB`);

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        if (selectedPreviewUrl) {
          setSelectedPreviewUrl(null);
        }
        return;
      }

      setSizeError(null);

      const uploadResult = await uploadFile(file);
      setSelectedPreviewUrl(uploadResult.url);
    },
    [selectedPreviewUrl, maxSize, uploadFile, allowedMimeTypes],
  );

  const clearSelectedPreview = useCallback(() => {
    if (selectedPreviewUrl) {
      setSelectedPreviewUrl(null);
    }

    setSizeError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [selectedPreviewUrl]);

  const displayImageUrl = useMemo(
    () => selectedPreviewUrl || existingImageUrl || null,
    [existingImageUrl, selectedPreviewUrl],
  );

  return {
    isUploading,
    displayImageUrl,
    selectedPreviewUrl,
    fileInputRef,
    handleFileChange,
    clearSelectedPreview,
    sizeError,
  };
}
