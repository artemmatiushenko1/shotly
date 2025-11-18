'use client';

import GradientLoadingProgress from '@/components/gradient-progress';

function Loading() {
  return (
    <div className="absolute top-0 left-0 right-0 z-50">
      <GradientLoadingProgress />
    </div>
  );
}

export default Loading;
