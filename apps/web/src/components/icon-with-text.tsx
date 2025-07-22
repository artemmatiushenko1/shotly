import { LucideIcon } from 'lucide-react';

type IconWithTextProps = {
  icon: LucideIcon;
  text: string;
};

const IconWithText = ({ icon: Icon, text }: IconWithTextProps) => {
  return (
    <p className="flex space-x-2 text-xs mt-2 text-muted-foreground">
      <Icon className="size-4" /> <span>{text}</span>
    </p>
  );
};

export { IconWithText };
