import { Task, TaskProps } from '../../entities/task'
import { TasksRepository } from '../tasks-repository'

export class InMemoryTasksRepository implements TasksRepository {
  items: Task[] = []

  async create(task: Task) {
    this.items.push(task)

    return task
  }

  async update(task: Partial<TaskProps> & { id: string }) {
    let updatingTaskIndex = this.items.findIndex(currentTask => currentTask.id === task.id)

    if (updatingTaskIndex === -1) throw new Error('Updating task not found')

    this.items[updatingTaskIndex].setProps(task)

    return this.items[updatingTaskIndex]
  }

  async delete(id: string) {
    let hasFound = false

    this.items = this.items.filter(task => (task.id !== id ? true : (hasFound = true)))

    if (!hasFound) throw new Error('Deleting Task not found')

    return id
  }
}
