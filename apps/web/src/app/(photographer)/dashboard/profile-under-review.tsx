'use client';

import { Card } from '@shotly/ui/components/card';
import { ClockIcon } from 'lucide-react';
import React from 'react';
import { useTranslations } from 'next-intl';

interface ProfileUnderReviewCardProps {
  userEmail: string;
}

interface Step {
  title: string;
  description: string | ((userEmail: string) => React.ReactNode);
  completed: boolean;
}

export default function ProfileUnderReviewCard({
  userEmail,
}: ProfileUnderReviewCardProps) {
  const t = useTranslations('dashboard.profileUnderReview');

  const steps: Step[] = [
    {
      title: t('steps.submission.title'),
      description: t('steps.submission.description'),
      completed: true,
    },
    {
      title: t('steps.review.title'),
      description: t('steps.review.description'),
      completed: false,
    },
    {
      title: t('steps.approval.title'),
      description: (email) => {
        const text = t('steps.approval.description', { email });
        // Split the text to insert styled email
        const parts = text.split(email);
        return (
          <>
            {parts[0]}
            <span className="font-semibold">{email}</span>
            {parts[1]}
          </>
        );
      },
      completed: false,
    },
  ];

  return (
    <>
      <Card className="relative overflow-hidden">
        <div className="border-b px-8 py-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                <ClockIcon className="size-7 text-primary" />
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold leading-tight">{t('title')}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {t('subtitle')}
              </p>
            </div>
          </div>
        </div>

        <div className="px-8 py-8">
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  {step.completed ? (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-sm">{step.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {typeof step.description === 'function'
                      ? step.description(userEmail)
                      : step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 py-6 flex items-center justify-between">
          <p className="text-xs text-muted-foreground font-medium">
            {t('footer')}
          </p>
          <svg
            className="w-4 h-4 text-[var(--color-text-secondary)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </Card>
    </>
  );
}
