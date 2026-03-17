'use server'

import z from 'zod'
import { updateTag } from 'next/cache'
import { prisma } from '@/lib/db/prisma'
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

export async function Update(id: string, data: FluigSchema) {
  const session = await getServerSession()
  const costNumber = Number(data.cost)
  const quantityNumber = Number(data.quantity.replaceAll(/\,/g, '.'))
  const normalizedCost = costNumber < 1 ? costNumber * 1000 : costNumber
  const normalizedCostTotal = normalizedCost * quantityNumber

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  await prisma.fluig.update({
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
      costTotal: normalizedCostTotal.toFixed(2),
      quantity: quantityNumber.toFixed(2),
      status: data.status,
    },
  })

  updateTag('fluigs')
}
