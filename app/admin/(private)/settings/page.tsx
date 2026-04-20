export const metadata = {
  title: 'Configurações',
  description: 'Configure seu sistema da maneira que preferir',
}

export default function Settings() {
  return (
    <main>
      <div className="space-y-1">
        <h1 className="text-foreground text-xl font-bold md:text-3xl">
          Configurações
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Configure seu sistema da maneira que preferir
        </p>
      </div>
    </main>
  )
}
