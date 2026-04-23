'use server'

import z from 'zod'
import { updateTag } from 'next/cache'
import { headers } from 'next/headers'

import { auth } from '@/lib/auth'
import { UserInputSchema } from '@/generated/zod/schemas'
import { getServerSession } from '@/actions/auth/session'

const userInputSchema = UserInputSchema.omit({
  id: true,
  role: true,
  image: true,
  banned: true,
  sessions: true,
  accounts: true,
  banReason: true,
  createdAt: true,
  updatedAt: true,
  banExpires: true,
  emailVerified: true,
})

type UserInputSchema = z.infer<typeof userInputSchema>

export async function Update(id: string, data: UserInputSchema) {
  const session = await getServerSession()
  const user = session?.user

  if (!user) throw new Error('Unauthorized')

  const updated = await auth.api.adminUpdateUser({
    body: {
      userId: id,
      data: {
        name: data.name,
        email: data.email,
        branch: data.branch,
        fluigs: data.fluigs,
      },
    },
    headers: await headers(),
  })

  updateTag('stores')
  return updated
}
