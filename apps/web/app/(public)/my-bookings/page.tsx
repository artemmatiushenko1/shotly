import { getTranslations } from 'next-intl/server';

import { getClientOrdersUseCase } from '@/application/use-cases/orders';
import { getAuthenticatedUserOrRedirect } from '@/infrastructure/services/auth/dal';

import BookingTabs from './booking-tabs';

async function MyBookings() {
  const t = await getTranslations('myBookings');

  const user = await getAuthenticatedUserOrRedirect();

  const orders = await getClientOrdersUseCase(user.id);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <p className="text-sm text-muted-foreground mb-4">{t('description')}</p>
      <BookingTabs orders={orders} />
    </div>
  );
}

export default MyBookings;
