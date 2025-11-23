import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@shotly/ui/components/avatar';
import { ArrowUpRightIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function PhotorgapherInfo() {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1">Photographer</p>
      <Link
        href="/photographers/1234567890"
        target="_blank"
        className="flex items-center gap-2"
      >
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>
            <UserIcon className="size-4" />
          </AvatarFallback>
        </Avatar>
        <p className="text-sm font-bold">John Doe</p>
        <ArrowUpRightIcon className="size-4 text-muted-foreground" />
      </Link>
    </div>
  );
}

export default PhotorgapherInfo;
