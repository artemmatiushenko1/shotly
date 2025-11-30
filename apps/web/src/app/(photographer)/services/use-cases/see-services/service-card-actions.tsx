import { Button } from '@shotly/ui/components/button';
import { ConfirmationDialog } from '@shotly/ui/components/confirmation-dialog';
import { ArchiveIcon, ArchiveRestoreIcon, EditIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { startTransition, useActionState } from 'react';
import { archiveService } from './actions';
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

  // TODO: check if is better to move it to parent, this component will be destroyed on archive
  const [state, archiveServiceAction] = useActionState(archiveService, {
    error: false,
    success: false,
  });

  // TODO: display toast notifications for archive service action
  if (state.error) {
    toast.error(t('errors.archiveFailed'));
  }

  return (
    <div className="flex flex-col gap-2 p-3">
      {archivedAt === null && (
        <Button variant="outline" onClick={onEdit}>
          <EditIcon /> {t('actions.edit')}
        </Button>
      )}
      <ConfirmationDialog
        actionSeverity="neutral"
        title={t('archiveDialog.title', { name: serviceName })}
        description={t('archiveDialog.description')}
        // TODO: display loading state correctly
        onConfirm={() => startTransition(() => archiveServiceAction(serviceId))}
        icon={<ArchiveIcon />}
        confirmLabel={t('archiveDialog.confirmLabel')}
      >
        <div>
          {archivedAt === null && (
            <Button variant="ghost">
              <ArchiveIcon /> {t('actions.archive')}
            </Button>
          )}
          {/* TODO: implement restore service action */}
          {archivedAt !== null && (
            <Button variant="ghost">
              <ArchiveRestoreIcon /> {t('actions.restore')}
            </Button>
          )}
        </div>
      </ConfirmationDialog>
    </div>
  );
}

export default ServiceCardActions;
