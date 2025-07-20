import MainHeader from '@/components/main-header';
import { Badge } from '@shotly/ui/components/badge';
import { Button, buttonVariants } from '@shotly/ui/components/button';
import { Separator } from '@shotly/ui/components/separator';
import { cn } from '@shotly/ui/lib/utils';
import { ChevronLeft, Globe, ImagesIcon, Lock, UploadIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

async function CollectionDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const isPublic = false;

  return (
    <div className="h-full flex flex-col">
      <MainHeader>
        <Link
          href="/portfolio"
          className={cn(
            buttonVariants({ size: 'icon', variant: 'ghost' }),
            'size-7 mr-3',
          )}
        >
          <ChevronLeft />
        </Link>
        <div>
          <h2 className="font-medium">Karra Loft</h2>
          <div className="text-xs space-x-2 text-muted-foreground">
            Jun 19th 2023
          </div>
        </div>
        <div className="space-x-3 ml-auto flex items-center">
          <Badge
            variant="outline"
            className="text-sm rounded-full px-3 py-1 border"
          >
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
          <Button variant="outline">Edit</Button>
          <Button>
            <UploadIcon /> Upload photos
          </Button>
        </div>
      </MainHeader>
      <div className="p-3 space-y-6">
        <div className="w-full h-60 relative">
          <Image
            className="w-full h-full object-cover rounded-md mt-2 border"
            src="/auth-banner-2.jpg"
            width={400}
            height={200}
            alt="Cover image of the collection"
          />
          <div className="absolute bottom-5 left-5">
            <h3 className=" font-bold text-xl text-background">Karra Loft</h3>
            <p className="text-sm text-background">Canada, Vancouver</p>
            <div className="flex">
              <p className="flex space-x-2 text-xs text-background mt-2">
                <ImagesIcon className="size-4" /> <span>{10} assets</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex space-x-4 px-5">
          <div className="items-center space-x-2">
            <p className="flex items-center space-x-2 text-muted-foreground text-xs">
              Location
            </p>
            <p className="text-sm">Kyiv, Ukraine</p>
          </div>
          <div className="items-center space-x-2 px-5">
            <p className="flex items-center space-x-2 text-muted-foreground text-xs">
              Category
            </p>
            <p className="text-sm">Landspace</p>
          </div>
          <div className="ml-auto items-center space-x-2 px-5">
            <p className="flex items-center space-x-2 text-muted-foreground text-xs">
              Views
            </p>
            <p className="text-sm">1,109</p>
          </div>
        </div>
        <Separator />
      </div>
    </div>
  );
}

export default CollectionDetails;
