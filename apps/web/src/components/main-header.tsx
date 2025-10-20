type MainHeaderProps = {
  title: string;
  caption: string;
  extra?: React.ReactNode;
};

function MainHeader({ title, caption, extra }: MainHeaderProps) {
  return (
    <div className="p-4 flex items-center gap-3 sticky top-0 bg-background z-10">
      <div className="flex w-full items-center">
        <div>
          <p className="font-bold text-2xl">{title}</p>
          <p className="text-muted-foreground text-sm">{caption}</p>
        </div>
        {extra}
      </div>
    </div>
  );
}

export default MainHeader;
