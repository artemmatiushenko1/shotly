'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shotly/ui/components/dialog';
import { Button } from '@shotly/ui/components/button';
import {
  AlertCircleIcon,
  CheckCircleIcon,
  InfoIcon,
  Trash2Icon,
} from 'lucide-react';

import { cva } from 'class-variance-authority';
import { cn } from '@shotly/ui/lib/utils';

type ActionSeverity = 'neutral' | 'danger' | 'caution' | 'success' | 'info';

const iconVariants = cva(
  'size-12 rounded-full flex items-center justify-center',
  {
    variants: {
      severity: {
        neutral: 'bg-gray-500/10 text-gray-500',
        danger: 'bg-destructive/10 text-destructive',
        caution: 'bg-yellow-500/10 text-yellow-500',
        success: 'bg-green-500/10 text-green-500',
        info: 'bg-primary/10 text-primary',
      },
    },
    defaultVariants: {
      severity: 'info',
    },
  },
);

const confirmButtonVariants = cva('', {
  variants: {
    severity: {
      neutral: 'bg-gray-500 hover:bg-gray-500/90',
      danger: 'bg-destructive hover:bg-destructive/90',
      caution: 'bg-yellow-500 hover:bg-yellow-500/90',
      success: 'bg-green-500 hover:bg-green-500/90',
      info: 'bg-primary hover:bg-primary/90',
    },
  },
  defaultVariants: {
    severity: 'info',
  },
});

type ConfirmationDialogProps = {
  children: React.ReactNode;
  onConfirm: () => void | Promise<void>;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  icon?: React.ReactNode;
  actionSeverity?: ActionSeverity;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ConfirmationDialog({
  children,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  icon,
  actionSeverity = 'info',
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: ConfirmationDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Use controlled state if provided, otherwise use internal state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (controlledOnOpenChange) {
      controlledOnOpenChange(newOpen);
    } else {
      setInternalOpen(newOpen);
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      handleOpenChange(false);
    } catch (error) {
      console.error('Confirmation action failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const severityIcon = {
    neutral: <InfoIcon className="size-6 text-gray-500" />,
    danger: <Trash2Icon className="size-6 text-destructive" />,
    caution: <AlertCircleIcon className="size-6 text-caution" />,
    success: <CheckCircleIcon className="size-6 text-success" />,
    info: <InfoIcon className="size-6 text-info" />,
  };

  const iconNode = icon || severityIcon[actionSeverity];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
        <DialogHeader className="text-left space-y-0 mb-2">
          <div className="flex items-start gap-4 flex-col">
            <div className={iconVariants({ severity: actionSeverity })}>
              {iconNode}
            </div>
            <div className="flex-1 space-y-2 pt-0.5">
              <DialogTitle className="text-left font-semibold">
                {title}
              </DialogTitle>
              <DialogDescription className="text-left text-muted-foreground">
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading} className="flex-1/2">
              {cancelLabel}
            </Button>
          </DialogClose>
          <Button
            variant="default"
            onClick={handleConfirm}
            disabled={isLoading}
            loading={isLoading}
            className={cn(
              'flex-1/2',
              confirmButtonVariants({ severity: actionSeverity }),
            )}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
