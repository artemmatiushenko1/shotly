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
  ImageIcon,
  TrashIcon,
} from 'lucide-react';
import { useState } from 'react';
import { setCollectionCoverImage } from './actions';
import { Spinner } from '@shotly/ui/components/spinner';

type PhotoContextMenuProps = {
  collectionId: string;
  photoUrl: string;
};

function PhotoContextMenu({ collectionId, photoUrl }: PhotoContextMenuProps) {
  const [isTriggerVisible, setIsTriggerVisible] = useState(false);
  const [isSettingAsCoverImage, setIsSettingAsCoverImage] = useState(false);

  const handleSetAsCoverImage = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsSettingAsCoverImage(true);
      await setCollectionCoverImage(collectionId, photoUrl);
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
        <DropdownMenuItem onClick={handleSetAsCoverImage}>
          <ImageIcon />
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
