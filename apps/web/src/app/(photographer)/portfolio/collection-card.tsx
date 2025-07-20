import { Badge } from '@shotly/ui/components/badge';
import { Button } from '@shotly/ui/components/button';
import { Card, CardContent } from '@shotly/ui/components/card';
import { cn } from '@shotly/ui/lib/utils';
import { Calendar, EllipsisVertical, Globe, Images, Lock } from 'lucide-react';
import Image from 'next/image';

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
    <Card className="bg-white rounded-xl shadow-none overflow-hidden p-0 gap-0 cursor-pointer hover:bg-accent/50">
      <div className="relative">
        <div className="p-2">
          <Image
            width={200}
            height={300}
            src={coverSrc}
            alt="Modern loft interior"
            className="object-cover w-full h-48 rounded-md"
          />
        </div>
        <Badge className="absolute text-xs top-4 left-4 bg-white text-gray-700 rounded-full px-3 py-1 border">
          <span
            className={cn(
              'size-1 rounded-full',
              isPublic ? 'bg-green-400' : 'bg-destructive',
            )}
          >
            &nbsp;
          </span>
          {isPublic ? (
            <>
              <Globe /> Public
            </>
          ) : (
            <>
              <Lock /> Private
            </>
          )}
        </Badge>
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
            <div className="flex items-center gap-1">
              <Images className="w-4 h-4" />
              <span>{imagesCount} images</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{createdAt}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CollectionCard;
