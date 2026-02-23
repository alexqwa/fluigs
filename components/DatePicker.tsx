import * as React from 'react'
import { addDays, format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { ptBR } from 'react-day-picker/locale'
import { type DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export function DatePicker() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  })

  React.useEffect(() => {
    console.log(date)
  }, [date])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date-picker-range"
          className="bg-card border-border hover:bg-muted w-full cursor-pointer justify-start border px-2.5 font-normal md:max-w-56"
        >
          <CalendarIcon />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, 'dd/MM/yyyy')} -{' '}
                {format(date.to, 'dd/MM/yyyy')}
              </>
            ) : (
              format(date.from, 'dd/MM/yyyy')
            )
          ) : (
            <span>Selecionar Data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-card border-border w-auto border p-0"
        align="start"
      >
        <Calendar
          mode="range"
          locale={ptBR}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          defaultMonth={date?.from}
        />
      </PopoverContent>
    </Popover>
  )
}
