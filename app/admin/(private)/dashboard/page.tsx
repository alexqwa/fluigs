export const metadata = {
  title: 'Dashboard',
  description: 'Administre todo o seu sistema de um só lugar',
}

export default function Dashboard() {
  return (
    <main>
      <div className="space-y-1">
        <h1 className="text-foreground text-xl font-bold md:text-3xl">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Administre todo o seu sistema de um só lugar
        </p>
      </div>
    </main>
  )
}
