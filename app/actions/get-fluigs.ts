'use server'
import { cacheLife, cacheTag } from 'next/cache'

export interface FluigProps {
  code: number
  nFluig: number
  status: string
  product: string
  quantity: number
  costTotal: number
  createdAt: Date
  date: Date
}

export async function getFluigs() {
  'use cache'
  cacheLife('seconds')
  cacheTag('fluigs')

  const response = await fetch(`${process.env.BETTER_AUTH_URL}/api/fluigs`)
  const data: FluigProps[] = await response.json()
  return data
}
