'use client'

import { Button } from '@/components/ui/button'
import { CreateTaskModal } from '@/features/tasks/components/create-task-modal'
import { TasksTable } from '@/features/tasks/components/tasks-table'
import { TasksProvider } from '@/features/tasks/contexts/tasks-context'

import { useSearchParamsManager } from '@/lib/hooks/useSearchParams'

export default function Home() {
  const { toggleSearchParam } = useSearchParamsManager()

  return (
    <TasksProvider>
      <div className="flex flex-col gap-9">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-medium md:text-3xl">Tarefas (0)</h1>

          <Button onClick={() => toggleSearchParam('modal', 'create-task')}>+ Novo</Button>
        </header>

        <main>
          <TasksTable />

          <CreateTaskModal />
        </main>
      </div>
    </TasksProvider>
  )
}
