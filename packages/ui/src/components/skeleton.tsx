import { cn } from '@shotly/ui/lib/utils';

type SkeletonProps = React.ComponentProps<'div'> & {
  animation?: 'pulse' | 'none';
};

function Skeleton({ className, animation = 'pulse', ...props }: SkeletonProps) {
  const getAnimationClass = () => {
    if (animation === 'pulse') {
      return 'animate-pulse';
    }

    return '';
  };

  return (
    <div
      data-slot="skeleton"
      className={cn(`bg-accent ${getAnimationClass()} rounded-md`, className)}
      {...props}
    />
  );
}

export { Skeleton };
