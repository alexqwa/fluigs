// import { cacheLife, cacheTag } from 'next/cache'
'use server'
import { Fluig } from '@/generated/prisma/client'

export async function Queries() {
  //   'use cache'
  //   cacheLife('hours')
  //   cacheTag('products')

  const response = await fetch(`${process.env.BETTER_AUTH_URL}/api/fluigs`)
  const data: Fluig[] = await response.json()
  return data
}
