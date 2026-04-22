'use server'

import z from 'zod'
import { updateTag } from 'next/cache'

import { auth } from '@/lib/auth'
import { UserInputSchema } from '@/generated/zod/schemas'
import { getServerSession } from '@/actions/auth/session'

const userInputSchema = UserInputSchema.omit({
  id: true,
  role: true,
  image: true,
  banned: true,
  fluigs: true,
  sessions: true,
  accounts: true,
  banReason: true,
  createdAt: true,
  updatedAt: true,
  banExpires: true,
  emailVerified: true,
})

type UserInputSchema = z.infer<typeof userInputSchema>

export async function Create(data: UserInputSchema) {
  const session = await getServerSession()
  const user = session?.user

  if (!user) throw new Error('Unauthorized')

  const parsed = userInputSchema.safeParse(data)

  if (!parsed.success) {
    throw new Error('Dados inválidos')
  }

  const result = await auth.api.createUser({
    body: {
      email: data.email,
      password: String(data.branch),
      name: data.name,
      role: 'user',
      data: { branch: data.branch },
    },
  })

  if (!result?.user) {
    throw new Error('Erro ao criar usuário')
  }

  updateTag('stores')
  return result.user
}
