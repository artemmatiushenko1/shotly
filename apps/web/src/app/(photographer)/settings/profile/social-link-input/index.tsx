import { Input } from '@shotly/ui/components/input';

type SocialLinkInputProps = {
  socialIcon: React.ReactNode;
  socialBaseUrl: string;
  socialHandle: string;
};

const SocialLinkInput = (props: SocialLinkInputProps) => {
  const { socialBaseUrl, socialIcon, socialHandle } = props;

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-1 items-center rounded-lg border bg-background overflow-hidden">
        <div className="flex items-center gap-2 px-3 bg-muted h-9">
          <div className="flex h-5 w-5 items-center justify-center">
            {socialIcon}
          </div>
          <span className="text-muted-foreground">{socialBaseUrl}</span>
        </div>
        <Input
          defaultValue={socialHandle}
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
        />
      </div>
    </div>
  );
};

export { SocialLinkInput };
