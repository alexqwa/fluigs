'use server'

import z from 'zod'
import { prisma } from '@/lib/prisma'
import { updateTag } from 'next/cache'
import { getServerSession } from 'actions/get-session'

const fluigSchema = z.object({
  date: z.date(),
  product: z.string(),
  code: z.number().min(1, 'Código obrigatório'),
  quantity: z.number().min(1, 'Quantidade obrigatória'),
  nFluig: z.number().min(1, 'Número de fluig obrigatório'),
  status: z.enum(['Approved', 'Pending', 'Not_Approved']),
})

export async function createFluig(data: unknown) {
  const { code, product, date, nFluig, quantity, status } =
    fluigSchema.parse(data)
  const session = await getServerSession()

  if (!session?.user) {
    return []
  }

  await prisma.fluig.create({
    data: {
      code: code,
      product: product,
      quantity: quantity,
      nFluig: nFluig,
      date: date,
      status: status,
      costTotal: 0,
      userId: session.user.id,
    },
  })

  updateTag('fluigs')
}
