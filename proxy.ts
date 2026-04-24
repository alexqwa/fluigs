import { jwtVerify } from 'jose'
import { getSessionCookie } from 'better-auth/cookies'
import { NextRequest, NextResponse } from 'next/server'

type PublicRoute = {
  path: string
  whenAuthenticated: 'redirect' | 'next'
}

type AdminRoute = {
  path: string
  whenAuthenticated: 'redirect' | 'next'
}

const publicRoutes: readonly PublicRoute[] = [
  { path: '/', whenAuthenticated: 'redirect' },
  { path: '/dashboard', whenAuthenticated: 'next' },
  { path: '/reports', whenAuthenticated: 'next' },
] as const

const adminRoutes: readonly AdminRoute[] = [
  { path: '/admin', whenAuthenticated: 'redirect' },
  { path: '/admin/upload', whenAuthenticated: 'next' },
  { path: '/admin/settings', whenAuthenticated: 'next' },
  { path: '/admin/stores', whenAuthenticated: 'next' },
] as const

async function isValidSession(request: NextRequest): Promise<boolean> {
  const sessionCookie = getSessionCookie(request)
  if (!sessionCookie) return false

  try {
    const secret = new TextEncoder().encode(process.env.BETTER_AUTH_SECRET)
    await jwtVerify(sessionCookie, secret)
    return true
  } catch (error) {
    return false
  }
}

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/'

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isAuthenticated = await isValidSession(request)

  const publicRoute = publicRoutes.find((route) => route.path === path)
  const adminRoute = adminRoutes.find((route) => route.path === path)

  if (!isAuthenticated && !publicRoute && !adminRoute) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
    return NextResponse.redirect(redirectUrl)
  }

  if (isAuthenticated && publicRoute?.whenAuthenticated === 'redirect') {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/dashboard'
    return NextResponse.redirect(redirectUrl)
  }

  if (isAuthenticated && adminRoute?.whenAuthenticated === 'redirect') {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/admin/upload'
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
