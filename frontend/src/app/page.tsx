'use client'

import { Button } from '@/components/ui/button'
import { CreateTaskModal } from '@/features/tasks/components/create-task-modal'
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

        <Button onClick={() => addSearchParam('modal', 'create-task')}>+ Novo</Button>
      </header>

      <main>
        {tasks.length ? <TasksTable /> : 'Sem tarefas adicionadas'}

        <CreateTaskModal />
        <UpdateTaskModal />
      </main>
    </div>
  )
}
