'use client';

import {
  BadgeCheckIcon,
  BookmarkIcon,
  MapPinIcon,
  StarIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@shotly/ui/components/avatar';
import { Badge } from '@shotly/ui/components/badge';
import { Button } from '@shotly/ui/components/button';
import { Card, CardContent } from '@shotly/ui/components/card';
import { cn } from '@shotly/ui/lib/utils';

import ImagePlaceholder from '../../_components/image-placeholder';

type PhotographerCardProps = {
  id: string;
  name: string;
  location?: string;
  rating?: number | string;
  yearsOfExperience?: number | null;
  startingPrice?: number;
  currency?: string;
  categoryName?: string;
  portfolioImages?: string[];
  className?: string;
  profileImageUrl?: string | null;
  totalReviews: number;
};

function PhotographerCard({
  id,
  name,
  location,
  rating,
  yearsOfExperience,
  startingPrice,
  currency = 'грн',
  categoryName,
  portfolioImages = [],
  className,
  profileImageUrl,
  totalReviews,
}: PhotographerCardProps) {
  const t = useTranslations('landing.searchPage.photographerCard');

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
      ? t('experience', { years: yearsOfExperience })
      : null;

  // Format price
  const priceText = startingPrice
    ? `${startingPrice.toLocaleString()} ${currency} `
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
              <AvatarImage src={profileImageUrl || undefined} alt={name} />
              <AvatarFallback className="text-sm font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg leading-tight truncate">
                {name}
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
              <Link href={`/photographers/${id}`}>{t('viewProfile')}</Link>
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
                  alt={t('portfolioImageAlt', { name })}
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
                  alt={t('portfolioImageAlt', { name })}
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
                      {t('reviews', { count: totalReviews })}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {t('rating')}
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
                    {t('experienceLabel')}
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
                      {t('priceUnit')}
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {t('startingAt')}
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
