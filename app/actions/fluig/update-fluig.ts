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

type FluigSchema = z.infer<typeof fluigSchema>

export async function updateFluig(id: string, data: FluigSchema) {
  const session = await getServerSession()

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  await prisma.fluig.update({
    where: {
      id,
    },
    data,
  })

  updateTag('fluigs')
}
