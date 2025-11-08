'use client';

import { useState, useCallback } from 'react';
import { ImageIcon, Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shotly/ui/components/dialog';
import { UploadPhotosCard } from './upload-photos-card';
import { Button } from '@shotly/ui/components/button';
import { useTranslations } from 'next-intl';

interface UploadFile {
  id: string;
  file: File;
  preview: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
}

type UploadPhotosDialogProps = {
  onUpload: (files: File[]) => void;
  isVisible: boolean;
  onClose: () => void;
};

const UploadPhotosDialog = ({
  onUpload,
  isVisible,
  onClose,
}: UploadPhotosDialogProps) => {
  const t = useTranslations('portfolio.collectionDetails.uploadDialog');
  const [dragActive, setDragActive] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);

  const handleFiles = useCallback((files: FileList) => {
    const newFiles: UploadFile[] = [];

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const id = Date.now() + Math.random().toString();
        const preview = URL.createObjectURL(file);

        newFiles.push({
          id,
          file,
          preview,
          status: 'success',
          progress: 100,
        });
      }
    });

    setUploadFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        handleFiles(e.target.files);
      }
    },
    [handleFiles],
  );

  const removeFile = (fileId: string) => {
    setUploadFiles((prev) => {
      const file = prev.find((f) => f.id === fileId);
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter((f) => f.id !== fileId);
    });
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return `0 ${t('fileSize.bytes')}`;
    const k = 1024;
    const sizes = [
      t('fileSize.bytes'),
      t('fileSize.kb'),
      t('fileSize.mb'),
      t('fileSize.gb'),
    ];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleContinue = () => {
    const successFiles = uploadFiles
      .filter((f) => f.status === 'success')
      .map((f) => f.file);

    if (successFiles.length > 0) {
      onUpload(successFiles);
    }

    // Clean up URLs
    uploadFiles.forEach((file) => {
      URL.revokeObjectURL(file.preview);
    });

    setUploadFiles([]);
    onClose();
  };

  // const handleClose = () => {
  //   // Clean up URLs
  //   uploadFiles.forEach((file) => {
  //     URL.revokeObjectURL(file.preview);
  //   });

  //   setUploadFiles([]);
  //   onClose();
  // };

  if (!isVisible) return null;

  return (
    <Dialog>
      <DialogTrigger>
        <UploadPhotosCard />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="pb-4">
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>

        {/* Upload Zone */}
        <div className="pb-4">
          <div
            className={`border-2 border-dashed rounded-md p-8 text-center transition-all ${
              dragActive
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-gray-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-gray-400" />
            </div>
            <div className="mb-4 text-md">
              <span className="text-gray-600">{t('uploadZone.dragText')} </span>
              <label className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer underline">
                {t('uploadZone.browse')}
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">{t('uploadZone.fileTypes')}</p>
          </div>
        </div>

        {/* File List */}
        {uploadFiles.length > 0 && (
          <div className="space-y-3 pb-4 max-h-64 overflow-y-auto">
            {uploadFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md"
              >
                {/* File Preview */}
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                  <Image
                    src={file.preview}
                    alt={file.file.name}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {file.file.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {formatBytes(file.file.size)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeFile(file.id)}
                  >
                    <Trash2Icon />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <DialogFooter className="pt-4">
          <Button
            size="lg"
            className="w-full"
            onClick={handleContinue}
            disabled={uploadFiles.length === 0}
          >
            {t('continue')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPhotosDialog;
