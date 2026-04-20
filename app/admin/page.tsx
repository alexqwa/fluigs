import FormLoginAdmin from '@/components/forms/form-login-admin'

export const metadata = {
  title: 'Autenticação - Controle de Fluigs',
  description: 'Faça autenticação para prosseguir',
}

export default function HomeAdmin() {
  return (
    <div className="bg-ring/15 inset-0 flex min-h-svh w-full items-center justify-center px-6">
      <div className="w-full max-w-lg">
        <FormLoginAdmin />
      </div>
    </div>
  )
}
