import React from 'react';
import Navigation from '../(public)/navigation';
import Footer from '../(public)/footer';

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
