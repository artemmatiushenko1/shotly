import { Button } from '@shotly/ui/components/button';
import { ConfirmationDialog } from '@shotly/ui/components/confirmation-dialog';
import { ArchiveIcon, ArchiveRestoreIcon, EditIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { startTransition, useActionState, useEffect } from 'react';
import { archiveServiceAction, restoreServiceAction } from './actions';
import { toast } from '@shotly/ui/components/sonner';

type ServiceCardActionsProps = {
  serviceId: string;
  serviceName: string;
  archivedAt: Date | null;
  onEdit: () => void;
};

function ServiceCardActions(props: ServiceCardActionsProps) {
  const { serviceName, archivedAt, serviceId, onEdit } = props;

  const t = useTranslations('services.serviceCard');

  const [archiveState, archiveService, isArchivePending] = useActionState(
    archiveServiceAction,
    {
      error: false,
      success: false,
    },
  );

  const [restoreState, restoreService, isRestorePending] = useActionState(
    restoreServiceAction,
    {
      error: false,
      success: false,
    },
  );

  // TODO: use callbacks for toasts
  // https://www.robinwieruch.de/react-server-actions-toast-useactionstate/
  // This doesn't work because component gets unmounted
  useEffect(() => {
    if (archiveState.success) {
      toast.success(t('success.archiveSuccess'));
    }

    if (archiveState.error) {
      toast.error(t('errors.archiveFailed'));
    }
  }, [archiveState.success, archiveState.error, t]);

  useEffect(() => {
    if (restoreState.success) {
      toast.success(t('success.restoreSuccess'));
    }

    if (restoreState.error) {
      toast.error(t('errors.restoreFailed'));
    }
  }, [restoreState.success, restoreState.error, t]);

  const handleArchiveConfirm = () => {
    startTransition(() => archiveService(serviceId));
  };

  const handleRestoreConfirm = () => {
    startTransition(() => restoreService(serviceId));
  };

  return (
    <div className="inline-flex flex-col items-end gap-2 p-3">
      {archivedAt === null && (
        <Button variant="outline" className="self-center" onClick={onEdit}>
          <EditIcon /> {t('actions.edit')}
        </Button>
      )}
      <ConfirmationDialog
        actionSeverity="neutral"
        title={t('archiveDialog.title', { name: serviceName })}
        description={t('archiveDialog.description')}
        onConfirm={handleArchiveConfirm}
        icon={<ArchiveIcon />}
        confirmLabel={t('archiveDialog.confirmLabel')}
      >
        {archivedAt === null && (
          <Button
            variant="ghost"
            className="self-center"
            loading={isArchivePending}
          >
            <ArchiveIcon /> {t('actions.archive')}
          </Button>
        )}
      </ConfirmationDialog>
      {archivedAt !== null && (
        <Button
          variant="ghost"
          loading={isRestorePending}
          onClick={handleRestoreConfirm}
        >
          <ArchiveRestoreIcon /> {t('actions.restore')}
        </Button>
      )}
    </div>
  );
}

export default ServiceCardActions;
