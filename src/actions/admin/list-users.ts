'use server'

import { prisma } from '@/lib/db/prisma'

export async function ListUsers() {
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
      createdAt: true,
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

export async function ListOrganizations() {
  const orgs = await prisma.user.findMany({
    where: {
      role: 'user',
    },
    select: {
      name: true,
      email: true,
      branch: true,
    },
    orderBy: {
      branch: 'asc',
    },
  })

  return orgs
}
