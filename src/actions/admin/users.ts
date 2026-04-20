'use server'

import { prisma } from '@/lib/prisma'

export async function Users() {
  const users = await prisma.user.findMany({
    where: {
      role: 'user',
    },
    omit: {
      role: true,
      image: true,
      banned: true,
      banReason: true,
      updatedAt: true,
      banExpires: true,
      emailVerified: true,
    },
    include: {
      fluigs: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return users
}
