import { FormAuthAdmin } from '@/components/forms/form-auth-admin'

export const metadata = {
  title: 'Autenticação - Controle de Fluigs',
  description: 'Faça autenticação para prosseguir',
}

export default function HomeAdmin() {
  return (
    <div className="bg-ring/15 inset-0 flex min-h-svh w-full items-center justify-center px-6">
      <div className="w-full max-w-lg">
        <FormAuthAdmin />
      </div>
    </div>
  )
}
