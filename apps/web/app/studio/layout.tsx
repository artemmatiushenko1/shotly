import { getUser } from '@/infrastructure/auth/dal';
import usersRepository from '@/repositories/users.repository';

import { SidebarProvider } from '@shotly/ui/components/sidebar';
import { ThemeProvider } from '@shotly/ui/components/theme-provider';

import { AppSidebar } from './app-sidebar';

async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  const storageUsage = await usersRepository.getStorageUsage(user.id);

  return (
    <ThemeProvider>
      <SidebarProvider>
        <AppSidebar user={user} storageUsage={storageUsage} />
        <main className="rounded-2xl bg-background m-2 ml-1 border w-full px-2 pb-2 overflow-x-hidden overflow-y-auto relative">
          {children}
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default Layout;
