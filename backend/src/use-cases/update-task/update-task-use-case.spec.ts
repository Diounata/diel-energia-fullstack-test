import { describe, it, expect } from 'vitest'
import { InMemoryTasksRepository } from '../../repositories/in-memory/in-memory-tasks-repository'
import { TaskProps } from '../../entities/task'
import { UpdateTaskUseCase } from './update-task-use-case'

describe('Update Task', async () => {
  const tasksRepository = new InMemoryTasksRepository()
  const updateTask = new UpdateTaskUseCase(tasksRepository)

  it('should be able to update an existent task', async () => {
    const res = await updateTask.handle({ id: '1', title: 'Updated title' })

    expect(res.title).toBe('Updated title')
  })

  it('should not be able to update an unexistent tasks', async () => {
    expect(updateTask.handle({ id: '2', title: 'This task does not exist' })).rejects.toThrow('Updating task not found')
  })
})
