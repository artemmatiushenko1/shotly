import { IconWithText } from '@/components/icon-with-text';
import { CalendarIcon, ImagesIcon, MapPinIcon, TagIcon } from 'lucide-react';
import { VisibilityBadge } from '../../visibility-badge';

type CollectionMetadataProps = {
  isPublic: boolean;
};

const CollectionMetadata = ({ isPublic }: CollectionMetadataProps) => {
  return (
    <div className="flex justify-between items-start px-3">
      <div>
        <h3 className=" font-bold text-2xl mb-1">Summer Travel 2023</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Photos from our European journey through Italy and France
        </p>
        <div className="flex space-x-4 text-muted-foreground mb-3">
          <IconWithText icon={ImagesIcon} text="10 assets" />
          <IconWithText icon={MapPinIcon} text="Kyiv, Ukraine" />
          <IconWithText icon={CalendarIcon} text="Aug 15, 2023" />
          <IconWithText icon={TagIcon} text="Landspace" />
        </div>
      </div>
      <VisibilityBadge isPublic={isPublic} />
    </div>
  );
};

export { CollectionMetadata };
