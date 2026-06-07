import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Manually extract the token to bypass Edge runtime bugs in withAuth
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production" 
  });
  
  if (pathname.startsWith('/admin')) {
    if (!token) {
      const url = new URL('/login', req.url);
      url.searchParams.set('callbackUrl', req.url);
      url.searchParams.set('debug', 'missing_token');
      return NextResponse.redirect(url);
    }
    
    if (token.role !== 'admin') {
      const url = new URL('/login', req.url);
      url.searchParams.set('callbackUrl', req.url);
      url.searchParams.set('debug', 'unauthorized_role');
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
