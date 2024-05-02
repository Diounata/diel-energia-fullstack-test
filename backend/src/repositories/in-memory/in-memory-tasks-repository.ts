import { add, isWithinInterval, set, startOfDay } from 'date-fns'
import { Task, TaskProps } from '../../entities/task'
import { ITasksRepository } from '../tasks-repository'

export class InMemoryTasksRepository implements ITasksRepository {
  public items: Map<string, Task> = new Map()

  constructor() {
    const startsAt = new Date('2024-01-01T00:00:00Z')
    const endsAt = add(startsAt, { hours: 1 })

    this.items.set(
      '1',
      new Task(
        {
          title: 'Title',
          description: 'Description',
          startsAt,
          endsAt,
        },
        '1'
      )
    )
  }

  async getAll(): Promise<TaskProps[]> {
    return Array.from(this.items).map(item => item[1])
  }

  async create(task: Task) {
    const hasOverlappingId = this.items.get(task.id)

    if (hasOverlappingId) throw new Error('There is an added task id conflicting with current task id')

    this.items.set(task.id, task)

    return task.id
  }

  async update(task: Partial<TaskProps> & { id: string }): Promise<TaskProps> {
    let updatingTask = this.items.get(task.id)

    if (!updatingTask) throw new Error('Updating task not found')

    updatingTask.setProps(task)

    const { id, title, description, startsAt, endsAt } = updatingTask

    return { id, title, description, startsAt, endsAt }
  }

  async delete(id: string) {
    const wasDeleted = this.items.delete(id)

    if (!wasDeleted) throw new Error('Deleting Task not found')

    return id
  }
}
