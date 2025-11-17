import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './lib/auth/auth';
import { headers } from 'next/headers';
import { Role } from './domain/user';

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (
    session?.user &&
    session.user.role === Role.UNKNOWN &&
    request.nextUrl.pathname !== '/auth/onboarding'
  ) {
    return NextResponse.redirect(new URL('/auth/onboarding', request.url));
  }
}

export const config = {
  runtime: 'nodejs',
  // TODO: check if it's triggered for some unexpected routes/files
  matcher: ['/((?!api|static|.*\\..*|_next).*)'],
};
