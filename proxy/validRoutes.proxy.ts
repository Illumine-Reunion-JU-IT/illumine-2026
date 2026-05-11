import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Define allowed routes based on Navbar source of truth
  const allowedRoutes = ['/', '/magazine', '/alumni'];
  
  // Let Next.js internals, static assets, and the error page itself pass through
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') || 
    pathname.startsWith('/photos') || 
    pathname.startsWith('/assets') ||
    pathname === '/favicon.ico' ||
    pathname === '/error'
  ) {
    return NextResponse.next();
  }

  // If the path is not in allowed routes, rewrite to the custom error page
  if (!allowedRoutes.includes(pathname)) {
    return NextResponse.rewrite(new URL('/error', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware to all routes except standard internal and static paths
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
