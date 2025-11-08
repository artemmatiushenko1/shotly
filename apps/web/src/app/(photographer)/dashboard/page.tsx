import MainHeader from '@/components/main-header';
import { getUser } from '@/lib/auth/get-user';
import { getTranslations } from 'next-intl/server';
import React from 'react';

async function Dashboard() {
  const user = await getUser();

  const t = await getTranslations('dashboard');

  return (
    <MainHeader
      title={t('title')}
      caption={t('description', { name: user.name })}
    />
  );
}

export default Dashboard;
