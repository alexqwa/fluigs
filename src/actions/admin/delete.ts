'use server'

import { updateTag } from 'next/cache'

import { prisma } from '@/lib/prisma'
import { getServerSession } from '@/actions/auth/session'

export async function Delete(id: string) {
  const session = await getServerSession()

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  await prisma.user.delete({
    where: { id },
  })

  updateTag('orgs')
  updateTag('stores')
}
