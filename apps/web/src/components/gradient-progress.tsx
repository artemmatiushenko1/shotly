import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  /* optional height in px (default 6) */
  height?: number;
  /* optional aria label */
  label?: string;
};

export default function GradientLoadingProgress({
  height = 6,
  label = 'Loading',
  className = '',
  ...rest
}: Props) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-busy={true}
      className={`w-full ${className}`}
      {...rest}
    >
      <div className="relative rounded-full" style={{ height }}>
        {/* The moving block that shows the gradient. It's intentionally narrower than the track
            and slides across to create an indeterminate loading effect. */}
        <div
          className="absolute left-0 top-0 h-full w-[50%] gradient-animation rounded-full -mx-4"
          style={{ willChange: 'transform, background-position' }}
        />
      </div>

      {/* Component-scoped styles. We define the exact gradient you asked for and a
          subtle animation that moves the block left→right while shifting the gradient's position. */}
      <style>{`
        .gradient-animation {
        background: linear-gradient(60deg,#ffd164,#f8b03d,#ee6b60,#d6487f,#a147c4,#4b63e4,#3cccc7);
        background-size: 200% 200%;
        animation: gradientShift 2s linear infinite, slideBlock 2s linear infinite;
        }


        @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
        }


        @keyframes slideBlock {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(200%); }
        }


        @media (prefers-reduced-motion: reduce) {
        .gradient-animation { animation: none; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
