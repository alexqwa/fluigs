import { Suspense } from 'react'
import { cacheLife, cacheTag } from 'next/cache'

import { ListOrganizations } from '@/actions/admin/orgs'

import { AuthSkeleton } from '@/components/skeletons/auth-skeleton'
import { FormAuthUser } from '@/components/forms/auth/form-auth-user'

export const metadata = {
  title: 'Autenticação - Controle de Fluigs',
  description: 'Faça autenticação para prosseguir',
}

async function OrganizationsData() {
  'use cache'
  const orgs = await ListOrganizations()
  cacheTag('orgs')
  cacheLife('max')

  return <FormAuthUser data={orgs} />
}

export default function Home() {
  return (
    <div className="bg-ring/15 inset-0 flex min-h-svh w-full items-center justify-center px-6">
      <div className="w-full max-w-lg">
        <Suspense fallback={<AuthSkeleton />}>
          <OrganizationsData />
        </Suspense>
      </div>
    </div>
  )
}
