import { cn } from '@shotly/ui/lib/utils';

type SkeletonProps = React.ComponentProps<'div'> & {
  animation?: 'pulse' | 'wave' | 'none';
};

function Skeleton({ className, animation = 'pulse', ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        `bg-accent ${animation !== 'none' ? `animate-${animation}` : ''} rounded-md`,
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
