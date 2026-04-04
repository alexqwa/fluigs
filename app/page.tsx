import { FormLogin } from '@/components/forms/form-login'

export const metadata = {
  title: 'Autenticação - Controle de Fluigs',
  description: 'Faça autenticação para prosseguir',
}

export default function Home() {
  return (
    <div className="bg-card inset-0 flex min-h-svh w-full items-center justify-center px-6">
      <div className="w-full max-w-lg">
        <FormLogin />
      </div>
    </div>
  )
}
