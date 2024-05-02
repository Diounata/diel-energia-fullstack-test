'use client'

import { Button } from '@/components/ui/button'
import { TextButton } from '@/components/ui/text-button'
import { CreateTaskModal } from '@/features/tasks/components/create-task-modal'
import { DeleteTaskModal } from '@/features/tasks/components/delete-task-modal'
import { FilterTasksByTitleInput } from '@/features/tasks/components/filter-tasks-by-title-input'
import { TaskCalendarModal } from '@/features/tasks/components/task-calendar-modal'
import { TasksTable } from '@/features/tasks/components/tasks-table'
import { UpdateTaskModal } from '@/features/tasks/components/update-task-modal'
import { TasksProvider, useTasks } from '@/features/tasks/contexts/tasks-context'

import { useSearchParamsManager } from '@/lib/hooks/useSearchParams'

export default function Home() {
  return (
    <TasksProvider>
      <Content />
    </TasksProvider>
  )
}

function Content() {
  const { addSearchParam } = useSearchParamsManager()
  const { tasks } = useTasks()

  return (
    <div className="flex flex-col gap-9">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-medium md:text-3xl">Tarefas ({tasks.length})</h1>

        <div className="flex gap-4">
          <TextButton onClick={() => addSearchParam('modal', 'task-calendar')}>Abrir calendário</TextButton>
          <FilterTasksByTitleInput />
          <Button onClick={() => addSearchParam('modal', 'create-task')}>+ Novo</Button>
        </div>
      </header>

      <main className="flex flex-col gap-8">
        {tasks.length ? <TasksTable /> : 'Sem tarefas adicionadas'}

        <CreateTaskModal />
        <UpdateTaskModal />
        <DeleteTaskModal />
        <TaskCalendarModal />
      </main>
    </div>
  )
}
