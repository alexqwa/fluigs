import { NextRequest, NextResponse } from 'next/server'

type PublicRoute = {
  path: string
  whenAuthenticated: 'redirect' | 'next'
}

const publicRoutes: readonly PublicRoute[] = [
  { path: '/', whenAuthenticated: 'redirect' },
  { path: '/account', whenAuthenticated: 'next' },
  { path: '/skeleton', whenAuthenticated: 'next' },
  { path: '/dashboard', whenAuthenticated: 'next' },
  { path: '/reports', whenAuthenticated: 'next' },
  { path: '/orders', whenAuthenticated: 'next' },
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/'

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname
  const authToken = request.cookies.get('better-auth.session_token')

  // Verifica se a rota é pública
  const publicRoute = publicRoutes.find((route) => {
    return route.path === path
  })

  if (!authToken && publicRoute) {
    return NextResponse.next()
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
    return NextResponse.redirect(redirectUrl)
  }

  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === 'redirect'
  ) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/dashboard'
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
