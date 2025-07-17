import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

async function Dashboard() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect('/auth/sign-in');
  }

  const user = session.user;

  return (
    <div>
      Dashboard
      <div>
        {user.email} {user.name} {user.id} {user.image}
      </div>
    </div>
  );
}

export default Dashboard;
