import { Button } from '@shotly/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@shotly/ui/components/dropdown-menu';
import { cn } from '@shotly/ui/lib/utils';
import {
  DownloadIcon,
  EllipsisVerticalIcon,
  StarIcon,
  TrashIcon,
} from 'lucide-react';
import { useState } from 'react';
import { setCollectionCoverImage } from './actions';
import { Spinner } from '@shotly/ui/components/spinner';

type PhotoContextMenuProps = {
  isCoverPhoto: boolean;
  collectionId: string;
  photoId: string;
};

function PhotoContextMenu(props: PhotoContextMenuProps) {
  const { collectionId, photoId, isCoverPhoto } = props;

  const [isTriggerVisible, setIsTriggerVisible] = useState(false);
  const [isSettingAsCoverImage, setIsSettingAsCoverImage] = useState(false);

  const handleSetAsCoverImage = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsSettingAsCoverImage(true);
      await setCollectionCoverImage(collectionId, photoId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSettingAsCoverImage(false);
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
          Set as cover image
          {isSettingAsCoverImage && (
            <DropdownMenuShortcut>
              <Spinner size="sm" />
            </DropdownMenuShortcut>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DownloadIcon /> Download
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <TrashIcon /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PhotoContextMenu;
