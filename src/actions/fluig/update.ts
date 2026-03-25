'use server'

import z from 'zod'
import { prisma } from '@/lib/prisma'
import { updateTag } from 'next/cache'
import { getServerSession } from '@/actions/auth/session'

const fluigSchema = z.object({
  date: z.date(),
  code: z.string().min(1, 'Código é obrigatório'),
  product: z.string().min(1, 'Produto é obrigatório'),
  quantity: z.string().min(1, 'Quantidade é obrigatória'),
  nFluig: z.number().min(1, 'Número de fluig é obrigatório'),
  status: z.enum(['Approved', 'Pending', 'Not_Approved']),
  cost: z.string().min(1, 'Custo é obrigatório'),
})

type FluigSchema = z.infer<typeof fluigSchema>

function calculateCostTotal(cost: string, quantity: string): string {
  const costNumber = Number(cost)
  const quantityNumber = Number(quantity.replaceAll(/,/g, '.'))
  const normalizedCost = costNumber < 1 ? costNumber * 1000 : costNumber
  return (normalizedCost * quantityNumber).toFixed(2)
}

export async function Update(id: string, data: FluigSchema) {
  const session = await getServerSession()

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const updated = await prisma.fluig.update({
    where: {
      id,
      userId: session.user.id,
    },
    data: {
      code: data.code,
      date: data.date,
      cost: data.cost,
      nFluig: data.nFluig,
      product: data.product,
      costTotal: calculateCostTotal(data.cost, data.quantity),
      quantity: data.quantity.replaceAll(/,/g, '.'),
      status: data.status,
    },
  })

  updateTag('fluigs')
  return updated
}
