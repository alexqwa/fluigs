import { LoginForm } from '@/components/form-login'

export default function Home() {
  return (
    <div className="bg-card inset-0 flex min-h-svh w-full items-center justify-center bg-[radial-gradient(rgba(229,231,235,0.10)_1px,transparent_1px)] bg-size-[14px_14px] px-6">
      <div className="w-full max-w-lg">
        <LoginForm />
      </div>
    </div>
  )
}
