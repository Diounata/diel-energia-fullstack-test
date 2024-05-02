import { format } from 'date-fns'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { useTasks } from '../../contexts/tasks-context'
import { useSearchParamsManager } from '@/lib/hooks/useSearchParams'

import { taskSchema } from '../../validators/task'

import type { FormInput } from '../../validators/task'
import type { Task } from '../../types/task'
import type { PartialWithId } from '@/lib/types/partial-with-id'

interface Props {
  task_id: string
}

export function useUpdateTask({ task_id }: Props) {
  const { getTask, updateTask } = useTasks()
  const { removeSearchParam } = useSearchParamsManager()

  const updateTaskForm = useForm<FormInput>({
    resolver: zodResolver(taskSchema),
  })

  const onSubmit: SubmitHandler<FormInput> = useCallback(
    async data => {
      const task: PartialWithId<Task> = { id: task_id, ...data }

      const updateTaskPromise = updateTask(task)

      await toast.promise(updateTaskPromise, {
        loading: 'Atualizando tarefa...',
        success: 'Tarefa atualizada com sucesso!',
        error: 'Não foi possível atualizar esta tarefa',
      })

      removeSearchParam('modal')
      updateTaskForm.reset()
    },
    [task_id, updateTask, removeSearchParam, updateTaskForm]
  )

  useEffect(() => {
    const task = getTask(task_id)

    if (!task) {
      removeSearchParam('modal')
      removeSearchParam('id')
      return
    }

    const { title, description, startsAt, endsAt } = task
    updateTaskForm.reset({
      title,
      description,
      startsAt: format(new Date(startsAt), "yyyy-MM-dd'T'HH:mm"),
      endsAt: format(new Date(endsAt), "yyyy-MM-dd'T'HH:mm"),
    })
  }, [task_id])

  return {
    updateTaskForm,
    onSubmit,
  }
}
