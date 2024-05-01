import { add, isWithinInterval } from 'date-fns'
import { describe, it, expect } from 'vitest'
import { InMemoryTasksRepository } from '../../repositories/in-memory/in-memory-tasks-repository'
import { GetTasksByMonthUseCase } from './get-tasks-by-month-use-case'
import { CreateTaskUseCase } from '../create-task/create-task-use-case'

describe('Get tasks by month', async () => {
  const tasksRepository = new InMemoryTasksRepository()
  const getTasksUseCase = new GetTasksByMonthUseCase(tasksRepository)
  const createTaskUseCase = new CreateTaskUseCase(tasksRepository)

  await createTaskUseCase.handle({
    title: 'Taskawd',
    description: 'Description',
    startsAt: new Date('2024-01-02T00:00:00Z'),
    endsAt: new Date('2024-01-02T00:00:00Z'),
  })

  it('should return all tasks based in a specific month and year', async () => {
    const firstOfJanuaryDate = new Date('2024-01-01T00:00:00Z')
    const tasksOfJanuary2024 = await getTasksUseCase.handle(firstOfJanuaryDate)

    const isAllTasksOfJanuary2024 = tasksOfJanuary2024.every(task =>
      isWithinInterval(new Date(task.startsAt), {
        start: firstOfJanuaryDate,
        end: add(firstOfJanuaryDate, { months: 1 }),
      })
    )

    expect(isAllTasksOfJanuary2024).toBe(true)
    expect(tasksOfJanuary2024.length).toBe(2)
  })
})
