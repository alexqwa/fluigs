'use server'

import { getServerSession } from 'actions/get-session'
import { getFluigsCached } from '@/lib/cache/fluig-cache'

export async function getFluigs() {
  const session = await getServerSession()

  if (!session?.user) {
    return []
  }

  return getFluigsCached(session.user.id)
}
