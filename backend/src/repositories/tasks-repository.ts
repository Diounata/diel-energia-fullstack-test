import { Task } from '../entities/task'

export interface TasksRepository {
  create(task: Task): Promise<void>
  update(task: Task): Promise<void>
  delete(id: string): Promise<void>
}
