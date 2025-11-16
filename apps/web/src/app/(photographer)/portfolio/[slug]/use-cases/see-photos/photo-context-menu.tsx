import { Button } from '@shotly/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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

function PhotoContextMenu() {
  const [isTriggerVisible, setIsTriggerVisible] = useState(false);

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
        <DropdownMenuItem>
          <ImageIcon />
          Set as cover image
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
