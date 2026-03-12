'use server'

import { getServerSession } from '@/actions/auth/session'
import { getFluigsCached } from '@/lib/db/cache/fluig-cache'

export async function Queries() {
  const session = await getServerSession()

  if (!session?.user) {
    return []
  }

  return getFluigsCached(session.user.id)
}
