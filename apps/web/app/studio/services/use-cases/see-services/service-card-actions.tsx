import { Button } from '@shotly/ui/components/button';
import { ConfirmationDialog } from '@shotly/ui/components/confirmation-dialog';
import { ArchiveIcon, ArchiveRestoreIcon, EditIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { startTransition, useActionState, useEffect } from 'react';
import { archiveServiceAction, restoreServiceAction } from './actions';
import { toast } from '@shotly/ui/components/sonner';
import CreateServiceDialog from '../create-service/create-service-dialog';
import { Category } from '@/domain/category';
import { Service } from '@/domain/service';

type ServiceCardActionsProps = {
  categories: Category[];
  service: Service;
};

function ServiceCardActions(props: ServiceCardActionsProps) {
  const { service, categories } = props;

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
    startTransition(() => archiveService(service.id));
  };

  const handleRestoreConfirm = () => {
    startTransition(() => restoreService(service.id));
  };

  return (
    <div className="inline-flex flex-col items-end gap-2 p-3">
      {service.archivedAt === null && (
        <CreateServiceDialog categories={categories} service={service}>
          <Button variant="outline">
            <EditIcon /> {t('actions.edit')}
          </Button>
        </CreateServiceDialog>
      )}
      <ConfirmationDialog
        actionSeverity="neutral"
        title={t('archiveDialog.title', { name: service.name })}
        description={t('archiveDialog.description')}
        onConfirm={handleArchiveConfirm}
        icon={<ArchiveIcon />}
        confirmLabel={t('archiveDialog.confirmLabel')}
      >
        {service.archivedAt === null && (
          <Button variant="ghost" loading={isArchivePending}>
            <ArchiveIcon /> {t('actions.archive')}
          </Button>
        )}
      </ConfirmationDialog>
      {service.archivedAt !== null && (
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
