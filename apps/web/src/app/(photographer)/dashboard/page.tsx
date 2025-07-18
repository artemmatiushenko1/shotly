import MainHeader from '@/components/main-header';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

async function Dashboard() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect('/auth/sign-in');
  }

  return (
    <MainHeader>
      <div>
        <h2 className="font-medium">Overview</h2>
        <div className="text-muted-foreground text-xs">
          Welcome back, {session.user.name}!
        </div>
      </div>
    </MainHeader>
  );
}

export default Dashboard;
