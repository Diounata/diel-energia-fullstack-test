'use client'

import { format } from 'date-fns'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import ptBRLocale from '@fullcalendar/core/locales/pt-br'
import { EventContentArg } from '@fullcalendar/core/index.js'

export function Calendar() {
  return (
    <FullCalendar
      events={[{ title: 'Fazer lição de casa', start: '2024-05-01T03:00:00Z', end: '2024-05-01T04:00:00Z' }]}
      eventTimeFormat={{
        hour: 'numeric',
        minute: '2-digit',
        meridiem: false,
      }}
      height="100%"
      initialView="dayGridMonth"
      locale={ptBRLocale}
      plugins={[dayGridPlugin]}
      selectable
      showNonCurrentDates={false}
      eventContent={(arg: EventContentArg) => {
        const startTime = format(arg.event.start!, 'HH:mm')
        const endTime = format(arg.event.end!, 'HH:mm')

        return (
          <div className={`flex flex-col justify-between gap-1 h-full w-full px-2 py-1 bg-blue-200`}>
            <b>{arg.event.title}</b>

            <p>
              {startTime} - {endTime}
            </p>
          </div>
        )
      }}
    />
  )
}
