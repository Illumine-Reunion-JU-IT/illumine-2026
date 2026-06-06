import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const isAuth = !!req.nextauth.token;
    const role = req.nextauth.token?.role;

    if (pathname.startsWith('/admin') && role !== 'admin') {
      const url = new URL('/login', req.url);
      url.searchParams.set('callbackUrl', req.url);
      url.searchParams.set('debugRole', String(role));
      url.searchParams.set('hasToken', String(isAuth));
      return NextResponse.redirect(url);
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    }
  }
);

export const config = {
  matcher: ['/admin/:path*']
};
