'use server'

import z from 'zod'
import { FluigModelSchema } from '@/generated/zod/schemas'

const fluigSchema = FluigModelSchema.omit({
  user: true,
  createdAt: true,
})

type FluigSchema = z.infer<typeof fluigSchema>

export async function Queries() {
  const response = await fetch(`${process.env.BETTER_AUTH_URL}/api/fluigs`)
  const data: FluigSchema[] = await response.json()
  return data
}
