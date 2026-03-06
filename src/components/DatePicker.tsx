'use client'
import dayjs from 'dayjs'
import * as React from 'react'
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
  const [date, setDate] = React.useState<DateRange | undefined>(undefined)

  React.useEffect(() => {
    const today = dayjs()
    setDate({
      from: today.toDate(),
      to: today.add(7, 'day').toDate(),
    })
  }, [])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date-picker-range"
          className="bg-card border-border w-full cursor-pointer justify-start border px-2.5 font-normal md:max-w-56"
        >
          <CalendarIcon />
          {date?.from ? (
            date.to ? (
              <>
                {dayjs(date.from).format('DD/MM/YYYY')} -{' '}
                {dayjs(date.to).format('DD/MM/YYYY')}
              </>
            ) : (
              dayjs(date.from).format('DD/MM/YYYY')
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
