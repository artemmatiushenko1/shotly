import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@shotly/ui/components/avatar';
import { Button } from '@shotly/ui/components/button';
import { Badge } from '@shotly/ui/components/badge';
import { Card, CardContent } from '@shotly/ui/components/card';
import {
  MapPinIcon,
  StarIcon,
  BookmarkIcon,
  BadgeCheckIcon,
} from 'lucide-react';
import { cn } from '@shotly/ui/lib/utils';
import ImagePlaceholder from '@/components/image-placeholder';

type PhotographerCardProps = {
  id: string;
  name: string;
  image?: string | null;
  location?: string;
  rating?: number | string;
  yearsOfExperience?: number | null;
  startingPrice?: number;
  currency?: string;
  categoryName?: string;
  portfolioImages?: string[];
  className?: string;
};

function PhotographerCard({
  id,
  name,
  image,
  location,
  rating,
  yearsOfExperience,
  startingPrice,
  currency = 'грн',
  categoryName,
  portfolioImages = [],
  className,
}: PhotographerCardProps) {
  // Format name as "FirstName L." (first name + last initial)
  const nameParts = name.split(' ').filter(Boolean);
  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  const displayName =
    nameParts.length > 1 && firstName && lastName && lastName[0]
      ? `${firstName} ${lastName[0]}.`
      : firstName || name;

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Get first two portfolio images, or use placeholders
  const image1 = portfolioImages[0];
  const image2 = portfolioImages[1];

  // Format experience
  const experienceText =
    yearsOfExperience && yearsOfExperience > 0
      ? `${yearsOfExperience}+ Years`
      : null;

  // Format price
  const priceText = startingPrice
    ? `${currency} ${startingPrice.toLocaleString()}`
    : null;

  return (
    <Card
      className={cn(
        'overflow-hidden shadow-sm hover:shadow-md transition-shadow py-0',
        className,
      )}
    >
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-start justify-between p-4 pb-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Avatar className="size-12 rounded-full shrink-0">
              <AvatarImage src={image || undefined} alt={name} />
              <AvatarFallback className="text-sm font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg leading-tight truncate">
                {displayName}
              </h3>
              {location && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                  <MapPinIcon className="size-3.5 shrink-0" />
                  <span className="truncate">{location}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-2">
            <Button variant="ghost" size="icon" className="size-9 rounded-md">
              <BookmarkIcon className="size-4" />
            </Button>
            <Button asChild variant="default" className="rounded-full">
              <Link href={`/photographers/${id}`}>View Profile</Link>
            </Button>
          </div>
        </div>

        {/* Portfolio Images */}
        <div className="px-4 pb-3">
          <div className="grid grid-cols-2 gap-2">
            {image1 ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={image1}
                  alt={`${name} portfolio`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ) : (
              <ImagePlaceholder className="aspect-[4/3]" />
            )}
            {image2 ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={image2}
                  alt={`${name} portfolio`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ) : (
              <ImagePlaceholder className="aspect-[4/3]" />
            )}
          </div>
        </div>

        {/* Category Tag */}
        {categoryName && (
          <div className="px-4 pb-3">
            <Badge
              variant="outline"
              className="bg-muted/50 text-muted-foreground border-0 font-normal"
            >
              {categoryName}
            </Badge>
          </div>
        )}

        {/* Footer Stats */}
        <div className="px-4 pb-4 pt-2 border-t">
          <div className="grid grid-cols-3 gap-4">
            {/* Rating */}
            <div className="flex flex-col">
              {rating !== undefined && rating !== null ? (
                <>
                  <div className="flex items-center gap-1">
                    <StarIcon className="size-4 text-yellow-500 fill-yellow-500 shrink-0" />
                    <span className="font-bold text-sm">
                      {typeof rating === 'number' ? rating.toFixed(1) : rating}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      (12 reviews)
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    Rating
                  </span>
                </>
              ) : (
                <span className="text-xs text-muted-foreground">—</span>
              )}
            </div>

            {/* Experience */}
            <div className="flex flex-col">
              {experienceText ? (
                <>
                  <div className="flex items-center gap-1">
                    <BadgeCheckIcon className="size-4 shrink-0" />
                    <span className="font-bold text-sm">{experienceText}</span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    Experience
                  </span>
                </>
              ) : (
                <span className="text-xs text-muted-foreground">—</span>
              )}
            </div>

            {/* Pricing */}
            <div className="flex flex-col">
              {priceText ? (
                <>
                  <span className="font-bold text-sm">
                    {priceText}{' '}
                    <span className="text-xs text-muted-foreground font-normal">
                      / shoot
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    Starting at
                  </span>
                </>
              ) : (
                <span className="text-xs text-muted-foreground">—</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PhotographerCard;
