import { FormAuthUser } from '@/components/forms/auth/form-auth-user'

export const metadata = {
  title: 'Autenticação - Controle de Fluigs',
  description: 'Faça autenticação para prosseguir',
}

export default function Home() {
  return (
    <div className="bg-ring/15 inset-0 flex min-h-svh w-full items-center justify-center px-6">
      <div className="w-full max-w-lg">
        <FormAuthUser />
      </div>
    </div>
  )
}
