import NextCors from 'nextjs-cors'
import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

async function runCors(request: NextRequest) {
  await NextCors(request as any, {} as any, {
    origin: process.env.BETTER_AUTH_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200,
    credentials: true,
  })
}

export async function GET(request: NextRequest) {
  await runCors(request)

  const session = await auth.api.getSession({
    headers: request.headers,
  })

  const fluigs = await prisma.fluig.findMany({
    where: { userId: session?.user.id },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(fluigs)
}
