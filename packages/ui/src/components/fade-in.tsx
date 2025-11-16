import { cn } from '@shotly/ui/lib/utils';

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
};

function FadeIn({ children, className }: FadeInProps) {
  return (
    <div className={cn('animate-in fade-in duration-300', className)}>
      {children}
    </div>
  );
}

export default FadeIn;
