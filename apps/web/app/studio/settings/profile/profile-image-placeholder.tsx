import { UserRound } from 'lucide-react';

import { cn } from '@shotly/ui/lib/utils';

type ProfileImagePlaceholderProps = {
  className?: string;
};

const ProfileImagePlaceholder = (props: ProfileImagePlaceholderProps) => {
  const { className } = props;

  return (
    <div
      className={cn(
        'flex h-24 w-24 items-center justify-center rounded-xl border border-dashed border-muted-foreground/40 bg-muted text-muted-foreground',
        className,
      )}
    >
      <UserRound className="h-10 w-10 opacity-70" />
    </div>
  );
};

export { ProfileImagePlaceholder };
