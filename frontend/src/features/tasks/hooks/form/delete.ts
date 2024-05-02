import { useCallback, useEffect } from 'react'
import { toast } from 'react-hot-toast'

import { useTasks } from '../../contexts/tasks-context'
import { useSearchParamsManager } from '@/lib/hooks/useSearchParams'

interface Props {
  task_id: string
}

export function useDeleteTask({ task_id }: Props) {
  const { getTask, deleteTask } = useTasks()
  const { removeSearchParam } = useSearchParamsManager()

  const onDelete = useCallback(async () => {
    const deleteTaskPromise = deleteTask(task_id)

    const id = await toast.promise(deleteTaskPromise, {
      loading: 'Deletando tarefa...',
      success: 'Tarefa deletada com sucesso!',
      error: 'Não foi possível deletar esta tarefa',
    })

    if (id) {
      removeSearchParam('modal')
      removeSearchParam('id')
    }
  }, [task_id])

  useEffect(() => {
    const task = getTask(task_id)

    if (!task) {
      removeSearchParam('modal')
      removeSearchParam('id')
    }
  }, [task_id])

  return {
    onDelete,
  }
}
