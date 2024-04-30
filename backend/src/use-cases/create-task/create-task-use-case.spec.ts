import { add } from 'date-fns'
import { describe, it, expect } from 'vitest'
import { CreateTaskUseCase } from './create-task-use-case'
import { InMemoryTasksRepository } from '../../repositories/in-memory/in-memory-tasks-repository'

describe('Create Task', () => {
  const tasksRepository = new InMemoryTasksRepository()
  const createTask = new CreateTaskUseCase(tasksRepository)

  const startsAt = new Date()
  const endsAt = add(startsAt, { hours: 1 })

  it('should be able to create a task', () => {
    expect(
      createTask.handle({
        id: '2',
        title: 'Title',
        description: 'Description',
        startsAt,
        endsAt,
      })
    ).resolves.toBe('2')
  })

  it('should not be able to create a task with an existing task containg the same id', () => {
    expect(
      createTask.handle({
        id: '1',
        title: 'Title',
        description: 'Description',
        startsAt,
        endsAt,
      })
    ).rejects.toThrow()
  })
})
