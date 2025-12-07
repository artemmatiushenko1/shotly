import React from 'react';

import Footer from '../(public)/footer';
import Navigation from '../(public)/navigation';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation className="absolute left-1/2 w-full -translate-x-1/2" />
      <main className="min-h-[550px]">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
