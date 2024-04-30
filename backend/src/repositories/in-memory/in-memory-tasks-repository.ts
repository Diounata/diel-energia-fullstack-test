import { add } from 'date-fns'
import { Task, TaskProps } from '../../entities/task'
import { ITasksRepository } from '../tasks-repository'

export class InMemoryTasksRepository implements ITasksRepository {
  public items: Map<string, Task> = new Map()

  constructor() {
    this.items.set(
      '1',
      new Task(
        {
          title: 'Title',
          description: 'Description',
          startsAt: new Date(),
          endsAt: add(new Date(), { hours: 1 }),
        },
        '1'
      )
    )
  }

  async create(task: Task) {
    const hasOverlappingId = this.items.get(task.id)

    if (hasOverlappingId) throw new Error('There is an added task id conflicting with current task id')

    this.items.set(task.id, task)

    return task.id
  }

  async update(task: Partial<TaskProps> & { id: string }) {
    let updatingTask = this.items.get(task.id)

    if (!updatingTask) throw new Error('Updating task not found')

    updatingTask.setProps(task)

    return updatingTask
  }

  async delete(id: string) {
    const wasDeleted = this.items.delete(id)

    if (!wasDeleted) throw new Error('Deleting Task not found')

    return id
  }
}
