import { Button } from '@shotly/ui/components/button';
import { Card } from '@shotly/ui/components/card';
import { cn } from '@shotly/ui/lib/utils';
import { CheckCircle2, FlameIcon } from 'lucide-react';
import Link from 'next/link';

export type OnboardingStep = {
  id: string;
  title: string;
  description: string;
  isComplete: boolean;
  actionLink: string;
  actionLabel: string;
};

type OnboardingChecklistProps = {
  steps: OnboardingStep[];
  progressPercentage: number;
  allComplete: boolean;
};

function OnboardingChecklist(props: OnboardingChecklistProps) {
  const { steps, progressPercentage, allComplete } = props;

  return (
    <form className="max-w-2xl mx-auto p-4 mt-10">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-[20px] font-bold mb-2 inline-flex gap-2">
              <FlameIcon className="text-primary" /> Getting Started
            </h1>
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-medium mr-2">
                {progressPercentage}%
              </span>
              <span className="text-muted-foreground text-sm">completed</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-6 mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 pt-1">
                {step.isComplete ? (
                  <CheckCircle2 className="w-7 h-7 text-accent fill-primary" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3
                  className={cn(
                    'text-base font-bold mb-1',
                    step.isComplete && 'line-through text-muted-foreground',
                  )}
                >
                  {step.title}
                </h3>
                <p
                  className={cn(
                    'text-sm text-muted-foreground mb-3',
                    step.isComplete && 'line-through text-muted-foreground',
                  )}
                >
                  {step.description}
                </p>

                {!step.isComplete && (
                  <Link href={step.actionLink}>
                    <Button size="sm" variant="secondary">
                      {step.actionLabel}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
        <Button type="submit" disabled={!allComplete} className="w-full">
          Submit Profile for Review
        </Button>
      </Card>
    </form>
  );
}

export default OnboardingChecklist;
