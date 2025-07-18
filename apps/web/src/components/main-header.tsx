import { SidebarTrigger } from '@shotly/ui/components/sidebar';

type MainHeadrProps = {
  children: React.ReactNode;
};

function MainHeader({ children }: MainHeadrProps) {
  return (
    <div className="text-md border-b -ml-2 -mr-2 p-4 flex items-center gap-3">
      <SidebarTrigger />
      <div className="flex w-full">{children}</div>
    </div>
  );
}

export default MainHeader;
