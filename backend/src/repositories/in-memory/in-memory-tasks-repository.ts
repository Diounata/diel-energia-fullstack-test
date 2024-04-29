import { Task } from '../../entities/task'
import { TasksRepository } from '../tasks-repository'

export class InMemoryTasksRepository implements TasksRepository {
  items: Task[] = []

  async create(task: Task): Promise<void> {
    this.items.push(task)
  }

  async update(task: Task): Promise<void> {
    let updatingTask = this.items.find(currentTask => currentTask.id === task.id)

    if (!updatingTask) throw new Error('Updating task not found')

    updatingTask = Object.assign(updatingTask, task)
    this.items = this.items.map(task => (task.id === updatingTask.id ? updatingTask : task))
  }

  async delete(id: string): Promise<void> {
    this.items.filter(task => task.id !== id)
  }
}
