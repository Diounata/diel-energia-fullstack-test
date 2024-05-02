'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import ptBRLocale from '@fullcalendar/core/locales/pt-br'

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
        headerToolbar={{
          left: 'title,prev,next',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: false,
        }}
        height="100%"
        initialView="dayGridMonth"
        locale={ptBRLocale}
        plugins={[dayGridPlugin, timeGridPlugin]}
        selectable
      />
    </Modal>
  )
}
