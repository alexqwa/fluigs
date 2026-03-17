'use server'

import { getFluigsCached } from '@/lib/db/cache/fluig-cache'

export async function Queries(userId: string) {
  return getFluigsCached(userId)
}
