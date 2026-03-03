import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '../../actions/get-session'

export async function GET(request: NextRequest) {
  const session = await getServerSession()
  const user = session?.user

  const fluigs = await prisma.fluig.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return NextResponse.json(fluigs)
}
