import Image from 'next/image';
import React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
};

function AuthLayout(props: AuthLayoutProps) {
  const { children } = props;

  return (
    <div className="flex h-dvh bg-background">
      <div className="flex-2/3 p-5 h-full">
        <div className="h-full rounded-2xl bg-gray-200 relative overflow-hidden">
          <Image
            alt="3d camera render"
            className="object-cover object-center"
            src="/auth-banner-5.jpg"
            fill
          />
          <h2 className="absolute top-8 left-10 text-5xl font-bold text-white mix-blend-overlay">
            capture <br />
            moments
            <br />
            that last <br />
            forever.
          </h2>
          <p className="text-sm text-background absolute bottom-5 right-10">
            2025 Shotly, Всі права захищені
          </p>
        </div>
      </div>
      <div className="flex-1/2 p-5">
        <div className="w-md m-auto mb-15 flex flex-col justify-center h-full">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
