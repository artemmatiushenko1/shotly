import Image from 'next/image';
import React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
};

function AuthLayout(props: AuthLayoutProps) {
  const { children } = props;

  return (
    <div className="flex h-dvh">
      <div className="flex-2/3 p-5 h-full">
        <div className="h-full rounded-2xl bg-gray-200 relative overflow-hidden">
          <Image
            alt="3d camera render"
            className="object-cover object-center"
            src="/auth-banner.jpg"
            fill
          />
        </div>
      </div>
      <div className="flex-1/2 p-5">
        <div className="w-md m-auto mt-20 mb-15">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
