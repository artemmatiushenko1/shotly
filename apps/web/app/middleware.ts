import { headers } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { Role } from '../src/domain/user';
import { auth } from '../src/infrastructure/auth/auth';

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (
    session?.user &&
    session.user.role === Role.UNKNOWN &&
    request.nextUrl.pathname !== '/auth/choose-role'
  ) {
    return NextResponse.redirect(new URL('/auth/choose-role', request.url));
  }
}

export const config = {
  runtime: 'nodejs',
  // TODO: check if it's triggered for some unexpected routes/files
  matcher: ['/((?!api|static|.*\\..*|_next).*)'],
};
