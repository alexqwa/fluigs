import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  const user = session?.user

  // if (!user) return new Response('Unauthorized', { status: 401 })

  const fluigs = await prisma.fluig.findMany({
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(fluigs)
}
