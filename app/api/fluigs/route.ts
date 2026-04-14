import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  const fluigs = await prisma.fluig.findMany({
    where: { userId: session?.user.id },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(fluigs)
}
