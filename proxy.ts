import { getSessionCookie } from 'better-auth/cookies'
import { NextRequest, NextResponse } from 'next/server'

type RouteConfig = {
  path: string
  whenAuthenticated: 'redirect' | 'next'
}

const PUBLIC_ROUTES: readonly RouteConfig[] = [
  { path: '/', whenAuthenticated: 'redirect' },
  { path: '/reports', whenAuthenticated: 'next' },
  { path: '/dashboard', whenAuthenticated: 'next' },
] as const

const ADMIN_ROUTES: readonly RouteConfig[] = [
  { path: '/admin', whenAuthenticated: 'redirect' },
  { path: '/admin/upload', whenAuthenticated: 'next' },
  { path: '/admin/settings', whenAuthenticated: 'next' },
  { path: '/admin/stores', whenAuthenticated: 'next' },
] as const

const UNAUTHENTICATED_FALLBACK = '/'
const AUTHENTICATED_PUBLIC_FALLBACK = '/dashboard'
const AUTHENTICATED_ADMIN_FALLBACK = '/admin/upload'

async function isValidSession(request: NextRequest): Promise<boolean> {
  const sessionCookie = getSessionCookie(request)
  if (!sessionCookie) return false

  try {
    const response = await fetch(
      new URL('/api/auth/get-session', request.nextUrl.origin),
      {
        headers: {
          cookie: request.headers.get('cookie') ?? '',
        },
      }
    )

    const session = await response.json()
    return !!session?.user
  } catch {
    return false
  }
}

function redirect(request: NextRequest, pathname: string): NextResponse {
  const url = request.nextUrl.clone()
  url.pathname = pathname
  return NextResponse.redirect(url)
}

function matchRoute(
  routes: readonly RouteConfig[],
  path: string
): RouteConfig | undefined {
  return routes.find((route) => route.path === path)
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl

  const [isAuthenticated, publicRoute, adminRoute] = await Promise.all([
    isValidSession(request),
    Promise.resolve(matchRoute(PUBLIC_ROUTES, pathname)),
    Promise.resolve(matchRoute(ADMIN_ROUTES, pathname)),
  ])

  const isKnownRoute = !!publicRoute || !!adminRoute

  if (!isAuthenticated) {
    return isKnownRoute
      ? NextResponse.next()
      : redirect(request, UNAUTHENTICATED_FALLBACK)
  }

  if (publicRoute?.whenAuthenticated === 'redirect') {
    return redirect(request, AUTHENTICATED_PUBLIC_FALLBACK)
  }

  if (adminRoute?.whenAuthenticated === 'redirect') {
    return redirect(request, AUTHENTICATED_ADMIN_FALLBACK)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
