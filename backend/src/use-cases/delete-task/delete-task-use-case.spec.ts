import { describe, it, expect } from 'vitest'
import { InMemoryTasksRepository } from '../../repositories/in-memory/in-memory-tasks-repository'
import { DeleteTaskUseCase } from './delete-task-use-case'

describe('Delete Task', async () => {
  const tasksRepository = new InMemoryTasksRepository()
  const deleteTask = new DeleteTaskUseCase(tasksRepository)

  it('should be able to delete an existent task', async () => {
    expect(deleteTask.handle('1')).resolves.toBe('1')
  })

  it('should not be able to delete an unexistent task', async () => {
    expect(deleteTask.handle('2')).rejects.toThrow()
  })
})
