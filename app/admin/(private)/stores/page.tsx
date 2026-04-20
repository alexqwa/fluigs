export const metadata = {
  title: 'Lojas',
  description: 'Gerencie todas as suas lojas com praticidade',
}

export default async function Stores() {
  return (
    <main>
      <div className="space-y-1">
        <h1 className="text-foreground text-xl font-bold md:text-3xl">Lojas</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Gerencie todas as suas lojas com praticidade
        </p>
      </div>
    </main>
  )
}
