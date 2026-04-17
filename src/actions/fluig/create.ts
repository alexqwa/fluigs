'use server'

import z from 'zod'
import { updateTag } from 'next/cache'

import { prisma } from '@/lib/prisma'
import { getServerSession } from '@/actions/auth/session'
import { FluigInputSchema } from '@/generated/zod/schemas'

const fluigSchema = FluigInputSchema.omit({
  id: true,
  user: true,
  createdAt: true,
})

type FluigSchema = z.infer<typeof fluigSchema>

function calculateCostTotal(cost: string, quantity: string): string {
  const costNumber = Number(cost)
  const quantityNumber = Number(quantity.replaceAll(/,/g, '.'))
  const normalizedCost = costNumber < 1 ? costNumber * 1000 : costNumber
  return (normalizedCost * quantityNumber).toFixed(2)
}

export async function Create(data: FluigSchema) {
  const session = await getServerSession()

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const created = await prisma.fluig.create({
    data: {
      code: data.code,
      date: data.date,
      cost: data.cost,
      nFluig: data.nFluig,
      product: data.product,
      costTotal: calculateCostTotal(data.cost, data.quantity),
      quantity: data.quantity.replaceAll(/,/g, '.'),
      status: data.status,
      userId: session.user.id,
    },
  })

  updateTag(`fluigs-${session.user.id}`)
  return created
}
