import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@shotly/ui/components/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { auth } from '@/lib/auth';
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
      <main className="rounded-2xl bg-card m-2 ml-1 border w-full px-2 pb-2">
        <div className="text-md border-b -ml-2 -mr-2 p-4 flex items-center gap-3">
          <SidebarTrigger />
          <div>
            <h2 className="font-medium">Overview</h2>
            <div className="text-muted-foreground text-xs">
              Welcome back, {session.user.name}!
            </div>
          </div>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}

export default Layout;
