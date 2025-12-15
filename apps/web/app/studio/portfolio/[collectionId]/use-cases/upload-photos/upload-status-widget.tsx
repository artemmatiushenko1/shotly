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
import { Skeleton } from '@shotly/ui/components/skeleton';
import { Spinner } from '@shotly/ui/components/spinner';
import { cn } from '@shotly/ui/lib/utils';

import { usePhotosUpload } from '../../photos-upload.context';
import { formatBytes } from '../../utils';

function UploadStatusWidget() {
  const { isBatchLoading, uploads, timeLeft } = usePhotosUpload();

  const t = useTranslations();

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

  const currentUploadFileNumber =
    completedUploads === uploads.length
      ? completedUploads
      : completedUploads + 1;

  function formatSecondsLeft(seconds: number): string {
    if (!seconds || !isFinite(seconds)) return '';

    if (seconds < 60) {
      return `${Math.round(seconds)}s`;
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  }

  const getHeaderTitle = () => {
    if (isBatchLoading) {
      return `Uploading ${currentUploadFileNumber} of ${uploads.length} photos`;
    }

    if (completedUploads === uploads.length) {
      return 'Upload Complete';
    }

    if (failedUploads === uploads.length) {
      return 'Upload Failed';
    }

    if (failedUploads > 0) {
      return `Upload Finished: ${failedUploads} Failed`;
    }
  };

  const getHeaderSubtitle = () => {
    if (isBatchLoading) {
      return timeLeft
        ? `${formatSecondsLeft(timeLeft)} left`
        : 'Calculating remaining time...';
    }

    if (completedUploads === uploads.length) {
      return 'All photos uploaded successfully';
    }

    if (failedUploads === uploads.length) {
      return `Could not upload ${failedUploads} photos`;
    }

    if (failedUploads > 0) {
      return `${completedUploads} successful, ${failedUploads} failed`;
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
      className="shadow-lg rounded-lg"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div
        className={cn(
          'flex items-center gap-3 bg-primary text-accent rounded-t-lg p-3 pt-4 w-sm relative overflow-hidden',
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
        {isBatchLoading && (
          <GradientLoadingProgress className="absolute top-0 left-0 w-full" />
        )}
      </div>
      <CollapsibleContent
        className={cn(
          'p-3 px-4 pr-5 space-y-4 bg-background dark:bg-sidebar rounded-b-lg transition-all border',
        )}
      >
        {uploads.map((upload) => {
          return (
            <div key={upload.uploadId} className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-full p-2">
                <ImageIcon className="size-4" />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">{upload.file.name}</h3>
                <p className="text-xs text-muted-foreground">
                  <span className="mr-2">
                    {formatBytes(upload.file.size, t)}
                  </span>
                  <span>{upload.progress}% completed</span>
                </p>
              </div>
              <div className="ml-auto">
                {upload.status === 'uploading' || upload.status === 'idle' ? (
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
