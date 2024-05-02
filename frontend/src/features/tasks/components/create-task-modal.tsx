'use client'

import { Modal } from '@/components/ui/modal'
import { TaskForm } from './task-form'

import { useCreateTask } from '../hooks/form/create'
import { useSearchParamsManager } from '@/lib/hooks/useSearchParams'

export function CreateTaskModal() {
  const { searchParams, removeSearchParam } = useSearchParamsManager()
  const { createTaskForm, onSubmit } = useCreateTask()

  const isCreatingTask = searchParams.get('modal') === 'create-task'
  const setIsOpen = () => removeSearchParam('modal')

  return (
    <Modal isOpen={isCreatingTask} setIsOpen={setIsOpen}>
      <TaskForm type="create" form={createTaskForm} onSubmit={onSubmit} setIsOpen={setIsOpen} />
    </Modal>
  )
}
