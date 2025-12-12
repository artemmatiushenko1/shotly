type SettingsTabLayoutProps = {
  children: React.ReactNode;
  title: string;
  caption: string;
};

function SettingsTabLayout(props: SettingsTabLayoutProps) {
  const { children, title, caption } = props;

  return (
    <div>
      <p className="text-md font-medium">{title}</p>
      <p className="text-muted-foreground text-xs mb-6">{caption}</p>
      {children}
    </div>
  );
}

export default SettingsTabLayout;
