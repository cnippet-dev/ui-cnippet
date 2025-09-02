import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    
    // Check if user is authenticated
    const token = await getToken({ 
        req: request, 
        secret: process.env.NEXTAUTH_SECRET 
    })
    
    // If user is logged in and trying to access auth pages, redirect to dashboard
    if (token && (pathname === '/sign_in' || pathname === '/sign_up')) {
        return NextResponse.redirect(new URL('/account/settings', request.url))
    }
    
    // If user is not logged in and trying to access protected routes, redirect to sign in
    if (!token && pathname.startsWith('/account')) {
        return NextResponse.redirect(new URL('/sign_in', request.url))
    }
    
    // If user is not logged in and trying to access admin routes, redirect to sign in
    if (!token && pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/sign_in', request.url))
    }
    
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/sign_in',
        '/sign_up', 
        '/account/:path*',
        '/admin/:path*'
    ]
}   