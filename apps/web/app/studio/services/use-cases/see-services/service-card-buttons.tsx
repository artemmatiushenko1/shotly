import { ArchiveIcon, ArchiveRestoreIcon, EditIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';

import { Category } from '@/entities/models/category';
import { Service } from '@/entities/models/service';

import { Button } from '@shotly/ui/components/button';
import { ConfirmationDialog } from '@shotly/ui/components/confirmation-dialog';
import { toast } from '@shotly/ui/components/sonner';

import UpdateServiceDialog from '../update-service/update-service-dialog';
import { archiveServiceAction, restoreServiceAction } from './actions';

type ServiceCardActionsProps = {
  categories: Category[];
  service: Service;
};

function ServiceCardActions(props: ServiceCardActionsProps) {
  const { service, categories } = props;

  const [isPending, startTransition] = useTransition();

  const t = useTranslations('services.serviceCard');

  const handleArchive = () => {
    startTransition(async () => {
      const result = await archiveServiceAction(service.id);
      if (result.success) {
        toast.success(t('success.archive', { name: service.name }));
      } else {
        toast.error(t('error.archive', { name: service.name }));
      }
    });
  };

  const handleRestore = () => {
    startTransition(async () => {
      const result = await restoreServiceAction(service.id);
      if (result.success) {
        toast.success(t('success.restore', { name: service.name }));
      } else {
        toast.error(t('error.restore', { name: service.name }));
      }
    });
  };

  return (
    <div className="inline-flex flex-col items-end gap-2 p-3">
      {service.archivedAt === null && (
        <UpdateServiceDialog categories={categories} service={service}>
          <Button variant="outline">
            <EditIcon /> {t('actions.edit')}
          </Button>
        </UpdateServiceDialog>
      )}
      <ConfirmationDialog
        actionSeverity="neutral"
        title={t('archiveDialog.title', { name: service.name })}
        description={t('archiveDialog.description')}
        cancelLabel={t('archiveDialog.cancelLabel')}
        onConfirm={handleArchive}
        icon={<ArchiveIcon />}
        confirmLabel={t('archiveDialog.confirmLabel')}
      >
        {service.archivedAt === null && (
          <Button variant="ghost" loading={isPending}>
            <ArchiveIcon /> {t('actions.archive')}
          </Button>
        )}
      </ConfirmationDialog>
      {service.archivedAt !== null && (
        <Button variant="ghost" loading={isPending} onClick={handleRestore}>
          <ArchiveRestoreIcon /> {t('actions.restore')}
        </Button>
      )}
    </div>
  );
}

export default ServiceCardActions;
