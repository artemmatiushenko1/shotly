import React from 'react';
import Footer from './footer';
import Navigation from './navigation';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation variant="contrast" />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default PublicLayout;
