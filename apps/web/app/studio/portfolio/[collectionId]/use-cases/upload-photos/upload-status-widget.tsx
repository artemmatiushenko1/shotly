'use client';

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CloudUploadIcon,
  ImageIcon,
  XIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import GradientLoadingProgress from '@/_components/gradient-progress';

import { Button } from '@shotly/ui/components/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@shotly/ui/components/collapsible';
import { Spinner } from '@shotly/ui/components/spinner';
import { cn } from '@shotly/ui/lib/utils';

import { usePhotosUploadQueue } from '../../photos-upload-queue.context';
import { formatBytes } from '../../utils';

function UploadStatusWidget() {
  const { isLoading, uploads, timeLeft } = usePhotosUploadQueue();

  const tCommon = useTranslations();
  const t = useTranslations('portfolio.collectionDetails.uploadStatus');

  const [isOpen, setIsOpen] = useState(false);

  if (!uploads.length) {
    return null;
  }

  const completedUploads = uploads.filter(
    (upload) => upload.status === 'completed',
  ).length;

  const failedUploads = uploads.filter(
    (upload) => upload.status === 'failed',
  ).length;

  const completedOrFailedUploadsCount = completedUploads + failedUploads;

  const currentUploadFileNumber =
    completedOrFailedUploadsCount === uploads.length
      ? completedOrFailedUploadsCount
      : completedOrFailedUploadsCount + 1;

  function formatSecondsLeft(
    seconds: number,
    t: ReturnType<typeof useTranslations>,
  ): string {
    if (!seconds || !isFinite(seconds)) return '';

    if (seconds < 60) {
      return t('seconds', { count: Math.round(seconds) });
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return t('minutesAndSeconds', { minutes, seconds: remainingSeconds });
  }

  const getHeaderTitle = () => {
    if (isLoading) {
      return t('uploading', {
        current: currentUploadFileNumber,
        total: uploads.length,
      });
    }

    if (completedUploads === uploads.length) {
      return t('uploadComplete');
    }

    if (failedUploads === uploads.length) {
      return t('uploadFailed');
    }

    if (failedUploads > 0) {
      return t('uploadFinished', { failed: failedUploads });
    }
  };

  const getHeaderSubtitle = () => {
    if (isLoading) {
      return timeLeft
        ? t('timeLeft', { time: formatSecondsLeft(timeLeft, t) })
        : t('calculatingTime');
    }

    if (completedUploads === uploads.length) {
      return t('allUploaded');
    }

    if (failedUploads === uploads.length) {
      return t('couldNotUpload', { count: failedUploads });
    }

    if (failedUploads > 0) {
      return t('uploadSummary', {
        completed: completedUploads,
        failed: failedUploads,
      });
    }
  };

  const getIcon = () => {
    if (failedUploads > 0) {
      return <XIcon className="size-6" />;
    }

    if (completedUploads === uploads.length) {
      return <CheckIcon className="size-6" />;
    }

    return <CloudUploadIcon className="size-6" />;
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="shadow-lg rounded-lg"
    >
      <div
        className={cn(
          'flex items-center gap-3 bg-primary text-accent rounded-t-lg p-3 pt-4 w-md relative overflow-hidden',
          !isOpen && 'rounded-lg',
        )}
      >
        <div className="bg-accent/10 rounded-full p-2">{getIcon()}</div>
        <div>
          <h2 className="text-sm font-medium">{getHeaderTitle()}</h2>
          <div className="text-xs text-muted-foreground h-3">
            {getHeaderSubtitle()}
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon">
              {isOpen ? (
                <ChevronUpIcon className="size-4" />
              ) : (
                <ChevronDownIcon className="size-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <Button variant="ghost" size="icon">
            <XIcon className="size-4" />
          </Button>
        </div>
        {isLoading && (
          <GradientLoadingProgress className="absolute top-0 left-0 w-full" />
        )}
      </div>
      <CollapsibleContent
        className={cn(
          'p-3 px-4 pr-5 space-y-4 bg-background dark:bg-sidebar rounded-b-lg transition-all border',
        )}
        style={{
          width: 'var(--radix-collapsible-content-width)',
          maxHeight: '300px',
          overflowY: 'auto',
        }}
      >
        {uploads.map((upload) => {
          return (
            <div key={upload.uploadId} className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-full p-2">
                <ImageIcon className="size-4" />
              </div>
              <div className="overflow-hidden">
                <h3 className="text-sm font-medium mb-1 truncate max-w-[280px]">
                  {upload.file.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  <span className="mr-2">
                    {formatBytes(upload.file.size, tCommon)}
                  </span>
                  {upload.status === 'processing' && (
                    <span>{t('processing')}</span>
                  )}
                  {upload.status === 'uploading' && (
                    <span>{t('completed', { progress: upload.progress })}</span>
                  )}
                  {upload.status === 'failed' && upload.errorMessage && (
                    <span className="text-destructive">
                      {upload.errorMessage}
                    </span>
                  )}
                </p>
              </div>
              <div className="ml-auto">
                {upload.status === 'uploading' ||
                upload.status === 'idle' ||
                upload.status === 'processing' ? (
                  <Spinner size="sm" className="text-primary" />
                ) : upload.status === 'completed' ? (
                  <div className="bg-green-500 rounded-full p-0.5">
                    <CheckIcon className="size-3 text-accent" />
                  </div>
                ) : (
                  <div className="bg-destructive rounded-full p-0.5">
                    <XIcon className="size-3 text-accent" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default UploadStatusWidget;
