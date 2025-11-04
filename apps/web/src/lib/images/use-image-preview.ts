import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type UseImagePreviewOptions = {
  /** Existing image URL shown when no file is selected */
  existingImageUrl?: string | null;
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
};

/**
 * useImagePreview - shared hook to manage image preview logic based on a selected file.
 * - Creates/revokes object URLs to avoid memory leaks
 * - Exposes helpers for change/reset
 */
export function useImagePreview(
  options: UseImagePreviewOptions = {},
): UseImagePreviewResult {
  const { existingImageUrl = null } = options;

  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState<string | null>(
    null,
  );
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
      if (!file) return;

      // Revoke previous preview URL if exists
      if (selectedPreviewUrl) {
        URL.revokeObjectURL(selectedPreviewUrl);
      }

      const previewUrl = URL.createObjectURL(file);
      setSelectedPreviewUrl(previewUrl);
    },
    [selectedPreviewUrl],
  );

  const clearSelectedPreview = useCallback(() => {
    if (selectedPreviewUrl) {
      URL.revokeObjectURL(selectedPreviewUrl);
      setSelectedPreviewUrl(null);
    }
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
  };
}
