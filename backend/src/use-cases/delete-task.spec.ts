import { add } from 'date-fns'
import { describe, it, expect } from 'vitest'
import { InMemoryTasksRepository } from '../repositories/in-memory/in-memory-tasks-repository'
import { CreateTask } from './create-task'
import { DeleteTask } from './delete-task'

describe('Delete Task', async () => {
  const tasksRepository = new InMemoryTasksRepository()

  const startsAt = new Date()
  const endsAt = add(startsAt, { hours: 1 })

  await new CreateTask(tasksRepository).handle({
    id: '1',
    title: 'Title',
    description: 'Description',
    startsAt,
    endsAt,
  })

  const deleteTask = new DeleteTask(tasksRepository)

  it('should be able to delete an existent task', async () => {
    expect(deleteTask.handle('1')).resolves.toBe('1')
  })

  it('should not be able to delete an unexistent task', async () => {
    expect(deleteTask.handle('2')).rejects.toThrow()
  })
})
