import React from 'react';
import { SidebarProvider } from '@shotly/ui/components/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { auth } from '@/lib/auth/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect('/auth/sign-in');
  }

  return (
    <SidebarProvider>
      <AppSidebar user={session?.user} />
      <main className="rounded-2xl bg-background m-2 ml-1 border w-full px-2 pb-2 overflow-x-hidden overflow-y-auto">
        {children}
      </main>
    </SidebarProvider>
  );
}

export default Layout;
