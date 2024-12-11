import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/', '/login', '/register', '/notes', '/notes/:path*']
};

export function middleware(request: NextRequest) {
  const { pathname} = request.nextUrl;
  const cookie = request.cookies.get('session');
  if (!cookie) {
    if (pathname === '/login' || pathname === '/register') {
      // Allow access to login and register pages
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', request.url));
  } else {
    // user logged in
    if (pathname === '/login' || pathname === '/register') {
      // Redirect logged-in users away from login/register pages
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  return NextResponse.next();
}

