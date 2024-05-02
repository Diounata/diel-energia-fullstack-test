'use client'

import { format } from 'date-fns'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import ptBRLocale from '@fullcalendar/core/locales/pt-br'
import { EventContentArg } from '@fullcalendar/core/index.js'

import { Modal } from '@/components/ui/modal'

import { useSearchParamsManager } from '@/lib/hooks/useSearchParams'
import { useTasks } from '../contexts/tasks-context'

export function TaskCalendarModal() {
  const { searchParams, removeSearchParam } = useSearchParamsManager()
  const { tasks } = useTasks()

  const isCalendarOpen = searchParams.get('modal') === 'task-calendar'
  const setIsOpen = () => removeSearchParam('modal')

  const events =
    tasks.map(task => ({
      title: task.title,
      start: task.startsAt,
      end: task.endsAt,
    })) ?? []

  return (
    <Modal isOpen={isCalendarOpen} setIsOpen={setIsOpen} className="w-[90%] h-[90%]">
      <FullCalendar
        events={events}
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
        eventContent={(arg: EventContentArg) => {
          const startTime = arg.event.start ? format(arg.event.start, 'HH:mm') : ''
          const endTime = arg.event.end ? format(arg.event.end, 'HH:mm') : ''

          return (
            <div className={`flex flex-col justify-between gap-1 h-full w-full px-2 py-1 bg-[#1768ff4b]`}>
              <b>{arg.event.title}</b>

              <p>{!endTime ? startTime : `${startTime} - ${endTime}`}</p>
            </div>
          )
        }}
      />
    </Modal>
  )
}
