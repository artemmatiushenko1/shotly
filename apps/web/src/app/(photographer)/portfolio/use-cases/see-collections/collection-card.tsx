import { IconWithText } from '@/components/icon-with-text';
import { Button } from '@shotly/ui/components/button';
import { Card, CardContent } from '@shotly/ui/components/card';
import { CalendarIcon, EllipsisVertical, ImagesIcon } from 'lucide-react';
import Image from 'next/image';
import { VisibilityBadge } from '../../../ui/visibility-badge';
import { ImagePlaceholder } from '@/app/(photographer)/portfolio/use-cases/see-collections/image-placeholder';

type CollectionCardProps = {
  isPublic?: boolean;
  title: string;
  description: string;
  imagesCount: number;
  createdAt: string;
  coverSrc: string;
};

function CollectionCard(props: CollectionCardProps) {
  const {
    isPublic = false,
    title,
    description,
    imagesCount,
    createdAt,
    coverSrc,
  } = props;

  return (
    <Card className="bg-muted/20 rounded-xl shadow-none overflow-hidden p-0 gap-0 cursor-pointer hover:bg-accent/50">
      <div className="relative">
        <div className="p-2">
          {coverSrc ? (
            <Image
              width={200}
              height={300}
              src={coverSrc}
              alt={title}
              className="object-cover w-full h-48 rounded-md"
            />
          ) : (
            <ImagePlaceholder className="w-full h-48 rounded-md" alt={title} />
          )}
        </div>
        <VisibilityBadge
          isPublic={isPublic}
          className="absolute top-4 left-4"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full w-10 h-10 p-0 text-background size-8"
          >
            <EllipsisVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <CardContent className="p-3">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
          </div>
          <div className="flex justify-between gap-6 text-xs text-gray-600">
            <IconWithText icon={ImagesIcon} text={`${imagesCount} images`} />
            <IconWithText icon={CalendarIcon} text={createdAt} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CollectionCard;
