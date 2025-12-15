'use client';

import { ImageIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useCallback, useState } from 'react';

import { clientEnv } from '@/env/client';

import { Button } from '@shotly/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shotly/ui/components/dialog';

import { usePhotosUploadQueue } from '../../photos-upload-queue.context';
import SelectedFilesList from './selected-files-list';

type SelectedFile = {
  id: string;
  file: File;
  preview: string;
};

type UploadPhotosDialogProps = {
  collectionId: string;
  photographerId: string;
  children: React.ReactNode;
};

const UploadPhotosDialog = (props: UploadPhotosDialogProps) => {
  const { children } = props;

  const t = useTranslations('portfolio.collectionDetails.uploadDialog');

  const [isOpen, setIsOpen] = useState(false);

  const [dragActive, setDragActive] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<SelectedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const { uploadPhotos } = usePhotosUploadQueue();

  const handleFiles = useCallback((files: FileList) => {
    const newFiles: SelectedFile[] = [];

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const id = crypto.randomUUID();
        const preview = URL.createObjectURL(file);
        newFiles.push({ id, file, preview });
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

  const handleContinue = async () => {
    setIsUploading(true);

    try {
      await uploadPhotos(uploadFiles.map((uploadFile) => uploadFile.file));

      uploadFiles.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });

      setUploadFiles([]);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      uploadFiles.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });

      setUploadFiles([]);
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{React.Children.only(children)}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="pb-4">
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <div className="pb-4">
          <div
            className={`border-2 border-dashed border-muted-foreground/10 hover:border-primary rounded-md p-8 text-center transition-all ${
              dragActive
                ? 'border-primary bg-primary/25'
                : 'hover:border-gray-300 bg-muted/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-muted-foreground/10 rounded-lg flex items-center justify-center">
              <ImageIcon className="h-8 w-8 opacity-40" />
            </div>
            <div className="mb-4 text-md">
              <span>{t('uploadZone.dragText')} </span>
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
            <p className="text-xs text-muted-foreground">
              {t('uploadZone.fileTypes', {
                maxSizeMb: clientEnv.NEXT_PUBLIC_MAX_PORTFOLIO_PHOTO_SIZE_MB,
              })}
            </p>
          </div>
        </div>
        {uploadFiles.length > 0 && (
          <SelectedFilesList
            files={uploadFiles}
            onRemove={removeFile}
            isUploading={isUploading}
          />
        )}
        {uploadFiles.length > 0 && (
          <DialogFooter className="pt-4">
            <Button
              size="lg"
              className="w-full"
              onClick={handleContinue}
              disabled={uploadFiles.length === 0}
            >
              {t('continue', { count: uploadFiles.length })}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UploadPhotosDialog;
