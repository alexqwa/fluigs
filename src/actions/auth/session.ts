import { cache } from 'react'
import { auth } from '@/lib/auth/server'
import { headers } from 'next/headers'

export const getServerSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  })
})
