import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const stores = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  })
  return NextResponse.json(stores)
}
