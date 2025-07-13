import { authConfig } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await authConfig.auth();

  if (!session || !session.user) {
    redirect('/auth/sign-in');
  }

  const user = session.user;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {user.email} {user.name} {user.id} {user.image}
    </div>
  );
}
