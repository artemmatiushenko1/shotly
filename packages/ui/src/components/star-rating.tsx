'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { StarIcon } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@shotly/ui/lib/utils';

const starRatingVariants = cva('flex justify-center gap-2', {
  variants: {
    size: {
      sm: '[&_svg]:w-4 [&_svg]:h-4',
      md: '[&_svg]:w-6 [&_svg]:h-6',
      lg: '[&_svg]:w-8 [&_svg]:h-8',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});

const starButtonVariants = cva(
  'focus:outline-none transition-transform duration-150',
  {
    variants: {
      readonly: {
        true: 'cursor-default',
        false: 'hover:scale-110',
      },
    },
    defaultVariants: {
      readonly: false,
    },
  },
);

const starIconVariants = cva('transition-colors', {
  variants: {
    filled: {
      true: 'text-yellow-400 fill-yellow-400',
      false: 'text-gray-200',
    },
  },
  defaultVariants: {
    filled: false,
  },
});

type StarRatingProps = {
  rating: number;
  onRatingChange?: (rating: number) => void;
  className?: string;
  readonly?: boolean;
  error?: string;
} & VariantProps<typeof starRatingVariants>;

function StarRating({
  rating,
  onRatingChange,
  size,
  className,
  readonly = false,
  error,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (star: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(star);
    }
  };

  const handleStarHover = (star: number) => {
    if (!readonly) {
      setHoverRating(star);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  return (
    <>
      <div
        className={cn(starRatingVariants({ size }), className)}
        onMouseLeave={handleMouseLeave}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= (hoverRating || rating);

          return (
            <button
              key={star}
              type="button"
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
              disabled={readonly}
              className={cn(starButtonVariants({ readonly }))}
            >
              <StarIcon
                className={cn(starIconVariants({ filled: isFilled }))}
              />
            </button>
          );
        })}
      </div>
      {error && (
        <div className="text-sm text-destructive mt-2 text-center">{error}</div>
      )}
    </>
  );
}

export { StarRating, starRatingVariants };
export type { StarRatingProps };
