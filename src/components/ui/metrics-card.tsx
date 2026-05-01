import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardAction,
  CardContent,
} from '@/components/ui/card'

interface StatsCardProps {
  icon: string
  title: string
  value: string
  prospect: string
  discover: string
  indicator?: string
}

type DataCardProps = {
  title: string
  value: string
  description: string
  subdescription: string
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
    <Card className="rounded-lg! p-4!">
      <CardHeader>
        <CardTitle className="text-muted-foreground text-sm font-medium md:text-base">
          {title}
        </CardTitle>
        {indicator && (
          <CardAction>
            <div className="border-border flex items-center gap-1 rounded-sm border px-1.5 py-0.5">
              <span className="text-xs">{indicator}</span>
            </div>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>
        <h2 className="text-foreground mb-6 text-2xl font-semibold">{value}</h2>
      </CardContent>
      <CardFooter>
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
      </CardFooter>
    </Card>
  )
}

export function DataCard({
  title,
  value,
  description,
  subdescription,
}: DataCardProps) {
  return (
    <Card className="rounded-lg! p-4!">
      <CardHeader>
        <CardTitle className="text-muted-foreground text-sm font-medium md:text-base">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="text-foreground text-3xl font-semibold">{value}</h2>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col gap-1.5">
          <span className="text-foreground text-xs leading-tight font-medium">
            {description}
          </span>
          <span className="text-muted-foreground text-xs leading-tight">
            {subdescription}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}
