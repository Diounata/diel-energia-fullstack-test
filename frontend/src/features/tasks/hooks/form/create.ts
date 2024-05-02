import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { useTasks } from '../../contexts/tasks-context'
import { useSearchParamsManager } from '@/lib/hooks/useSearchParams'

import { taskSchema } from '../../validators/task'

import type { FormInput } from '../../validators/task'
import type { Task } from '../../types/task'
import type { WithoutId } from '@/lib/types/without-id'

export function useCreateTask() {
  const { createTask } = useTasks()
  const { removeSearchParam } = useSearchParamsManager()

  const createTaskForm = useForm<FormInput>({
    resolver: zodResolver(taskSchema),
  })

  const onSubmit: SubmitHandler<FormInput> = useCallback(
    async data => {
      const task: WithoutId<Task> = { ...data }

      const createTaskPromise = createTask(task)

      const id = await toast.promise(createTaskPromise, {
        loading: 'Criando tarefa...',
        success: 'Tarefa criada com sucesso!',
        error: 'Não foi possível criar esta tarefa',
      })

      if (id) {
        removeSearchParam('modal')
        createTaskForm.reset()
      }
    },
    [createTask, createTaskForm, removeSearchParam]
  )

  return {
    createTaskForm,
    onSubmit,
  }
}
