import { Label } from '@shotly/ui/components/label';

type LabeledControlProps = {
  title: string;
  description: string;
  controlId?: string;
  controlNode: React.ReactNode;
};

const LabeledControl = (props: LabeledControlProps) => {
  const { controlId, title, description, controlNode } = props;

  const labelProps = controlId ? { htmlFor: controlId } : {};

  return (
    <div className="flex gap-8">
      <div className="w-78 flex-shrink-0">
        <Label {...labelProps} className="text-base font-medium">
          {title}
        </Label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex-1 space-y-2">{controlNode}</div>
    </div>
  );
};

export { LabeledControl };
