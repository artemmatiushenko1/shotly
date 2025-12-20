import { getTranslations } from 'next-intl/server';

import { getPhotographerOrdersUseCase } from '@/application/use-cases/orders';
import { getAuthenticatedUserOrRedirect } from '@/infrastructure/services/auth/dal';

import MainHeader from '../../_components/main-header';
import OrdersView from './orders-view';

async function Orders() {
  const user = await getAuthenticatedUserOrRedirect();
  const orders = await getPhotographerOrdersUseCase(user.id);

  const t = await getTranslations('orders');

  return (
    <>
      <MainHeader title={t('title')} caption={t('caption')} />
      <OrdersView orders={orders} />
    </>
  );
}

export default Orders;
