'use server'

import z from 'zod'
import { prisma } from '@/lib/prisma'
import { updateTag } from 'next/cache'
import { getServerSession } from 'actions/get-session'

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

export async function createFluig(data: FluigSchema) {
  const session = await getServerSession()
  const costNumber = Number(data.cost)
  const quantityNumber = Number(data.quantity.replaceAll(/\,/g, '.'))
  const normalizedCost = costNumber < 1 ? costNumber * 1000 : costNumber
  const normalizedCostTotal = normalizedCost * quantityNumber
  const costTotal = normalizedCostTotal.toFixed(2)

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  await prisma.fluig.create({
    data: {
      code: data.code,
      date: data.date,
      nFluig: data.nFluig,
      product: data.product,
      quantity: data.quantity,
      costTotal: costTotal,
      status: data.status,
      userId: session.user.id,
    },
  })

  updateTag('fluigs')
}
