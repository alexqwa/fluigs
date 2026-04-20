import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

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
  { path: '/admin/dashboard', whenAuthenticated: 'next' },
  { path: '/admin/settings', whenAuthenticated: 'next' },
  { path: '/admin/stores', whenAuthenticated: 'next' },
]

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/'

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname

  // valida sessão usando Better Auth
  const session = getSessionCookie(request)

  const isAuthenticated = !!session

  const publicRoute = publicRoutes.find((route) => route.path === path)
  const adminRoute = adminRoutes.find((route) => route.path === path)

  if (!isAuthenticated && publicRoute && adminRoute) {
    return NextResponse.next()
  }

  if (!isAuthenticated && !publicRoute && !adminRoute) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
    return NextResponse.redirect(redirectUrl)
  }

  if (
    isAuthenticated &&
    publicRoute &&
    publicRoute.whenAuthenticated === 'redirect'
  ) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/dashboard'
    return NextResponse.redirect(redirectUrl)
  }

  if (
    isAuthenticated &&
    adminRoute &&
    adminRoute.whenAuthenticated === 'redirect'
  ) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/admin/dashboard'
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
