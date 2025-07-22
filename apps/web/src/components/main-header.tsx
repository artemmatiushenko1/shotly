type MainHeadrProps = {
  children: React.ReactNode;
};

function MainHeader({ children }: MainHeadrProps) {
  return (
    <div className="text-md p-4 flex items-center gap-3 sticky top-0 bg-background z-10">
      <div className="flex w-full items-center">{children}</div>
    </div>
  );
}

export default MainHeader;
