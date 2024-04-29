import { Task, TaskProps } from '../../entities/task'
import { TasksRepository } from '../tasks-repository'

export class InMemoryTasksRepository implements TasksRepository {
  items: Task[] = []

  async create(task: Task) {
    this.items.push(task)

    return task
  }

  async update(task: Partial<TaskProps> & { id: string }) {
    let updatingTask = this.items.find(currentTask => currentTask.id === task.id)

    if (!updatingTask) throw new Error('Updating task not found')

    updatingTask.setProps(task)
    this.items = this.items.map(task => (task.id === updatingTask.id ? updatingTask : task))

    return updatingTask
  }

  async delete(id: string) {
    this.items.filter(task => task.id !== id)

    return id
  }
}
