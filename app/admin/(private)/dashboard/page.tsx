import { UploadClient } from '@/components/client/upload-client'

export const metadata = {
  title: 'Dashboard',
  description: 'Todos os dados do seu sistema em um só lugar',
}

export default function Dashboard() {
  return (
    <main>
      <div className="space-y-1">
        <h1 className="text-foreground text-xl font-bold md:text-3xl">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Todos os dados do seu sistema em um só lugar
        </p>
      </div>
      <UploadClient />
    </main>
  )
}
