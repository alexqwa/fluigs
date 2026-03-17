// import { auth } from '@/lib/auth'
// import { NextRequest, NextResponse } from 'next/server'
// import { getSessionCookie } from 'better-auth/cookies'

// type PublicRoute = {
//   path: string
//   whenAuthenticated: 'redirect' | 'next'
// }

// const publicRoutes: readonly PublicRoute[] = [
//   { path: '/', whenAuthenticated: 'redirect' },
//   { path: '/account', whenAuthenticated: 'next' },
//   { path: '/dashboard', whenAuthenticated: 'next' },
//   { path: '/notifications', whenAuthenticated: 'next' },
//   { path: '/reports', whenAuthenticated: 'next' },
// ] as const

// const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/'

// export async function proxy(request: NextRequest) {
//   const path = request.nextUrl.pathname

//   // valida sessão usando Better Auth
//   const session = getSessionCookie(request)

//   const isAuthenticated = !!session

//   // Verifica se a rota é pública
//   const publicRoute = publicRoutes.find((route) => route.path === path)

//   if (!isAuthenticated && publicRoute) {
//     return NextResponse.next()
//   }

//   if (!isAuthenticated && !publicRoute) {
//     const redirectUrl = request.nextUrl.clone()
//     redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
//     return NextResponse.redirect(redirectUrl)
//   }

//   if (
//     isAuthenticated &&
//     publicRoute &&
//     publicRoute.whenAuthenticated === 'redirect'
//   ) {
//     const redirectUrl = request.nextUrl.clone()
//     redirectUrl.pathname = '/dashboard'
//     return NextResponse.redirect(redirectUrl)
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: [
//     '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
//   ],
// }
