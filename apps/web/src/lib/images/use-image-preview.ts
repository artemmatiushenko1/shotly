import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type UseImagePreviewOptions = {
  /** Existing image URL shown when no file is selected */
  existingImageUrl?: string | null;
  /** Maximum file size in bytes */
  maxSize?: number;
};

export type UseImagePreviewResult = {
  /** The URL to display (selected preview > existingImageUrl > null) */
  displayImageUrl: string | null;
  /** The currently selected preview URL, if any */
  selectedPreviewUrl: string | null;
  /** Ref to the underlying file input (optional convenience) */
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  /** onChange handler to attach to the file input */
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Clear selected preview and reset the input */
  clearSelectedPreview: () => void;
  /** File size validation error message, if any */
  sizeError: string | null;
};

/**
 * useImagePreview - shared hook to manage image preview logic based on a selected file.
 * - Creates/revokes object URLs to avoid memory leaks
 * - Exposes helpers for change/reset
 */
export function useImagePreview(
  options: UseImagePreviewOptions = {},
): UseImagePreviewResult {
  const { existingImageUrl = null, maxSize } = options;

  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState<string | null>(
    null,
  );
  const [sizeError, setSizeError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup object URL on unmount or when it changes
  useEffect(() => {
    return () => {
      if (selectedPreviewUrl) {
        URL.revokeObjectURL(selectedPreviewUrl);
      }
    };
  }, [selectedPreviewUrl]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
        setSizeError(null);
        return;
      }

      // Validate file size if maxSize is specified
      if (maxSize && file.size > maxSize) {
        const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
        setSizeError(`Image must be less than ${maxSizeMB}MB`);
        // Clear the input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        // Clear any existing preview
        if (selectedPreviewUrl) {
          URL.revokeObjectURL(selectedPreviewUrl);
          setSelectedPreviewUrl(null);
        }
        return;
      }

      // Clear any previous error
      setSizeError(null);

      // Revoke previous preview URL if exists
      if (selectedPreviewUrl) {
        URL.revokeObjectURL(selectedPreviewUrl);
      }

      const previewUrl = URL.createObjectURL(file);
      setSelectedPreviewUrl(previewUrl);
    },
    [selectedPreviewUrl, maxSize],
  );

  const clearSelectedPreview = useCallback(() => {
    if (selectedPreviewUrl) {
      URL.revokeObjectURL(selectedPreviewUrl);
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
    displayImageUrl,
    selectedPreviewUrl,
    fileInputRef,
    handleFileChange,
    clearSelectedPreview,
    sizeError,
  };
}
