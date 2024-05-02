import { createContext, useContext, useMemo, ReactNode, useState, useCallback } from 'react'
import axios from '../../../lib/api/axios-instance'

import type { Task } from '../types/task'
import type { WithoutId } from '@/lib/types/without-id'

interface Children {
  children: ReactNode
}

interface Props {
  tasks: Task[]
  createTask(task: WithoutId<Task>): Promise<string>
}

const TasksContext = createContext({} as Props)

export function TasksProvider({ children }: Children) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Title',
      description: 'Description',
      startsAt: '2022-01-01T00:00:00Z',
      endsAt: '2022-01-01T00:00:00Z',
    },
  ])

  const createTask = useCallback(
    async (task: WithoutId<Task>) => {
      try {
        const id = (await axios.post<string>('/tasks', task)).data

        setTasks(prevTasks => [...prevTasks, { id, ...task }])

        return id
      } catch (e) {
        console.log(e)
        return ''
      }
    },
    [setTasks]
  )

  const value = useMemo(
    () => ({
      tasks,
      createTask,
    }),
    [tasks, createTask]
  )

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}

export function useTasks() {
  return useContext(TasksContext)
}
