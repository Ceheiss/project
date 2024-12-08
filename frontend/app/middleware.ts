// app/middleware.js or _middleware.js depending on your Next.js setup
import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log('Middleware is running');
  const cookie = request.cookies.get('session'); // Get the session cookie

  if (!cookie) {
    // If no session cookie, redirect to login or handle accordingly
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const modifiedResponse = NextResponse.next();
  modifiedResponse.headers.set('Cookie', `session=${cookie}`);

  console.log('Session Cookie:', cookie);

  return modifiedResponse;  // Continue with the request, forwarding the cookie
}

export const config = {
  matcher: '/'  // This will apply the middleware to all routes
};