'use client'

import { Button } from '@/components/ui/button'
import { TasksTable } from '@/features/tasks/components/tasks-table'

export default function Home() {
  const tasks = [
    {
      id: '1',
      title: 'Title',
      description: 'Description',
      startsAt: '2022-01-01T00:00:00Z',
      endsAt: '2022-01-01T00:00:00Z',
    },
  ]

  return (
    <div className="flex flex-col gap-9">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-medium md:text-3xl">Tarefas (0)</h1>

        <Button>+ Novo</Button>
      </header>

      <main>
        <TasksTable tasks={tasks} />
      </main>
    </div>
  )
}
