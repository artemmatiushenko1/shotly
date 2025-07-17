import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@shotly/ui/components/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="rounded-2xl bg-card m-2 ml-1 border w-full px-2 pb-2">
        <div className="text-md border-b -ml-2 -mr-2 p-4 flex items-center gap-3">
          <SidebarTrigger />
          <div>
            <h2 className="font-medium">Overview</h2>
            <div className="text-muted-foreground text-xs">
              Welcome back, user!
            </div>
          </div>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}

export default Layout;
