import React from 'react';
import { SidebarProvider } from '@shotly/ui/components/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { getUser } from '@/lib/auth/get-user';

async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <main className="rounded-2xl bg-background m-2 ml-1 border w-full px-2 pb-2 overflow-x-hidden overflow-y-auto relative">
        {children}
      </main>
    </SidebarProvider>
  );
}

export default Layout;
