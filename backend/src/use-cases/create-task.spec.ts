import { add } from 'date-fns'
import { describe, it, expect } from 'vitest'
import { CreateTask } from './create-task'
import { InMemoryTasksRepository } from '../repositories/in-memory/in-memory-tasks-repository'
import { Task } from '../entities/task'

describe('Create Task', () => {
  const tasksRepository = new InMemoryTasksRepository()

  it('should be able to create a task', () => {
    const createTask = new CreateTask(tasksRepository)

    const startsAt = new Date()
    const endsAt = add(startsAt, { hours: 1 })

    expect(
      createTask.handle({
        id: '1',
        title: 'Title',
        description: 'Description',
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Task)
  })
})
