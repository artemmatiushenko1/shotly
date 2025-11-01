import { Input } from '@shotly/ui/components/input';

type SocialLinkInputProps = {
  id: string;
  name: string;
  socialIcon: React.ReactNode;
  socialBaseUrl: string;
  defaultValue?: string;
};

const SocialLinkInput = (props: SocialLinkInputProps) => {
  const { id, socialBaseUrl, socialIcon, defaultValue, name } = props;

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-1 items-center rounded-lg border bg-background overflow-hidden">
        <div className="flex items-center gap-2 px-3 bg-muted h-9">
          <div className="flex h-5 w-5 items-center justify-center text-muted-foreground">
            {socialIcon}
          </div>
          <span className="text-muted-foreground text-sm">{socialBaseUrl}</span>
        </div>
        <Input
          id={id}
          name={name}
          defaultValue={defaultValue}
          className="border-none rounded-l-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );
};

export { SocialLinkInput };
