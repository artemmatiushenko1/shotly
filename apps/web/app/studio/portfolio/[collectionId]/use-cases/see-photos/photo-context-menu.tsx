'use client';

import {
  DownloadIcon,
  EllipsisVerticalIcon,
  StarIcon,
  TrashIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@shotly/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@shotly/ui/components/dropdown-menu';
import { toast } from '@shotly/ui/components/sonner';
import { Spinner } from '@shotly/ui/components/spinner';
import { cn } from '@shotly/ui/lib/utils';

import { deletePhotoAction, setPhotoAsCollectionCoverAction } from './actions';

type PhotoContextMenuProps = {
  isCoverPhoto: boolean;
  collectionId: string;
  photoId: string;
};

function PhotoContextMenu(props: PhotoContextMenuProps) {
  const { collectionId, photoId, isCoverPhoto } = props;
  const t = useTranslations('portfolio.collectionDetails.photoContextMenu');

  const [isTriggerVisible, setIsTriggerVisible] = useState(false);
  const [isSettingAsCoverImage, setIsSettingAsCoverImage] = useState(false);
  const [isDeletingPhoto, setIsDeletingPhoto] = useState(false);

  const handleSetAsCoverImage = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsSettingAsCoverImage(true);
      await setPhotoAsCollectionCoverAction(collectionId, photoId);
      toast.success('Photo set as cover image successfully');
    } catch (_) {
      toast.error('Failed to set photo as cover image');
    } finally {
      setIsSettingAsCoverImage(false);
    }
  };

  const handleDeletePhoto = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsDeletingPhoto(true);
      await deletePhotoAction(photoId, collectionId);
      toast.success('Photo deleted successfully');
    } catch (_) {
      toast.error('Failed to delete photo');
    } finally {
      setIsDeletingPhoto(false);
    }
  };

  return (
    <DropdownMenu onOpenChange={setIsTriggerVisible}>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="secondary"
          className={cn(
            'size-8 rounded-full opacity-0 group-hover:opacity-100',
            isTriggerVisible && 'opacity-100',
          )}
        >
          <EllipsisVerticalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="center">
        <DropdownMenuItem
          onClick={handleSetAsCoverImage}
          disabled={isCoverPhoto}
        >
          <StarIcon />
          {t('setAsCoverImage')}
          {isSettingAsCoverImage && (
            <DropdownMenuShortcut>
              <Spinner size="sm" />
            </DropdownMenuShortcut>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DownloadIcon /> {t('download')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={handleDeletePhoto}
          disabled={isDeletingPhoto}
        >
          <TrashIcon /> {t('delete')}
          {isDeletingPhoto && (
            <DropdownMenuShortcut>
              <Spinner size="sm" />
            </DropdownMenuShortcut>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PhotoContextMenu;
