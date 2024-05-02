'use client'

import { Modal } from '@/components/ui/modal'
import { TaskForm } from './task-form'

import { useUpdateTask } from '../hooks/update'
import { useSearchParamsManager } from '@/lib/hooks/useSearchParams'

export function UpdateTaskModal() {
  const { searchParams, removeSearchParam } = useSearchParamsManager()
  const id = searchParams.get('id')

  const { updateTaskForm, onSubmit } = useUpdateTask({ task_id: id as string })

  const isUpdatingTask = searchParams.get('modal') === 'update-task'
  const setIsOpen = () => {
    removeSearchParam('modal')
    removeSearchParam('id')
  }

  return (
    <Modal isOpen={isUpdatingTask} setIsOpen={setIsOpen}>
      <TaskForm type="update" form={updateTaskForm} onSubmit={onSubmit} setIsOpen={setIsOpen} />
    </Modal>
  )
}
