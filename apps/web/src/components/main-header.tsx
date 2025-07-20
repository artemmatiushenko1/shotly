import { Separator } from '@shotly/ui/components/separator';
import { SidebarTrigger } from '@shotly/ui/components/sidebar';

type MainHeadrProps = {
  children: React.ReactNode;
};

function MainHeader({ children }: MainHeadrProps) {
  return (
    <div className="text-md border-b -ml-2 -mr-2 p-4 flex items-center gap-3 sticky top-0 bg-background z-10">
      <SidebarTrigger />
      <Separator orientation="vertical" />
      <div className="flex w-full items-center">{children}</div>
    </div>
  );
}

export default MainHeader;
