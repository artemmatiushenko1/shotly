import { authContract } from '@shotly/contracts/auth';
import { initClient } from '@ts-rest/core';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';

const client = initClient(authContract, {
  baseUrl: 'http://localhost:8080/',
  validateResponse: true,
});

export const getAuthUser = async () => {
  const cookiesStore = await cookies();
  console.log(cookiesStore.toString());

  const response = await client.getProfile({
    fetchOptions: { credentials: 'include' },
    extraHeaders: {
      Cookie: cookiesStore.toString(),
    },
  });

  console.log('--------Profile---------');
  console.log(response);

  if (response.status !== 200) {
    redirect('/auth/sign-in');
  }

  return response.body;
};
