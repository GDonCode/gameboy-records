// middleware.ts
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isLoginPage = req.nextUrl.pathname === '/dashboard/login';
  const isDashboardRoute = req.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboardRoute && !isLoginPage && !isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard/login', req.nextUrl));
  }

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/dashboard/:path*'],
};