'use client'

import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { TextButton } from '@/components/ui/text-button'

import { useSearchParamsManager } from '@/lib/hooks/useSearchParams'
import { useDeleteTask } from '../hooks/form/delete'

export function DeleteTaskModal() {
  const { searchParams, removeSearchParam } = useSearchParamsManager()
  const id = searchParams.get('id')

  const { onDelete } = useDeleteTask({ task_id: id as string })

  const isDeletingTask = searchParams.get('modal') === 'delete-task'
  const setIsOpen = () => {
    removeSearchParam('modal')
    removeSearchParam('id')
  }

  return (
    <Modal isOpen={isDeletingTask} setIsOpen={setIsOpen}>
      <h1 className="text-2xl font-medium">Deletar tarefa</h1>

      <p className="flex-grow">Você tem certeza em deletar esta tarefa?</p>

      <div className="flex gap-4">
        <Button type="submit" onClick={onDelete} className="h-9 bg-red-600">
          Deletar
        </Button>

        <TextButton type="button" onClick={() => setIsOpen()}>
          Cancelar
        </TextButton>
      </div>
    </Modal>
  )
}
