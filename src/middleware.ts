// // middleware.ts
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { getToken } from 'next-auth/jwt'

// export async function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname
  
//   // Define protected routes
//   const isProtectedRoute = path.startsWith('/app/admin')
  
//   if (isProtectedRoute) {
//     const token = await getToken({
//       req: request,
//       secret: process.env.NEXTAUTH_SECRET,
//     })

//     if (!token) {
//       const url = new URL('/auth/signin', request.url)
//       url.searchParams.set('callbackUrl', path)
//       return NextResponse.redirect(url)
//     }
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: '/app/admin/:path*'
// }

// middleware.ts
//import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import { auth } from "@/auth"

export default auth((req) => {
  const isAdmin = req.auth?.user?.role === 'admin';
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

  if (isAdminRoute && !isAdmin) {
    return Response.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
