import { add } from 'date-fns'
import { describe, it, expect } from 'vitest'
import { InMemoryTasksRepository } from '../repositories/in-memory/in-memory-tasks-repository'
import { Task } from '../entities/task'
import { CreateTask } from './create-task'
import { UpdateTask } from './update-task'

describe('Update Task', async () => {
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

  it('should be able to update an existent task', async () => {
    const updateTask = new UpdateTask(tasksRepository)

    const res = await updateTask.handle({ id: '1', title: 'Updated title' })

    expect(res).toBeInstanceOf(Task)
    expect(res.title).toBe('Updated title')
  })
})
