import { createContext, useContext, useMemo, ReactNode, useState, useCallback, useEffect } from 'react'
import axios from '../../../lib/api/axios-instance'
import toast from 'react-hot-toast'

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
  const [tasks, setTasks] = useState<Task[]>([])

  const getAllTasks = useCallback(async () => {
    try {
      const tasks = (await axios.get<Task[]>('/tasks')).data

      setTasks(tasks)
    } catch (e) {
      console.log(e)
    }
  }, [])

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

  useEffect(() => {
    toast.promise(getAllTasks(), {
      loading: 'Carregando tarefas...',
      success: 'Tarefas carregadas!',
      error: 'Erro ao carregar as tarefas',
    })
  }, [])

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
