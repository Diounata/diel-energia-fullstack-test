import { describe, it, expect } from 'vitest'
import { InMemoryTasksRepository } from '../../repositories/in-memory/in-memory-tasks-repository'
import { GetTasksUseCase } from './get-tasks-use-case'
import { CreateTaskUseCase } from '../create-task/create-task-use-case'

describe('Get all tasks', async () => {
  const tasksRepository = new InMemoryTasksRepository()
  const getTasksUseCase = new GetTasksUseCase(tasksRepository)
  const createTaskUseCase = new CreateTaskUseCase(tasksRepository)

  await createTaskUseCase.handle({
    title: 'Task',
    description: 'Description',
    startsAt: new Date('2024-01-02T00:00:00Z'),
    endsAt: new Date('2024-01-02T00:00:00Z'),
  })

  it('should return all tasks', async () => {
    expect((await getTasksUseCase.handle()).length).toBe(2)
  })
})
