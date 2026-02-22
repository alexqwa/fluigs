import { DynamicIcon, type IconName } from 'lucide-react/dynamic'

interface StatsCardProps {
  icon: string
  title: string
  value: string
  prospect: string
  discover: string
  indicator: string
}

export function AnalyticsCard({
  icon,
  title,
  value,
  prospect,
  discover,
  indicator,
}: StatsCardProps) {
  return (
    <div className="border-border bg-card rounded-lg border bg-linear-to-t p-4 shadow-xs">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-muted-foreground text-sm leading-tight font-medium md:text-base">
          {title}
        </span>
        <div className="border-border flex items-center gap-1 rounded-lg border px-1.5 py-0.5">
          <span className="text-xs">{indicator}</span>
        </div>
      </div>
      <h2 className="text-foreground mb-6 text-2xl font-semibold">{value}</h2>
      <div className="flex-col items-start gap-1.5">
        <div className="line-clamp-1 flex items-center gap-2">
          <span className="text-foreground text-xs font-medium">
            {prospect}
          </span>
          <DynamicIcon
            name={icon as IconName}
            size={14}
            className="text-foreground"
          />
        </div>
        <span className="text-muted-foreground text-xs">{discover}</span>
      </div>
    </div>
  )
}
