import { createContext, useContext, useMemo, ReactNode, useState, useCallback, useEffect } from 'react'
import axios from '../../../lib/api/axios-instance'
import toast from 'react-hot-toast'

import type { Task } from '../types/task'
import type { PartialWithId } from '@/lib/types/partial-with-id'
import type { WithoutId } from '@/lib/types/without-id'

interface Children {
  children: ReactNode
}

interface Props {
  tasks: Task[]
  getTask(id: string): Task | null
  createTask(task: WithoutId<Task>): Promise<string>
  updateTask(task: PartialWithId<Task>): Promise<string>
  deleteTask(task_id: string): Promise<string>
}

const TasksContext = createContext({} as Props)

export function TasksProvider({ children }: Children) {
  const [tasks, setTasks] = useState<Task[]>([])

  const getAllTasks = useCallback(async () => {
    try {
      const { data: tasks } = await axios.get<Task[]>('/tasks')

      setTasks(tasks)
    } catch (e) {
      console.log(e)
    }
  }, [])

  const getTask = useCallback(
    (id: string) => {
      return tasks.find(task => task.id === id) ?? null
    },
    [tasks]
  )

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

  const updateTask = useCallback(
    async (task: PartialWithId<Task>) => {
      try {
        const id = (await axios.put<string>('/tasks', task)).data

        const updatedTasks = tasks.map(currentTask =>
          currentTask.id === id ? { ...currentTask, ...task } : currentTask
        )

        setTasks(updatedTasks)

        return id
      } catch (e) {
        console.log(e)
        return ''
      }
    },
    [tasks]
  )

  const deleteTask = useCallback(
    async (task_id: string) => {
      try {
        const id = (await axios.delete<string>('/tasks', { data: { id: task_id } })).data

        setTasks(prevTasks => prevTasks.filter(task => task.id !== id))

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
      getTask,
      createTask,
      updateTask,
      deleteTask,
    }),
    [tasks, getTask, createTask, updateTask, deleteTask]
  )

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}

export function useTasks() {
  return useContext(TasksContext)
}
